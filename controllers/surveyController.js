const { Survey, Team, Person, ParticipXSurvey, QuestionsXSurvey, Question } = require('../models');
const crypto = require('crypto');
const { getTeam } = require('./teamController'); // Utilizaremos esta función para verificar la existencia de equipos.

const createSurvey = async (req, res) => {
  const { name, date_start, date_end, teams } = req.body;

  try {
    // Validar el formato del nombre de la encuesta
    if (!/^\d{2}\.\d{2}$/.test(name)) {
      return res.status(400).json({ message: 'Invalid survey name format. Use MM.YY.' });
    }

    // Crear la nueva survey
    const survey = await Survey.create({ name, date_start, date_end });

    // Verificar la existencia de los equipos.
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

    // Iterar sobre los equipos existentes y crear relaciones en `particip_x_survey`.
    for (const team of existingTeams) {
      // Obtener los participantes del equipo.
      const persons = await Person.findAll({ 
        include: [{
          model: Team,
          where: { id: team.id },
        }]
      });

      // Crear una relación por cada participante.
      for (const person of persons) {
        const participantHash = crypto.createHash('sha256').update(person.email).digest('hex');

        await ParticipXSurvey.create({
          survey_id: survey.id,
          participant: participantHash,
          team_id: team.id,
        });
      }
    }

    // ** NUEVO PASO: Relacionar preguntas habilitadas con la nueva encuesta **
    const enabledQuestions = await Question.findAll({
      where: { enabled: true }
    });

    // Crear relaciones en la tabla `questions_x_survey`
    for (const question of enabledQuestions) {
      await QuestionsXSurvey.create({
        survey_id: survey.id,
        question_id: question.id
      });
    }

    // Devolver la respuesta con los equipos inexistentes, si los hay.
    res.status(201).json({
      message: 'Survey created successfully',
      survey,
      nonexistentTeams,
    });
    
  } catch (error) {
    console.error('Error creating survey:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Survey with this name already exists' });
    }
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

module.exports = { createSurvey };
