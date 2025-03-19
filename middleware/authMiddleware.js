import jwt from "jsonwebtoken";
import User from "../models/usersModel.js";

export const protectedMiddleware = async (req, res, next) => {
  const token = req.cookies.jwt; // Ambil token dari cookie

  if (!token) {
    return res.status(401).json({ message: "Not Authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not Authorized, token failed" });
  }
};

export const ownerMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "owner") {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as Owner");
  }
};
