import dotenv from 'dotenv'
import express from "express";
import cors from "cors";
import { connectDB } from './src/config/connectDB.js';

dotenv.config({});

import createFormFieldRoute from "./src/routes/userForm.routes.js";
import createUserRoute from "./src/routes/formFields.routes.js";
const app = express();
app.use(express.json());


connectDB();
app.use(cors({
    "origin": ["http://localhost:3000",
        "https://shiny-horse-dd2420.netlify.app"
    ],
    // "origin":"*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    //   "preflightContinue": false,
    //   "optionsSuccessStatus": 204
}))

app.use("/api/users", createFormFieldRoute);
app.use("/api/users", createUserRoute);

app.get("/", (req, res) => {
    res.send("Hello World");
    res.end();
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})