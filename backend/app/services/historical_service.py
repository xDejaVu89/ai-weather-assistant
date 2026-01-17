from typing import List, Dict
from datetime import datetime, timedelta
import random


class HistoricalService:
    """Service for historical weather data and trends"""
    
    async def get_historical_weather(self, location: str, days: int = 30) -> List[Dict]:
        """Get historical weather data for analysis"""
        historical_data = []
        
        for i in range(days, 0, -1):
            date = datetime.now() - timedelta(days=i)
            # Mock historical data - replace with real API
            historical_data.append({
                "date": date.strftime("%Y-%m-%d"),
                "temp_avg": round(random.uniform(15, 30), 1),
                "temp_max": round(random.uniform(25, 35), 1),
                "temp_min": round(random.uniform(10, 20), 1),
                "humidity": random.randint(40, 90),
                "precipitation": round(random.uniform(0, 20), 1),
                "wind_speed": round(random.uniform(0, 25), 1)
            })
        
        return historical_data
    
    async def get_temperature_trends(self, location: str, days: int = 7) -> Dict:
        """Analyze temperature trends"""
        historical = await self.get_historical_weather(location, days)
        
        temps = [d["temp_avg"] for d in historical]
        avg_temp = sum(temps) / len(temps)
        
        # Calculate trend
        if len(temps) > 1:
            recent_avg = sum(temps[-3:]) / 3
            older_avg = sum(temps[:3]) / 3
            trend = "warming" if recent_avg > older_avg else "cooling"
        else:
            trend = "stable"
        
        return {
            "location": location,
            "period_days": days,
            "average_temperature": round(avg_temp, 1),
            "max_temperature": max(temps),
            "min_temperature": min(temps),
            "trend": trend,
            "data": historical
        }
    
    async def get_precipitation_forecast(self, location: str, hours: int = 24) -> List[Dict]:
        """Get hourly precipitation probability"""
        forecast = []
        
        for i in range(hours):
            time = datetime.now() + timedelta(hours=i)
            forecast.append({
                "time": time.strftime("%H:%M"),
                "precipitation_probability": random.randint(0, 100),
                "precipitation_amount": round(random.uniform(0, 5), 1) if random.random() > 0.7 else 0
            })
        
        return forecast
