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

const destroyMember = async (req, res) => {
  const { team_id, person_id } = req.body;

  try {
    await Member.destroy({ where: { team_id, person_id } });
    res.status(200).json({ message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting team member', error: error.message });
  }
};

const restoreMember = async (req, res) => {
  const { team_id, person_id } = req.body;

  try {
    await Member.restore({ where: { team_id, person_id } });
    res.status(200).json({ message: 'Team member restored successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error restoring team member', error: error.message });
  }
};


module.exports = { addMember, destroyMember, restoreMember };
