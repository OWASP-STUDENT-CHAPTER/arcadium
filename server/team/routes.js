const app = require("express");
const router = app.Router();
const Team = require("./model");
const BaseTeam = require("../baseTeam/model");
const mongoose = require("mongoose");

const isAuthenticated = require("../middleware/isAuthenticated");

// * get all event teams
router.get("/", async (req, res) => {
  const teams = await Team.find().populate("members");
  console.log(teams);
  res.send(teams);
});

// * get team profile
router.get("/profile", isAuthenticated, (req, res) => {
  res.send(req.user);
});

// * import all baseTeams and create event teams
router.get("/import", async (req, res) => {
  //! filter event specific teams (process.evn.EVENT_ID)
  const baseTeams = await BaseTeam.find({
    event: mongoose.Types.ObjectId(process.env.EVENT_ID),
  });
  // .populate('members');

  const teamsPromises = [];
  baseTeams
    .map((bt) => bt.toObject())
    .forEach((baseTeam) => {
      const team = new Team({
        teamName: baseTeam.teamName,
        _id: baseTeam.id,
        members: baseTeam.members,
      });

      teamsPromises.push(team.save());
    });

  // const t =
  await Promise.allSettled(teamsPromises);
  // console.log("final ", t);
  //! add metrics about how many failed and why ?

  res.send("Done importing teams");
  // res.send(t);
  // res.send(baseTeams);
});

module.exports = router;
