const Crypto = require("../models/Crypto");

// Controller for fetching cryptocurrency data from db- /stats
const getCoinStats = async (req, res) => {
  const { coin } = req.body;

  if (!coin) {
    return res.status(400).json({ error: "Crypto parameter is required." });
  }

  try {
    const coinData = await Crypto.findOne({ name: coin }).sort({
      lastUpdated: -1,
    });

    if (!coinData) {
      return res.status(404).json({ error: "Cryptocurrency not found." });
    }

    res.status(200).json({
      name: coinData.name,
      price: coinData.price,
      marketCap: coinData.marketCap,
      change24h: coinData.change24h,
      lastUpdated: coinData.lastUpdated,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

module.exports = { getCoinStats };
