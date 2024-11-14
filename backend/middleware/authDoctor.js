

import jwt from "jsonwebtoken"

// doctor authentication middleware

const authDoctor = async (req, res, next) => {
    try {
        const { dtoken } = req.headers;
        if (!dtoken) {
            return res.status(401).json({ success: false, message: "Not authorized. Please log in again." });
        }
        const token_decoded = jwt.verify(dtoken, process.env.JWT_SECRET)

        req.body.docId = token_decoded.id

        next()

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export default authDoctor
