from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
from app.services.weather_service import WeatherService
from app.services.nlp_service import NLPService

router = APIRouter()
weather_service = WeatherService()
nlp_service = NLPService()


class QueryRequest(BaseModel):
    query: str


class QueryResponse(BaseModel):
    answer: str
    weather_data: Optional[dict] = None
    confidence: float


@router.get("/current")
async def get_current_weather(location: str = Query(..., description="City name")):
    """Get current weather for a location"""
    try:
        weather_data = await weather_service.get_current_weather(location)
        return weather_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/forecast")
async def get_forecast(location: str = Query(..., description="City name")):
    """Get 7-day weather forecast for a location"""
    try:
        forecast_data = await weather_service.get_forecast(location)
        return forecast_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/query", response_model=QueryResponse)
async def natural_language_query(request: QueryRequest):
    """Process natural language weather queries using AI"""
    try:
        response = await nlp_service.process_query(request.query)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/recommendations")
async def get_weather_recommendations(location: str = Query(..., description="City name")):
    """Get AI-powered weather recommendations"""
    try:
        recommendations = await weather_service.get_recommendations(location)
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
