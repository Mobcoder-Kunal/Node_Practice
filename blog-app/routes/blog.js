const {Router} = require("express")
const router = Router()

const Blog = require("../models/blog")

router.get("/add-new", (req, res) => {
    return res.render("addBlog", {
        user: req.user                    // user ko pass karo for navbar showing
    })
})

router.post("/", (req, res) => {
    console.log(req.body)
    return res.redirect("/")
})

module.exports = router