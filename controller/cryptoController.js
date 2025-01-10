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

// Controller for fetching cryptocurrency deviation
const getCryptoDeviation = async (req, res) => {
  const { coin } = req.body;

  if (!coin) {
    return res.status(400).json({ error: "Coin parameter is required." });
  }

  try {
    const result = await Crypto.aggregate([
      { $match: { name: coin } },
      { $sort: { lastUpdated: -1 } },
      { $limit: 100 },
      {
        $group: {
          _id: null,
          deviation: { $stdDevPop: "$price" }, // Use $stdDevPop for population standard deviation
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(404).json({ error: "Cryptocurrency data not found." });
    }

    const deviation = result[0].deviation;

    res.status(200).json({ deviation: deviation.toFixed(2) });
  } catch (error) {
    console.error("Error fetching deviation:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

module.exports = { getCoinStats, getCryptoDeviation };
