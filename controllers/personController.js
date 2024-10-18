const { Person, Team } = require('../models');
const { addParticipant } = require('./participantController');
const { fixTeam } = require('./teamController');

// Función para registrar una nueva persona.
const registerPerson = async (email, name, teamName) => {
  // Verificar si el equipo está definido y obtenerlo (o crearlo).
  let team;
  if (teamName) {
    team = await fixTeam(teamName);
  }

  // Crear la nueva persona.
  const person = await Person.create({ email, name });

  // Si se proporciona un equipo, agregar la persona como participante.
  if (team) {
    await addParticipant(person.id, team.id);
  }

  return person;
};

// Función para actualizar una persona existente.
const updatePerson = async (person, name, teamName) => {
  // Actualizar la persona con el nuevo nombre.
  await person.update({ name });

  // Si se proporciona un nombre de equipo, obtenerlo.
  if (teamName) {
    const team = await fixTeam(teamName);
    // Agregar la persona como participante al equipo.
    await addParticipant(person.id, team.id);
  }

  return person;
};

// Función para manejar la solicitud de registro de personas.
const registerPeople = async (req, res) => {
  const entries = Array.isArray(req.body) ? req.body : [req.body];

  try {
    const results = await Promise.all(entries.map(async (entry) => {
      const { email, name, teamName } = entry;

      // Verificar si la persona ya existe.
      let person = await Person.findOne({ where: { email } });

      // Si la persona no existe, registrarla. Si existe, actualizarla.
      if (!person) {
        person = await registerPerson(email, name, teamName);
        return { email, teamName, status: 'registered' };
      } else {
        await updatePerson(person, name, teamName);
        return { email, teamName, status: 'updated' };
      }
    }));

    res.status(201).json({ message: 'Registration completed', results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

module.exports = { registerPeople };
