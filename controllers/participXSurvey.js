const { ParticipXSurvey } = require('../models');

const destroyParticipXSurvey = async (req, res) => {
  const { id } = req.params;

  try {
    await ParticipXSurvey.destroy({ where: { id } });
    res.status(200).json({ message: 'Participation in survey deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting participation in survey', error: error.message });
  }
};

const restoreParticipXSurvey = async (req, res) => {
  const { id } = req.params;

  try {
    await ParticipXSurvey.restore({ where: { id } });
    res.status(200).json({ message: 'Participation in survey restored successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error restoring participation in survey', error: error.message });
  }
};

module.exports = { destroyParticipXSurvey, restoreParticipXSurvey };
