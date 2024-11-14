import express from "express"
import { bookAppointment, cancelAppointment, getProfile, listAppointments, registerUser, updateProfile, userLogin } from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";
import upload from "../middleware/multer.js";



const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", userLogin)
userRouter.get("/get-profile", authUser, getProfile)
userRouter.post("/update-profile", upload.single('image'), authUser, updateProfile)
userRouter.post("/book-appointment", authUser, bookAppointment)
userRouter.get("/appointments", authUser, listAppointments)
userRouter.post("/cancel-appointment", authUser, cancelAppointment)



export default userRouter;