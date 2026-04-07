const jwt = require("jsonwebtoken")
const secret = "Kunal$$$111$$$"

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role,
    }, secret)
}

function getUser(token) {
    if (!token) return null;

    try {
        return jwt.verify(token, secret);
    } catch (err) {
        console.log("JWT Error:", err.message);
        return null;
    }
}

// Statefull method
// const sessionIdToUserMap = new Map();

// function setUser(id, user) {
//     sessionIdToUserMap.set("id", "user")
// }

// function getUser(id, user) {
//     return sessionIdToUserMap.get("id", "user")
// }

module.exports = {
    setUser,
    getUser,
}