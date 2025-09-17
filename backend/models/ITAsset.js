const mongoose = require('mongoose');

const ITAssetSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming User model stores employees
    required: true
  },
  laptopDesktop: { type: Boolean, default: false },
  serialNumber: { type: String, required: true },
  speaker: { type: Boolean, default: false },
  headphone: { type: Boolean, default: false },
  monitor: { type: Boolean, default: false },
  keyboard: { type: Boolean, default: false },
  mouse: { type: Boolean, default: false },
  networkIP: { type: String, required: true },
  requestChange: { type: String, default: "" }, // employee requests
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ITAsset', ITAssetSchema);

