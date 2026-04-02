const express = require("express")
const router = express.Router()
const User = require("../models/user")
const { handleUserSignup, handleUserLogin } = require("../controllers/user")

router.post("/", handleUserSignup)
router.post("/login", handleUserLogin)

module.exports = router