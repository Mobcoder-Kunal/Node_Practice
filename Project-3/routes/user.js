const express = require("express");
const { handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateNewUser } = require("../controllers/user");
const router = express.Router()

router.get("/", async (req, res) => {
    const users = await User.find({});
    const html = `
        <ul>
            ${users.map((user) => `<li>${user.firstName} - ${user.lastName} - ${user.email}</li>`).join("")}
        </ul>`;
    return res.send(html)
})

router
    .route("/")
    .get(handleGetAllUsers)
    .post(handleCreateNewUser);

router
    .route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById);

module.exports = router