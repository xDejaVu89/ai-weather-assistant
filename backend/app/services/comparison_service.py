from typing import List, Dict
from datetime import datetime


class ComparisonService:
    """Service for comparing weather between cities"""
    
    async def compare_cities(self, cities: List[str]) -> Dict:
        """Compare weather data across multiple cities"""
        from app.services.weather_service import WeatherService
        
        weather_service = WeatherService()
        comparison_data = []
        
        for city in cities[:5]:  # Limit to 5 cities
            try:
                weather = await weather_service.get_current_weather(city)
                comparison_data.append({
                    "city": city,
                    "temperature": weather.get("temperature", 0),
                    "feels_like": weather.get("feels_like", 0),
                    "humidity": weather.get("humidity", 0),
                    "description": weather.get("description", ""),
                    "wind_speed": weather.get("wind_speed", 0)
                })
            except Exception as e:
                print(f"Error fetching weather for {city}: {e}")
        
        # Find extremes
        if comparison_data:
            hottest = max(comparison_data, key=lambda x: x["temperature"])
            coldest = min(comparison_data, key=lambda x: x["temperature"])
            most_humid = max(comparison_data, key=lambda x: x["humidity"])
            windiest = max(comparison_data, key=lambda x: x["wind_speed"])
        else:
            hottest = coldest = most_humid = windiest = None
        
        return {
            "cities": comparison_data,
            "comparison_date": datetime.now().isoformat(),
            "extremes": {
                "hottest": hottest,
                "coldest": coldest,
                "most_humid": most_humid,
                "windiest": windiest
            }
        }
    
    async def get_best_destination(self, cities: List[str], preferences: Dict) -> Dict:
        """Recommend best city based on weather preferences"""
        comparison = await self.compare_cities(cities)
        
        # Simple scoring based on preferences
        scored_cities = []
        for city_data in comparison["cities"]:
            score = 0
            
            # Temperature preference
            ideal_temp = preferences.get("ideal_temperature", 22)
            temp_diff = abs(city_data["temperature"] - ideal_temp)
            score += max(0, 100 - (temp_diff * 10))
            
            # Humidity preference
            if preferences.get("low_humidity", False):
                score += max(0, 100 - city_data["humidity"])
            
            # Wind preference
            if preferences.get("low_wind", False):
                score += max(0, 100 - (city_data["wind_speed"] * 5))
            
            scored_cities.append({
                **city_data,
                "score": round(score, 1)
            })
        
        # Sort by score
        scored_cities.sort(key=lambda x: x["score"], reverse=True)
        
        return {
            "recommendations": scored_cities,
            "best_choice": scored_cities[0] if scored_cities else None,
            "preferences_used": preferences
        }
