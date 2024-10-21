const { Person, Team } = require('../models');
const { addMember } = require('./teammemberController');
const { fixTeam } = require('./teamController');

// Function to create a new person
const registerPerson = async (email, name, teamName, teamRole) => {
  // If the team doesn't exist, it's created.
  let team;
  if (teamName) {
    team = await fixTeam(teamName);
    // If a team is given, it must include the role as well.
    if (!teamRole) {
      throw new Error('Role is required when team is specified.');
    }
  }

  // Persist the new person.
  const person = await Person.create({ email, name });

  if (team) {
    await addMember(person.id, team.id, teamRole);
  }

  return person;
};

// Function to update an existing person.
const updatePerson = async (person, name, teamName, teamRole) => {
  // Update the person with the new name.
  await person.update({ name });

  // If a team name is provided, get it and update the role.
  if (teamName) {
    const team = await fixTeam(teamName);
    if (!teamRole) {
      throw new Error('Role is required when team is specified.');
    }
    // Add or update the person as a participant in the team with a role.
    await addMember(person.id, team.id, teamRole);
  }

  return person;
};

// Function to handle the request for registering people.
const registerPeople = async (req, res) => {
  const entries = Array.isArray(req.body) ? req.body : [req.body];

  try {
    const results = await Promise.all(entries.map(async (entry) => {
      const { email, name, teamName, teamRole } = entry;

      // Check if the person already exists.
      let person = await Person.findOne({ where: { email } });

      // If the person does not exist, register them. If they exist, update them.
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

const destroyPerson = async (req, res) => {
  const { id } = req.params;

  try {
    await Person.destroy({ where: { id } });
    res.status(200).json({ message: 'Person deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting person', error: error.message });
  }
};

const restorePerson = async (req, res) => {
  const { id } = req.params;

  try {
    await Person.restore({ where: { id } });
    res.status(200).json({ message: 'Person restored successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error restoring person', error: error.message });
  }
};

module.exports = { registerPeople, destroyPerson, restorePerson };
