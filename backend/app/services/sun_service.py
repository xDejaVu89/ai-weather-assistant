from typing import Dict
from datetime import datetime, timedelta
import random
import math


class SunService:
    """Service for UV index and sun times"""
    
    async def get_sun_data(self, location: str, lat: float = 0, lon: float = 0) -> Dict:
        """Get UV index, sunrise, and sunset times"""
        # Mock data - replace with real API
        now = datetime.now()
        
        # Calculate approximate sunrise/sunset (simplified)
        sunrise = now.replace(hour=6, minute=30, second=0)
        sunset = now.replace(hour=18, minute=45, second=0)
        
        # UV index (0-11+ scale)
        uv_index = random.uniform(0, 11)
        
        if uv_index < 3:
            uv_category = "Low"
            uv_recommendation = "No protection needed"
        elif uv_index < 6:
            uv_category = "Moderate"
            uv_recommendation = "Wear sunscreen SPF 30+"
        elif uv_index < 8:
            uv_category = "High"
            uv_recommendation = "Protection essential. Wear sunscreen SPF 30+, hat, and sunglasses"
        elif uv_index < 11:
            uv_category = "Very High"
            uv_recommendation = "Extra protection required. Avoid sun during midday hours"
        else:
            uv_category = "Extreme"
            uv_recommendation = "Take all precautions. Avoid sun exposure"
        
        # Calculate day length
        day_length = sunset - sunrise
        hours = day_length.seconds // 3600
        minutes = (day_length.seconds % 3600) // 60
        
        # Solar noon (midpoint between sunrise and sunset)
        solar_noon = sunrise + (sunset - sunrise) / 2
        
        return {
            "location": location,
            "sunrise": sunrise.strftime("%H:%M"),
            "sunset": sunset.strftime("%H:%M"),
            "solar_noon": solar_noon.strftime("%H:%M"),
            "day_length": f"{hours}h {minutes}m",
            "uv_index": round(uv_index, 1),
            "uv_category": uv_category,
            "uv_recommendation": uv_recommendation,
            "timestamp": now.isoformat()
        }
    
    async def get_moon_phase(self) -> Dict:
        """Get current moon phase"""
        phases = [
            "New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous",
            "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"
        ]
        
        # Simplified moon phase calculation
        phase_index = random.randint(0, 7)
        
        return {
            "phase": phases[phase_index],
            "illumination": random.randint(0, 100),
            "emoji": "🌑🌒🌓🌔🌕🌖🌗🌘"[phase_index]
        }
