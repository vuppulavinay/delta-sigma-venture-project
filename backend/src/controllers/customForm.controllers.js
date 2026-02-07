import CustomForm from "../../src/models/customForm.models.js";

export const createFormField = async (req, res) => {
    try {
        const formField = req.body;
        await CustomForm.create(formField);
        res.status(201).json({ message: "Form field is created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating form field", error: error.message });
    }
}

export const getFormFields = async (req, res) => {
    try {
        let list = await CustomForm.find({});
        return res.status(200).json({ message: "Something went wrong while fetching form Fields", data: list });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong while fetching form Fields", error: error.message });
    }
}