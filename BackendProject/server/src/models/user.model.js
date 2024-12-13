import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchma = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    avtar: {
      type: String, // cloudnary url
      required: true,
    },
    email: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    pasword: {
      type: String,
      required: [true, "Password is requiered"],
      minlength: 8,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// encryption and compare of the password for authentication and security purposes
userSchma.pre("save", async function (next) {
  // if (this.isMounted("pasword")) {
  //     this.pasword = bcrypt.hash(this.pasword, 8)
  //     next();
  // }

  if (!this.isMounted("password")) return next();
  this.password = bcrypt.hash(this.password, 10);
  next();
});

userSchma.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchma.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};
userSchma.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_SECRET_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchma);
