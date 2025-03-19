import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name wajib di isi"],
    unique: [true, "username sudah digunakan"],
  },
  email: {
    type: String,
    required: [true, "email wajib di isi"],
    unique: [true, "email sudah terdaftar"],
    validate: {
      validator: validator.isEmail,
      message: "format email salah, cth:example@gmail.com",
    },
  },
  password: {
    type: String,
    required: [true, "password wajib di isi"],
    minLength: [6, "password minimun 6 character"],
  },
  role: {
    type: String,
    enum: ["user", "owner"],
    default: "user",
  },
});

usersSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

usersSchema.methods.comparePassword = async function (reqBody) {
  return await bcrypt.compare(reqBody, this.password);
};

const User = mongoose.model("User", usersSchema);

export default User;
