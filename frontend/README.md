# FlowFi — Frontend

React-based single page application for the FlowFi financial intelligence platform.

## Tech Stack

- **React 18.3.1** — UI library
- **Vite** — Build tool and dev server
- **Redux Toolkit** — Centralized state management
- **React Router DOM v7** — Client-side routing
- **Ant Design 5.24.3** — UI component library
- **Recharts** — Financial data visualization / charts
- **Axios** — HTTP client for API calls
- **React Joyride** — Guided onboarding tours

## Project Structure

```
src/
├── App.jsx              # Route definitions
├── main.jsx             # Entry point with Redux Provider
├── index.css            # Global styles
├── component/           # Page-level components
│   ├── Dashboard.jsx    # Transaction charts & file upload
│   ├── fileupload.jsx   # Bank statement upload handler
│   ├── homepage.jsx     # Landing page with chatbot & investor info
│   ├── Investor.jsx     # Famous investor profiles
│   ├── NewsCard.jsx     # Individual news article card
│   ├── Overview.jsx     # Financial news grid
│   ├── Platform.jsx     # Stock trading interface (buy/sell)
│   ├── PreferencesForm.jsx  # Multi-step preference selection
│   └── TypingText.jsx   # Typing animation component
├── components/          # Auth components
│   ├── Login.jsx        # Login page
│   └── SignUp.jsx       # Registration page
├── redux/               # State management
│   ├── store.js         # Redux store configuration
│   ├── userSlice.js     # User check-in state
│   ├── preferencesSlice.js  # Financial preference selections
│   └── privatekey.js    # JWT token storage
└── styles/              # CSS modules
```

## Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Login | User authentication |
| `/signup` | SignUp | New user registration |
| `/preference` | PreferencesForm | Financial interest selection |
| `/homepage` | Homepage | Main landing with chatbot |
| `/dashboard` | Dashboard | Transaction overview & charts |
| `/platform` | Platform | Virtual stock trading |
| `/insights` | Overview | Personalized news feed |

## Key Features

### Virtual Trading Platform
- Browse 47+ Indian stocks with live prices
- Buy/sell with $10,000 virtual starting balance
- Track portfolio value in real-time

### AI Chatbot
- Integrated on the homepage
- Sends queries to the Gemini-powered backend
- Provides financial advice and sustainable fintech solutions

### Preferences System
- 3-category preference selection (30 total options)
- General Financial, Investment-Specific, Business & Economy
- Drives personalized news feed content

### Dashboard
- Line chart visualization of financial data (Recharts)
- Bank statement upload (Excel format)
- Transaction history display

## Setup

```bash
npm install
npm run dev
```

The app runs on `http://localhost:5173` and proxies API calls to the backend at `http://localhost:8080`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Environment

The frontend connects to the backend API. The base URL is configured in Axios calls throughout the components (defaults to `http://localhost:8080`).
