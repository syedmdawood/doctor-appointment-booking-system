// import multer from 'multer';
// import path from 'path';

// // Configure storage
// const storage = multer.diskStorage({
//     // Set the destination for uploaded files
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, '../uploads')); // Use the manual uploads directory
//     },

//     // Set the file name for the uploaded file
//     filename: (req, file, cb) => {
//         // Use Date.now() to make the file name unique and avoid overwriting
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// // Create multer instance using the storage configuration
// const upload = multer({ storage });

// export default upload;



import multer from "multer";
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
})

const upload = multer({ storage })

export default upload

