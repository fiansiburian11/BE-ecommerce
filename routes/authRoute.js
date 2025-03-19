import express from "express";
import { loginUser, registerUser, getCurrentUser, logoutUser } from "../controller/authController.js";
import { protectedMiddleware } from "../middleware/authMiddleware.js";
const route = express();

//post register
route.post("/register", registerUser);

//post login
route.post("/login", loginUser);

//get user
route.get("/getuser", protectedMiddleware, getCurrentUser);

//get Logout
route.get("/logout", protectedMiddleware, logoutUser);

export default route;
