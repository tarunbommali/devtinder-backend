const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const ORIGIN_URL = ["http://localhost:3000", "http://localhost:5173","https://devtindernetwork.vercel.app"];

app.use(
  cors({
    origin: ORIGIN_URL, 
    secure: false,
    sameSite: "none",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

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
