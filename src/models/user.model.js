const mongoose = require("mongoose");
const { trim } = require("validator");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(email)) {
          throw new Error(`Please enter the valid Email: - ${value}`);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter the strong password");
        }
      },
    },
    gender: {
      type: String,
    },
    skills: {
      type: [String],
    },
    photoURL: {
      type: String,
      default:
        "https://png.pngtree.com/png-clipart/20200701/original/pngtree-character-default-avatar-png-image_5407167.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error(`Invalid photo URL: ${value}`);
        }
      },
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
