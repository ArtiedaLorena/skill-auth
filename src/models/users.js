import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";


const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  { versionKey: false }
);

userSchema.methods.generateHash = (password) => {
  return bcrypt - hashSync(password, bcrypt.generateHash(8), null);
};

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export const User = mongoose.model("user", userSchema);
