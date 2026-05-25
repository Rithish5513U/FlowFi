# FlowFi — AI-Powered Financial Intelligence Platform

FlowFi is a full-stack fintech web application that combines AI-powered insights, real-time stock market data, personalized news aggregation, and virtual portfolio management to help users make informed financial decisions.

## Features

- **User Authentication** — Secure JWT-based registration and login
- **Virtual Portfolio Trading** — Start with $10,000 virtual balance to trade 47+ Indian stocks
- **Real-time Stock Data** — Live market prices via yfinance
- **AI Financial Advisor** — Chatbot powered by Google Gemini 1.5 for financial Q&A
- **Bank Statement Upload** — Process Excel files to track transaction history
- **Personalized News Feed** — Aggregated financial news based on user preferences
- **Interactive Dashboard** — Transaction visualization with Recharts
- **Guided Onboarding** — Multi-step preferences setup and interactive tours

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 18, Vite, Redux Toolkit, Ant Design, Recharts, React Router v7 |
| Backend | Flask, Gunicorn, PyMongo, JWT, Bcrypt, Pydantic |
| Database | MongoDB Atlas |
| APIs | yfinance, Google Generative AI (Gemini), NewsAPI |

## Project Structure

```
FlowFi/
├── backend/
│   └── flask_backend/       # Flask REST API server
│       ├── src/
│       │   ├── routes/      # API endpoint definitions
│       │   ├── services/    # Business logic layer
│       │   └── models/      # Pydantic schemas & data models
│       ├── requirements.txt
│       └── Procfile
├── frontend/                # React SPA
│   ├── src/
│   │   ├── component/       # Page components
│   │   ├── components/      # Auth components
│   │   ├── redux/           # State management
│   │   └── styles/          # CSS stylesheets
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- MongoDB Atlas account
- API keys for: Google Generative AI, NewsAPI

### Environment Variables

Create a `.env` file in `backend/flask_backend/`:

```env
JWT_SECRET_KEY=your_jwt_secret
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/<database>
JWT_ACCESS_EXPIRES=3600
GOOGLE_API_KEY=your_google_generativeai_key
NEWS_API=your_newsapi_key
```

### Backend Setup

```bash
cd backend/flask_backend
pip install -r requirements.txt
python -m src.app
# Server runs on http://localhost:8080
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Authenticate and get JWT token |
| GET | `/portal/stockDetails` | Fetch available stocks with live data |
| GET | `/portal/getAssets` | Get user's portfolio and balance |
| PUT | `/portal/addAssets` | Buy stocks |
| PUT | `/portal/removeAssets` | Sell stocks |
| POST | `/excel/uploadExcel` | Upload bank statement (Excel) |
| POST | `/faq/faqHandler` | Ask the AI financial advisor |
| POST | `/news/financialInsights` | Get personalized financial news |

## Application Workflow

1. User registers/logs in → JWT token issued
2. User sets financial preferences (30 options across 3 categories)
3. Personalized news feed generated based on preferences
4. User can upload bank statements for transaction tracking
5. User browses stocks, builds wishlist, and trades with virtual balance
6. AI chatbot available for financial questions
7. Dashboard displays financial overview and transaction charts

## Deployment

The backend is configured for deployment with Gunicorn via the `Procfile`:

```
web: gunicorn src.app:app
```

## License

This project was built for the Define Hackathon.