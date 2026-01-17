from typing import Optional, Dict
from datetime import datetime, timedelta
import json
import hashlib


class AuthService:
    """User authentication and profile management"""
    
    def __init__(self):
        self.users = {}  # In production: use database
        self.sessions = {}
    
    async def register_user(self, email: str, password: str, name: str) -> Dict:
        """Register a new user"""
        
        if email in self.users:
            return {"success": False, "message": "Email already registered"}
        
        user_id = hashlib.md5(email.encode()).hexdigest()
        password_hash = hashlib.sha256(password.encode()).hexdigest()
        
        self.users[email] = {
            "id": user_id,
            "email": email,
            "name": name,
            "password_hash": password_hash,
            "created_at": datetime.now().isoformat(),
            "preferences": {
                "temperature_unit": "celsius",
                "wind_unit": "kmh",
                "theme": "light",
                "notifications": True
            },
            "favorites": [],
            "alert_thresholds": {
                "temp_high": 30,
                "temp_low": 0,
                "wind_speed": 40,
                "rain_probability": 80
            }
        }
        
        return {
            "success": True,
            "message": "User registered successfully",
            "user_id": user_id,
            "user": self.users[email]
        }
    
    async def login_user(self, email: str, password: str) -> Dict:
        """Login user and create session"""
        
        if email not in self.users:
            return {"success": False, "message": "User not found"}
        
        user = self.users[email]
        password_hash = hashlib.sha256(password.encode()).hexdigest()
        
        if user["password_hash"] != password_hash:
            return {"success": False, "message": "Invalid password"}
        
        # Create session token
        session_token = hashlib.sha256(f"{email}{datetime.now()}".encode()).hexdigest()
        self.sessions[session_token] = {
            "user_id": user["id"],
            "email": email,
            "created_at": datetime.now().isoformat(),
            "expires_at": (datetime.now() + timedelta(days=30)).isoformat()
        }
        
        return {
            "success": True,
            "message": "Login successful",
            "token": session_token,
            "user": {
                "id": user["id"],
                "email": user["email"],
                "name": user["name"],
                "preferences": user["preferences"]
            }
        }
    
    async def get_user_profile(self, email: str) -> Dict:
        """Get user profile"""
        
        if email not in self.users:
            return None
        
        user = self.users[email]
        return {
            "id": user["id"],
            "email": user["email"],
            "name": user["name"],
            "created_at": user["created_at"],
            "preferences": user["preferences"],
            "favorites": user["favorites"],
            "alert_thresholds": user["alert_thresholds"]
        }
    
    async def update_preferences(self, email: str, preferences: Dict) -> Dict:
        """Update user preferences"""
        
        if email not in self.users:
            return {"success": False, "message": "User not found"}
        
        self.users[email]["preferences"].update(preferences)
        
        return {
            "success": True,
            "message": "Preferences updated",
            "preferences": self.users[email]["preferences"]
        }
    
    async def add_favorite(self, email: str, location: str) -> Dict:
        """Add favorite location"""
        
        if email not in self.users:
            return {"success": False, "message": "User not found"}
        
        if location not in self.users[email]["favorites"]:
            self.users[email]["favorites"].append(location)
        
        return {
            "success": True,
            "favorites": self.users[email]["favorites"]
        }
    
    async def remove_favorite(self, email: str, location: str) -> Dict:
        """Remove favorite location"""
        
        if email not in self.users:
            return {"success": False, "message": "User not found"}
        
        if location in self.users[email]["favorites"]:
            self.users[email]["favorites"].remove(location)
        
        return {
            "success": True,
            "favorites": self.users[email]["favorites"]
        }
    
    async def set_alert_thresholds(self, email: str, thresholds: Dict) -> Dict:
        """Set custom alert thresholds"""
        
        if email not in self.users:
            return {"success": False, "message": "User not found"}
        
        self.users[email]["alert_thresholds"].update(thresholds)
        
        return {
            "success": True,
            "thresholds": self.users[email]["alert_thresholds"]
        }
