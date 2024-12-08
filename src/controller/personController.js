const { Person } = require('../model/personModel');
const { Disaster } = require('../model/disasterModel'); // Optional: For validation or populating disaster details

// Create a new person
const createPerson = async (req, res) => {
  try {
    let personData = req.body; // Get person data from request body

    // If a disaster is referenced, ensure it exists (optional validation)
    if (personData.disaster && personData.disaster!=='') {
      const disasterExists = await Disaster.findById(personData.disaster);
      if (!disasterExists) {
        return res.status(404).json({
          message: 'Referenced disaster not found',
        });
      }
    }
    else{
        const {disaster,...rest} = personData;
        personData=rest;
    }
    
    
    const person = new Person(personData); // Create a new person instance
    const savedPerson = await person.save(); // Save person to the database

    res.status(201).json({
      message: 'Person created successfully',
      data: savedPerson,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error creating person',
      error: error.message,
    });
  }
};

// Fetch all persons
const fetchPersons = async (req, res) => {
  try {
    const persons = await Person.find().populate('disaster'); // Populate disaster details if available
    res.status(200).json({
      message: 'Persons fetched successfully',
      data: persons,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching persons',
      error: error.message,
    });
  }
};

// Fetch a single person by ID
const fetchPersonById = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from request parameters
    const person = await Person.findById(id).populate('disaster'); // Populate disaster details if available

    if (!person) {
      return res.status(404).json({
        message: 'Person not found',
      });
    }

    res.status(200).json({
      message: 'Person fetched successfully',
      data: person,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching person',
      error: error.message,
    });
  }
};

// Controller to fetch persons without a camp
const fetchPersonsWithoutCamp = async (req, res) => {
  try {
    const persons = await Person.find({ camp: { $exists: false } }); // Query where camp is not set
    res.status(200).json({
      message: 'Persons fetched successfully',
      data: persons,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching persons',
      error: error.message,
    });
  }
};

// Controller to fetch persons assigned to a specific camp
const fetchPersonsByCamp = async (req, res) => {
  try {
    const { campId } = req.params; // Get campId from the URL parameters
    
    // Fetch persons that are assigned to the specified campId
    const persons = await Person.find({ camp: campId });

    if (!persons || persons.length === 0) {
      return res.status(404).json({
        message: 'No persons found for this camp',
      });
    }

    res.status(200).json({
      message: 'Persons fetched successfully',
      data: persons,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching persons',
      error: error.message,
    });
  }
};






module.exports = {
  createPerson,
  fetchPersons,
  fetchPersonById,
  fetchPersonsWithoutCamp,
  fetchPersonsByCamp
};
