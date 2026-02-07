
import mongoose, { Schema } from "mongoose";


const formFieldsSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    date: {
        type: String,
    }
}, { timestamps: true });

const FormFields = mongoose.model("FormFields", formFieldsSchema);

export default FormFields;