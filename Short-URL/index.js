const express = require("express")
const { connectToMongodb } = require("./connection")
const app = express()
const PORT = 8003

const urlRoutes = require("./routes/url")
const URL = require("./models/url");

// Connection
connectToMongodb("mongodb://127.0.0.1:27017/short-url").then(() => {
    console.log("MongoDB Connected!")
})

// Middlewares -> Plugin
app.use(express.json()); // must come first
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/url", urlRoutes);
app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: [{ timeStamp: Date.now() }]
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