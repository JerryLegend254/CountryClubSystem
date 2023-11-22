const express = require("express")
const {httpGetAllMembers, httpGetOneMember } = require("./members.controller")
const MembersRouter = express.Router()

MembersRouter.get("/:id", httpGetOneMember)
MembersRouter.get("/", httpGetAllMembers)

module.exports = MembersRouter