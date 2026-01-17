from typing import Dict, List, Optional
from datetime import datetime
import httpx
from app.core.config import settings


class EnhancedNLPService:
    """Enhanced NLP service with OpenAI integration for smarter responses"""
    
    def __init__(self):
        self.openai_api_key = settings.openai_api_key
        self.conversation_history = []
    
    async def process_intelligent_query(self, query: str, context: Optional[Dict] = None) -> Dict:
        """Process query using OpenAI for intelligent, context-aware responses"""
        
        if not self.openai_api_key:
            return await self._fallback_processing(query, context)
        
        try:
            # Use OpenAI to understand intent and generate response
            from openai import AsyncOpenAI
            client = AsyncOpenAI(api_key=self.openai_api_key)
            
            # Build context-aware prompt
            system_prompt = """You are an expert meteorologist and AI weather assistant. 
            You provide accurate, helpful weather information and advice. 
            You understand complex weather patterns, can predict trends, and give personalized recommendations.
            Always be concise but informative. Use data provided to give specific answers."""
            
            user_message = f"Weather Query: {query}"
            if context:
                user_message += f"\n\nCurrent Context: {context}"
            
            response = await client.chat.completions.create(
                model="gpt-4-turbo-preview",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message}
                ],
                max_tokens=500,
                temperature=0.7
            )
            
            answer = response.choices[0].message.content
            
            # Store conversation for context
            self.conversation_history.append({
                "query": query,
                "response": answer,
                "timestamp": datetime.now().isoformat()
            })
            
            return {
                "answer": answer,
                "confidence": 0.95,
                "source": "ai_enhanced",
                "learned": True
            }
            
        except Exception as e:
            print(f"OpenAI error: {e}")
            return await self._fallback_processing(query, context)
    
    async def _fallback_processing(self, query: str, context: Optional[Dict] = None) -> Dict:
        """Fallback processing when OpenAI is unavailable"""
        from app.services.nlp_service import NLPService
        basic_nlp = NLPService()
        return await basic_nlp.process_query(query)
    
    async def learn_from_feedback(self, query: str, response: str, feedback: Dict) -> None:
        """Learn from user feedback to improve future responses"""
        # Store feedback for future training
        learning_data = {
            "query": query,
            "response": response,
            "rating": feedback.get("rating", 0),
            "helpful": feedback.get("helpful", False),
            "timestamp": datetime.now().isoformat()
        }
        
        # In production, store this in a database
        print(f"Learning from feedback: {learning_data}")
    
    async def get_weather_insights(self, location: str, weather_data: Dict) -> Dict:
        """Generate AI-powered insights about the weather"""
        
        if not self.openai_api_key:
            return {"insights": ["Weather data available for analysis"]}
        
        try:
            from openai import AsyncOpenAI
            client = AsyncOpenAI(api_key=self.openai_api_key)
            
            prompt = f"""Analyze this weather data for {location} and provide 3-4 key insights:
            
Temperature: {weather_data.get('temperature')}°C
Humidity: {weather_data.get('humidity')}%
Description: {weather_data.get('description')}
Wind Speed: {weather_data.get('wind_speed')} km/h

Provide practical, actionable insights about what this means for daily activities."""
            
            response = await client.chat.completions.create(
                model="gpt-4-turbo-preview",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=300
            )
            
            insights_text = response.choices[0].message.content
            insights = [line.strip() for line in insights_text.split('\n') if line.strip()]
            
            return {
                "insights": insights,
                "generated_by": "ai",
                "timestamp": datetime.now().isoformat()
            }
            
        except Exception as e:
            print(f"Insights generation error: {e}")
            return {"insights": ["Weather analysis available"]}
