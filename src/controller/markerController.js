const { Camp } = require("../model/campModel");
const { Hazard } = require("../model/hazardModel");
const { Disaster } = require("../model/disasterModel");
const { Person } = require("../model/personModel"); // Assuming you have a Person model

// Query all models for lat, lng, title and model name
const fetchLatLngData = async (req, res) => {
  try {
    // Query Camp model
    const camps = await Camp.find({
      lat: { $exists: true },
      lng: { $exists: true },
    }).select("lat lng name");

    // Query Hazard model
    const hazards = await Hazard.find({
      lat: { $exists: true },
      lng: { $exists: true },
    }).select("lat lng type");

    // Query Disaster model
    const disasters = await Disaster.find({
      lat: { $exists: true },
      lng: { $exists: true },
    }).select("lat lng name as name");

    // Query Person model
    const people = await Person.find({
      lat: { $exists: true },
      lng: { $exists: true },
    }).select("lat lng name as name"); // Assuming 'name' is the title field

    // Combine the data and include the source model name
    const results = [
      ...camps.map((camp) => ({
        id: camp._id,
        lat: camp.lat,
        lng: camp.lng,
        title: camp.name,
        model: "Camp",
      })),
      ...hazards.map((hazard) => ({
        id: hazard._id,
        lat: hazard.lat,
        lng: hazard.lng,
        title: hazard.type,
        model: "Hazard",
      })),
      ...disasters.map((disaster) => ({
        id: disaster._id,
        lat: disaster.lat,
        lng: disaster.lng,
        title: disaster.name,
        model: "Disaster",
      })),
      ...people.map((person) => ({
        id: person._id,
        lat: person.lat,
        lng: person.lng,
        title: person.name,
        model: "Person",
      })),
    ];

    res.status(200).json({
      message: "Lat, Lng, and model data fetched successfully",
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching lat, lng, and model data",
      error: error.message,
    });
  }
};

module.exports = {
  fetchLatLngData,
};
