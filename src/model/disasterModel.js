const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const disaster = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: "",
  },
  type: {
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
  as_on_date: {
    type: Date,
    default: Date.now,
  },
  updated_at: { type: Date, default: Date.now },
});

const Disaster = mongoose.model("Disaster", disaster);
module.exports = { Disaster };
