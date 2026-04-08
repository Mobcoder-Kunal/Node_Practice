const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const path = require("path")
const PORT = 8005

mongoose.connect("mongodb://127.0.0.1:27017/blogify").then((e) => console.log("MongoDB connected!"))

const app = express()
const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")
const { checkForAuthenticationCookie } = require("./middleware/authentication")

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))

app.get("/", (req, res) => {
    return res.render("home", {
        user: req.user,
    })
})

app.use("/user", userRoute)
app.use("/blog", blogRoute)

app.listen(PORT, (req, res) => {
    console.log(`Server started at PORT: ${PORT}`)
})