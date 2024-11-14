import express from 'express'
import { appointmentCancel, appointmentCompleted, appointmentsDoctor, doctorDashboard, doctorProfile, doctorsList, loginDoctor, updateDoctorProfile } from '../controllers/doctorControllers.js'
import authDoctor from '../middleware/authDoctor.js'



const doctorRouter = express.Router()


doctorRouter.get('/list', doctorsList)
doctorRouter.post("/login", loginDoctor)
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor)
doctorRouter.post("/appointment-cancel", authDoctor, appointmentCancel)
doctorRouter.post("/appointment-complete", authDoctor, appointmentCompleted)
doctorRouter.get("/dashboard", authDoctor, doctorDashboard)
doctorRouter.get("/profile", authDoctor, doctorProfile)
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile)



export default doctorRouter