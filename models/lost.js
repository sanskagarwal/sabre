const mongoose = require("mongoose");

const lostPersonSchema = new mongoose.Schema({
  member: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    age: {
      type: Number,
      required: true
    },
    contact: {
      type: Number,
      required: true
    },
    image: {
      type: String
    }
  },
  lastSeen: {
    type: Number,
    required: true
  },
  recentImg: {
    type: String
  }
});

module.exports = mongoose.model("lostPersons", lostPersonSchema);
