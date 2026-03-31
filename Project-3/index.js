const express = require("express")
const PORT = 8002
const app = express()

const userRouter = require("./routes/user")
const { connectMongodb } = require("./connection")
const { logReqRes } = require("./middlewares")

// Connection
connectMongodb("mongodb://127.0.0.1:27017/project-1").then(() => {
    console.log("MongoDB Connected!")
})

// Middlewares -> Plugin
app.use(express.urlencoded({ extended: false }))
app.use(logReqRes("log.txt"))

// Routes
app.use("/api/users", userRouter)

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`)
})