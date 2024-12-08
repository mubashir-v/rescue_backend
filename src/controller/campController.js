const { Camp } = require("../model/campModel");


// Create a new camp
const createCamp = async (req, res) => {
  try {
    let campData = req.body; // Expect the camp data in the request body
   

    if (campData.disaster && campData.disaster!=='') {
      const disasterExists = await Disaster.findById(campData.disaster);
      if (!disasterExists) {
        return res.status(404).json({
          message: 'Referenced disaster not found',
        });
      }
    }
    else{
        const {disaster,...rest} = campData;
        campData=rest;
    }
    const camp = new Camp(campData);
    const savedCamp = await camp.save(); // Save the new camp in the database

    
    res.status(201).json({
      message: 'Camp created successfully',
      data: savedCamp,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error creating camp',
      error: error.message,
    });
  }
};

// Fetch all camps
const fetchCamps = async (req, res) => {
  try {
    const camps = await Camp.find(); // Fetch all camps from the database
    res.status(200).json({
      message: 'Camps fetched successfully',
      data: camps,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching camps',
      error: error.message,
    });
  }
};

// Fetch a single camp by ID
const fetchCampById = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the request parameters
    const camp = await Camp.findById(id);

    if (!camp) {
      return res.status(404).json({
        message: 'Camp not found',
      });
    }

    res.status(200).json({
      message: 'Camp fetched successfully',
      data: camp,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching camp',
      error: error.message,
    });
  }
};

module.exports = {
  createCamp,
  fetchCamps,
  fetchCampById,
};
