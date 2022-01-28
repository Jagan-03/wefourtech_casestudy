const mongoose = require('mongoose');

// MongoDB Atlas Url
const MONGO_URL = "mongodb+srv://jaganath:Michaelx7@cluster0.zy7jd.mongodb.net/wefourtech?retryWrites=true&w=majority";

const mongo = {
    MONGO_URL,
    async connect() {
        try {
            mongoose.connect(MONGO_URL, { useNewUrlParser:true, useUnifiedTopology:true });
            
            console.log("Database Connection Established");
            console.log("Connection to wefourtech successfull");
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = mongo;