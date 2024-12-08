const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const person = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  disaster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Disaster",
    required: false,
  },
  camp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Camp",
    required: false,
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

const Person = mongoose.model("Person", person);
module.exports = { Person };
