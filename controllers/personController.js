const { Person, Team } = require('../models');
const { addParticipant } = require('./participantController');

const registerPerson = async (req, res) => {
  const entries = Array.isArray(req.body) ? req.body : [req.body];

  try {
    const results = await Promise.all(entries.map(async (entry) => {
      const { email, name, teamName } = entry;

      // Obtener equipo (si no existe, lo crea).
      const team = await getTeam(teamName);

      // Verificar si la persona ya existe o crearla.
      let person = await Person.findOne({ where: { email } });
      if (!person) {
        person = await Person.create({ email, name });
      } else {
        await person.update({ name });
      }

      // Añadir la persona como participante al equipo.
      await addParticipant(person.id, team.id);

      return { email, teamName, status: 'success' };
    }));

    res.status(201).json({ message: 'Registration completed', results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

module.exports = { registerPerson };
