// import jwt from "jsonwebtoken"
// // admin authentication middleware
// const authAdmin = async (req, res, next) => {
//     try {
//         const { atoken } = req.headers
//         if (!atoken) {
//             res.json({ success: false, messgae: "Not Authorized Login Again" })
//         }
//         const token_decoded = jwt.verify(atoken, process.env.JWT_SECRET)
//         if (token_decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
//             res.json({ success: false, messgae: "Not Authorized Login Again" })
//         }
//         next()
//     } catch (error) {
//         console.log(error);
//         res.json({
//             success: false, message: error.message
//         })
//     }
// }
// export default authAdmin

import jwt from "jsonwebtoken"

// admin authentication middleware

const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers;
        if (!atoken) {
            return res.status(401).json({ success: false, message: "Not authorized. Please log in again." });
        }
        const token_decoded = jwt.verify(atoken, process.env.JWT_SECRET)

        if (token_decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(200).json({ success: false, message: "Login Successfully" });
        }

        next()

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export default authAdmin