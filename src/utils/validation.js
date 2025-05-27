const ValidationSignUp = (req) => {
  const { firstName, lastName, emailId, password } = req;
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  // First Name Validation
  if (!firstName.trim()) {
    errors.firstName = "First name is required";
  } else if (firstName.length < 2) {
    errors.firstName = "First name must be at least 2 characters long";
  }
  // Last Name Validation
  if (!lastName.trim()) {
    errors.lastName = "Last name is required";
  } else if (lastName.length < 2) {
    errors.lastName = "Last name must be at least 2 characters long";
  }
  // Email Validation
  if (!emailId) {
    errors.emailId = "Email is required";
  } else if (!regex.test(emailId)) {
    errors.emailId = "Email is not valid";
  }
  // Password Validation
  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  } else if (!passwordRegex.test(password)) {
    errors.password =
      "Password must contain at least one letter and one number";
  }

  return errors;
};

const ValidateEditProfileData = (req) => {
  const allowedEditFileds = [
    "firstName",
    "lastName",
    "bio",
    "profilePicture",
    "skills",
  ];

  const isAllowedEditFileds = Object.keys(req.body).every((field) =>
    allowedEditFileds.includes(field)
  );

  return isAllowedEditFileds;
};

module.exports = { ValidationSignUp , ValidateEditProfileData };
