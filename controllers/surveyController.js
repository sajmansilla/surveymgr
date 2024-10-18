const { Survey, Team, Person, ParticipXSurvey, QuestionsXSurvey, Question } = require('../models');
const crypto = require('crypto');
const { getTeam } = require('./teamController');

const createSurvey = async (req, res) => {
  const { name, date_start, date_end, teams } = req.body;

  try {
    // Survey name validation
    if (!/^\d{2}\.\d{2}$/.test(name)) {
      return res.status(400).json({ message: 'Invalid survey name format. Use MM.YY.' });
    }

    // Survey creation
    const survey = await Survey.create({ name, date_start, date_end });

    // Check existing teams.
    const nonexistentTeams = [];
    const existingTeams = [];

    for (const teamName of teams) {
      const team = await getTeam(teamName);
      if (team) {
        existingTeams.push(team);
      } else {
        nonexistentTeams.push(teamName);
      }
    }

    // Add people to survey.
    for (const team of existingTeams) {
      // Get people from teams.
      const persons = await Person.findAll({ 
        include: [{
          model: Team,
          where: { id: team.id },
        }]
      });

      // Add participant to survey.
      for (const person of persons) {
        const participantHash = crypto.createHash('sha256').update(person.email).digest('hex');

        await ParticipXSurvey.create({
          survey_id: survey.id,
          participant: participantHash,
          team_id: team.id,
        });
      }
    }

    // Automatically map enabled questions to the new survey
    const enabledQuestions = await Question.findAll({
      where: { enabled: true }
    });

    // Create relationships in `questions_x_survey`
    for (const question of enabledQuestions) {
      await QuestionsXSurvey.create({
        survey_id: survey.id,
        question_id: question.id
      });
    }

    // Send response, including any nonexistent team that has been provided.
    res.status(201).json({
      message: 'Survey created successfully',
      survey,
      nonexistentTeams,
    });
    
  } catch (error) {
    console.error('Error creating survey:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        message: 'Survey with this name already exists'
      });
    }
    res.status(500).json({
      message: 'An error occurred', error: error.message
    });
  }
};

module.exports = { createSurvey };
