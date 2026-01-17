from typing import Dict, List
from datetime import datetime


class ActivityPlannerService:
    """Activity planner based on weather"""
    
    async def get_activity_recommendations(self, forecast_data: List[Dict]) -> Dict:
        """Get activity recommendations for next 7 days"""
        
        recommendations = {
            "date": datetime.now().isoformat(),
            "days": []
        }
        
        for day in forecast_data[:7]:
            temp = day.get("temperature", 20)
            description = day.get("description", "").lower()
            humidity = day.get("humidity", 50)
            wind = day.get("wind_speed", 0)
            
            activities = self._get_day_activities(temp, description, humidity, wind)
            
            recommendations["days"].append({
                "date": day.get("date", ""),
                "temperature": temp,
                "weather": description,
                "recommended_activities": activities,
                "activity_score": sum([a["suitability"] for a in activities]) / max(len(activities), 1)
            })
        
        return recommendations
    
    def _get_day_activities(self, temp: float, weather: str, humidity: float, wind: float) -> List[Dict]:
        """Get suitable activities for conditions"""
        
        activities = []
        
        # Outdoor Sports
        if 15 < temp < 28 and "rain" not in weather and wind < 25:
            activities.append({
                "name": "Running/Jogging",
                "category": "sport",
                "suitability": 95,
                "tips": "Perfect weather for cardio"
            })
        
        # Hiking
        if 10 < temp < 25 and "rain" not in weather and wind < 20:
            activities.append({
                "name": "Hiking",
                "category": "outdoor",
                "suitability": 90,
                "tips": "Great conditions for trail hiking"
            })
        
        # Cycling
        if 12 < temp < 26 and "rain" not in weather and wind < 22:
            activities.append({
                "name": "Cycling",
                "category": "sport",
                "suitability": 85,
                "tips": "Ideal cycling weather"
            })
        
        # Picnic
        if 18 < temp < 28 and "rain" not in weather and humidity < 75:
            activities.append({
                "name": "Picnic",
                "category": "social",
                "suitability": 88,
                "tips": "Perfect for outdoor dining"
            })
        
        # Swimming/Water Sports
        if temp > 25 and "rain" not in weather:
            activities.append({
                "name": "Swimming",
                "category": "sport",
                "suitability": 92,
                "tips": "Great day for water activities"
            })
        
        # Indoor Activities
        if "rain" in weather or temp < 10 or temp > 32:
            activities.append({
                "name": "Indoor Activities",
                "category": "indoor",
                "suitability": 85,
                "tips": "Consider gym, movies, or museums"
            })
        
        # Beach
        if 20 < temp < 30 and "rain" not in weather and wind < 25:
            activities.append({
                "name": "Beach",
                "category": "outdoor",
                "suitability": 93,
                "tips": "Perfect beach weather"
            })
        
        # Golf
        if 12 < temp < 26 and "rain" not in weather and wind < 20:
            activities.append({
                "name": "Golf",
                "category": "sport",
                "suitability": 87,
                "tips": "Excellent golfing conditions"
            })
        
        # Skiing/Winter Sports
        if temp < 0 and "snow" in weather:
            activities.append({
                "name": "Skiing/Snowboarding",
                "category": "sport",
                "suitability": 94,
                "tips": "Perfect winter sports conditions"
            })
        
        # Photography
        if "clear" in weather or "sunny" in weather:
            activities.append({
                "name": "Photography",
                "category": "hobby",
                "suitability": 90,
                "tips": "Great lighting for outdoor photography"
            })
        
        return sorted(activities, key=lambda x: x["suitability"], reverse=True)
    
    async def create_event_plan(self, event_type: str, date: str, location: str, 
                               forecast: List[Dict]) -> Dict:
        """Create optimized event plan based on weather"""
        
        day_forecast = forecast[0] if forecast else {}
        temp = day_forecast.get("temperature", 20)
        description = day_forecast.get("description", "")
        
        plan = {
            "event_type": event_type,
            "date": date,
            "location": location,
            "weather_forecast": description,
            "recommendations": [],
            "contingency_plans": []
        }
        
        if event_type == "wedding":
            plan["recommendations"] = [
                "Outdoor ceremony feasible" if "rain" not in description else "Consider tent",
                f"Comfortable guest temperature: {temp}°C",
                "Ensure adequate shade areas",
                "Have backup indoor location ready"
            ]
        
        elif event_type == "concert":
            plan["recommendations"] = [
                "Outdoor venue suitable" if "rain" not in description else "Move indoors",
                "Sound system may need adjustment for wind",
                "Heating/cooling for crowd comfort"
            ]
        
        elif event_type == "sports_event":
            plan["recommendations"] = [
                "Playing conditions are good" if temp < 30 else "Heat mitigation needed",
                f"Wind conditions suitable for {event_type}"
            ]
        
        return plan
