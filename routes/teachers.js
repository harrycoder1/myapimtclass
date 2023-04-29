import express from 'express';
import { TeacherTeams } from '../mongoDB/models/index.js'
import { fetchInstitutor } from '../middleware/index.js'
import { body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
const router = express.Router();

// Route 1 :Url :=> GET http://localhost:8080/api/v1/institution/teachers 
// For showing all Routes all teachers for institutor
router.get("/",fetchInstitutor, async (req, res) => {

    try {
        const iuserId = req.institutor.id ;
        const data = await TeacherTeams.find({institude_id:iuserId}) ;

        // const age = Math.floor((Date.now() - data.age) / (1000 * 3600 * 24 * 365))
        res.status(200).json({ success: true, data: { data } })
    } catch (error) {
        res.status(500).json("Internal Server Error Occured !")
    }
})

// Route 2 :POST http://localhost:8080/api/v1/institution/teachers/addteacher 
// For ADD the teacher  --- institution Login required
router.post('/addteacher',
    [
        body('teacher_name', "Teacher name can not be Empty").exists(),
        body('age', "Enter the date Valid format ex:2003-04-28T11:52:48.318+00:00").isISO8601().toDate(),
        body('contact_number', "Invalid Contact Number").isMobilePhone().isLength({ min: 10, max: 10 }),
        body('email', "Please Enter the valid email").isEmail().normalizeEmail(),
        body('achivements', "Achivement Should be in Array  Format").isArray(),

    ],
    fetchInstitutor, async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ success: false, msg: errors.array() })
        }
        // For getting the institutor id from the header we used middleware that is 'fetchInstitutor' 
        // And take  the id from req.institutor
        const iuserId = req.institutor.id;

        // For Adding the data 
        const data = req.body;


        const saveData = await TeacherTeams.create({ ...data, institude_id: iuserId })



        // Send the responce after save
        res.status(202).json({ success: true, data: saveData, msg: "Teacher Data added Successfully" })
    })

// Route 3:PUT http://localhost:8080/api/v1/institution/teachers/updateprofile
// For Update the teacher data --- institution Login required --teacher id required

router.put('/updateprofile/:id', fetchInstitutor, async (req, res) => {
// Get the teacherid from url 
const teacherId =req.params['id'] ;
try {
    

// Get institutor ID from headers with the help of middleWare that is 'fetchInstitutor
const iuserId = req.institutor.id ;
// Get the data from body :
const updateData = req.body
// Update the data of Teacher
const find = await TeacherTeams.findById({_id:teacherId})
if(!find){
    return res.status(404).json({success:false , msg:"Data not found!"})
}
const data =await TeacherTeams.findOneAndUpdate({institude_id:iuserId , _id:teacherId},updateData) 

    res.status(208).json({ success: true, msg:"Data are Updated SuccessFully!"})

} catch (error) {
    res.status(504).json({success:false , msg:"Internal Server Error Occured"})
}

});

// Route 4 : PUT http://localhost:8080/api/v1/institution/teachers/delete
// For Update the teacher data --- institution Login required --teacher id required
router.delete('/delete/:id',fetchInstitutor,async(req,res)=>{

const teacherId = req.params['id'] ;
try {
    
    const iuserId = req.institutor.id ;
    const data = await TeacherTeams.findById({_id:iuserId})
    if(!data){
        return res.status(404).json({success:false , msg:"Data not found!"})
    }
    await TeacherTeams.deleteOne({institude_id:iuserId ,_id :teacherId })

    res.status(202).json({success:true , msg:"Teacher Deleted SuccessFully !"})
} catch (error) {
    res.status(504).json({success:false, msg:"Internal Server Error Occured !"})
}
})



export default router;