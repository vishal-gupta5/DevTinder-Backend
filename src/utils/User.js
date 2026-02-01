const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: 4,
      maxLength: 50,
      required: true,
    },
    lastName: {
      type: String,
      minLength: 4,
      maxLength: 50,
    },
    emailId: {
      type: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        required: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error(`Invalid Email Address: ${value}`);
          }
        },
      },
    },
    passsword: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(`Enter a Strong Password: ${value}`);
        }
      },
    },
    age: {
      type: String,
      min: 18,
    },
    gender: {
      type: String,
      required: true,
      validate(value) {
        if (["male", "female", "others"].includes(value)) {
          throw new Error("Gender Data is not valid!");
        }
      },
    },
    userId: {
      type: String,
    },
    photoURL: {
      type: String,
      default: "https://37assets.37signals.com/svn/765-default-avatar.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error(`Invalid Photo URL:- ${value}`);
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about of the user!",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
