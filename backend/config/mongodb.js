import mongoose, { connect } from "mongoose";

// using this code we willconnect db to project

const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log("Database connected"));
    await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)
}


export default connectDB;