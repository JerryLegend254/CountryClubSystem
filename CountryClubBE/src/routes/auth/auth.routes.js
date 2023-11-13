const express = require("express")
const { httpEmailSignUp } = require("./auth.controller")

const AuthRouter = express.Router()

AuthRouter.post("/signup", httpEmailSignUp)



module.exports = AuthRouter