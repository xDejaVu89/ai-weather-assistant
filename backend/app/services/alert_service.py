from typing import List, Dict
from datetime import datetime, timedelta
import random


class AlertService:
    """Service for weather alerts and notifications"""
    
    async def get_alerts(self, location: str) -> List[Dict]:
        """Get active weather alerts for a location"""
        # Mock alerts - replace with real weather alert API
        alerts = []
        
        # Simulate different alert types
        alert_types = [
            {
                "type": "severe_weather",
                "severity": "warning",
                "title": "Thunderstorm Warning",
                "description": "Severe thunderstorms expected with heavy rain and strong winds",
                "start_time": datetime.now().isoformat(),
                "end_time": (datetime.now() + timedelta(hours=3)).isoformat(),
            },
            {
                "type": "temperature",
                "severity": "advisory",
                "title": "Heat Advisory",
                "description": "High temperatures expected. Stay hydrated and avoid prolonged sun exposure",
                "start_time": datetime.now().isoformat(),
                "end_time": (datetime.now() + timedelta(hours=8)).isoformat(),
            }
        ]
        
        # Randomly return alerts for demo
        if random.random() > 0.7:
            alerts.append(random.choice(alert_types))
        
        return alerts
    
    async def get_notifications(self, user_preferences: Dict) -> List[Dict]:
        """Get personalized weather notifications based on user preferences"""
        notifications = []
        
        # Example notifications
        if user_preferences.get("notify_rain", True):
            notifications.append({
                "type": "rain",
                "title": "Rain Expected",
                "message": "Bring an umbrella! Rain expected in 2 hours",
                "priority": "medium",
                "timestamp": datetime.now().isoformat()
            })
        
        if user_preferences.get("notify_temperature", True):
            notifications.append({
                "type": "temperature",
                "title": "Temperature Drop",
                "message": "Temperature will drop to 15°C tonight. Dress warmly!",
                "priority": "low",
                "timestamp": datetime.now().isoformat()
            })
        
        return notifications
