import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "f25a9d62a6bff5d5e2e8e4daebfa86327d1b214f736dc2c5c38a863ff7ef7e0b";

// Middleware to authenticate the token
const authenticateToken = (req, res, next) => {
  // Get token from Authorization header (Bearer <token>)
  const token = req.header("Authorization")?.split(" ")[1];

  // If no token returning an error
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verifying the token to authorize the user
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

export default authenticateToken;
