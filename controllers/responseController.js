const { Response, Team, Survey, Question } = require('../models');

const registerResponse = async (req, res) => {
  const { team_id, email, survey_id, question_id, answer } = req.body;

  const participantHash = crypto.createHash('sha256').update(`${email}-${team.id}`).digest('hex');

  try {
    // Verify existent team_id
    const team = await Team.findByPk(team_id);
    if (!team || team.deleted_at !== null) {
      return res.status(400).json({ message: 'Team not found' });
    }

    // Verify existent survey_id
    const survey = await Survey.findByPk(survey_id);
    if (!survey || survey.deleted_at !== null) {
      return res.status(400).json({ message: 'Survey not found' });
    }

    // Verify existent question_id
    const question = await Question.findByPk(question_id);
    if (!question || question.deleted_at !== null) {
      return res.status(400).json({ message: 'Question not found' });
    }

    // Create reponse
    const newResponse = await Response.create({
      team_id,
      participantHash,
      survey_id,
      question_id,
      answer,
    });

    res.status(201).json({ message: 'Response registered successfully', response: newResponse });
  } catch (error) {
    console.error('Error registering response:', error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

module.exports = { registerResponse };
