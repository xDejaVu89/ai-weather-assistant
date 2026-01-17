import httpx
from typing import Dict, List
from app.core.config import settings


class WeatherService:
    """Service for fetching and processing weather data"""
    
    def __init__(self):
        self.api_key = settings.openweather_api_key
        self.base_url = "https://api.openweathermap.org/data/2.5"
    
    async def get_current_weather(self, location: str) -> Dict:
        """Fetch current weather data from OpenWeatherMap API"""
        if not self.api_key:
            # Return mock data if API key is not configured
            return self._get_mock_current_weather(location)
        
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.base_url}/weather",
                params={
                    "q": location,
                    "appid": self.api_key,
                    "units": "metric"
                }
            )
            response.raise_for_status()
            data = response.json()
            
            return {
                "location": location,
                "temperature": data["main"]["temp"],
                "feels_like": data["main"]["feels_like"],
                "humidity": data["main"]["humidity"],
                "description": data["weather"][0]["description"],
                "wind_speed": data["wind"]["speed"],
                "timestamp": data["dt"]
            }
    
    async def get_forecast(self, location: str) -> List[Dict]:
        """Fetch 7-day forecast from OpenWeatherMap API"""
        if not self.api_key:
            # Return mock data if API key is not configured
            return self._get_mock_forecast(location)
        
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.base_url}/forecast",
                params={
                    "q": location,
                    "appid": self.api_key,
                    "units": "metric"
                }
            )
            response.raise_for_status()
            data = response.json()
            
            # Process forecast data (simplified - takes one reading per day)
            forecast = []
            seen_dates = set()
            
            for item in data["list"]:
                date = item["dt_txt"].split()[0]
                if date not in seen_dates:
                    forecast.append({
                        "date": date,
                        "temp_max": item["main"]["temp_max"],
                        "temp_min": item["main"]["temp_min"],
                        "description": item["weather"][0]["description"],
                        "humidity": item["main"]["humidity"]
                    })
                    seen_dates.add(date)
                
                if len(forecast) >= 7:
                    break
            
            return forecast
    
    async def get_recommendations(self, location: str) -> Dict:
        """Generate AI-powered weather recommendations"""
        weather = await self.get_current_weather(location)
        
        # Simple rule-based recommendations (can be enhanced with ML)
        recommendations = {
            "activities": [],
            "warnings": [],
            "tips": []
        }
        
        temp = weather["temperature"]
        humidity = weather["humidity"]
        
        if 15 <= temp <= 25 and humidity < 70:
            recommendations["activities"].append({
                "activity": "Outdoor Exercise",
                "reason": "Perfect weather conditions"
            })
        
        if temp > 30:
            recommendations["warnings"].append("High temperature - stay hydrated")
            recommendations["tips"].append("Avoid outdoor activities during peak hours")
        
        if humidity > 80:
            recommendations["warnings"].append("High humidity - may feel uncomfortable")
        
        return recommendations
    
    def _get_mock_current_weather(self, location: str) -> Dict:
        """Return mock weather data for testing"""
        return {
            "location": location,
            "temperature": 22.5,
            "feels_like": 21.0,
            "humidity": 65,
            "description": "partly cloudy",
            "wind_speed": 3.5,
            "timestamp": 1705507200
        }
    
    def _get_mock_forecast(self, location: str) -> List[Dict]:
        """Return mock forecast data for testing"""
        return [
            {"date": "2026-01-18", "temp_max": 24, "temp_min": 18, "description": "sunny", "humidity": 60},
            {"date": "2026-01-19", "temp_max": 26, "temp_min": 19, "description": "clear", "humidity": 55},
            {"date": "2026-01-20", "temp_max": 23, "temp_min": 17, "description": "cloudy", "humidity": 70},
            {"date": "2026-01-21", "temp_max": 25, "temp_min": 20, "description": "sunny", "humidity": 50},
            {"date": "2026-01-22", "temp_max": 27, "temp_min": 21, "description": "clear", "humidity": 48},
            {"date": "2026-01-23", "temp_max": 24, "temp_min": 19, "description": "partly cloudy", "humidity": 62},
            {"date": "2026-01-24", "temp_max": 22, "temp_min": 16, "description": "rainy", "humidity": 75},
        ]
