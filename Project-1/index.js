const express = require("express")
const PORT = 8000

const users = require("./MOCK_DATA.json")

const app = express()

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

app.get("/api/users/:id", (req, res) => {
 
    const id = Number(req.params.id);
    console.log(id)
    const user = users.find(user => user.id === id);
    res.json(user)
})

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT} `)
})