const mongoose = require("mongoose");
const validator = require("validator");
const isURL = require("validator/lib/isURL");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, maxlength: 50, minlength: 2 },
    lastName: { type: String, required: true, maxlength: 50, minlength: 2 },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email format: " + value);
        }
      },
    },

    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a Strong password: " + value);
        }
      },
    },
    profilePicture: {
      type: String,
      default: "default.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL: " + value);
        }
      },
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    age: { type: Number, min: 0, default: 0 },
    bio: { type: String, default: "", maxlength: 500 },
    skills: [String],
    highestQualification: { type: String, default: "" },
    company: { type: String, default: "" },
    collegeInstitution: { type: String, default: "" },
    currentRole: { type: String, default: "" },
    totalExperience: { type: Number, min: 0, default: 0 },
    location: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// userSchema.index({ emailId: 1 }, { unique: true });

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ id: user._id }, "Dev@tarun", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const hashedPassword = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    hashedPassword
  );
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
