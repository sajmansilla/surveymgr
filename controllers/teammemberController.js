const { Member, Team, Person } = require('../models');

// Function to link person to a team
const addMember = async (personId, teamId, role) => {
  try {

    let member = await Member.findOne({
      where: { team_id: teamId, person_id: personId },
    });

    if (!member) {
      member = await Member.create({
        team_id: teamId,
        person_id: personId,
        role: role
      });
      console.log(`Participant created: person ${personId} in team ${teamId}`);
    } else {
      console.log(`Participant already exists: person ${personId} in team ${teamId}`);
    }

    return member;
  } catch (error) {
    console.error('Error adding team member:', error);
    throw error;
  }
};

module.exports = { addMember };
