const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User");

router.get("/", verify, async (request, response) => {
    const user = await User.findById(request.user._id);
    if (!user) {
        return response.status(400).send("User not found");
    }
    response.send({ email: user.email, name: user.name });
});

module.exports = router;
