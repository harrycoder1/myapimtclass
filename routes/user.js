import User from "../mongoDB/models/User.js";
import express from 'express'
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
// import  fetchUser from "../middleware/fetchUser.js";
import {fetchUser} from '../middleware/index.js'
// process.env.VITE_JSION_SECRET
dotenv.config();
const router = express.Router();



router.route('/').get(async (req, res) => {

    const rr = await User.find();

    res.status(200).json({ "suucess": rr })
})

// ROUTE 1 :Post : /api/v1/user/createuser  
router.post('/createuser',
    [
        body('name', "Please Enter the valid name").isLength({ min: 3 }),
        body('email', "incorrect Email ").isEmail(),
        body('password', "Please enter the Strong password , which has minimum length is 5").isLength({ min: 5 })
    ]

    , async (req, res) => {
        const errors = validationResult(req); //for check validation
        if (!errors.isEmpty()) {
            return res.status(400).json({ sucess: false, errors: errors.array() });
        }
        const data = req.body
        try {


            let user = await User.findOne({ "email": data.email })
            if (user) {
                return res.status(404).json({ "success": false, msg: "This email already exist !" })
            }

            // For converting the password into hash code
            const plainPass = data.password
            const saltRounds = 10;
            const secPass = await bcrypt.hash(plainPass, saltRounds)

            // for insert the data in the DB
            const dateInsert = await User.create({ ...data, password: secPass });
            await dateInsert.save() //Save the data into the DB
            const sendData = {
                user: {
                    id: dateInsert._id
                }
            }
            // generate web Token
            const authToken = jwt.sign(
                sendData
                , process.env.VITE_JSION_SECRET);

            res.status(200).json({ "suucess": true, authToken: authToken })


        } catch (error) {
            res.status(501).json({ success: false, msg: "internal Server Error OCcured !", error: error })
        }
    });
// ROUTE 2 : FOR AUTHENTICATION 
router.post("/login", [
    body('email', "invalid email").isEmail(),
    body('password', "Password is not Empty").isLength({ min: 2 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ sucess: false, errors: errors.array() });
    }
    const data = req.body
    try {




        let user = await User.findOne({ email: data.email });
        if (!user) {
            // when email is not exists!
            return res.status(404).json({ success: false, msg: "Inavalid Credential" })

        }
        const checkPassword = await bcrypt.compare(data.password, user.password)
        if (!checkPassword) {
            // when password is wrong
            return res.status(404).json({ success: false, msg: "Inavalid Credential" })
        }

        const sendData = {
            user: {
                id: user._id
            }
        }
        // For generate JSON webToken 
        const authToken = jwt.sign(sendData, process.env.VITE_JSION_SECRET)

        res.status(202).json({ success: true, authToken })



    } catch (error) {
        res.status(501).json({ success: false, msg: "internal Server Error OCcured !", error: error })

    }
});

// ROUTE 3 : GET ALL DATA OF USER  :  /api/v1/user/getuser  Login -requiredd

router.get('/getuser' ,fetchUser,async(req,res)=>{
    try {
        

    const userId = req.user.id 
const user =await User.findById(userId).select("-password")

    res.status(210).json({success:true , data:user})
} catch (error) {
   res.status(504).json({success:false , msg:"Internal server Error Occured"})
}

})

// Route 4 :DELETE USER :   api/v1/user/deleteuser 
router.delete('/deleteuser' , fetchUser,async(req,res)=>{
const userId = req.user.id ;
try {
await User.deleteOne({_id:userId});
res.status(202).json({sucess:true , msg:"Your Account deleted SuccessFully"})
} catch (error) {
   res.status(506).json({success:false , msg:"Internal Server Error Occured"}) 
}

})



export default router