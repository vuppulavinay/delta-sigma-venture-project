
import mongoose from "mongoose";
import express from "express";
import { createFormField, getFormFields } from "../controllers/customForm.controllers.js";

const router = express.Router();


router.post("/createformFields", createFormField);
router.get("/getCreatedFormFields", getFormFields);


export default router;

