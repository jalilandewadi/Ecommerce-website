const jwt = require("jsonwebtoken");
const user = require("../model/user.model");

//Middleware to protect routes
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);

      req.user = await user.findById(decoded.user.id).select("-password");
      next();
    } catch (error) {
      console.log("Token verification failed", error);
      res.status(400).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({
      message: "Not authorized no token provided",
    });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};

module.exports = { protect, admin };
