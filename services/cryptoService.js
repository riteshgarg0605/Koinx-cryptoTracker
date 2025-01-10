const axios = require("axios");
require("dotenv").config();

// Fetch data from coingecko api
const fetchCryptoData = async () => {
  const options = {
    method: "GET",
    url: "https://api.coingecko.com/api/v3/simple/price",
    params: {
      ids: "bitcoin,matic-network,ethereum",
      vs_currencies: "usd",
      include_market_cap: "true",
      include_24hr_change: "true",
    },
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": `${process.env.COINGECKO_API_KEY}` || null,
    },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error fetching crypto data:", error.message);
    throw error;
  }
};

module.exports = { fetchCryptoData };
