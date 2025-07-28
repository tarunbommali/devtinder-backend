const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt")

const { ValidationSignUp } = require("../utils/validation");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  const {
    firstName,
    lastName,
    emailId,
    password,
    age,
    gender,
    profilePicture,
    highestQualification,
    company,
    collegeInstitution,
    currentRole,
    totalExperience,
    skills,
    location, 
  } = req.body;

  try {
    const errors = ValidationSignUp(req.body);

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
      age,
      gender,
      profilePicture,
      highestQualification,
      company,
      collegeInstitution,
      currentRole,
      totalExperience,
      skills,
      location, 
    });

    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
});

authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;

  try {
    const user = await User.findOne({ emailId });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await user.validatePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = await user.getJWT();

    // Set token as cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set to true in production
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        age: user.age,
        gender: user.gender,
        profilePicture: user.profilePicture,
        highestQualification: user.highestQualification,
        company: user.company,
        collegeInstitution: user.collegeInstitution,
        currentRole: user.currentRole,
        totalExperience: user.totalExperience,
        skills: user.skills,
        location: user.location,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
});


authRouter.post('/logout', async (req,res) => {
    res.cookie("token", null, {expires: new Date(Date.now())})
    res.send("Logout Successful!");
})

module.exports = authRouter