const express = require("express");
const { connectToMongodb } = require("./connection");
const app = express();
const PORT = 8003;

const urlRoutes = require("./routes/url");
const userRoutes = require("./routes/user");
const staticRoutes = require("./routes/staticRouter");
const cookieParser = require("cookie-parser")

const URL = require("./models/url");
const path = require("path");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middleware/auth");

// Connection
connectToMongodb("mongodb://127.0.0.1:27017/short-url").then(() => {
    console.log("MongoDB Connected!")
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


// Middlewares -> Plugin
app.use(express.json());
app.use(express.urlencoded({ extended: false }));  // To parse the form data
app.use(cookieParser());  // To parse the form data


// Routes
app.use("/", checkAuth, staticRoutes);
app.use("/url", restrictToLoggedinUserOnly, urlRoutes);
app.use("/user", userRoutes);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: [{ timestamp: Date.now() }]
        }
    })
    console.log(entry)
    if (!entry) {
        return res.status(404).send("Short URL not found");
    }
    res.redirect(entry.redirectUrl)
})

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`)
})