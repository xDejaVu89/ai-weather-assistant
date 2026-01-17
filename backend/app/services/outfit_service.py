from typing import Dict, List


class OutfitService:
    """Service for AI-powered outfit suggestions based on weather"""
    
    async def get_outfit_suggestions(self, weather_data: Dict) -> Dict:
        """Generate clothing recommendations based on weather conditions"""
        temp = weather_data.get("temperature", 20)
        feels_like = weather_data.get("feels_like", temp)
        description = weather_data.get("description", "").lower()
        humidity = weather_data.get("humidity", 50)
        wind_speed = weather_data.get("wind_speed", 0)
        
        suggestions = {
            "outfit": [],
            "accessories": [],
            "footwear": [],
            "tips": [],
            "color_palette": []
        }
        
        # Temperature-based clothing
        if temp < 0:
            suggestions["outfit"] = ["Heavy winter coat", "Thermal underwear", "Wool sweater", "Thick pants"]
            suggestions["accessories"] = ["Insulated gloves", "Warm hat", "Scarf"]
            suggestions["footwear"] = ["Insulated boots"]
            suggestions["tips"].append("Layer up! Multiple thin layers trap heat better")
        elif temp < 10:
            suggestions["outfit"] = ["Winter jacket", "Long-sleeve shirt", "Jeans or pants"]
            suggestions["accessories"] = ["Light gloves", "Beanie"]
            suggestions["footwear"] = ["Boots or closed shoes"]
            suggestions["tips"].append("Bring a light scarf for extra warmth")
        elif temp < 20:
            suggestions["outfit"] = ["Light jacket or cardigan", "Long-sleeve shirt", "Jeans"]
            suggestions["accessories"] = ["Light scarf (optional)"]
            suggestions["footwear"] = ["Sneakers or casual shoes"]
            suggestions["tips"].append("Perfect layering weather")
        elif temp < 25:
            suggestions["outfit"] = ["T-shirt", "Light pants or jeans"]
            suggestions["accessories"] = ["Sunglasses"]
            suggestions["footwear"] = ["Comfortable sneakers"]
            suggestions["tips"].append("Light and comfortable clothing recommended")
        else:
            suggestions["outfit"] = ["Light breathable shirt", "Shorts or light pants"]
            suggestions["accessories"] = ["Sunglasses", "Sun hat", "Sunscreen"]
            suggestions["footwear"] = ["Sandals or breathable shoes"]
            suggestions["tips"].append("Stay cool with light, breathable fabrics")
        
        # Weather condition adjustments
        if "rain" in description or "drizzle" in description:
            suggestions["accessories"].append("Umbrella")
            suggestions["footwear"] = ["Waterproof shoes or boots"]
            suggestions["outfit"].append("Waterproof jacket")
            suggestions["tips"].append("Waterproof gear recommended")
        
        if "snow" in description:
            suggestions["accessories"].extend(["Waterproof gloves", "Winter hat"])
            suggestions["footwear"] = ["Waterproof insulated boots"]
            suggestions["tips"].append("Protect against cold and moisture")
        
        if wind_speed > 20:
            suggestions["outfit"].append("Windbreaker")
            suggestions["tips"].append("Windy conditions - wear wind-resistant layers")
        
        if humidity > 80:
            suggestions["tips"].append("High humidity - choose moisture-wicking fabrics")
        
        # Color palette suggestions based on weather
        if "sunny" in description or "clear" in description:
            suggestions["color_palette"] = ["Bright colors", "Pastels", "White"]
        elif "cloudy" in description:
            suggestions["color_palette"] = ["Neutral tones", "Earth colors"]
        elif "rain" in description:
            suggestions["color_palette"] = ["Dark colors", "Navy", "Black"]
        
        return suggestions
    
    async def get_activity_recommendations(self, weather_data: Dict) -> List[Dict]:
        """Recommend activities based on weather"""
        temp = weather_data.get("temperature", 20)
        description = weather_data.get("description", "").lower()
        
        activities = []
        
        if 15 <= temp <= 25 and "clear" in description:
            activities.extend([
                {"activity": "Outdoor Running", "rating": 5, "reason": "Perfect conditions"},
                {"activity": "Cycling", "rating": 5, "reason": "Great weather for biking"},
                {"activity": "Picnic", "rating": 5, "reason": "Ideal outdoor conditions"}
            ])
        elif "rain" in description:
            activities.extend([
                {"activity": "Indoor Gym", "rating": 5, "reason": "Stay dry indoors"},
                {"activity": "Museum Visit", "rating": 4, "reason": "Great rainy day activity"},
                {"activity": "Movie Theater", "rating": 4, "reason": "Cozy indoor option"}
            ])
        elif temp > 30:
            activities.extend([
                {"activity": "Swimming", "rating": 5, "reason": "Cool off in the water"},
                {"activity": "Indoor Activities", "rating": 4, "reason": "Escape the heat"},
                {"activity": "Evening Walk", "rating": 3, "reason": "Wait for cooler evening"}
            ])
        
        return activities
