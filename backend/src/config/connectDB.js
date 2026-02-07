import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_DB_URL}`);
        console.log("Connected to database successfully");
    } catch (error) {
        console.log("Error connecting to database", error);
    }
}