from typing import Dict, List
from datetime import datetime


class IntegrationService:
    """Third-party integrations (calendar, smart home, etc)"""
    
    async def connect_calendar(self, calendar_type: str, credentials: Dict) -> Dict:
        """Connect to calendar service (Google, Outlook, etc)"""
        
        return {
            "service": calendar_type,
            "status": "connected",
            "connected_at": datetime.now().isoformat(),
            "permissions": ["read_events", "create_reminders"],
            "synced_events": 0
        }
    
    async def sync_events_with_weather(self, user_id: str, calendar_events: List[Dict]) -> List[Dict]:
        """Add weather alerts to calendar events"""
        
        enhanced_events = []
        
        for event in calendar_events:
            event_date = event.get("date", "")
            event_type = event.get("type", "meeting")
            location = event.get("location", "Unknown")
            
            weather_alert = ""
            if event_type == "outdoor":
                weather_alert = f"⛅ Check weather forecast for {location}"
            elif event_type == "travel":
                weather_alert = f"🚗 Monitor weather conditions for travel to {location}"
            
            enhanced_events.append({
                **event,
                "weather_alert": weather_alert,
                "last_updated": datetime.now().isoformat()
            })
        
        return enhanced_events
    
    async def connect_smart_home(self, device_type: str, credentials: Dict) -> Dict:
        """Connect to smart home devices"""
        
        return {
            "device_type": device_type,
            "status": "connected",
            "connected_at": datetime.now().isoformat(),
            "capabilities": [
                "adjust_temperature",
                "control_lights",
                "manage_blinds",
                "trigger_routines"
            ]
        }
    
    async def automate_smart_home(self, weather_data: Dict) -> Dict:
        """Automatically adjust smart home based on weather"""
        
        automations = {
            "timestamp": datetime.now().isoformat(),
            "actions": []
        }
        
        temp = weather_data.get("temperature", 20)
        
        if temp > 28:
            automations["actions"].append({
                "device": "thermostat",
                "action": "lower_temperature",
                "value": 22,
                "reason": "High temperature"
            })
        
        if weather_data.get("rain_probability", 0) > 70:
            automations["actions"].append({
                "device": "blinds",
                "action": "close",
                "reason": "Rain expected"
            })
        
        if "sunny" in weather_data.get("description", "").lower():
            automations["actions"].append({
                "device": "lights",
                "action": "turn_off",
                "reason": "Plenty of natural light"
            })
        
        return automations
    
    async def connect_health_tracker(self, tracker_type: str, credentials: Dict) -> Dict:
        """Connect to health tracking apps"""
        
        return {
            "tracker": tracker_type,
            "status": "connected",
            "connected_at": datetime.now().isoformat(),
            "data_sync": "enabled",
            "metrics": ["steps", "heart_rate", "sleep", "activity"]
        }
    
    async def get_activity_recommendations(self, user_health: Dict, weather: Dict) -> List[Dict]:
        """Recommend activities based on health and weather"""
        
        recommendations = []
        
        activity_score = user_health.get("fitness_level", 5)
        temp = weather.get("temperature", 20)
        
        if activity_score > 7 and 15 < temp < 28:
            recommendations.append({
                "activity": "Running",
                "duration": "30-45 minutes",
                "intensity": "High",
                "reason": "Optimal conditions for cardio"
            })
        
        if activity_score > 5 and temp < 25:
            recommendations.append({
                "activity": "Walking/Light Hiking",
                "duration": "45-60 minutes",
                "intensity": "Moderate",
                "reason": "Good conditions for outdoor activity"
            })
        
        return recommendations
    
    async def get_available_integrations(self) -> Dict:
        """List available third-party integrations"""
        
        return {
            "calendar_services": ["Google Calendar", "Outlook Calendar", "Apple Calendar"],
            "smart_home": ["Google Home", "Alexa", "Apple HomeKit", "IFTTT"],
            "health_trackers": ["Fitbit", "Apple Health", "Garmin", "Strava"],
            "travel_apps": ["Booking.com", "Airbnb", "Google Flights", "Uber"],
            "social_media": ["Twitter", "Instagram", "Facebook"],
            "productivity": ["Slack", "Microsoft Teams", "Notion"]
        }
