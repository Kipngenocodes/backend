import jwt from 'jsonwebtoken';  


 function authMiddleware(req, res, next) {
    // Get the token from the Authorization header
    const token = req.headers['authorization'];

    // If no token is provided, send a 401 Unauthorized status
    if (!token) {
        return res.status(401).json({ message: 'No token provided!' });
    }

    // Verify the token using the secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // If the token is invalid, send a 403 Forbidden status
            return res.status(403).json({ message: 'Failed to authenticate token!' });
        }

        // If the token is valid, attach the user ID to the request object
        req.user = { id: decoded.id };
        next(); // Call the next middleware or route handler
    });
}
export default authMiddleware;