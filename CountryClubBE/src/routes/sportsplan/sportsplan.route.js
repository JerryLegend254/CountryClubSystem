const express = require("express");
const {
  httpAddSportsplan,
  httpGetAllSportsplan,
  httpGetOneSportsplan,
  httpDeleteSportsplan,
} = require("./sportsplan.controller");
const SportsplanRouter = express.Router();

SportsplanRouter.post("/", httpAddSportsplan);
SportsplanRouter.get("/:id", httpGetOneSportsplan);
SportsplanRouter.get("/", httpGetAllSportsplan);
SportsplanRouter.delete("/:id", httpDeleteSportsplan);

module.exports = SportsplanRouter;