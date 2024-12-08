const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hazard = new mongoose.Schema({
  
  type: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    default: "",
  },
  lat: {
    type: Number,
    default: 0,
  },
  lng: {
    type: Number,
    default: 0,
  },
  disaster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Disaster",
    required: false,
  },
  as_on_date: {
    type: Date,
    default: Date.now,
  },
  updated_at: { type: Date, default: Date.now },
  
});

const Hazard = mongoose.model("Hazard", hazard);
module.exports = { Hazard };
