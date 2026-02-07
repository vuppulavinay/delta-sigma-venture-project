

import mongoose from "mongoose";
import express from "express";
import { createUsersFn, updateUsers, getUsers ,deleteUsers} from "../controllers/formFields.controllers.js";

const router = express.Router();


router.post("/createUsers", createUsersFn);
router.put("/updateUsers/:id", updateUsers);
router.get("/getUsers", getUsers);
router.delete("/deleteUsers/:id", deleteUsers);


export default router;