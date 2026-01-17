from typing import List, Dict
from datetime import datetime


class AlertNotificationService:
    """Real-time alerts and notifications system"""
    
    def __init__(self):
        self.alerts = []
        self.notification_history = {}
    
    async def create_alert(self, user_id: str, alert_type: str, condition: Dict, message: str) -> Dict:
        """Create a weather alert for user"""
        
        alert = {
            "id": f"alert_{len(self.alerts) + 1}",
            "user_id": user_id,
            "type": alert_type,  # "temperature", "wind", "rain", "severe", etc.
            "condition": condition,
            "message": message,
            "created_at": datetime.now().isoformat(),
            "triggered": False,
            "severity": self._calculate_severity(alert_type, condition)
        }
        
        self.alerts.append(alert)
        return alert
    
    def _calculate_severity(self, alert_type: str, condition: Dict) -> str:
        """Calculate alert severity"""
        if alert_type == "temperature" and abs(condition.get("threshold", 0)) > 35:
            return "critical"
        elif alert_type == "wind" and condition.get("threshold", 0) > 50:
            return "critical"
        elif alert_type == "severe":
            return "critical"
        elif alert_type in ["rain", "humidity"]:
            return "moderate"
        else:
            return "low"
    
    async def check_and_trigger_alerts(self, user_id: str, current_weather: Dict) -> List[Dict]:
        """Check if alerts should be triggered"""
        
        triggered = []
        user_alerts = [a for a in self.alerts if a["user_id"] == user_id and not a["triggered"]]
        
        for alert in user_alerts:
            should_trigger = False
            
            if alert["type"] == "temperature":
                temp = current_weather.get("temperature", 0)
                if temp > alert["condition"].get("high_threshold", 999) or \
                   temp < alert["condition"].get("low_threshold", -999):
                    should_trigger = True
            
            elif alert["type"] == "wind":
                wind = current_weather.get("wind_speed", 0)
                if wind > alert["condition"].get("threshold", 999):
                    should_trigger = True
            
            elif alert["type"] == "rain":
                rain_prob = current_weather.get("rain_probability", 0)
                if rain_prob > alert["condition"].get("threshold", 100):
                    should_trigger = True
            
            if should_trigger:
                alert["triggered"] = True
                alert["triggered_at"] = datetime.now().isoformat()
                triggered.append(alert)
        
        return triggered
    
    async def get_notifications(self, user_id: str, limit: int = 50) -> List[Dict]:
        """Get notification history for user"""
        
        if user_id not in self.notification_history:
            return []
        
        return self.notification_history[user_id][-limit:]
    
    async def send_notification(self, user_id: str, notification: Dict) -> Dict:
        """Send notification to user"""
        
        if user_id not in self.notification_history:
            self.notification_history[user_id] = []
        
        notif = {
            "id": f"notif_{len(self.notification_history.get(user_id, [])) + 1}",
            "user_id": user_id,
            "title": notification.get("title", "Weather Alert"),
            "message": notification.get("message", ""),
            "type": notification.get("type", "info"),  # info, warning, alert, severe
            "created_at": datetime.now().isoformat(),
            "read": False
        }
        
        self.notification_history[user_id].append(notif)
        
        # In production: send push notification, email, SMS based on user preferences
        print(f"NOTIFICATION: {notif}")
        
        return notif
    
    async def get_weather_summary(self, location: str, weather_data: Dict) -> Dict:
        """Generate smart weather summary with warnings"""
        
        summary = {
            "location": location,
            "timestamp": datetime.now().isoformat(),
            "warnings": [],
            "recommendations": []
        }
        
        temp = weather_data.get("temperature", 0)
        humidity = weather_data.get("humidity", 0)
        wind = weather_data.get("wind_speed", 0)
        rain_prob = weather_data.get("rain_probability", 0)
        
        # Generate warnings
        if temp > 35:
            summary["warnings"].append({
                "type": "heat",
                "message": "Extreme heat warning - stay hydrated and avoid prolonged sun exposure",
                "severity": "critical"
            })
        
        if temp < 0:
            summary["warnings"].append({
                "type": "frost",
                "message": "Frost warning - roads may be icy",
                "severity": "high"
            })
        
        if wind > 40:
            summary["warnings"].append({
                "type": "wind",
                "message": "Strong wind warning - be cautious outdoors",
                "severity": "high"
            })
        
        if humidity > 90:
            summary["warnings"].append({
                "type": "humidity",
                "message": "High humidity - air quality may be poor",
                "severity": "moderate"
            })
        
        if rain_prob > 70:
            summary["warnings"].append({
                "type": "rain",
                "message": "Heavy rain expected - bring umbrella",
                "severity": "moderate"
            })
        
        # Generate recommendations
        if 18 <= temp <= 25 and wind < 20:
            summary["recommendations"].append("Perfect weather for outdoor activities")
        
        if rain_prob < 10 and wind < 15:
            summary["recommendations"].append("Great day for hiking or sports")
        
        if temp > 30:
            summary["recommendations"].append("Stay indoors or use sun protection")
        
        return summary
