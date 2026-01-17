from typing import List, Dict
import random
from datetime import datetime, timedelta


class DetailedWeatherService:
    """Service for detailed weather metrics"""
    
    async def get_hourly_forecast(self, location: str, hours: int = 24) -> List[Dict]:
        """Get detailed hourly forecast"""
        forecast = []
        
        for i in range(hours):
            time = datetime.now() + timedelta(hours=i)
            temp = round(random.uniform(15, 30), 1)
            
            forecast.append({
                "time": time.strftime("%H:%M"),
                "datetime": time.isoformat(),
                "temperature": temp,
                "feels_like": round(temp + random.uniform(-3, 3), 1),
                "humidity": random.randint(40, 90),
                "precipitation_probability": random.randint(0, 100),
                "wind_speed": round(random.uniform(0, 25), 1),
                "wind_direction": random.choice(["N", "NE", "E", "SE", "S", "SW", "W", "NW"]),
                "pressure": random.randint(990, 1030),
                "visibility": round(random.uniform(5, 15), 1),
                "uv_index": random.randint(0, 11),
                "description": random.choice(["Clear", "Partly Cloudy", "Cloudy", "Light Rain"])
            })
        
        return forecast
    
    async def get_wind_details(self, location: str) -> Dict:
        """Get detailed wind information"""
        speed = round(random.uniform(0, 30), 1)
        direction = random.choice(["N", "NE", "E", "SE", "S", "SW", "W", "NW"])
        gust_speed = round(speed * random.uniform(1.2, 1.5), 1)
        
        # Wind classification
        if speed < 1:
            description = "Calm"
        elif speed < 5:
            description = "Light Air"
        elif speed < 12:
            description = "Light Breeze"
        elif speed < 20:
            description = "Moderate Breeze"
        elif speed < 29:
            description = "Fresh Breeze"
        elif speed < 39:
            description = "Strong Breeze"
        else:
            description = "Gale"
        
        return {
            "location": location,
            "speed": speed,
            "speed_kmh": speed,
            "speed_mph": round(speed * 0.621371, 1),
            "gust_speed": gust_speed,
            "direction": direction,
            "direction_degrees": random.randint(0, 359),
            "description": description
        }
    
    async def get_pressure_trends(self, location: str) -> Dict:
        """Get atmospheric pressure trends"""
        current_pressure = random.randint(990, 1030)
        hour_ago = current_pressure + random.randint(-3, 3)
        
        if current_pressure > hour_ago:
            trend = "rising"
            forecast = "Improving weather conditions expected"
        elif current_pressure < hour_ago:
            trend = "falling"
            forecast = "Weather may deteriorate"
        else:
            trend = "steady"
            forecast = "Weather conditions stable"
        
        return {
            "location": location,
            "current": current_pressure,
            "trend": trend,
            "change_last_hour": current_pressure - hour_ago,
            "forecast": forecast,
            "unit": "hPa"
        }
    
    async def get_visibility_data(self, location: str) -> Dict:
        """Get visibility information"""
        visibility = round(random.uniform(2, 15), 1)
        
        if visibility >= 10:
            quality = "Excellent"
            description = "Clear view for long distances"
        elif visibility >= 5:
            quality = "Good"
            description = "Good visibility for most activities"
        elif visibility >= 2:
            quality = "Moderate"
            description = "Limited visibility in some areas"
        else:
            quality = "Poor"
            description = "Reduced visibility, drive carefully"
        
        return {
            "location": location,
            "distance_km": visibility,
            "distance_miles": round(visibility * 0.621371, 1),
            "quality": quality,
            "description": description
        }
