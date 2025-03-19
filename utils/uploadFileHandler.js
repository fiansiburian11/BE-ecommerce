import multer from "multer";
import path from "path";

const FILE_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValidate = FILE_TYPE[file.mimetype];
    let uploadError = new Error("Image wajib berformat JPG/JPEG/PNG");

    if (isValidate) {
      uploadError = null;
    }

    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const unique = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, unique);
  },
});

export const upload = multer({ storage: storage });
