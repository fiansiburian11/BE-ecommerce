import express from "express";
import { CreateOrder, AllOrder, CurrentUserOrder, DetailOrder } from "../controller/orderController.js";
import { ownerMiddleware, protectedMiddleware } from "../middleware/authMiddleware.js";
const route = express.Router();

//create order user
route.post("/", protectedMiddleware,  CreateOrder);

//get all Order oleh owner
route.get("/", protectedMiddleware, ownerMiddleware, AllOrder);

//get order detail order oleh owner
route.get("/:id", protectedMiddleware, ownerMiddleware, DetailOrder);

//get current order oleh user
route.get("/current/order", protectedMiddleware, CurrentUserOrder);


export default route;
