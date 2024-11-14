import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";


// API to register user
// const registerUser = async (req, res, next) => {
//     try {
//         const { name, email, password } = req.body;

//         // Check if all required fields are provided
//         if (!name || !email || !password) {
//             return res.status(400).json({ success: false, message: "Name, email, and password are required." });
//         }

//         // Validate email format
//         if (!validator.isEmail(email)) {
//             return res.status(400).json({ success: false, message: "Please provide a valid email address." });
//         }

//         // Validate password length
//         if (password.length < 8) {
//             return res.status(400).json({ success: false, message: "Password must be at least 8 characters long." });
//         }

//         // Check if the user already exists
//         const existingUser = await userModel.findOne({ email });
//         if (existingUser) {
//             return res.status(409).json({ success: false, message: "User already exists with this email." });
//         }

//         // Hash the user's password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Prepare new user data
//         const userData = { name, email, password: hashedPassword };

//         // Save new user to the database
//         const newUser = new userModel(userData);
//         const user = await newUser.save();

//         // Generate a JWT token for the user
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         // Return success response with the token
//         res.status(201).json({ success: true, token });
//     } catch (error) {
//         console.error("Error during user registration:", error);
//         res.status(500).json({ success: false, message: "Something went wrong during registration. Please try again." });
//     }
// };

// // API for user login
// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Check if email and password are provided
//         if (!email || !password) {
//             return res.status(400).json({ success: false, message: "Email and password are required." });
//         }

//         const user = await userModel.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found. Please check your email." });
//         }

//         // Compare the provided password with the stored hashed password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ success: false, message: "Invalid email or password." });
//         }

//         // Generate a JWT token
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.status(200).json({ success: true, token });
//     } catch (error) {
//         console.error("Error during user login:", error);
//         res.status(500).json({ success: false, message: "Something went wrong during login. Please try again." });
//     }
// };

// // API to get user profile data
// const getProfile = async (req, res) => {
//     try {
//         const { userId } = req.body;
//         if (!userId) {
//             return res.status(400).json({ success: false, message: "User ID is required." });
//         }

//         const userData = await userModel.findById(userId).select('-password');
//         if (!userData) {
//             return res.status(404).json({ success: false, message: "User not found." });
//         }

//         res.status(200).json({ success: true, userData });
//     } catch (error) {
//         console.error("Error fetching user profile:", error);
//         res.status(500).json({ success: false, message: "Unable to fetch user profile at this time." });
//     }
// };

// // API to update user profile
// const updateProfile = async (req, res) => {
//     try {
//         const { userId, name, phone, address, dob, gender } = req.body;
//         const imageFile = req.file; // This will still be provided by multer

//         // Validate required fields
//         if (!userId || !name || !phone || !dob || !gender) {
//             return res.status(400).json({ success: false, message: "All fields (name, phone, DOB, gender) are required." });
//         }

//         // Update user data excluding image
//         const updatedUser = await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender }, { new: true });

//         if (!updatedUser) {
//             return res.status(404).json({ success: false, message: "User not found." });
//         }

//         if (imageFile) {
//             // Upload image to Cloudinary
//             const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
//             const imageUrl = imageUpload.secure_url;

//             // Update user's image in the database
//             await userModel.findByIdAndUpdate(userId, { image: imageUrl });
//         }

//         res.status(200).json({ success: true, message: "Profile updated successfully." });
//     } catch (error) {
//         console.error("Error updating user profile:", error);
//         res.status(500).json({ success: false, message: "Failed to update profile. Please try again." });
//     }
// };



// // API to book Appointment
// const bookAppointment = async (req, res) => {
//     try {
//         const { userId, docId, slotDate, slotTime } = req.body;

//         // Log the received docId
//         console.log("Received docId in backend:", docId);

//         // Check if doctor exists
//         const docData = await doctorModel.findById(docId).select('-password');
//         if (!docData) {
//             return res.status(404).json({ success: false, message: "Doctor not found." });
//         }

//         // Check if doctor is available
//         if (!docData.available) {
//             return res.status(400).json({ success: false, message: "Doctor not available." });
//         }

//         // Check if the user has already booked an appointment with this doctor at the same date and time
//         const existingAppointment = await appointmentModel.findOne({
//             userId,
//             docId, // Ensure we're only looking for this doctor's appointments
//             slotDate,
//             slotTime,
//         });

//         if (existingAppointment) {
//             return res.status(400).json({ success: false, message: "You have already booked this slot with the selected doctor." });
//         }

//         let slot_booked = docData.slot_booked || {};
//         console.log("Current booked slots:", slot_booked); // Log current booked slots for debugging

//         // Check for slot availability
//         if (slot_booked[slotDate]) {
//             if (slot_booked[slotDate].includes(slotTime)) {
//                 return res.status(400).json({ success: false, message: "Slot not available." }); // Return if the slot is already booked for this doctor
//             } else {
//                 slot_booked[slotDate].push(slotTime); // Push new slot if available
//             }
//         } else {
//             slot_booked[slotDate] = [slotTime]; // Initialize the slots if not present
//         }

//         const userData = await userModel.findById(userId).select('-password');
//         if (!userData) {
//             return res.status(404).json({ success: false, message: "User not found." });
//         }

//         // Prepare appointment data
//         const appointmentData = {
//             userId,
//             docId,
//             userData,
//             docData: { ...docData.toObject(), slots_booked: undefined }, // Exclude booked slots
//             amount: docData.fees,
//             slotDate,
//             slotTime,
//             date: Date.now(),
//         };

//         // Save the appointment
//         const newAppointment = new appointmentModel(appointmentData);
//         await newAppointment.save();

//         // Update the doctor's booked slots
//         await doctorModel.findByIdAndUpdate(docId, { slot_booked });

//         res.status(200).json({ success: true, message: "Appointment booked successfully." });
//     } catch (error) {
//         console.error("Error in Booking Appointment:", error);
//         res.status(500).json({ success: false, message: "Failed to book appointment. Please try again." });
//     }
// };


// // api to get user appointment fron database to frontend page my appointment page

// const listAppointments = async (req, res) => {

//     try {

//         const { userId } = req.body
//         const appointments = await appointmentModel.find({ userId })

//         res.status(200).json({ success: true, appointments })

//     } catch (error) {
//         console.error("Error in Showing Appointment:", error);
//         res.status(500).json({ success: false, message: "Failed to show appointment. Please try again." });
//     }

// }

// // APi to cancel the appointment
// const cancelAppointment = async (req, res) => {

//     try {

//         const { appointmentId, userId } = req.body
//         const appointmentData = await appointmentModel.findById(appointmentId)

//         // Verify appointment user
//         if (appointmentData.userId.toString() !== userId.toString()) {
//             return res.status(403).json({ success: false, message: "Unauthorized action" });
//         }


//         await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

//         // releasing doctor slot
//         const { docId, slotDate, slotTime } = appointmentData
//         const doctorData = await doctorModel.findById(docId)

//         let slot_booked = doctorData.slot_booked
//         slot_booked[slotDate] = slot_booked[slotDate].filter(e => e !== slotTime)

//         await doctorModel.findByIdAndUpdate(docId, { slot_booked })

//         res.status(200).json({ success: true, message: "Appointment Cancelled" })

//     } catch (error) {
//         console.error("Error in Caneling Appointment:", error);
//         res.status(500).json({ success: false, message: "Failed to cancel appointment. Please try again." });
//     }

// }




// export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointments, cancelAppointment };


// Api to regiter user


const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing Details"
            });
        }

        // validating user email
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Enter a valid email"
            });
        }

        // validating user password
        if (password.lenght < 8) {
            return res.status(400).json({
                success: false,
                message: "Enter a strong password"
            });
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//Api for User Login
const userLogin = async (req, res) => {
    try {

        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
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

//Api for user profile data 
const getProfile = async (req, res) => {
    try {

        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// APi to uldate profile
const updateProfile = async (req, res) => {
    try {

        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !gender || !dob) {
            return res.status(400).json({
                success: false,
                message: "data missing"
            });
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

        if (imageFile) {
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageUrl = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageUrl })
        }

        res.json({ success: true, message: "Profile Updated" })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Api to book appointment
const bookAppointment = async (req, res) => {
    try {

        const { userId, docId, slotDate, slotTime } = req.body
        const docData = await doctorModel.findById(docId).select('-password')

        if (!docData.available) {
            res.json({ success: false, message: "Doctor not available" })
        }

        let slot_booked = docData.slot_booked
        // checking for slot availability
        if (slot_booked[slotDate]) {
            if (slot_booked[slotDate].includes(slotTime)) {
                res.json({ success: false, message: "Slot not available" })
            } else {
                slot_booked[slotDate].push(slotTime)
            }
        } else {
            slot_booked[slotDate] = []
            slot_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        delete docData.slot_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotDate,
            slotTime,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slots data in docData 
        await doctorModel.findByIdAndUpdate(docId, { slot_booked })

        res.json({ success: true, message: "Appointment Booked" })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// APi to get all user appointment for frontend page
const listAppointments = async (req, res) => {
    try {

        const { userId } = req.body
        const appointments = await appointmentModel.find({ userId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}



const cancelAppointment = async (req, res) => {

    try {

        const { appointmentId, userId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        // Verify appointment user
        if (appointmentData.userId.toString() !== userId.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized action" });
        }


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

export { registerUser, userLogin, getProfile, updateProfile, bookAppointment, listAppointments, cancelAppointment }