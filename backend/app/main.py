from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import weather, user, features
from app.core.config import settings

app = FastAPI(
    title="AI Weather Assistant API",
    description="Super smart AI-powered weather application API with all 10 advanced features",
    version="2.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(weather.router, prefix="/api/weather", tags=["weather"])
app.include_router(user.router, prefix="/api/user", tags=["user"])
app.include_router(features.router, prefix="/api", tags=["features"])


@app.get("/")
async def root():
    return {
        "message": "Welcome to AI Weather Assistant API v2.0",
        "version": "2.0.0",
        "docs": "/docs",
        "features": [
            "User Authentication & Profiles",
            "Real-Time Alerts & Notifications",
            "Weather Data Export (JSON/CSV/PDF)",
            "Advanced Weather Maps",
            "Health & Safety Alerts",
            "Activity Planner",
            "Integration APIs",
            "Seasonal Analysis",
            "Travel Planner",
            "Climate & Sustainability"
        ]
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "2.0.0"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
