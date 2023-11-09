const express = require("express")
const { httpEmailSignIn } = require("./auth.controller")

const AuthRouter = express.Router()

AuthRouter.post("/signup", httpEmailSignIn)


module.exports = AuthRouter