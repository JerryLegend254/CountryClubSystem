const express = require("express")

const MembersRouter = express.Router()

MembersRouter.post("/memmber", httpEmailSignUp)



module.exports = MembersRouter