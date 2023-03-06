const mongoose = require('mongoose');
// require("dotenv").config();
let DB_URL: string = process.env.MONGO_URI!;

const connectDB = async () => {
    if (!mongoose.connections[0].readyState) {
        mongoose.set("strictQuery", true);
        await mongoose.connect("mongodb+srv://vishal8888a8:vmaL6KKc6XaRRHKh@firstcluster.aty3ouf.mongodb.net/?retryWrites=true&w=majority");
    }
};

export default connectDB;