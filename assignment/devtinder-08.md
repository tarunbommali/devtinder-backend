# 08. Data Sanitization and Validation

## Table of Contents
- [Introduction](#introduction)
- [Why Validation and Sanitization?](#why-validation-and-sanitization)
- [Schema-Level Validations in Mongoose](#schema-level-validations-in-mongoose)
  - [Common Schema Options](#common-schema-options)
  - [Custom Validation](#custom-validation)
  - [Timestamps](#timestamps)
- [API-Level Validation](#api-level-validation)
  - [PATCH API Example with Allowed Fields](#patch-api-example-with-allowed-fields)
- [External Validation Libraries](#external-validation-libraries)
- [Best Practices](#best-practices)
- [To Do / Explore](#to-do--explore)

---

## Introduction

Data sanitization and validation are critical for maintaining the integrity and security of your application. In this episode, we focus on how to enforce strict checks on incoming data, both at the schema (database) level and at the API (route handler) level.

---

## Why Validation and Sanitization?

- Prevents invalid or malicious data from polluting your database.
- Ensures only allowed fields are updated or created.
- Protects against common attacks and data corruption.

---

## Schema-Level Validations in Mongoose

Add strict checks directly in your Mongoose schema to enforce data integrity.

### Common Schema Options

- `required`: Field must be present.
- `min`, `max`: Minimum/maximum value for numbers.
- `minLength`, `maxLength`: For strings/arrays.
- `unique`: Value must be unique in the collection.
- `default`: Default value if not provided.
- `lowercase`, `trim`: String sanitization.
- `[String]`: Array of strings.

**Example:**
```js
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email: " + value);
      }
    }
  },
  gender: {
    type: String,
    required: true,
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("Gender data is not valid");
      }
    }
  },
  // ... other fields with validations
}, { timestamps: true });
```

### Custom Validation

You can add custom validation logic using the `validate` property in your schema fields.

**Example:**
```js
validate(value) {
  if (!["male", "female", "others"].includes(value)) {
    throw new Error("Gender data is not valid");
  }
}
```

### Timestamps

Add `timestamps: true` to your schema to automatically track `createdAt` and `updatedAt`.

```js
new mongoose.Schema({ ... }, { timestamps: true });
```

---

## API-Level Validation

Even with schema validation, you should validate and sanitize data at the API level, especially for PATCH and POST requests.

- Only allow specific fields to be updated.
- Check the length and type of incoming data before passing to the database.

### PATCH API Example with Allowed Fields

```js
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;

  // Only allow specific fields to be updated
  const ALLOWED_UPDATES = ["age", "gender", "name"]; // Do not allow email updates
  const isUpdateAllowed = Object.keys(data).every((k) =>
    ALLOWED_UPDATES.includes(k)
  );
  if (!isUpdateAllowed) {
    return res.status(400).send({ message: "Invalid update request." });
  }

  try {
    const user = await User.findByIdAndUpdate(userId, data, { runValidators: true, new: true });
    res.send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
```
- Use `runValidators: true` to enforce schema validation on updates.

---

## External Validation Libraries

we can use libraries like [`validator`](https://www.npmjs.com/package/validator) for advanced validation (e.g., email, URL, strong password).

**Example:**
```js
const validator = require('validator');

validate(value) {
  if (!validator.isEmail(value)) {
    throw new Error("Invalid email: " + value);
  }
}
```

---

## Best Practices

- Use both schema-level and API-level validation for robust protection.
- Never allow sensitive fields (like email) to be updated via PATCH unless absolutely necessary.
- Sanitize all incoming data.
- Use external libraries for complex validation needs.
- Always add `timestamps: true` to important schemas.

---

## To Do / Explore

- Explore all [Mongoose SchemaType options](https://mongoosejs.com/docs/schematypes.html): `required`, `unique`, `lowercase`, `min`, `minLength`, `trim`, `default`, etc.
- Create custom validation functions for fields like gender, photo URL, and password strength.
- Add all appropriate validations to each field in your schema.
- Improve your DB schema with timestamps and better defaults.
- Add API-level validation for PATCH and signup requests.
- Ensure data sanitization for every API endpoint.

---