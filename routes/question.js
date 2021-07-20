const router = require('express').Router();
const isAuthenticated = require('../middleware/isAuthenticated');

//Model
const Question = require('../model/questionModel');

//Get question
router.get('/', async (req, res) => {
  try {
    const question = await Question.findOne({ isAttempted: false });

    if (question.isAttempted)
      res.status(400).send({ msg: 'Question already attempted' });

    question.isAttempted = !question.isAttempted;
    await question.save();

    res.send({ data: question });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Create Question
router.post('/createQuestion', async (req, res) => {
  const { questionLink, isAttempted, rentReduction } = req.body;
  try {
    const question = await Question.findOne({ questionLink });

    if (question) res.status(400).send({ msg: 'Question already exists' });

    const newQuestion = new Question({
      questionLink,
      isAttempted,
      rentReduction,
    });
    await newQuestion.save();

    res.send({ data: newQuestion });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
