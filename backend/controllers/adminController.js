

// API to add a doctor
// const addDoctor = async (req, res) => {
//     try {
//         const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
//         const imageFile = req.file;

//         // Log the request to help debug if fields are missing
//         console.log("Request body:", req.body);
//         console.log("Image file:", imageFile);

//         // Check for missing fields
//         if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Missing required details",
//                 missingFields: {
//                     name: !name,
//                     email: !email,
//                     password: !password,
//                     speciality: !speciality,
//                     degree: !degree,
//                     experience: !experience,
//                     about: !about,
//                     fees: !fees,
//                     address: !address,
//                     image: !imageFile
//                 }
//             });
//         }

//         // Validate email format
//         if (!validator.isEmail(email)) {
//             return res.status(400).json({ success: false, message: "Invalid email format" });
//         }

//         // Validate password strength
//         if (password.length < 8) {
//             return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
//         }

//         // Hash the doctor's password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Upload image to Cloudinary
//         const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
//         const imageUrl = imageUpload.secure_url;

//         // Prepare doctor data for saving
//         const doctorData = {
//             name,
//             email,
//             image: imageUrl,
//             password: hashedPassword,
//             speciality,
//             degree,
//             experience,
//             about,
//             fees,
//             address: JSON.parse(address),  // Assuming address is sent as JSON string
//             date: Date.now()
//         };

//         // Save the new doctor in the database
//         const newDoctor = new doctorModel(doctorData);
//         await newDoctor.save();

//         // Respond with success
//         res.status(201).json({ success: true, message: "Doctor added successfully" });

//     } catch (error) {
//         console.error("Error in addDoctor:", error);
//         res.status(500).json({
//             success: false,
//             message: "Internal server error. Please try again later."
//         });
//     }
// };

// // API for Admin login
// const adminLogin = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Validate admin credentials
//         if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
//             const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
//             res.status(200).json({ success: true, token });
//         } else {
//             res.status(401).json({ success: false, message: "Invalid credentials" });
//         }

//     } catch (error) {
//         console.error("Error in adminLogin:", error);
//         res.status(500).json({
//             success: false,
//             message: "Internal server error. Please try again later."
//         });
//     }
// };

// // API to get all doctors list for admin panel
// const allDoctors = async (req, res) => {
//     try {
//         // Fetch all doctors excluding passwords
//         const doctors = await doctorModel.find({}).select('-password');

//         if (!doctors || doctors.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No doctors found."
//             });
//         }

//         res.status(200).json({ success: true, doctors });

//     } catch (error) {
//         console.error("Error in allDoctors:", error);
//         res.status(500).json({
//             success: false,
//             message: "Internal server error. Please try again later."
//         });
//     }
// };

// export { addDoctor, adminLogin, allDoctors };

import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";


const addDoctor = async (req, res) => {

    try {

        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file

        // checking all data to add doctors
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(404).json({ success: false, message: "Missing Details" })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.status(404).json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password 
        if (password.length < 8) {
            return res.status(404).json({ success: false, message: "Password must be strong and at least 8 characters" })
        }

        // hasing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // up;oad image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.status(200).json({ success: true, message: "Doctor Added" })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


// api for admin login

const adminLogin = async (req, res) => {

    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({
                success: true,
                token
            })

        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

}


// Api to get all doctors list for admin panel
const allDoctors = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


// APi to get all appointments list
const appointmentsAdmin = async (req, res) => {
    try {

        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Api for  cancel the appointment 
const appointmentCancel = async (req, res) => {

    try {

        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // releasing doctor slot
        const { docId, slotDate, slotTime } = appointmentData
        const doctorData = await doctorModel.findById(docId)

        let slot_booked = doctorData.slot_booked
        slot_booked[slotDate] = slot_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slot_booked })

        res.status(200).json({ success: true, message: "Appointment Cancelled" })

    } catch (error) {
        console.error("Error in Caneling Appointment:", error);
        res.status(500).json({ success: false, message: "Failed to cancel appointment. Please try again." });
    }

}

// api to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {

        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            paitents: users.length,
            latestAppointment: appointments.reverse().slice(0, 5),
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}




export { addDoctor, adminLogin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard }