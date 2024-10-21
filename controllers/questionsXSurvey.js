const { QuestionsXSurvey } = require('../models');

const destroyQuestionsXSurvey = async (req, res) => {
  const { survey_id, question_id } = req.body;

  try {
    await QuestionsXSurvey.destroy({ where: { survey_id, question_id } });
    res.status(200).json({ message: 'Question removed from survey successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing question from survey', error: error.message });
  }
};

const restoreQuestionsXSurvey = async (req, res) => {
  const { survey_id, question_id } = req.body;

  try {
    await QuestionsXSurvey.restore({ where: { survey_id, question_id } });
    res.status(200).json({ message: 'Question restored to survey successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error restoring question to survey', error: error.message });
  }
};

module.exports = { destroyQuestionsXSurvey, restoreQuestionsXSurvey };
