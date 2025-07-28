const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { ValidateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      message: "User profile fetched successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        bio: user.bio,
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
    console.error("Failed to fetch profile:", error.message);
    res.status(500).json({ message: "Failed to fetch profile", error: error.message });
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!ValidateEditProfileData(req)) {
      return res.status(400).send("Invalid Edit Request");
    }

    const user = req.user;

    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key];
    });

    await user.save();

    res.send(`${user.firstName}, Profile updated Successfully`);
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = profileRouter;
