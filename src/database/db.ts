const mongoose = require('mongoose');
require("dotenv").config();
let DB_URL: string = process.env.MONGO_URI!;

const connectDB = async () => {
    if (!mongoose.connections[0].readyState) {
        mongoose.set("strictQuery", true);
        await mongoose.connect(DB_URL);
    }
};

export default connectDB;