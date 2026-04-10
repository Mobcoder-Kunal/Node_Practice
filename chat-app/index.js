const express = require("express");
const { createServer } = require("http");
const PORT = 9000;
const app = express();
const server = createServer(app);

// Socket io
const { Server } = require("socket.io")
const io = new Server(server)

app.use(express.static("./public"));

// On sockets -> here socket term in the arrow function refers to client.
io.on("connection", (socket) => {
    socket.on("user-message", message => {
        io.emit("message", message)
    })
})


app.get("/", (req, res) => {
    return res.sendFile("/public/index.html")
})

server.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
});