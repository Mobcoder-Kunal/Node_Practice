require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const path = require("path")
const PORT = process.env.PORT || 8005
const Blog = require("./models/blog")

mongoose.connect(process.env.MONGO_URL).then((e) => console.log("MongoDB connected!"))

const app = express()
const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")
const { checkForAuthenticationCookie } = require("./middleware/authentication")

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve("./public")))

app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({})
    return res.render("home", {
        user: req.user,
        blogs: allBlogs
    })
})

app.use("/user", userRoute)
app.use("/blog", blogRoute)

app.listen(PORT, (req, res) => {
    console.log(`Server started at PORT: ${PORT}`)
})