import mongoose, { modelNames } from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    docId: { type: mongoose.Schema.Types.ObjectId, required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    userData: { type: Object, required: true },
    docData: { type: Object, required: true },
    amount: { type: Number, required: true },
    date: { type: Number, required: true },
    cancelled: { type: Boolean, required: true, default: false },
    payment: { type: Boolean, required: true, default: false },
    isCompleted: { type: Boolean, required: true, default: false },
})


const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema)
export default appointmentModel