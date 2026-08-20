const mongoose = require("mongoose");
const validate = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 50,
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
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return validate.isEmail(value) && value.endsWith("@gmail.com");
        },
        message: "Please enter a valid Gmail address",
      },
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: function (value) {
          return validate.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          });
        },
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      },
    },

    gender: {
      type: String,
      required: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not valid!");
        }
      },
    },

    skills: {
      type: [String],
      validate: {
        validator: function (arr) {
          return arr.length <= 10;
        },
        message: "Maximum 10 skills are allowed!",
      },
    },

    age: {
      type: Number,
    },
  },
  { timestamps: true },
);

UserSchema.index({ firstName: 1, lastName: 1 });

UserSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

UserSchema.methods.validatePassword = async function (generatePasswordByUser) {
  const user = this;
  const hashPassword = user.password;
  const isValidatePassword = await bcrypt.compare(
    generatePasswordByUser,
    hashPassword,
  );
  return isValidatePassword;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
