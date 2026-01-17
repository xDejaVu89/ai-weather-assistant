from typing import Dict, List
from datetime import datetime


class HealthSafetyService:
    """Health and safety weather alerts"""
    
    async def get_health_risks(self, weather_data: Dict) -> Dict:
        """Assess health risks based on weather"""
        
        temp = weather_data.get("temperature", 20)
        humidity = weather_data.get("humidity", 50)
        uv_index = weather_data.get("uv_index", 0)
        aqi = weather_data.get("air_quality", 50)
        
        risks = {
            "temperature_risk": self._assess_temperature_risk(temp),
            "humidity_risk": self._assess_humidity_risk(humidity),
            "uv_risk": self._assess_uv_risk(uv_index),
            "air_quality_risk": self._assess_air_quality_risk(aqi),
            "overall_health_impact": "moderate"
        }
        
        # Calculate overall impact
        risk_levels = [
            risks["temperature_risk"]["level"],
            risks["humidity_risk"]["level"],
            risks["uv_risk"]["level"],
            risks["air_quality_risk"]["level"]
        ]
        
        if "critical" in risk_levels:
            risks["overall_health_impact"] = "critical"
        elif "high" in risk_levels:
            risks["overall_health_impact"] = "high"
        elif "moderate" in risk_levels:
            risks["overall_health_impact"] = "moderate"
        else:
            risks["overall_health_impact"] = "low"
        
        return risks
    
    def _assess_temperature_risk(self, temp: float) -> Dict:
        """Assess temperature-related health risks"""
        
        if temp > 40:
            return {
                "level": "critical",
                "condition": "Extreme Heat",
                "risk": "Heat stroke, dehydration",
                "advice": "Stay indoors, drink water constantly, avoid sun"
            }
        elif temp > 35:
            return {
                "level": "high",
                "condition": "Severe Heat",
                "risk": "Heat exhaustion, dehydration",
                "advice": "Limit outdoor activities, use sun protection"
            }
        elif temp > 28:
            return {
                "level": "moderate",
                "condition": "Warm",
                "risk": "Increased sweating, fatigue",
                "advice": "Drink plenty of water, take breaks"
            }
        elif temp > 18:
            return {
                "level": "low",
                "condition": "Comfortable",
                "risk": "None",
                "advice": "Normal outdoor activity safe"
            }
        elif temp > 10:
            return {
                "level": "moderate",
                "condition": "Cool",
                "risk": "Mild hypothermia with prolonged exposure",
                "advice": "Wear layers and proper clothing"
            }
        elif temp > 0:
            return {
                "level": "high",
                "condition": "Cold",
                "risk": "Hypothermia, frostbite risk",
                "advice": "Limit time outdoors, wear warm clothing"
            }
        else:
            return {
                "level": "critical",
                "condition": "Extreme Cold",
                "risk": "Rapid hypothermia, severe frostbite",
                "advice": "Avoid outdoors, seek shelter immediately"
            }
    
    def _assess_humidity_risk(self, humidity: float) -> Dict:
        """Assess humidity-related health risks"""
        
        if humidity > 85:
            return {
                "level": "high",
                "condition": "Excessive Humidity",
                "risk": "Heat stroke, respiratory issues",
                "advice": "Limit physical activity, stay hydrated"
            }
        elif humidity > 70:
            return {
                "level": "moderate",
                "condition": "High Humidity",
                "risk": "Discomfort, increased sweating",
                "advice": "Wear light clothing, drink water"
            }
        else:
            return {
                "level": "low",
                "condition": "Normal Humidity",
                "risk": "None",
                "advice": "Normal activity"
            }
    
    def _assess_uv_risk(self, uv_index: float) -> Dict:
        """Assess UV radiation risk"""
        
        if uv_index >= 11:
            return {
                "level": "critical",
                "condition": "Extreme UV",
                "risk": "Severe sunburn, skin damage",
                "advice": "Avoid sun, use SPF 50+ sunscreen every 15 min"
            }
        elif uv_index >= 8:
            return {
                "level": "high",
                "condition": "Very High UV",
                "risk": "Sunburn likely, skin damage",
                "advice": "Use SPF 30+ sunscreen, seek shade"
            }
        elif uv_index >= 6:
            return {
                "level": "moderate",
                "condition": "High UV",
                "risk": "Sunburn possible",
                "advice": "Use SPF 15+ sunscreen, limit time in sun"
            }
        elif uv_index >= 3:
            return {
                "level": "low",
                "condition": "Moderate UV",
                "risk": "Minimal",
                "advice": "Sunscreen recommended"
            }
        else:
            return {
                "level": "low",
                "condition": "Low UV",
                "risk": "None",
                "advice": "Safe to be outdoors"
            }
    
    def _assess_air_quality_risk(self, aqi: float) -> Dict:
        """Assess air quality health risks"""
        
        if aqi > 300:
            return {
                "level": "critical",
                "condition": "Hazardous Air Quality",
                "risk": "Severe respiratory problems",
                "advice": "Stay indoors, keep windows closed, use air filter"
            }
        elif aqi > 200:
            return {
                "level": "high",
                "condition": "Very Unhealthy",
                "risk": "Serious respiratory issues",
                "advice": "Avoid outdoor activity, use N95 mask if outside"
            }
        elif aqi > 150:
            return {
                "level": "high",
                "condition": "Unhealthy",
                "risk": "Respiratory problems for sensitive groups",
                "advice": "Limit outdoor activity, especially for children/elderly"
            }
        elif aqi > 100:
            return {
                "level": "moderate",
                "condition": "Unhealthy for Sensitive Groups",
                "risk": "Sensitive groups may experience issues",
                "advice": "Limit outdoor activity for at-risk groups"
            }
        elif aqi > 50:
            return {
                "level": "low",
                "condition": "Moderate",
                "risk": "None for most people",
                "advice": "Safe for outdoor activities"
            }
        else:
            return {
                "level": "low",
                "condition": "Good Air Quality",
                "risk": "None",
                "advice": "Great day to be outdoors"
            }
    
    async def get_pollen_health_impact(self, pollen_data: Dict) -> Dict:
        """Assess health impact of pollen levels"""
        
        return {
            "pollen_alert": pollen_data.get("overall_index", 0) > 150,
            "affected_conditions": ["Asthma", "Allergies", "Hay Fever"],
            "recommendations": [
                "Keep windows closed during peak pollen hours (5-10 AM)",
                "Use air filters in home",
                "Wear sunglasses outdoors",
                "Take antihistamines as needed",
                "Shower after being outdoors"
            ],
            "high_risk_allergens": [
                allergen for allergen, level in pollen_data.items() 
                if level and level > 100
            ]
        }
