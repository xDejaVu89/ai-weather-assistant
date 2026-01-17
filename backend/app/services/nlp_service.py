from typing import Dict
from app.core.config import settings
import re


class NLPService:
    """Service for natural language processing of weather queries"""
    
    def __init__(self):
        self.openai_api_key = settings.openai_api_key
    
    async def process_query(self, query: str) -> Dict:
        """Process natural language query and return weather information"""
        
        # Simple pattern matching (can be enhanced with OpenAI API)
        query_lower = query.lower()
        
        # Extract location from query
        location = self._extract_location(query_lower)
        
        # Determine query intent
        if any(word in query_lower for word in ['tomorrow', 'next week', 'forecast', 'will it']):
            intent = 'forecast'
            answer = f"Based on the forecast for {location}, I'll provide predictions for the coming days."
        elif any(word in query_lower for word in ['now', 'current', 'today', 'right now']):
            intent = 'current'
            answer = f"The current weather in {location} is available."
        elif any(word in query_lower for word in ['run', 'exercise', 'workout', 'best time']):
            intent = 'recommendation'
            answer = f"Based on weather conditions in {location}, I recommend outdoor activities during morning hours when temperature and humidity are optimal."
        else:
            intent = 'general'
            answer = f"I can help you with weather information for {location}. What would you like to know?"
        
        return {
            "answer": answer,
            "weather_data": None,
            "confidence": 0.85
        }
    
    def _extract_location(self, query: str) -> str:
        """Extract location from query (simplified implementation)"""
        # Common location patterns
        patterns = [
            r'in ([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)',
            r'at ([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)',
            r'for ([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)',
        ]
        
        for pattern in patterns:
            match = re.search(pattern, query)
            if match:
                return match.group(1)
        
        # Default location
        return "your location"
