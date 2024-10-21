const { Team } = require('../models');

const getTeam = async (teamName) => {
  const team = await Team.findOne({ where: { team_name: teamName } });
  return team;
};

// If the team doesn't exist, it's created.
const fixTeam = async (teamName) => {
  const [team] = await Team.findOrCreate({ where: { team_name: teamName } });

  return team;
};

// Soft delete a team by ID
const destroyTeam = async (req, res) => {
  const { id } = req.params;

  try {
    await Team.destroy({ where: { id } });
    res.status(200).json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting team', error: error.message });
  }
};

// Restore a soft-deleted team by ID
const restoreTeam = async (req, res) => {
  const { id } = req.params;

  try {
    await Team.restore({ where: { id } });
    res.status(200).json({ message: 'Team restored successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error restoring team', error: error.message });
  }
};

module.exports = { getTeam, fixTeam, destroyTeam, restoreTeam };
