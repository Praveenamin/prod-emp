const mongoose = require('mongoose');

const QuicklinkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Quicklink', QuicklinkSchema);
