
import FormFields from "../models/formFields.models.js";

export const createUsersFn = async (req, res) => {
    try {
        const userObj = req.body;
        let user = await FormFields.create(userObj);
        return res.status(201).json({ message: "User created successfully", data: user });

    } catch (error) {
        return res.status(500).json({ message: "Error creating user", error: error.message });
    }

}

export const updateUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const userObj = req.body;
        let isalreadyExist = await FormFields.findById({ _id: id });
        if (isalreadyExist) {
            let updatedUserInfo = await FormFields.findByIdAndUpdate({ _id: id }, userObj, {
                new: true,
            });
            return res.status(200).json({ message: "User info updated successfully", data: updatedUserInfo });
        } else {
            return res.status(401).json({ message: "Invalid userId", error: error.message });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error creating user", error: error.message });
    }

}

export const getUsers = async (req, res) => {
    try {
        let userList = await FormFields.find({}, { __v: 0, createdAt: 0, updatedAt: 0 });
        return res.status(200).json({ message: "Users fetched successfully", data: userList });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching users", error: error.message });
    }
}


export const deleteUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const userObj = req.body;
        let isalreadyExist = await FormFields.findById({ _id: id });
        if (isalreadyExist) {
            await FormFields.findByIdAndDelete({ _id: id }, userObj, {
                new: true,
            });
            return res.status(200).json({ message: "User deleted successfully" });
        } else {
            return res.status(401).json({ message: "Invalid userId", error: error.message });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error creating user", error: error.message });
    }

}