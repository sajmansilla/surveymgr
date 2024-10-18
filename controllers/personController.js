const { Person, Team } = require('../models');
const { addParticipant } = require('./participantController');
const { fixTeam } = require('./teamController');

// Función para registrar una nueva persona.
const registerPerson = async (email, name, teamName, teamRole) => {
  // Verificar si el equipo está definido y obtenerlo (o crearlo).
  let team;
  if (teamName) {
    team = await fixTeam(teamName);
    if (!teamRole) {
      throw new Error('Role is required when team is specified.');
    }
  }

  // Crear la nueva persona.
  const person = await Person.create({ email, name });

  // Si se proporciona un equipo, agregar la persona como participante con rol.
  if (team) {
    await addParticipant(person.id, team.id, teamRole);
  }

  return person;
};

// Función para actualizar una persona existente.
const updatePerson = async (person, name, teamName, teamRole) => {
  // Actualizar la persona con el nuevo nombre.
  await person.update({ name });

  // Si se proporciona un nombre de equipo, obtenerlo y actualizar el rol.
  if (teamName) {
    const team = await fixTeam(teamName);
    if (!teamRole) {
      throw new Error('Role is required when team is specified.');
    }
    // Agregar o actualizar la persona como participante al equipo con rol.
    await addParticipant(person.id, team.id, teamRole);
  }

  return person;
};

// Función para manejar la solicitud de registro de personas.
const registerPeople = async (req, res) => {
  const entries = Array.isArray(req.body) ? req.body : [req.body];

  try {
    const results = await Promise.all(entries.map(async (entry) => {
      const { email, name, teamName, teamRole } = entry;

      // Verificar si la persona ya existe.
      let person = await Person.findOne({ where: { email } });

      // Si la persona no existe, registrarla. Si existe, actualizarla.
      if (!person) {
        person = await registerPerson(email, name, teamName, teamRole);
        return { email, teamName, status: 'registered' };
      } else {
        await updatePerson(person, name, teamName, teamRole);
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
