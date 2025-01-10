# Crypto Tracker API 🚀

A simple yet powerful backend application for tracking cryptocurrency data. This API supports fetching real-time cryptocurrency stats and calculating advanced metrics like standard deviation of prices for Bitcoin, Ethereum, and Matic.

## Features ✨

- **Background Jobs:** Periodically fetches the latest price, market cap, and 24-hour change for Bitcoin, Ethereum, and Matic.
- **Database Storage:** Stores data in MongoDB for robust and scalable performance.
- **APIs:**
  - `/stats`: Get the latest stats for a cryptocurrency.
  - `/deviation`: Compute the standard deviation of prices for the last 100 records.

## Tech Stack 🛠️

- **Node.js**: Server-side JavaScript runtime.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing cryptocurrency data.
- **Agenda**: Job scheduling library for running periodic tasks.

## Installation & Setup 📦

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/crypto-tracker-api.git
   cd crypto-tracker-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```env
   MONGO_URI=your_mongodb_connection_string
   CRYPTO_API_KEY=your_crypto_api_key
   ```

4. Start the server:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000` by default.

## API Endpoints 📖

### 1. `/stats` 🔍

Fetch the latest stats for a cryptocurrency.

#### Request:

```http
GET /stats?crypto=bitcoin
```

#### Query Parameters:

- **`crypto`**: (Required) Name of the cryptocurrency (e.g., `bitcoin`, `ethereum`, `matic-network`).

#### Sample Response:

```json
{
  "name": "bitcoin",
  "price": 50000,
  "marketCap": 900000000000,
  "change24h": 2.5,
  "lastUpdated": "2025-01-10T00:00:00Z"
}
```

### 2. `/deviation` 📊

Calculate the standard deviation of prices for the last 100 records.

#### Request:

```http
GET /deviation?coin=bitcoin
```

#### Query Parameters:

- **`coin`**: (Required) Name of the cryptocurrency (e.g., `bitcoin`, `ethereum`, `matic-network`).

#### Sample Response:

```json
{
  "deviation": 4082.48
}
```

## Background Job 🕒

The background job fetches cryptocurrency data every 2 hours and stores it in MongoDB. It utilizes the [Agenda](https://github.com/agenda/agenda) library for job scheduling.

### Workflow:

1. Fetches data for Bitcoin, Ethereum, and Matic using an external API.
2. Stores the following in MongoDB:
   - Price in USD
   - Market cap in USD
   - 24-hour change percentage
   - Timestamp of the update

## Directory Structure 🗂️

```plaintext
crypto-tracker-api/
├── controllers/
│   ├── cryptoController.js    # Business logic for /stats and /deviation APIs
├── models/
│   ├── Crypto.js              # Mongoose schema for cryptocurrency data
├── jobs/
│   ├── cryptoJobs.js          # Agenda job for periodic data fetching
├── .env                       # Environment variables
├── index.js                  # Main server file
└── README.md                  # Project documentation
```

## Future Improvements 🌟

- Add support for more cryptocurrencies.
- Implement additional analytics like moving averages.
- Deploy to a cloud platform for production use.

## Contributing 🤝

Contributions are welcome! Feel free to submit a pull request or open an issue.

## License 📜

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements 🙌

- [Agenda](https://github.com/agenda/agenda) for job scheduling.
- [CoinGecko API](https://www.coingecko.com/en/api) (or similar) for cryptocurrency data.

Happy coding! 💻
