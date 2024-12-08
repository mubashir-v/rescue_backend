const { Hazard } = require('../model/hazardModel');

// Create a new hazard record
const createHazard = async (req, res) => {
  try {
    const hazardData = req.body; // Get data from the request body
    const hazard = new Hazard(hazardData); // Create a new hazard instance
    const savedHazard = await hazard.save(); // Save the hazard to the database

    res.status(201).json({
      message: 'Hazard created successfully',
      data: savedHazard,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error creating hazard',
      error: error.message,
    });
  }
};

// Fetch all hazard records
const fetchHazards = async (req, res) => {
  try {
    const hazards = await Hazard.find(); // Fetch all hazard records from the database
    res.status(200).json({
      message: 'Hazards fetched successfully',
      data: hazards,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching hazards',
      error: error.message,
    });
  }
};

// Fetch a specific hazard by ID
const fetchHazardById = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from request parameters
    const hazard = await Hazard.findById(id); // Find hazard by ID

    if (!hazard) {
      return res.status(404).json({
        message: 'Hazard not found',
      });
    }

    res.status(200).json({
      message: 'Hazard fetched successfully',
      data: hazard,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching hazard',
      error: error.message,
    });
  }
};

module.exports = {
  createHazard,
  fetchHazards,
  fetchHazardById,
};
