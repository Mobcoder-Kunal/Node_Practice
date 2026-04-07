const User = require("../models/user")
const { v4: uuidv4 } = require("uuid")
const {setUser, getUser} = require("../service/auth")

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    console.log('Login attempt for:', email);
    const user = await User.findOne({ email, password });

    if (!user) {
        console.log('User not found');
        return res.render("login", { error: "Invalid Username or Password" });
    }

    console.log('User found:', user);
    const token = setUser(user);
    console.log('Token generated:', token);

    res.cookie("token", token);

    console.log("Redirecting user...");
    return res.redirect("/");
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
}