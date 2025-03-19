export const notFound = (req, res, next) => {
  const error = new Error(`path not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  let resStatusCode = res.statusCode === 200 ? 500 : res.statusCode;

  let message = err.message;

  if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");

    resStatusCode = 400;
  }

  res.status(resStatusCode).json({
    message,
    stack: err.stack,
  });
};

export const validateProductUpdate = (req, res, next) => {
  const { name, category, price } = req.body;
  let missingFields = [];

  if (!name) missingFields.push("name");
  if (!category) missingFields.push("category");
  if (!price) missingFields.push("price");
  if (!req.file) missingFields.push("image");

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Field ${missingFields.join(", ")} harus diisi!`,
    });
  }

  next();
};
