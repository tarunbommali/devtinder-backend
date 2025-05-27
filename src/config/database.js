const mangoose = require('mongoose');

const MONGODB_URL = "mongodb+srv://disistarun:Darling2810@devtinder.gbqus.mongodb.net/devTinderDB?retryWrites=true&w=majority"

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