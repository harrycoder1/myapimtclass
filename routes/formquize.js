import express from 'express';
import { fetchInstitutor } from '../middleware/index.js';
import { FormQuize } from '../mongoDB/models/index.js';
import { body ,validationResult } from 'express-validator';
const router = express.Router();
// Route 1 :Url :=> GET http://localhost:8080/api/v1/institution/form/
// For showing all Routes all Forms for institutor id
router.get("/",fetchInstitutor, async (req, res) => {

    try {
        const iuserId = req.institutor.id ;
        const data = await FormQuize.find({institude_id:iuserId}) ;

        // const age = Math.floor((Date.now() - data.age) / (1000 * 3600 * 24 * 365))
        res.status(200).json({ success: true, data: data  })
    } catch (error) {
        res.status(500).json("Internal Server Error Occured !")
    }
})

// Route 1.1 :SHOW the  perticular form by id  -- institutor login required -- form Id required
// http://localhost:8080/api/v1/institution/form/644c0eb42ffed811a293ed49
router.get('/:id',fetchInstitutor , async(req,res)=>{
    const formId = req.params['id'];

    const isuerId = req.institutor.id ;
try {
const data = await FormQuize.findOne({_id:formId , institude_id:isuerId})
if(!data){
    return res.status(404).json({success:false , msg:"Invalid Form id or institutor ID"})
}
    res.status(200).json({success:true , data:data})
}catch(error){
    res.status(504).json({success:false,msg:"Internal Server Error Occured"})
}
    
})





// Route 2 :POST http://localhost:8080/api/v1/institution/form/createform 
// For ADD the Forms  --- institution Login required

router.post('/createform',fetchInstitutor,
[
    body('title',"Minimum Length of Title").isLength({min:3}),
    body('description',"Description should be minimun lenght is 10").isLength({min:10}),
    body('formMakerEmail',"Invalid Email").isEmail(),
    body('questions',"Question should be in Array Form").isArray()

]

,async(req,res)=>{

    const erorrs = validationResult(req);
    if(!erorrs.isEmpty()){
        return res.status(404).json({success:false , msg:erorrs.array()})
    }
    const iuserId = req.institutor.id ;
    const data = req.body
    try{
    const check  = await FormQuize.findOne({title:data.title})
    if(check){
        return res.status(404).json({success:false ,msg:"This Title are Already Exists ,Please Change the title Of the Form"})
    }
    // "institude_id"
    // For adding the into the DB 
    await FormQuize.create({...data ,institude_id:iuserId }) &&
    res.status(202).json({success:true ,msg:"Form created SuccessFully"})
    }catch(error){
        res.status(504).json({success:false,msg:"Internal Server Error Occured"})
    }
})

// Route 3 :PUT http://localhost:8080/api/v1/institution/form/update

// For update the Forms  --- institution Login required -- _id of form required

router.put('/update/:id' ,
[
    body('title',"Title can not be Empty").isLength({min:3}),
    body('description',"Description should be minimun lenght is 10").isLength({min:10}),
    body('formMakerEmail',"Invalid Email").isEmail(),
    // body('questions',"Question should be in Array Form").isArray()

]
, fetchInstitutor,async(req,res)=>{
    const erorrs = validationResult(req);
    if(!erorrs.isEmpty()){
        return res.status(404).json({success:false , msg:erorrs.array()})
    }
    const formId  =req.params['id'] ; 
    const iuserId = req.institutor.id
    try {
        
   
const data = req.body ;
    const check  = await FormQuize.findById({_id:formId , iuserId})
    if(!check){
        return res.status(404).json({success:false , msg:"Invalid Form id or Institutor Id"})
    }
    await FormQuize.updateOne({_id:formId},data) &&
    res.status(200).json({success:true , msg:"update form"})
} catch (error) {
 res.status(504).json({success:true , msg:"Internal Server Error Occured !"})       
}
} )
// Create Route For Update Qustion inside the form

// Route 4: Deleting the Form
// DELETE http://localhost:8080/api/v1/institution/form/delete

// For Delete the Forms  --- institution Login required -- _id of form required

router.delete('/delete/:id' ,fetchInstitutor , async(req,res)=>{

try{
const formId = req.params['id']
const iuserId = req.institutor.id

const check =  await FormQuize.findOne({_id:formId , institude_id:iuserId})

if(!check){
    return res.status(404).json({success:false , msg:"Invalid Form id or Institutor Id"})
}
 
    await FormQuize.deleteOne({_id:formId , institude_id:iuserId}) &&
res.status(200).json({success:true ,msg:"Form are deleted SuccessFully !"}) 

} catch (error) {
    res.status(504).json({success:true , msg:"Internal Server Error Occured !"})       
   }
})


export default router