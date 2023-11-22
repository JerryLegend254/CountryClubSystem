const express = require("express")
const { httpAddSportsplan, httpGetAllSportsplan, httpGetOneSportsplan } = require("./sportsplan.controller")
const SportsplanRouter = express.Router()

SportsplanRouter.post("/", httpAddSportsplan)
SportsplanRouter.get("/:id", httpGetOneSportsplan)
SportsplanRouter.get("/", httpGetAllSportsplan)



module.exports = SportsplanRouter