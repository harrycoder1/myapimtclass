import mongoose from "mongoose";
const { Schema } = mongoose

const FormSchema = new Schema({
    institude_id: {
        type: Schema.Types.ObjectId,
        ref: 'institute'
    },
    date: {
        type: Date,
        default: Date.now,
    },
    title: { type: String },
    description: { type: String },
    formMakerEmail: { type: String },
    questions: [
        {

            queMsg: { type: String },
            answers: [
                { value: { type: String }, correct: { type: Boolean } }
            ]
        }
    ]

});

const FormQuize = mongoose.model('quizeForm', FormSchema);
export default FormQuize;

// Institude_id:”fds”
// quizTitle:string
// Id:unique
// descrition :text
// emailOfowner:email
// Questions :arrary = [
// {id:1 , questionMessage = “this is message”,
// answers{ {value:10 ,correct:true/false},
// {value:20 ,correct:true/false },
// {value:30 ,correct:true/false },
// {value:560 ,correct:true/false },
// }
// {id:1 , questionMessage = “this is message”,
// answers:{ {value:10 ,correct:true/false},
// {value:20 ,correct:true/false },
// {value:30 ,correct:true/false },
// {value:560 ,correct:true/false },
// }
// } ] ;
