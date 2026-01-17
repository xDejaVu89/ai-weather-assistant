from typing import Dict, List
from datetime import datetime


class LearningService:
    """Service for continuous learning from various data sources"""
    
    def __init__(self):
        self.knowledge_base = []
        self.user_patterns = {}
        self.weather_patterns = {}
    
    async def aggregate_learning_data(self, location: str) -> Dict:
        """Aggregate data from multiple learning sources"""
        
        from app.services.web_insights_service import WebInsightsService
        from app.services.ml_prediction_service import MLPredictionService
        
        web_insights = WebInsightsService()
        ml_service = MLPredictionService()
        
        # Gather insights from various sources
        news = await web_insights.fetch_weather_news(location)
        experts = await web_insights.get_expert_predictions(location)
        crowd_reports = await web_insights.scrape_real_time_reports(location)
        trends = await web_insights.get_weather_trends()
        
        aggregated_data = {
            "location": location,
            "news_insights": news[:3],  # Top 3 most relevant
            "expert_opinions": experts,
            "crowd_reports": crowd_reports,
            "trending_topics": trends.get("trending_topics", [])[:3],
            "confidence_score": self._calculate_confidence(news, experts, crowd_reports),
            "last_updated": datetime.now().isoformat(),
            "data_sources": ["news", "experts", "community", "trends"]
        }
        
        # Store in knowledge base
        self.knowledge_base.append(aggregated_data)
        
        return aggregated_data
    
    def _calculate_confidence(self, news: List, experts: List, reports: Dict) -> float:
        """Calculate overall confidence based on multiple sources"""
        
        # Weight different sources
        news_weight = 0.3
        expert_weight = 0.5
        crowd_weight = 0.2
        
        news_score = min(len(news) / 10, 1.0) if news else 0
        expert_score = sum([e.get("confidence", 0) for e in experts]) / len(experts) if experts else 0
        crowd_score = min(reports.get("total_reports", 0) / 100, 1.0)
        
        confidence = (news_score * news_weight + 
                     expert_score * expert_weight + 
                     crowd_score * crowd_weight)
        
        return round(confidence, 2)
    
    async def get_ai_recommendations(self, location: str, weather_data: Dict, user_context: Dict = None) -> Dict:
        """Generate AI-powered recommendations using all learned data"""
        
        learning_data = await self.aggregate_learning_data(location)
        
        recommendations = {
            "personalized_advice": [],
            "expert_consensus": "",
            "crowd_insights": [],
            "confidence": learning_data.get("confidence_score", 0.5)
        }
        
        # Analyze expert opinions
        if learning_data.get("expert_opinions"):
            expert_predictions = [e.get("prediction", "") for e in learning_data["expert_opinions"]]
            recommendations["expert_consensus"] = expert_predictions[0] if expert_predictions else "No expert data available"
        
        # Add crowd insights
        if learning_data.get("crowd_reports", {}).get("crowd_sourced"):
            crowd_data = learning_data["crowd_reports"]["crowd_sourced"]
            recommendations["crowd_insights"] = [r["report"] for r in crowd_data[:3]]
        
        # Generate personalized advice
        temp = weather_data.get("temperature", 20)
        
        recommendations["personalized_advice"] = [
            "Based on current conditions and expert analysis",
            f"Temperature: {temp}°C - {self._get_temp_advice(temp)}",
            "Consider checking hourly forecast for detailed planning"
        ]
        
        # Add trending insights
        if learning_data.get("trending_topics"):
            top_trend = learning_data["trending_topics"][0]
            recommendations["trending_alert"] = f"Weather community discussing: {top_trend['topic']}"
        
        return recommendations
    
    def _get_temp_advice(self, temp: float) -> str:
        """Get temperature-based advice"""
        if temp < 10:
            return "Bundle up, it's cold outside"
        elif temp < 20:
            return "Light jacket recommended"
        elif temp < 25:
            return "Perfect temperature for outdoor activities"
        else:
            return "Stay cool and hydrated"
    
    async def store_user_feedback(self, feedback: Dict) -> None:
        """Store user feedback for continuous improvement"""
        
        feedback_entry = {
            "type": feedback.get("type"),
            "rating": feedback.get("rating"),
            "comment": feedback.get("comment"),
            "feature": feedback.get("feature"),
            "timestamp": datetime.now().isoformat()
        }
        
        # In production, store in database for analysis
        print(f"User feedback received: {feedback_entry}")
        
        # Update user patterns
        if feedback.get("user_id"):
            if feedback["user_id"] not in self.user_patterns:
                self.user_patterns[feedback["user_id"]] = []
            self.user_patterns[feedback["user_id"]].append(feedback_entry)
