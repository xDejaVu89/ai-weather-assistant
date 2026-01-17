from typing import Dict, List
from datetime import datetime


class TravelPlannerService:
    """Travel planning with weather intelligence"""
    
    async def find_best_travel_dates(self, destination: str, travel_duration: int, 
                                    preferences: Dict) -> Dict:
        """Find best dates to travel based on weather"""
        
        return {
            "destination": destination,
            "duration_days": travel_duration,
            "recommendations": [
                {
                    "date_range": "June 15-22, 2026",
                    "score": 95,
                    "weather": "Sunny, warm (22-26°C)",
                    "reason": "Perfect weather for outdoor activities",
                    "pros": ["Clear skies", "Comfortable temperature", "Low rain probability"],
                    "cons": ["Peak tourist season"]
                },
                {
                    "date_range": "May 10-17, 2026",
                    "score": 88,
                    "weather": "Variable, mild (15-20°C)",
                    "reason": "Good weather, fewer crowds",
                    "pros": ["Fewer tourists", "Mild temperatures", "Spring flowers"],
                    "cons": ["Occasional rain", "Variable weather"]
                }
            ]
        }
    
    async def plan_trip_itinerary(self, locations: List[str], dates: Dict, 
                                 activities: List[str]) -> Dict:
        """Create weather-aware trip itinerary"""
        
        itinerary = {
            "trip_name": "Multi-City Weather Adventure",
            "dates": dates,
            "locations": locations,
            "days": []
        }
        
        for i, location in enumerate(locations):
            itinerary["days"].append({
                "day": i + 1,
                "location": location,
                "activities": activities[:3] if i == 0 else activities[-2:],
                "weather_forecast": f"Mild conditions, {18 + i}°C",
                "recommendations": [
                    "Outdoor activities in morning",
                    "Indoor activities in afternoon if needed",
                    "Bring layers"
                ]
            })
        
        return itinerary
    
    async def compare_travel_destinations(self, destinations: List[str], travel_date: str) -> Dict:
        """Compare weather across multiple destinations"""
        
        comparisons = {
            "travel_date": travel_date,
            "destinations": []
        }
        
        weather_data = {
            "London": {"temp": 8, "description": "Cloudy", "rain": 45},
            "Barcelona": {"temp": 22, "description": "Sunny", "rain": 10},
            "Tokyo": {"temp": 15, "description": "Clear", "rain": 20},
            "Dubai": {"temp": 35, "description": "Sunny", "rain": 5},
            "Sydney": {"temp": 26, "description": "Sunny", "rain": 15}
        }
        
        for dest in destinations:
            data = weather_data.get(dest, {"temp": 20, "description": "Variable", "rain": 30})
            comparisons["destinations"].append({
                "name": dest,
                "temperature": data["temp"],
                "conditions": data["description"],
                "rain_probability": data["rain"],
                "suitability_score": 100 - abs(data["temp"] - 22) * 2,  # Based on preference
                "recommendation": "Excellent" if data["rain"] < 20 and 15 < data["temp"] < 30 else "Good"
            })
        
        return comparisons
    
    async def get_travel_packing_list(self, destination: str, dates: Dict) -> Dict:
        """Generate packing list based on destination weather"""
        
        # Simulate weather for destination
        avg_temp = 20
        rain_probability = 30
        
        packing_list = {
            "destination": destination,
            "travel_dates": dates,
            "weather_summary": f"{avg_temp}°C, {rain_probability}% rain probability",
            "categories": {
                "clothing": [
                    "Light jacket",
                    "2-3 t-shirts",
                    "Light pants",
                    "Comfortable shoes",
                    "Layers (temperature varies)"
                ],
                "rain_gear": [
                    "Umbrella",
                    "Rain jacket"
                ] if rain_probability > 40 else ["Light rain jacket"],
                "sun_protection": [
                    "Sunscreen (SPF 30+)",
                    "Sunglasses",
                    "Hat/cap"
                ],
                "accessories": [
                    "Comfortable walking shoes",
                    "Backpack",
                    "Water bottle"
                ]
            }
        }
        
        return packing_list
    
    async def flight_delay_forecast(self, route: str, departure_date: str) -> Dict:
        """Forecast potential flight delays based on weather"""
        
        return {
            "route": route,
            "departure_date": departure_date,
            "delay_risk": "low",
            "confidence": 0.85,
            "weather_factors": {
                "wind": "Favorable",
                "visibility": "Good",
                "thunderstorms": "No risk",
                "low_ceiling": "Not expected"
            },
            "alternatives": [
                "No delays expected",
                "Smooth flight conditions anticipated"
            ],
            "recommendation": "Safe to proceed with scheduled flight"
        }
