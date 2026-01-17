from typing import List, Dict
import random


class PollenService:
    """Service for pollen count and allergy information"""
    
    async def get_pollen_data(self, location: str) -> Dict:
        """Get current pollen levels"""
        # Mock pollen data - replace with real allergy API
        pollen_types = {
            "tree": random.randint(0, 100),
            "grass": random.randint(0, 100),
            "weed": random.randint(0, 100),
            "mold": random.randint(0, 100)
        }
        
        # Calculate overall level
        max_pollen = max(pollen_types.values())
        
        if max_pollen < 30:
            level = "Low"
            color = "green"
            advice = "Great day for outdoor activities. Allergy risk is minimal."
        elif max_pollen < 60:
            level = "Moderate"
            color = "yellow"
            advice = "Some symptoms possible for sensitive individuals. Monitor your symptoms."
        elif max_pollen < 90:
            level = "High"
            color = "orange"
            advice = "Most allergy sufferers will experience symptoms. Consider staying indoors."
        else:
            level = "Very High"
            color = "red"
            advice = "Severe symptoms likely. Stay indoors and keep windows closed."
        
        return {
            "location": location,
            "overall_level": level,
            "overall_index": max_pollen,
            "color": color,
            "advice": advice,
            "pollen_types": pollen_types,
            "dominant_type": max(pollen_types.items(), key=lambda x: x[1])[0]
        }
    
    async def get_pollen_forecast(self, location: str, days: int = 3) -> List[Dict]:
        """Get pollen forecast for upcoming days"""
        forecast = []
        
        for i in range(days):
            forecast.append({
                "day": i + 1,
                "date": f"Day {i + 1}",
                "level": random.choice(["Low", "Moderate", "High"]),
                "index": random.randint(20, 90)
            })
        
        return forecast
