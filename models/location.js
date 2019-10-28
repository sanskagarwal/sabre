const mongoose = require("mongoose");

const cameraLocationSchema = new mongoose.Schema({
  name: String,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  camNum: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("locations", cameraLocationSchema);
