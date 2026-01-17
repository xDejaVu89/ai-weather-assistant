from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import Optional, List
from app.services.weather_service import WeatherService
from app.services.nlp_service import NLPService
from app.services.alert_service import AlertService
from app.services.location_service import LocationService
from app.services.air_quality_service import AirQualityService
from app.services.sun_service import SunService
from app.services.outfit_service import OutfitService

router = APIRouter()
weather_service = WeatherService()
nlp_service = NLPService()
alert_service = AlertService()
location_service = LocationService()
air_quality_service = AirQualityService()
sun_service = SunService()
outfit_service = OutfitService()


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


@router.get("/alerts")
async def get_alerts(location: str = Query(..., description="City name")):
    """Get weather alerts for a location"""
    try:
        alerts = await alert_service.get_alerts(location)
        return {"location": location, "alerts": alerts}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/locations/search")
async def search_locations(query: str = Query(..., description="Search query"), limit: int = Query(10, ge=1, le=50)):
    """Search for locations with autocomplete"""
    try:
        results = await location_service.search_locations(query, limit)
        return {"query": query, "results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/air-quality")
async def get_air_quality(location: str = Query(..., description="City name")):
    """Get current air quality index"""
    try:
        air_quality = await air_quality_service.get_air_quality(location)
        return air_quality
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/air-quality/forecast")
async def get_air_quality_forecast(location: str = Query(..., description="City name"), days: int = Query(3, ge=1, le=7)):
    """Get air quality forecast"""
    try:
        forecast = await air_quality_service.get_air_quality_forecast(location, days)
        return {"location": location, "forecast": forecast}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/sun")
async def get_sun_data(location: str = Query(..., description="City name"), lat: float = Query(0), lon: float = Query(0)):
    """Get UV index, sunrise, and sunset times"""
    try:
        sun_data = await sun_service.get_sun_data(location, lat, lon)
        return sun_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/moon")
async def get_moon_phase():
    """Get current moon phase"""
    try:
        moon_data = await sun_service.get_moon_phase()
        return moon_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/outfit")
async def get_outfit_suggestions(location: str = Query(..., description="City name")):
    """Get AI-powered outfit suggestions based on weather"""
    try:
        weather_data = await weather_service.get_current_weather(location)
        outfit_suggestions = await outfit_service.get_outfit_suggestions(weather_data)
        return {"location": location, "weather": weather_data, "suggestions": outfit_suggestions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/activities")
async def get_activity_recommendations(location: str = Query(..., description="City name")):
    """Get activity recommendations based on weather"""
    try:
        weather_data = await weather_service.get_current_weather(location)
        activities = await outfit_service.get_activity_recommendations(weather_data)
        return {"location": location, "activities": activities}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
