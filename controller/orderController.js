import { asyncHandler } from "../middleware/asyncHandler.js";
import Product from "../models/productsModel.js";
import Order from "../models/orderModel.js";

export const CreateOrder = asyncHandler(async (req, res) => {
  const { email, firstName, lastName, phone, cartItem } = req.body;

  if (!cartItem || cartItem.length < 1) {
    res.status(400);
    throw new Error("Keranjang masih kosong");
  }

  let orderItem = [];
  let total = 0;

  for (const cart of cartItem) {
    const productData = await Product.findOne({ _id: cart.product });

    if (!productData) {
      req.status(404);
      throw new Error("id product tidak ditemukan");
    }

    const { name, price, _id } = productData;

    const singleProduct = {
      name,
      quantity: cart.quantity,
      price,
      product: _id,
    };
    orderItem = [...orderItem, singleProduct];

    total += cart.quantity * price;
  }

  const order = await Order.create({
    itemsDetail: orderItem,
    total,
    firstName,
    lastName,
    email,
    phone,
    user: req.user.id,
  });

  return res.status(201).json({
    total,
    order,
    message: "Create Order Succesfully",
  });
});

export const AllOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  return res.status(200).json({
    message: "Tampil All Order ",
    data: orders,
  });
});

export const DetailOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  return res.status(200).json({
    message: "Detail Order Berhasil",
    data: order,
  });
});

export const CurrentUserOrder = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.user.id });

  return res.status(200).json({
    message: "Berhasil Tampil Current User Order Product",
    data: order
});
});
