const { Response, Team, Survey, Question, Person, Member } = require('../models');
const crypto = require('crypto');

const registerResponse = async (req, res) => {
  const { team_id, email, survey_id, question_id, answer } = req.body;

  let person = await Person.findOne({
    where: { email: email },
  });

  if (!person) {
    return res.status(400).json({ message: 'E-mail '+ email +' not found' });
  };

  const participant = await Member.findOne({
    where: { team_id: team_id, person_id: person.id },
  });

  if (!participant) {
    return res.status(400).json({ message: 'The email '+ email +' does not belong to Team'+ team_id +'.' });
  };

  const participantHash = crypto.createHash('sha256').update(`${person.email}-${participant.team_id}`).digest('hex');

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
      participant: participantHash,
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
