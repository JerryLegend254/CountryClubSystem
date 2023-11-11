const express = require("express")
const { httpEmailSignIn, httpEmailSignUp, httpSignOut } = require("./auth.controller")

const AuthRouter = express.Router()

AuthRouter.post("/signup", httpEmailSignUp)
AuthRouter.post("/signin", httpEmailSignIn)
AuthRouter.get("/signout", httpSignOut);


module.exports = AuthRouter