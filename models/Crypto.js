const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["bitcoin", "matic-network", "ethereum"],
  },
  price: {
    type: Number,
    required: true,
  },
  marketCap: {
    type: Number,
    required: true,
  },
  change24h: {
    type: Number,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Crypto", cryptoSchema);
