# AI Weather Assistant 🌤️

A super smart AI-powered weather application with natural language processing, hyper-local forecasting, and personalized recommendations.

## Features

### 🎯 Core Features
- **Natural Language Queries** - Ask weather questions in plain English
- **Hyper-local Forecasting** - AI-powered predictions accounting for microclimates
- **Personalized Recommendations** - Activity suggestions based on weather and preferences
- **Risk Scoring** - Quantified weather impact analysis
- **Multi-source Data Fusion** - Combining multiple weather data sources for accuracy

### 🤖 AI Capabilities
- Natural language processing for conversational queries
- Machine learning models for improved forecast accuracy
- Anomaly detection for unusual weather patterns
- Predictive analytics for personalized insights

## Tech Stack

### Frontend
- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Recharts** - Data visualization

### Backend
- **Python 3.11+** - Programming language
- **FastAPI** - Web framework
- **SQLAlchemy** - Database ORM
- **scikit-learn** - Machine learning
- **OpenAI API** - Natural language processing
- **OpenWeatherMap API** - Weather data

## Project Structure

```
ai-weather-assistant/
├── frontend/           # React TypeScript frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   ├── hooks/         # Custom hooks
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
│   ├── public/
│   └── package.json
├── backend/            # Python FastAPI backend
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── models/       # Database models
│   │   ├── services/     # Business logic
│   │   ├── ml/           # ML models
│   │   └── main.py       # FastAPI app
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- OpenWeatherMap API key
- OpenAI API key (optional, for NLP features)

### Environment Variables

Create a `.env` file in the backend directory:
```env
OPENWEATHER_API_KEY=your_api_key_here
OPENAI_API_KEY=your_api_key_here
DATABASE_URL=sqlite:///./weather.db
```

Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:8000
```

### Installation

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at: http://localhost:5173

#### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend API will be available at: http://localhost:8000
API docs at: http://localhost:8000/docs

### Docker Setup (Alternative)
```bash
docker-compose up --build
```

## API Endpoints

### Weather Endpoints
- `GET /api/weather/current?location={location}` - Current weather
- `GET /api/weather/forecast?location={location}` - 7-day forecast
- `POST /api/weather/query` - Natural language weather query

### User Preferences
- `POST /api/user/preferences` - Set user preferences
- `GET /api/user/recommendations` - Get personalized recommendations

## Development

### Frontend Development
```bash
cd frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run linter
npm run type-check   # TypeScript check
```

### Backend Development
```bash
cd backend
uvicorn app.main:app --reload  # Start with hot reload
pytest                          # Run tests
black .                         # Format code
mypy .                          # Type checking
```

## Roadmap

- [x] Project setup
- [ ] Basic weather API integration
- [ ] Frontend UI components
- [ ] Natural language processing
- [ ] ML prediction models
- [ ] User preferences system
- [ ] Mobile responsive design
- [ ] Real-time updates
- [ ] Advanced visualizations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Acknowledgments

- OpenWeatherMap for weather data
- OpenAI for NLP capabilities
- The open-source community

---

Built with ❤️ using React, FastAPI, and AI
