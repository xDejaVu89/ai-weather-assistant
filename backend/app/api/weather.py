from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import Optional, List, Dict
from app.services.weather_service import WeatherService
from app.services.nlp_service import NLPService
from app.services.alert_service import AlertService
from app.services.location_service import LocationService
from app.services.air_quality_service import AirQualityService
from app.services.sun_service import SunService
from app.services.outfit_service import OutfitService
from app.services.historical_service import HistoricalService
from app.services.pollen_service import PollenService
from app.services.detailed_weather_service import DetailedWeatherService
from app.services.comparison_service import ComparisonService

router = APIRouter()
weather_service = WeatherService()
nlp_service = NLPService()
alert_service = AlertService()
location_service = LocationService()
air_quality_service = AirQualityService()
sun_service = SunService()
outfit_service = OutfitService()
historical_service = HistoricalService()
pollen_service = PollenService()
detailed_weather_service = DetailedWeatherService()
comparison_service = ComparisonService()


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


@router.get("/historical")
async def get_historical_weather(location: str = Query(..., description="City name"), days: int = Query(30, ge=1, le=365)):
    """Get historical weather data"""
    try:
        historical_data = await historical_service.get_historical_weather(location, days)
        return {"location": location, "days": days, "data": historical_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/trends")
async def get_temperature_trends(location: str = Query(..., description="City name"), days: int = Query(7, ge=1, le=30)):
    """Get temperature trends and analysis"""
    try:
        trends = await historical_service.get_temperature_trends(location, days)
        return trends
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/precipitation")
async def get_precipitation_forecast(location: str = Query(..., description="City name"), hours: int = Query(24, ge=1, le=48)):
    """Get hourly precipitation forecast"""
    try:
        forecast = await historical_service.get_precipitation_forecast(location, hours)
        return {"location": location, "hours": hours, "forecast": forecast}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/pollen")
async def get_pollen_data(location: str = Query(..., description="City name")):
    """Get pollen count and allergy information"""
    try:
        pollen_data = await pollen_service.get_pollen_data(location)
        return pollen_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/pollen/forecast")
async def get_pollen_forecast(location: str = Query(..., description="City name"), days: int = Query(3, ge=1, le=7)):
    """Get pollen forecast"""
    try:
        forecast = await pollen_service.get_pollen_forecast(location, days)
        return {"location": location, "forecast": forecast}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/hourly")
async def get_hourly_forecast(location: str = Query(..., description="City name"), hours: int = Query(24, ge=1, le=48)):
    """Get detailed hourly forecast"""
    try:
        forecast = await detailed_weather_service.get_hourly_forecast(location, hours)
        return {"location": location, "hours": hours, "forecast": forecast}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/wind")
async def get_wind_details(location: str = Query(..., description="City name")):
    """Get detailed wind information"""
    try:
        wind_data = await detailed_weather_service.get_wind_details(location)
        return wind_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/pressure")
async def get_pressure_trends(location: str = Query(..., description="City name")):
    """Get atmospheric pressure trends"""
    try:
        pressure_data = await detailed_weather_service.get_pressure_trends(location)
        return pressure_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/visibility")
async def get_visibility_data(location: str = Query(..., description="City name")):
    """Get visibility information"""
    try:
        visibility_data = await detailed_weather_service.get_visibility_data(location)
        return visibility_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


class ComparisonRequest(BaseModel):
    cities: List[str]
    preferences: Optional[Dict] = None


@router.post("/compare")
async def compare_cities(request: ComparisonRequest):
    """Compare weather across multiple cities"""
    try:
        comparison = await comparison_service.compare_cities(request.cities)
        return comparison
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/best-destination")
async def get_best_destination(request: ComparisonRequest):
    """Get best destination based on weather preferences"""
    try:
        if not request.preferences:
            request.preferences = {"ideal_temperature": 22, "low_humidity": True, "low_wind": True}
        
        recommendation = await comparison_service.get_best_destination(request.cities, request.preferences)
        return recommendation
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
async def get_activity_recommendations(location: str = Query(..., description="City name")):
    """Get activity recommendations based on weather"""
    try:
        weather_data = await weather_service.get_current_weather(location)
        activities = await outfit_service.get_activity_recommendations(weather_data)
        return {"location": location, "activities": activities}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
