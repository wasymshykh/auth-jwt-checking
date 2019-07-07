const express = require("express");
const app = express();

// Importing routes
const auth_route = require("./routes/auth");

// Route middlewares
//  Works like localhost:3000/api/user/register
app.use("/api/user", auth_route);

app.listen(3000, () => {
    console.log("Running server!");
});
