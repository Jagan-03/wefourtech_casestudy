const express = require('express');
const cors = require("cors");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const mongo = require("./config/mongo.js");

// Importing routes
const moviesRoutes = require("./routes/moviesRoutes.js");

// Initializing app
const app = express();

// Using cors
app.use(cors());

// Session handler
const store = new MongoDBSession({
    uri : mongo.MONGO_URL,
    collection : "weFourTech"
})
app.use(session({
    secret : "SECRET KEY",
    resave : false,
    saveUninitialized : false,
    store : store
}))

// Parsing request body as JSON format
app.use(express.json());

(async () => {
    try {
        // Mongodb Connection
        await mongo.connect();
        // Routes
        app.use("/movies", moviesRoutes);
    } catch (error) {
        console.log(error);
    }
})();

app.listen(process.env.PORT || 3001, () => console.log("Listening on PORT 3001"));
