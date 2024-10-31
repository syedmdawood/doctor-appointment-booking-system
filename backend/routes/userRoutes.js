import express from "express"
import { registerUser, userLogin } from "../controllers/userController.js";



const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", userLogin)
// userRouter.post("/login", loginUser)
// userRouter.get("/get-profile", authUser, getProfile)
// userRouter.post("/update-profile", upload.single('image'), authUser, updateProfile)
// userRouter.post("/book-appointment/:docId", authUser, bookAppointment)
// userRouter.get("/appointments", authUser, listAppointments)
// userRouter.post("/cancel-appointment", authUser, cancelAppointment)


export default userRouter;