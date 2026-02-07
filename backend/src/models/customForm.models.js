import mongoose, { Schema } from 'mongoose';
const customFormSchema = new Schema({
    label: {
        type: String,
        required: true
    },
    fieldName: {
        type: String,
        required: true
    },
    fieldType: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)
const CustomForm = mongoose.model("CustomForm", customFormSchema);
export default CustomForm;