const { Disaster } = require("../model/disasterModel");

// Create a new disaster record
const createDisaster = async (req, res) => {
  try {
    const disasterData = req.body; // Get data from request body
    const disaster = new Disaster(disasterData); // Create a new disaster instance
    const savedDisaster = await disaster.save(); // Save to the database

    res.status(201).json({
      message: "Disaster created successfully",
      data: savedDisaster,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating disaster",
      error: error.message,
    });
  }
};

// Fetch all disaster records
const fetchDisasters = async (req, res) => {
  try {
    const disasters = await Disaster.find({ is_disaster: false }); // Fetch all records
    res.status(200).json({
      message: "Disasters fetched successfully",
      data: disasters,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching disasters",
      error: error.message,
    });
  }
};

// Fetch a single disaster record by ID
const fetchDisasterById = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from URL params
    const disaster = await Disaster.findById(id); // Find disaster by ID

    if (!disaster) {
      return res.status(404).json({
        message: "Disaster not found",
      });
    }

    res.status(200).json({
      message: "Disaster fetched successfully",
      data: disaster,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching disaster",
      error: error.message,
    });
  }
};

const createPreDisaster = async (req, res) => {
  try {
    const disasterData = req.body; // Get data from request body
    disasterData.is_disaster = false;
    const disaster = new Disaster(disasterData); // Create a new disaster instance
    const savedDisaster = await disaster.save(); // Save to the database

    res.status(201).json({
      message: "Disaster created successfully",
      data: savedDisaster,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating disaster",
      error: error.message,
    });
  }
};


// Mark a disaster as a true disaster
const markAsDisaster = async (req, res) => {
  const { disasterId } = req.params;

  try {
    const updatedDisaster = await Disaster.findByIdAndUpdate(
      disasterId,
      { is_disaster: true },
      { new: true }
    );

    if (!updatedDisaster) {
      return res.status(404).json({
        message: "Disaster not found",
      });
    }

    res.status(200).json({
      message: "Disaster marked as true successfully",
      data: updatedDisaster,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error marking disaster as true",
      error: error.message,
    });
  }
};




module.exports = {
  createDisaster,
  fetchDisasters,
  fetchDisasterById,
  createPreDisaster,
  markAsDisaster,
};
