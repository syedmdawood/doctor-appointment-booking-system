import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js"

import dotenv from 'dotenv';
import doctorRouter from "./routes/doctorRoute.js"
import userRouter from "./routes/userRoutes.js"
dotenv.config();


// app config
const app = express()
const port = process.env.PORT || 4000
connectDB();
connectCloudinary();

// middlewares
app.use(express.json())
app.use(cors())


// api endpoint
app.use("/api/admin", adminRouter)


app.use("/api/doctor", doctorRouter)
app.use("/api/user", userRouter)


app.get("/", (req, res) => {
    res.send("Api Working Properly")
})


app.listen(port, () => {
    console.log(`Server is listening on ${port}`);

})