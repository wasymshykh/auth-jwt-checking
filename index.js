const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

// Importing routes
const auth_route = require("./routes/auth");

dotenv.config();

// Connecting to DB
mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true }, err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Connected!");
});

// Middlewares
app.use(express.json());

// Route middlewares
//  Works like localhost:3000/api/user/register
app.use("/api/user", auth_route);

app.listen(3000, () => {
    console.log("Running server!");
});
