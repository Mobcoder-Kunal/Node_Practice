const path = require("path")
const multer = require("multer")
const express = require("express")

const PORT = 8004;
const app = express()

const storage = multer.diskStorage({
    destination: (req, file, cb) => { return cb(null, "./uploads")},
    filename: (req, file, cb) => { return cb(null, `${Date.now()}-${file.originalname}`)},
})
const upload = multer({ storage: storage })

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({ extended: false })) // Parses the form data(coming from forntend) to JSON

app.get("/", (req, res) => {
    return res.render("homepage")
})

app.post("/upload", upload.fields([{name: "coverImage", maxCount: 1}, { name: "profileImage", maxCount: 10}]), (req, res) => {
    console.log(req.file)
})

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`)
})