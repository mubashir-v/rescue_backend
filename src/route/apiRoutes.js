const express = require('express');
const { createDisaster, fetchDisasters, fetchDisasterById } = require('../controller/disasterController');
const { createHazard, fetchHazards, fetchHazardById } = require('../controller/hazardController');
const { createPerson, fetchPersons, fetchPersonById,fetchPersonsWithoutCamp,fetchPersonsByCamp } = require('../controller/personController');
const { createCamp, fetchCamps, fetchCampById } = require('../controller/campController');
const { fetchLatLngData } = require('../controller/markerController');
const { Camp } = require('../model/campModel');
const { Person } = require('../model/personModel');

const router = express.Router();

// Disaster Routes
router.post('/disasters', createDisaster);
router.get('/disasters', fetchDisasters);
router.get('/disasters/:id', fetchDisasterById);

// Hazard Routes
router.post('/hazards', createHazard);
router.get('/hazards', fetchHazards);
router.get('/hazards/:id', fetchHazardById);

// Person Routes
router.post('/persons', createPerson);
router.get('/persons', fetchPersons);
router.get('/persons/:id', fetchPersonById);
router.get('/person/without-camp', fetchPersonsWithoutCamp);
router.get('/persons/camp/:campId', fetchPersonsByCamp);

// Camp Routes
router.post('/camps', createCamp);
router.get('/camps', fetchCamps);
router.get('/camps/:id', fetchCampById);

router.get('/markers', fetchLatLngData);

router.post("/move-persons-to-camp", async (req, res) => {
    const { campId, personIds } = req.body;
  
    try {
      const camp = await Camp.findById(campId);
      if (!camp) {
        return res.status(404).json({ message: "Camp not found" });
      }
  
      const persons = await Person.find({ _id: { $in: personIds } });
      if (persons.length !== personIds.length) {
        return res.status(404).json({ message: "Some persons not found" });
      }
  
      // Assign the camp to the selected persons
      await Person.updateMany(
        { _id: { $in: personIds } },
        { $set: { camp: campId } }
      );
  
      res.status(200).json({ message: "Persons moved to camp successfully" });
    } catch (error) {
      console.error("Error moving persons to camp:", error);
      res.status(500).json({ message: "Error moving persons", error: error.message });
    }
  });


module.exports = router;
