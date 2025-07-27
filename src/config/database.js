const mangoose = require('mongoose');

const MONGODB_URL = "mongodb+srv://dbUser:IxZcbu72jy4SSbGh@dev.bfccblb.mongodb.net/?retryWrites=true&w=majority&appName=dev"

const connectDB = async () => {
  try {
    await  mangoose.connect(MONGODB_URL)
  }
  catch (error) {   
    console.error("Error connecting to MongoDB:", error.message);
  }
  console.log("MongoDB connected successfully");      
}


module.exports = connectDB;