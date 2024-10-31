import doctorModel from "../models/doctorModel.js";

// Controller to toggle doctor availability
// const doctorAvailability = async (req, res) => {
//     try {
//         const { docId } = req.body;

//         // Check if docId is provided
//         if (!docId) {
//             return res.status(400).json({ success: false, message: "Doctor ID is required." });
//         }

//         // Fetch doctor data
//         const docData = await doctorModel.findById(docId);

//         // If doctor doesn't exist
//         if (!docData) {
//             return res.status(404).json({ success: false, message: "Doctor not found." });
//         }

//         // Toggle availability
//         await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });

//         // Respond with success
//         res.status(200).json({ success: true, message: "Availability status changed successfully." });
//     } catch (error) {
//         console.error("Error changing doctor availability:", error);
//         res.status(500).json({ success: false, message: "Internal server error. Please try again later." });
//     }
// };

// // Controller to get list of doctors
// const doctorsList = async (req, res) => {
//     try {
//         // Fetch all doctors excluding sensitive fields like password and email
//         const doctors = await doctorModel.find({}).select('-password -email');

//         // If no doctors found
//         if (!doctors || doctors.length === 0) {
//             return res.status(404).json({ success: false, message: "No doctors found." });
//         }

//         // Respond with doctors data
//         res.status(200).json({ success: true, doctors });
//     } catch (error) {
//         console.error("Error fetching doctors list:", error);
//         res.status(500).json({ success: false, message: "Internal server error. Please try again later." });
//     }
// };

// export { doctorAvailability, doctorsList };



const chnageAvailability = async (req, res) => {
    try {

        const { docId } = req.body

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: "Availability Chnage" })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


const doctorsList = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select("-password")
        res.json({ success: true, doctors })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


export { chnageAvailability, doctorsList }