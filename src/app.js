const express = require("express");
const app = express();
const connectDB = require("../src/config/database");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

const authRouter = require('../src/routes/auth')
const profileRouter = require("../src/routes/profile")
const requestRouter = require("../src/routes/request")



app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);



// Connect to MongoDB and then start the server
connectDB()
  .then(() => {
    console.log("MongoDB connection established successfully");
    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });
