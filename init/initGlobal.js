const Question = require("../model/questionModel");

module.exports = initGlobal = async (app) => {
  const questionsCount = await Question.estimatedDocumentCount();
  app.set("questionsCount", questionsCount);
};
