import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log("Database Connected"))
    await mongoose.connect(`${process.env.MONGO_URI}`)

}

export default connectDB;

// Do not use '@' symbol in your databse user's password else it will show an error.