const express = require("express")
const {httpGetAllMembers, httpGetOneMember, httpUpdateMember, httpDeleteMember } = require("./members.controller")
const MembersRouter = express.Router()

MembersRouter.put("/:id", httpUpdateMember)
MembersRouter.get("/:id", httpGetOneMember)
MembersRouter.get("/", httpGetAllMembers)
MembersRouter.delete("/:id", httpDeleteMember)
module.exports = MembersRouter