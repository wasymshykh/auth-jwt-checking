const router = require("express").Router();

router.post("/register", (request, response) => {
    response.send("Success!");
});

router.post("/login", (request, response) => {
    response.send("Success!");
});

module.exports = router;
