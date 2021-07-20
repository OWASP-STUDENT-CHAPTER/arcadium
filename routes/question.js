const router = require('express').Router();
const isAuthenticated = require('../middleware/isAuthenticated');

//Model
const Question = require('../model/questionModel');
const Team = require('../team/model');

//Get all questions
router.get('/allQuestions', async (req, res) => {
  try {
    const questions = await Question.find();

    if (!questions) res.status(400).send({ msg: 'No Questions' });

    res.send({ data: questions });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Get question
router.get('/', isAuthenticated, async (req, res) => {
  const count = db.collection.countDocuments(Question);
  const number = Math.floor(Math.random() * count);

  try {
    let question;
    let attempted;
    for (var i = 1; i > 0; i++) {
      question = await db.Question.find().limit(-1).skip(number).next();

      attempted = req.user.game.questionAttempted.find(
        (t) => t._id === question._id
      );
      if (attempted) console.log('Question attempted');
      else {
        req.user.game.questionAttempted.push(question._id);
        break;
      }
    }
    res.send({ data: question });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Create Question
router.post('/create', async (req, res) => {
  const { questionLink, rentReduction } = req.body;
  try {
    const question = await Question.findOne({ questionLink }).select(
      '-questionsAttempted'
    );

    if (question) res.status(400).send({ msg: 'Question already exists' });

    const newQuestion = new Question({
      questionLink,
      rentReduction,
    });
    await newQuestion.save();

    res.send({ data: newQuestion });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Delete Question
router.delete('/:id', async (req, res) => {
  try {
    let question = await Question.findById(req.params.id);

    if (!question) return res.status(404).json({ msg: 'Question not found' });

    await Question.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Question removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
