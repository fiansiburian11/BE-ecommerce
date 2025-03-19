import mongoose from "mongoose";

const singleProducts = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: [true, "Total wajib diisi"],
  },
  status: {
    type: String,
    enum: ["pending", "failed", "succes"],
    default: "pending",
  },
  itemsDetail: [singleProducts],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: {
    type: String,
    required: [true, "firstname wajib diisi"],
  },
  lastName: {
    type: String,
    required: [true, "lastname wajib diisi"],
  },
  phone: {
    type: String, //menggunakan string karena no indo diawali dari 0
    required: [true, "number phone wajib diisi"],
  },
  email: {
    type: String,
    required: [true, "email wajib diisi"],
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
