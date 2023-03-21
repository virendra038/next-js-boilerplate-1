const mongoose = require("mongoose");
let DB_URL: string = process.env.MONGO_URI!;

const connectDB = async () => {
  if (!mongoose.connections[0].readyState) {
    mongoose.set("strictQuery", true);
    await mongoose.connect(DB_URL);
    console.log("Connected to MongoDB", DB_URL);
    console.log("Base Url: ", process.env.BASE_URL);
    console.log("Port: ", process.env.PORT);
  }
};

export default connectDB;
