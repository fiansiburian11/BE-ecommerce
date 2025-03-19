import { asyncHandler } from "../middleware/asyncHandler.js";
import Product from "../models/productsModel.js";

export const CreateProducts = asyncHandler(async (req, res) => {
  const newProduct = await Product.create(req.body);

  return res.status(201).json({
    message: "Data Product berhasil ditambahkan",
    data: newProduct,
  });
});

export const AllProducts = asyncHandler(async (req, res) => {
  // Copy query parameters
  const queryObj = { ...req.query };

  // Fields yang harus diabaikan
  const excludeField = ["page", "limit", "name"];
  excludeField.forEach((field) => delete queryObj[field]);

  // Jika ada query name, gunakan regex untuk pencarian yang fleksibel
  if (req.query.name) {
    queryObj.name = { $regex: req.query.name, $options: "i" }; // Case insensitive
  }

  // Pagination Setup
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 30;
  const skip = (page - 1) * limit;

  // Mencari data produk dengan filter dan pagination
  const data = await Product.find(queryObj).skip(skip).limit(limit);

  // Menghitung total produk
  const totalProducts = await Product.countDocuments(queryObj);
  const totalPages = Math.ceil(totalProducts / limit);

  return res.status(200).json({
    message: "Get all products",
    currentPage: page,
    totalPages,
    totalProducts,
    data,
  });
});

export const DetailProducts = asyncHandler(async (req, res) => {
  const detailProduct = await Product.findById(req.params.id);

  return res.status(201).json({
    message: "get product by id",
    data: detailProduct,
  });
});

export const UpdateProducts = asyncHandler(async (req, res) => {
  const paramId = req.params.id;
  const updateProduct = await Product.findByIdAndUpdate(paramId, req.body, {
    runValidators: false,
    new: true,
  });

  return res.status(201).json({
    message: "update products succesfully",
    data: updateProduct,
  });
});

export const DeleteProducts = asyncHandler(async (req, res) => {
  const paramId = req.params.id;
  const deleteProduct = await Product.findByIdAndDelete(paramId);
  return await res.json({
    message: "delete products succesfully",
  });
});

export const FileUpload = asyncHandler(async (req, res) => {
  const file = req.file;

  if (!file) {
    res.status(400);
    throw new Error("Tidak Ada Gambar yang diuploads");
  }

  const fileName = file.filename;
  const pathFile = `/uploads/${fileName}`;

  res.status(201).json({
    message: "Gambar Berhasil di Upload",
    image: pathFile,
  });
});
