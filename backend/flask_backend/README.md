# FlowFi — Backend

Flask REST API server powering the FlowFi financial intelligence platform.

## Tech Stack

- **Flask** — Web framework with CORS support
- **MongoDB** (PyMongo) — Document database for users, transactions, and stock data
- **JWT** (PyJWT) — Token-based authentication with 1-hour expiry
- **Bcrypt** — Password hashing
- **Pydantic** — Request/response data validation
- **yfinance** — Real-time stock market data (NSE India)
- **Google Generative AI** (Gemini 1.5 Flash) — AI-powered financial chatbot
- **NewsAPI** — Financial news aggregation
- **openpyxl** — Excel file processing for bank statements
- **Gunicorn** — Production WSGI server

## Project Structure

```
src/
├── app.py               # Flask app factory & server entry point
├── config.py            # Environment variable configuration
├── extensions.py        # MongoDB client initialization
├── models/
│   ├── userModel.py     # User & Asset Pydantic schemas
│   ├── portalSchema.py  # Stock trading request/response models
│   └── stocksSchema.py  # Stock data schema
├── routes/
│   ├── auth_routes.py   # Registration & login endpoints
│   ├── portal_routes.py # Stock trading & portfolio endpoints
│   ├── excel_routes.py  # Bank statement upload endpoint
│   ├── faq_routes.py    # AI chatbot endpoint
│   └── news_routes.py   # Financial news endpoint
└── services/
    ├── userService.py   # Auth logic, JWT generation, bcrypt hashing
    ├── portalService.py # Stock data fetching (yfinance), portfolio mgmt
    ├── excelhandler.py  # Excel parsing, deduplication, storage
    ├── faq_chatbot.py   # Gemini AI chat integration
    └── news.py          # NewsAPI integration
```

## API Endpoints

### Authentication (`/auth`)

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | `{ name, email, password }` | Register new user |
| POST | `/auth/login` | `{ email, password }` | Login, returns JWT token |

### Portfolio (`/portal`)

| Method | Endpoint | Headers | Description |
|--------|----------|---------|-------------|
| GET | `/portal/stockDetails` | Authorization: Bearer token | Get all available stocks with live prices |
| GET | `/portal/getAssets` | Authorization: Bearer token | Get user's holdings and balance |
| PUT | `/portal/addAssets` | Authorization: Bearer token | Buy stocks (deducts from virtual balance) |
| PUT | `/portal/removeAssets` | Authorization: Bearer token | Sell stocks (adds to virtual balance) |

### Excel (`/excel`)

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| POST | `/excel/uploadExcel` | `multipart/form-data` (file + email) | Upload bank statement Excel file |

Required Excel columns: `date`, `description`, `withdrawals`, `deposits`, `balance`

### FAQ (`/faq`)

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| POST | `/faq/faqHandler` | `{ prompt }` | Ask the AI financial advisor |

### News (`/news`)

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| POST | `/news/financialInsights` | `{ preferences: [...] }` | Get personalized financial news |

## Database Collections

### `users`
```json
{
  "name": "string",
  "email": "string",
  "password": "hashed_string",
  "assets": [{ "symbol": "RELIANCE.NS", "price": 2500, "quantity": 4 }],
  "virtualBalance": 10000
}
```

### `transactions`
```json
{
  "email": "string",
  "transactions": [
    { "date": "2024-01-15", "description": "...", "withdrawals": 500, "deposits": 0, "balance": 9500 }
  ]
}
```

### `stocks`
```json
{
  "symbol": "RELIANCE.NS",
  "open": 2480,
  "dayHigh": 2520,
  "dayLow": 2470,
  "lastPrice": 2500,
  "previousClose": 2490,
  "change": 10,
  "pChange": 0.4
}
```

## Supported Stocks (47 NSE Tickers)

RELIANCE, TCS, HDFCBANK, INFY, ICICIBANK, HINDUNILVR, SBIN, BHARTIARTL, KOTAKBANK, ITC, LT, AXISBANK, BAJFINANCE, ASIANPAINT, MARUTI, HCLTECH, SUNPHARMA, TITAN, ULTRACEMCO, WIPRO, NESTLEIND, TATAMOTORS, POWERGRID, NTPC, TECHM, BAJAJFINSV, ONGC, COALINDIA, ADANIENT, ADANIPORTS, DIVISLAB, JSWSTEEL, DRREDDY, BRITANNIA, CIPLA, EICHERMOT, HEROMOTOCO, APOLLOHOSP, TATASTEEL, GRASIM, INDUSINDBK, SBILIFE, HDFCLIFE, BAJAJ-AUTO, BPCL, UPL, HINDALCO

## Environment Variables

Create a `.env` file in the project root:

```env
JWT_SECRET_KEY=your_jwt_secret_key
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/<database>
JWT_ACCESS_EXPIRES=3600
GOOGLE_API_KEY=your_google_generative_ai_key
NEWS_API=your_newsapi_org_key
```

## Setup & Run

### Development

```bash
pip install -r requirements.txt
python -m src.app
# Server starts on http://localhost:8080
```

### Production

```bash
gunicorn src.app:app
```

## Deployment

Configured for Heroku/Railway/Render via `Procfile`:

```
web: gunicorn src.app:app
```

## Dependencies

See [requirements.txt](requirements.txt) for the full list. Key packages:

- `flask`, `flask-cors`
- `pymongo`, `dnspython`
- `pyjwt`, `bcrypt`
- `pydantic[email]`
- `yfinance`
- `google-generativeai`
- `newsapi-python`
- `openpyxl`
- `gunicorn`
