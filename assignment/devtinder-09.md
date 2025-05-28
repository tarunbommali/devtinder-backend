# 09. Encrypting Password

## Table of Contents
- [Introduction](#introduction)
- [Why Never Trust req.body?](#why-never-trust-reqbody)
- [Validation with Helper Functions](#validation-with-helper-functions)
  - [Example: utils/validate.js](#example-utilsvalidatejs)
- [Encrypting the Password](#encrypting-the-password)
  - [Signup API with Encryption](#signup-api-with-encryption)
- [Login API with Password Verification](#login-api-with-password-verification)
- [Best Practices](#best-practices)
- [To Do / Explore](#to-do--explore)

---

## Introduction

Before encrypting passwords, it's important to improve the signup process by never trusting the raw data from `req.body`. Always validate and sanitize user input before using it in your application.

---

## Why Never Trust req.body?

- User input can be malicious or malformed.
- Directly using `req.body` can lead to security vulnerabilities and data corruption.
- Always validate and sanitize incoming data before processing.

---

## Validation with Helper Functions

Instead of writing all validation logic in your API routes, create reusable helper functions (e.g., in `utils/validate.js`) for explicit validation checks.

### Example: utils/validate.js

```js
const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (firstName.length <= 4 || firstName.length > 50) {
    throw new Error("First name length is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not valid");
  }
};

module.exports = { validateSignUpData };
```

---

## Encrypting the Password

Never store plain text passwords in your database. Use a library like `bcrypt` to hash passwords before saving.

### Signup API with Encryption

```js
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("./utils/validate");

app.post("/signup", async (req, res) => {
  try {
    // Validate data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create new user with encrypted password
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: encryptedPassword
    });

    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});
```

---

## Login API with Password Verification

When a user logs in, compare the hashed password in the database with the password provided.

```js
const validator = require("validator");
const bcrypt = require("bcrypt");

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!validator.isEmail(emailId)) {
      throw new Error("Email is not valid");
    }

    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.send("Login Successful!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERR: " + err.message);
  }
});
```

---

## Best Practices

- Always validate and sanitize user input using helper functions.
- Never store plain text passwords; always hash them before saving.
- Use strong password policies (`validator.isStrongPassword`).
- Handle errors gracefully and never expose sensitive details in error messages.
- Keep validation logic out of route handlers for better code organization.

---

## To Do / Explore

- Refactor all validation logic into helper modules.
- Explore more features of [bcrypt](https://www.npmjs.com/package/bcrypt) for password hashing.
- Implement rate limiting and account lockout after repeated failed logins.
- Add more robust error handling and logging.
- Study authentication best practices (e.g., JWT, sessions) for future episodes.

---