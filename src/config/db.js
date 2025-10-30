
const mongoose = require("mongoose");

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("sucessfully connected"); 
    } catch (err) {
        console.error("connection failed");
        console.log(err);
        process.exit(1);
        
    }
};
module.exports = {
    connectDB,
};

