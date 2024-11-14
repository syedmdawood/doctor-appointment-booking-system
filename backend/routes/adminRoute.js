// import express from 'express';
// import upload from "../middleware/multer.js"
// import { addDoctor, adminLogin, allDoctors } from '../controllers/adminController.js';

// import authAdmin from '../middleware/authAdmin.js';
// import { doctorAvailability } from '../controllers/doctorControllers.js';

// const adminRouter = express.Router();

// // Configure multer storage
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Set the destination for uploaded files
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname); // Set the file name
//     }
// });

// // Create multer instance with storage configuration
// const upload = multer({ storage: storage });

// adminRouter.post('/add-doctor', authAdmin, upload.single("image"), addDoctor);
// adminRouter.post('/login', adminLogin);
// adminRouter.get('/all-doctors', authAdmin, allDoctors);
// adminRouter.post('/change-availablity', authAdmin, doctorAvailability);

// export default adminRouter;




import express from 'express';
import upload from "../middleware/multer.js"
import { addDoctor, adminDashboard, adminLogin, allDoctors, appointmentCancel, appointmentsAdmin } from '../controllers/adminController.js';
import authAdmin from '../middleware/authAdmin.js';
import { chnageAvailability } from '../controllers/doctorControllers.js';

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single('image'), addDoctor)
adminRouter.post("/login", adminLogin)
adminRouter.post('/all-doctors', authAdmin, allDoctors)
adminRouter.post('/change-availability', authAdmin, chnageAvailability)
adminRouter.get("/appointments", authAdmin, appointmentsAdmin)
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel)
adminRouter.get("/dashboard", authAdmin, adminDashboard)


export default adminRouter;