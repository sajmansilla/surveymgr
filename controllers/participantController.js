const { Participant, Team, Person } = require('../models');

// Function to link person to a team
const addParticipant = async (personId, teamId, role) => {
  try {

    let participant = await Participant.findOne({
      where: { team_id: teamId, person_id: personId },
    });

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
