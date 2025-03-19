import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name wajib diisi"],
    unique: [true, "name product sudah digunakan"],
  },
  category: {
    type: String,
    enum: ["celana", "baju", "sepatu"],
    required: [true, "category wajib diisi"],
  },
  description: {
    type: String,
    required: [true, "description wajib diisi"],
  },
  image: {
    type: String,
    default: null,
  },
  price: {
    type: Number,
    required: [true, "price wajib diisi"],
  },
  stock: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;