const mongoose = require("mongoose");
const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
//Model
const Question = require("../model/questionModel");
const Team = require("../team/model");
const Participant = require("../baseTeam/participantModel");
const Solve = require("../model/solveModel");

//Get all questions
router.get("/allQuestions", async (req, res) => {
  try {
    const questions = await Question.find();

    if (!questions) res.status(400).send({ msg: "No Questions" });

    res.send({ data: questions });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
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
    console.log(process.env.EVENT_ID);
    const baseTeams = await BaseTeam.find({
      event: mongoose.Types.ObjectId(process.env.EVENT_ID),
    });

    console.log(baseTeams);
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
});

//Get question
router.get("/", isAuthenticated, async (req, res) => {
  console.log(req.user.game.currentQuestion);

  if (req.user.game.currentQuestion) {
    const assignedQuestion = await Question.findById(
      req.user.game.currentQuestion
    );
    if (!assignedQuestion) {
      req.user.game.currentQuestion = null;
      await req.user.save();
      return res.send({
        error: "Error occured while fetching question",
        message: "retry, prev question cleared",
      });
    }
    return res.send({ data: assignedQuestion });
  }

  let count = req.app.get("questionsCount");
  if (!count) count = 10;
  const number = Math.floor(Math.random() * count);
  try {
    let nin = req.user.game.questionAttempted.map((q) =>
      mongoose.Types.ObjectId(q)
    );
    if (!nin) nin = [];
    const [question] = await Question.find({
      _id: {
        $nin: nin,
      },
    })
      .limit(-1)
      .skip(number);
    // console.log(question);
    if (
      !req.user.game.questionAttempted ||
      req.user.game.questionAttempted.length >= count - 1
    )
      req.user.game.questionAttempted = [];
    // req.user.game.questionAttempted.push({ question: question.id });
    req.user.game.questionAttempted.push(question.id);

    req.user.game.currentQuestion = question.id;
    await req.user.save();

    await res.send({ data: question });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Create Question
router.post("/create", async (req, res) => {
  const { link } = req.body;
  // try {
  const question = await Question.findOne({ link });
  // .select(
  //   '-questionsAttempted'
  // );

  if (question) res.status(400).send({ msg: "Question already exists" });

  const newQuestion = new Question({
    link,
  });
  await newQuestion.save();

  res.send({ data: newQuestion });
  // } catch (err) {
  //   console.error(err.message);
  //   res.status(500).send("Server Error");
  // }
});

//Delete Question
router.delete("/:id", async (req, res) => {
  try {
    let question = await Question.findById(req.params.id);

    if (!question) return res.status(404).json({ msg: "Question not found" });

    await Question.findByIdAndRemove(req.params.id);

    res.json({ msg: "Question removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/newton/callback", async (req, res) => {
  console.log(req.body);
  const newSolve = new Solve({
    email: req.body.email,
    question: req.body.questionId,
    //! timestamp
  });
  await newSolve.save();
  // console.log(newSolve);
  res.send("ok");
});

router.post("/checkAnswer", isAuthenticated, async (req, res) => {
  const { type } = req.body;
  console.log("type", type);
  console.log(req.user);
  const question = await Question.findById(req.user.game.currentQuestion);
  if (req.user.game.currentReduction) {
    return res.send({
      data: { reduction: question.rentReduction },
      message: "correct ans",
    });
  }

  //! check timer>

  const inArr = req.user.members.map((m) => {
    m = m.toObject();
    return m.email;
  });
  console.log("inArr", inArr);
  const solve = await Solve.findOne({
    email: { $in: inArr },
    question: req.user.game.currentQuestion,
  });
  console.log("solve", solve);
  if (!solve) {
    return res.status(400).send({
      message: "you have not answered",
      error: "no solve found for this questiob by this team",
    });
  }

  if (!question)
    return res
      .status(400)
      .send({ error: "no question found", message: "retry" });

  req.user.game.currentReduction = type === "buy" ? 50 : 30;

  await req.user.save();
  await Solve.findByIdAndDelete(solve._id);

  res.send({
    data: { reduction: question.rentReduction },
    message: "correct ans",
  });
});

module.exports = router;
