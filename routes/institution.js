import express from 'express'
import { Institution } from '../mongoDB/models/index.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config()
const router = express.Router();

// Route 1: api/v1/institution  For Admin
router.get('/', async (req, res) => {
    try {


        const ty = await Institution.find()

        res.status(200).json({ success: true, data: ty })
    } catch (error) {
        res.status(500).json({ success: false, msg: "Internal server Error!" })
    }
});

// Route 2 : api/v1/institution/createi
// EXAMPLE DATA ARE :=>
// {
//     "name": "Gamma",
//     "password": "321321dsf",
//      "email":"harish@gamil.com"
//     "address": ["indhra gandhi nagar", "nagpur", "440017"],
//     "social_links": [
//         {
//             "type_link": "youtube", "description": "this is my link"
//         }
//     ],
//      "teachers_teams":[]
// }  
router.post('/create',
    [
        body('name', "Please Enter the valid name").isLength({ min: 3 }),
        body('email', "incorrect Email ").isEmail(),
        body('password', "Please enter the Strong password , which has minimum length is 5").isLength({ min: 5 }),
        body('address', "Enter the Address in Array Format").isArray(),
        body('social_links', "Please Write the Object inside the Array").isArray(),

    ],
    async (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, msg: errors.array() })
        }
        const data = req.body;
        const { name, email, password } = data;
        try {
            let user = await Institution.findOne({ email: email } && { name: name });
            if (user) {
                // when name or email are present inside the data base then execute
                return res.status(402).json({ success: false, msg: "This email or name already exists!" });
            }
            const salt = 10
            const secPass = await bcrypt.hash(password, salt)

            // For save the date inside the database
            const saveData = await Institution.create({ ...data, password: secPass });
            await saveData.save();


            // For send the json webToken to the user 
            const dataSend = {
                institutor: {
                    id: saveData._id,
                }
            }
            const authToken = jwt.sign(dataSend, process.env.VITE_JSION_SECRET)

            res.status(202).json({ success: true, authToken: authToken })

        } catch (error) {
            res.status(500).json({ success: false, msg: "Internal server Error!" })
        }


    });

//Route 3: api/v2/institution/authenticate  
router.post('/login',
    [
        body('email', "Please Enter the valid Email").isEmail(),
        body('password', "password can not be blank").exists()
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ success: false, msg: errors.array() })
        }
        // const data = req.body ;
        const { email, password } = req.body;

        try {
            
        
        // For check the email is Exists or not !
        let iuser = await Institution.findOne({ email });
        if (!iuser) {
            return res.status(404).json({ success: false, msg: "Invalid Credential!" })
        }
        const compare = await bcrypt.compare(password, iuser.password);
        if (!compare) {
            return res.status(404).json({ success: false, msg: "Inavalid Credential !" })
        }

        const sendData = {
            institutor: {
                id: iuser._id,
            }
        }
        const authtoken = jwt.sign(sendData, process.env.VITE_JSION_SECRET);
        res.status(206).json({ success: true, authtoken: authtoken })
    } catch (error) {
        res.status(504).json({success:false ,msg:"Internal Server Error Occured"})    
    }
    });

    












export default router;
