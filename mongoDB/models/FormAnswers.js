import mongoose from "mongoose";

const { Schema } = mongoose;

const FormAnswersSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'Users._id' },

    solved: [
        {
            question_id: { type: Schema.Types.ObjectId, ref: 'quizeForm.questions.id' },
            choose: Boolean
        }
    ]


})
const FormAnswers = mongoose.model('formAnswers', FormAnswersSchema);
export default FormAnswers;
