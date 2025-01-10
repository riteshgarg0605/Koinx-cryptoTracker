const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { runCryptoJob } = require("./jobs/cryptoJob");
const {
  getCoinStats,
  getCryptoDeviation,
} = require("./controller/cryptoController");
require("dotenv").config();

app.use(express.json());

app.get("/stats", getCoinStats);

app.get("/deviation", getCryptoDeviation);

// Connect to MongoDB and start express server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
    runCryptoJob();
  })
  .catch((err) => console.error("MongoDB connection error:", err));
