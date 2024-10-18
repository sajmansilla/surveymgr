const { Team } = require('../models');

// If the team doesn't exist, it's created.
const getTeam = async (teamName) => {
  let team = await Team.findOne({ where: { team_name: teamName } });
  if (!team) {
    team = await Team.create({ team_name: teamName });
  }
  return team;
};

module.exports = { getTeam };
