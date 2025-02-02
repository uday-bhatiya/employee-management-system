import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied. No token provided."
        });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
}

export { authMiddleware }