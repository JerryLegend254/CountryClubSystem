const express = require("express")
const { httpEmailSignUp, httpGetAllUsers } = require("./auth.controller")

const AuthRouter = express.Router()

AuthRouter.post("/signup", httpEmailSignUp)
AuthRouter.get('/users', httpGetAllUsers)



module.exports = AuthRouter