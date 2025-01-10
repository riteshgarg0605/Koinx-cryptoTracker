const Agenda = require("agenda");
const Crypto = require("../models/Crypto");
const { fetchCryptoData } = require("../services/cryptoService");
require("dotenv").config();

// Initialize Agenda
const agenda = new Agenda({
  db: { address: process.env.MONGO_URI, collection: "agendaJobs" },
});

agenda.define("fetch crypto data", async (job) => {
  console.log("Running job: fetch crypto data");
  try {
    const data = await fetchCryptoData();

    const cryptos = Object.entries(data).map(([key, value]) => ({
      name: key,
      price: value.usd,
      marketCap: value.usd_market_cap,
      change24h: value.usd_24h_change,
    }));

    for (const crypto of cryptos) {
      await Crypto.create({ ...crypto, lastUpdated: Date.now() });
    }

    console.log("Cryptocurrency data created successfully.");
  } catch (error) {
    console.error("Error in job fetch crypto data:", error.message);
  }
});

// Function to start the job and schedule it
const runCryptoJob = async () => {
  try {
    await agenda.start();
    await agenda.every("2 hours", "fetch crypto data"); // Schedule job every 2 hours
    console.log("Crypto job scheduled every 2 hours.");
  } catch (error) {
    console.error("Error starting the crypto job:", error.message);
  }
};

// Graceful shutdown for Agenda
process.on("SIGTERM" || "SIGINT", async () => {
  console.log("Shutting down agenda...");
  await agenda.stop();
  process.exit(0);
});

module.exports = { runCryptoJob, agenda };
