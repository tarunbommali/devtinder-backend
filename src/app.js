const express = require("express");
const app = express();
const connectDB = require("../src/config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { ORIGIN_URL } = require("../src/utils/constants");

app.use(
  cors({
    origin: ORIGIN_URL, 
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

const authRouter = require("../src/routes/auth");
const profileRouter = require("../src/routes/profile");
const requestRouter = require("../src/routes/request");
const userRouter = require("../src/routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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
