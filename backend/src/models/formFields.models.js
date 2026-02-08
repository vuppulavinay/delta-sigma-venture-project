
import mongoose, { Schema } from "mongoose";



const formFieldsSchema = new Schema({
    fields: {
        type: Map,
        of: String
    }
}, { timestamps: true });

const FormFields = mongoose.model("FormFields", formFieldsSchema);

export default FormFields;