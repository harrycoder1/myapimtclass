import express from 'express';
import { body, validationResult } from 'express-validator';
import { fetchInstitutor, fetchUser } from '../middleware/index.js';
import { User, FormQuize, FormAnswers, Institution } from '../mongoDB/models/index.js';
const router = express.Router()


// Route 1 :
// For answer of the Form :user login required
// formId -- passes to the body ,
// userId -- passes to the header
router.post('/addrecord',
    [
        body('solved', "Answer should be in Array Form ").isArray()
    ]
    , fetchUser, async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(404).json({ success: false, msg: errors.array() })
        }
        // FOR GETTING THE USER_ID FROM THE FETCHUSER MIDDLEWARE
        const userId = req.user.id
        // FOR GETTING THE BODY FROM THE  req 
        const data = req.body;
        try {
            //  CHECK USER ARE EXISTS OR NOT
            const checkUser = await User.findById({ _id: userId });
            if (!checkUser) {
                return res.status(404).json({ success: false, msg: "Invalid User id" })
            }


            // CHECK FORM ARE FOUND OR NOT
            const checkForm = await FormQuize.findOne({ _id: data.formId });

            if (!checkForm) {
                return res.status(404).json({ success: false, msg: "Form not exist!" })
            }
            // FOR CHECKING THE DUPLICATE USER ID IN PARTICULAR FORM
            const userExist = await FormAnswers.findOne({ user_id: userId, formId: data.formId })

            if (userExist) {
                return res.status(400).json({ success: false, msg: "this user was already participact" })
            }
            //FOR GENERATING THE SCORE WE NEED TO CHECK ANSWER
            let count = 0;
            for (let i = 0; i < checkForm.questions.length; i++) {
                for (let j = 0; j < checkForm.questions.length; j++) {
                    if (checkForm.questions[j]._id.toString() === data.solved[i].question_id) {

                        for (let k = 0; k < checkForm.questions[j].answers.length; k++) {
                            if (data.solved[i].choose_id.toString() === checkForm.questions[j].answers[k]._id.toString()) {
                                if (checkForm.questions[j].answers[k].correct === true) {
                                    console.log("Right")
                                    count++;

                                } else {
                                    console.log("Wrong")

                                }
                            }
                        }

                    }
                }

            }
            const result = ((count / checkForm.questions.length) * 100).toFixed(4)
            console.log(result)
            // ADD THE DATA IN THE DATABSE 

            await FormAnswers.create({ ...data, user_id: userId, score: result }) &&

                res.status(200).json({ success: true, msg: "data are added Successfully", id: userId })
        } catch (error) {
            res.status(504).json({ success: false, msg: "Internal Serval Error Occured", error: error })
        }
    })

//ROute 2 : Result view for perticular instittute :
// Result For  institutor : user login required
// formId -- passes from params ,
// institutor  -- passes to the header
// Format : 
// const format ={
//     titleOfForm,
//     fromInstitus ,
//     totalresponce ,
//     date,

//     responces:[
//         {namme , email , id ,score  }

//     ],
//     leaderboard,
//     avgscore
// }
// 
// FOR ANALYING THE QUESTIIN fORAMAT :
// const format =[
//     {question_id , 
//     userChoose :[ //length is no. of choise 
//     {op1:30 ,
//         op2:60,
//         op3:10
// ]
//     ] ,
//     }
// ]

router.get('/resultform/:id', fetchInstitutor, async (req, res) => {

    const formId = req.params['id']
    const iuser = req.institutor.id
    // const iuser = "dsfsdaf34qw5345"
    const institutionData = await Institution.findById(iuser)
    if (!institutionData) {
        return res.status(404).json({ success: false, msg: "this institution not exist!" })
    }

    const formData = await FormQuize.findById(formId)
    if (!formData) {
        return res.status(404).json({ success: false, msg: "Invalid from ID" })
    }
    const formResponceData = await FormAnswers.find({ formId: formId }).sort({ score: -1 })
    if (!formResponceData) {
        return res.status(404).json({ success: false, msg: "No Responces are exist for given form" });
    }
// FOR FINDING THE AVERAGE OF SCORE
    let avg = await FormAnswers.aggregate([{
        $group: {
            _id: null,
            averageScore: { $avg: "$score" },

        }
    }
    ], { allowDiskUse: true });

    // for inding the average of data 
   let ad =  await FormAnswers.aggregate([
        { "$group" : { "_id" : null, "ids" : { "$push" : "$_id" }, "count" : { "$sum" : 1 } } }
    ]);


    
    const sendData = {
        titleOfForm: formData.title,
        fromInstitution: institutionData.name,
        createdDate: formData.date,
        totalResponces: formResponceData?.length,
        responces: formResponceData,
        leaderboard: formResponceData[0],
        avgscore: avg[0].averageScore

    }

    res.status(200).json({ success: true, data: sendData })
})

// Route 3 : Result view for perticular sudents :
// Result For  institutor : user login required
// formId -- passes from params ,
// institutor  -- passes to the header
router.get('/resultform/user/:id', fetchUser, async (req, res) => {

    const formId = req.params['id']
    const userId = req.user.id
    const UserData = await User.findById(userId)
    if (!UserData) {
        return res.status(404).json({ success: false, msg: "this User not exist!" })
    }

    const formData = await FormQuize.findById(formId)
    if (!formData) {
        return res.status(404).json({ success: false, msg: "Invalid from ID" })
    }

    const formResponceData = await FormAnswers.find({ formId: formId ,user_id:userId }) ;
    if (!formResponceData) {
        return res.status(404).json({ success: false, msg: "No Responces are exist for given form" });
    }
// FOR FINDING THE AVERAGE OF SCORE
    let avg = await FormAnswers.aggregate([{
        $group: {
            _id: null,
            averageScore: { $avg: "$score" },
        }
    }
    ], { allowDiskUse: true });

    // For the quetion paper 
    // let qu ={
    //     questions:[{
    //         msg,
    //         answer ,
            // youchoose ,
    //     }]
    // }




    
    const sendData = {
        titleOfForm: formData.title,
        fromInstitution: UserData.name,
        createdDate: formData.date,
     
        responces: formResponceData,
      questionpaper :[],
        avgscore: avg[0].averageScore

    }
const qup={}
    res.status(200).json({ success: true, data: sendData })
})
export default router

