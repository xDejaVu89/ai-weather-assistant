from typing import List, Dict
from datetime import datetime, timedelta
import random


class AirQualityService:
    """Service for air quality index data"""
    
    async def get_air_quality(self, location: str) -> Dict:
        """Get current air quality index for location"""
        # Mock data - replace with real AQI API like OpenWeatherMap Air Pollution API
        aqi_value = random.randint(20, 150)
        
        # Determine AQI category
        if aqi_value <= 50:
            category = "Good"
            color = "green"
            description = "Air quality is satisfactory, and air pollution poses little or no risk."
        elif aqi_value <= 100:
            category = "Moderate"
            color = "yellow"
            description = "Air quality is acceptable. However, there may be a risk for some people."
        elif aqi_value <= 150:
            category = "Unhealthy for Sensitive Groups"
            color = "orange"
            description = "Members of sensitive groups may experience health effects."
        elif aqi_value <= 200:
            category = "Unhealthy"
            color = "red"
            description = "Everyone may begin to experience health effects."
        else:
            category = "Very Unhealthy"
            color = "purple"
            description = "Health alert: everyone may experience more serious health effects."
        
        return {
            "location": location,
            "aqi": aqi_value,
            "category": category,
            "color": color,
            "description": description,
            "pollutants": {
                "pm25": random.randint(10, 80),
                "pm10": random.randint(20, 100),
                "o3": random.randint(30, 120),
                "no2": random.randint(10, 60),
                "so2": random.randint(5, 40),
                "co": random.randint(100, 500)
            },
            "timestamp": datetime.now().isoformat()
        }
    
    async def get_air_quality_forecast(self, location: str, days: int = 3) -> List[Dict]:
        """Get air quality forecast for upcoming days"""
        forecast = []
        for i in range(days):
            date = datetime.now() + timedelta(days=i)
            aqi_value = random.randint(30, 120)
            
            forecast.append({
                "date": date.strftime("%Y-%m-%d"),
                "aqi": aqi_value,
                "category": "Good" if aqi_value <= 50 else "Moderate" if aqi_value <= 100 else "Unhealthy"
            })
        
        return forecast
