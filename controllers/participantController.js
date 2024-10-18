const { Participant, Team, Person } = require('../models');

// Función para crear la relación entre una persona y un equipo
const addParticipant = async (personId, teamId, role) => {
  try {
    // Verificar si la relación ya existe
    let participant = await Participant.findOne({
      where: { team_id: teamId, person_id: personId },
    });

    // Si la relación no existe, se crea.
    if (!participant) {
      participant = await Participant.create({
        team_id: teamId,
        person_id: personId,
        role: role
      });
      console.log(`Participant created: person ${personId} in team ${teamId}`);
    } else {
      console.log(`Participant already exists: person ${personId} in team ${teamId}`);
    }

    return participant;
  } catch (error) {
    console.error('Error adding participant:', error);
    throw error;
  }
};

module.exports = { addParticipant };
