# 07. Diving into the API's

## Table of Contents
- [Difference between JSON and JavaScript Object](#difference-between-json-and-javascript-object)
- [Reading the Request from User](#reading-the-request-from-user)
- [Express Middleware](#express-middleware)
- [GET APIs](#get-apis)
  - [Display All Users Details (Feed)](#display-all-users-details-feed)
  - [Display User Details by Email](#display-user-details-by-email)
- [DELETE API](#delete-api)
- [PATCH API](#patch-api)
- [Options for findByIdAndUpdate](#options-for-findbyidandupdate)
- [Work / To Do with Answers](#work--to-do-with-answers)

---

## Difference between JSON and JavaScript Object

- **JavaScript Object:**  
  Native data structure in JS. Can have properties, methods (functions), symbols, `undefined`, etc.  
  Example:  
  ```js
  const obj = { name: "Tarun", greet: () => "Hello" };
  ```
- **JSON Object:**  
  Text-based data format (string). Only supports string, number, array, object, boolean, null.  
  No functions, `undefined`, or symbols allowed.  
  Example:  
  ```json
  { "name": "Tarun" }
  ```
- **Why not interchangeable?**  
  - JSON must be stringified (`JSON.stringify`) before sending over network and parsed (`JSON.parse`) to use as JS object.
  - JS objects can have types and values that JSON does not support.

---

## Reading the Request from User

Example request body:
```json
{
  "firstName": "tarun",
  "email": "btarun@gmail.com",
  "password": "Tarun@123"
}
```
Dynamic data is received when API is called.

```js
app.post("/signup", async (req, res) => {
  // Readable state
  console.log(req.body);
  // If output is undefined, add express.json() middleware.
});
```

---

## Express Middleware

```js
app.use(express.json());
```
This middleware parses incoming JSON requests and puts the parsed data in `req.body`.

---

## GET APIs

### Display All Users Details (Feed)
```js
app.get("/feed", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("users not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});
```

### Display User Details by Email
```js
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("user not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});
```

---

## DELETE API

```js
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send(user);
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});
```

---

## PATCH API

```js
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate({ _id: userId }, data);
    res.send("user updated");
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});
```

---

## Options for findByIdAndUpdate

```js
await User.findByIdAndUpdate(
  { _id: userId },
  data,
  { returnDocument: "before" }
);
```
- `returnDocument: "before"` returns the document before update.

---
