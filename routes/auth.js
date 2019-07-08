const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (request, response) => {
    // Data Validation
    const { error } = registerValidation(request.body);
    if (error) {
        return response.status(400).send(error.details[0].message);
    }

    // User existance check
    const emailExist = await User.findOne({ email: request.body.email });
    if (emailExist) {
        return response.status(400).send("Email already exists");
    }

    // Hashing Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(request.body.password, salt);

    // Create User
    const user = new User({
        name: request.body.name,
        email: request.body.email,
        password: hashPassword
    });

    try {
        const savedUser = await user.save();
        response.send({ user: savedUser._id });
    } catch (err) {
        response.status(400).send(err);
    }
});

// Login
router.post("/login", async (request, response) => {
    // Data Validation
    const { error } = loginValidation(request.body);
    if (error) {
        return response.status(400).send(error.details[0].message);
    }

    // User exists
    const user = await User.findOne({ email: request.body.email });
    if (!user) return response.status(403).send("Email address incorrect");

    // Password match
    const validPass = await bcrypt.compare(
        request.body.password,
        user.password
    );
    if (!validPass) return response.status(403).send("Password incorrect");

    // JWT Generation
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    response.header("auth-token", token).send(token);
});

module.exports = router;
