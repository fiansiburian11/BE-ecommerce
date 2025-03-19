import express from "express";
import { CreateProducts, AllProducts, DetailProducts, UpdateProducts, DeleteProducts, FileUpload } from "../controller/productsController.js";
import { ownerMiddleware, protectedMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../utils/uploadFileHandler.js";
const route = express.Router();

//create product
route.post("/", protectedMiddleware, ownerMiddleware, CreateProducts);

//post file product
route.post("/file-upload", protectedMiddleware, ownerMiddleware, upload.single("image"), FileUpload);

//get all product
route.get("/", AllProducts);

//get product by id
route.get("/:id", DetailProducts);

//update product
route.put("/:id", protectedMiddleware, ownerMiddleware, UpdateProducts);

//delete product
route.delete("/:id", protectedMiddleware, ownerMiddleware, DeleteProducts);

export default route;
