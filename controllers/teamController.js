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

module.exports = { getTeam, fixTeam };
