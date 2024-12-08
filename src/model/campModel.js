const mongoose = require("mongoose");
const camp = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: "",
  },
  contact: {
    type: String,
    default: "",
  },
  capacity: {
    type: Number,
    default: 0,
  },
  disaster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Disaster",
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

const Camp = mongoose.model("Camp", camp);
module.exports = { Camp };
