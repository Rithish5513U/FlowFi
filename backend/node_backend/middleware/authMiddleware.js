const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied. Invalid token format." });
    }

    const token = authHeader.split(" ")[1]; 

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        if (!req.user.email) {
            return res.status(401).json({ error: "Unauthorized - No user email in token" });
        }
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};
