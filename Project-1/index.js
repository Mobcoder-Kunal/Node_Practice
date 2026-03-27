const express = require("express")
const PORT = 8000

const users = require("./MOCK_DATA.json")
const fs = require("fs")
const app = express()

// Middlewares
app.use(express.urlencoded({ extended: false }))


// Routes
app.get("/users", (req, res) => {
    const html = `
        <ul>
        ${users.map(user => `<li> ${user.first_name}</li>`).join("")}
        </ul > `;

    res.send(html)

})

app.get("/api/users", (req, res) => {
    res.json(users)
})

app.route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        console.log(id)
        const user = users.find(user => user.id === id);
        res.json(user)
    }).patch((req, res) => {
        const id = Number(req.params.id)
        const body = req.body
        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            return res.status(404).json({ status: "User not found" });
        }

        users[userIndex] = {
            ...users[userIndex],
            ...req.body,
            id
        };

        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
            console.log("Error: ", err)
        })
        return res.json({ status: "success", user: users[userIndex] });

        // console.log(req)
        // console.log("---------------------------------------------------------")
        // console.log(req.body)
        // console.log("---------------------------------------------------------")
        // console.log(id)

    }).delete((req, res) => {
        const id = Number(req.params.id)
        const userExists = users.some(user => user.id === id)

        if (!userExists) {
            return res.status(404).json({ status: "User not found" })
        }

        const updatedUsers = users.filter(user => user.id !== id);

        // Whenever want to replace an array’s contents but keep the same reference, then:
        users.length = 0
        users.push(...updatedUsers)

        fs.writeFile("./MOCK_DATA.json", JSON.stringify(updatedUsers, null, 2), (err) => {
            if (err) {
                console.error("Failed to write file:", err);
                return res.status(500).json({ status: "error", message: "Failed to delete user" });
            }
        })

        return res.json({ status: "User deleted successfully." })
    })

app.post("/api/users", (req, res) => {
    const body = req.body
    users.push({ id: users.length + 1, ...body })
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        console.log("Error: ", err)
    })
    return res.json({ status: "success", id: users.length })
})

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT} `)
})