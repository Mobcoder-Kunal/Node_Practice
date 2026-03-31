const express = require("express")
const mongoose = require("mongoose")

const PORT = 8001
const app = express()

// Connection
mongoose
    .connect("mongodb://127.0.0.1:27017/project-1")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB error: ", err))

// User Schema 
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    }
}, { timestamps: true})

const User = mongoose.model('user', userSchema)

// Middlewares
app.use(express.urlencoded({ extended: false }))

// Routes
app.get("/users", async (req, res) => {
    const users = await User.find({});
    const html = `
        <ul>
            ${users.map((user) => `<li>${user.firstName} - ${user.lastName} - ${user.email}</li>`).join("")}
        </ul>`;
    return res.send(html)
})

app.get("/api/users", async (req, res) => {
    const users = await User.find({})
    return res.json(users)
})

app.get("/api/users/:id", async (req, res) => {
    const user = await User.findById(req.params.id)
    // here using !user because mongodb id generally not 0
    if(!user) return res.status(404).json({error: "user not found"});
    return res.json(user)
})

app.post("/api/users", async (req, res) => {
    const body = req.body
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ msg: "All feilds are required! " })
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    })

    console.log("Result: ", result)

    return res.status(201).json({msg: "Success"})
});

app
.route("/api/users/:id")
.patch( async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"})
    res.json({status: "Success"});
})
.delete( async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.json({status: "Success"});
});

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`)
})