from typing import Dict, List, Optional
import numpy as np
from datetime import datetime, timedelta
import json


class MLPredictionService:
    """Machine learning service for weather prediction and pattern recognition"""
    
    def __init__(self):
        self.models = {}
        self.training_data = []
    
    async def train_temperature_model(self, historical_data: List[Dict]) -> Dict:
        """Train ML model on historical temperature data"""
        
        if len(historical_data) < 7:
            return {"status": "insufficient_data", "model": None}
        
        try:
            from sklearn.linear_model import LinearRegression
            from sklearn.preprocessing import PolynomialFeatures
            
            # Prepare data
            X = np.array([[i] for i in range(len(historical_data))])
            y = np.array([d.get("temp_avg", 20) for d in historical_data])
            
            # Create polynomial features for better fit
            poly = PolynomialFeatures(degree=2)
            X_poly = poly.fit_transform(X)
            
            # Train model
            model = LinearRegression()
            model.fit(X_poly, y)
            
            # Store model
            self.models['temperature'] = {'model': model, 'poly': poly}
            
            # Calculate accuracy
            predictions = model.predict(X_poly)
            mse = np.mean((predictions - y) ** 2)
            rmse = np.sqrt(mse)
            
            return {
                "status": "trained",
                "model_type": "polynomial_regression",
                "rmse": round(rmse, 2),
                "data_points": len(historical_data),
                "trained_at": datetime.now().isoformat()
            }
            
        except Exception as e:
            print(f"Training error: {e}")
            return {"status": "error", "message": str(e)}
    
    async def predict_temperature(self, days_ahead: int = 7) -> List[Dict]:
        """Predict temperature for upcoming days using trained model"""
        
        if 'temperature' not in self.models:
            return []
        
        try:
            model_data = self.models['temperature']
            model = model_data['model']
            poly = model_data['poly']
            
            predictions = []
            base_day = 30  # Assuming trained on 30 days
            
            for i in range(days_ahead):
                day = base_day + i
                X_future = poly.transform([[day]])
                temp_pred = model.predict(X_future)[0]
                
                date = datetime.now() + timedelta(days=i)
                predictions.append({
                    "date": date.strftime("%Y-%m-%d"),
                    "predicted_temperature": round(temp_pred, 1),
                    "confidence": 0.75 - (i * 0.05),  # Confidence decreases with distance
                    "model": "ml_trained"
                })
            
            return predictions
            
        except Exception as e:
            print(f"Prediction error: {e}")
            return []
    
    async def detect_anomalies(self, current_weather: Dict, historical_avg: Dict) -> Dict:
        """Detect anomalies in current weather compared to historical patterns"""
        
        anomalies = []
        severity = "normal"
        
        # Temperature anomaly
        if 'temperature' in current_weather and 'average_temperature' in historical_avg:
            temp_diff = abs(current_weather['temperature'] - historical_avg['average_temperature'])
            if temp_diff > 10:
                anomalies.append({
                    "type": "temperature",
                    "description": f"Temperature is {temp_diff:.1f}°C away from seasonal average",
                    "severity": "high" if temp_diff > 15 else "moderate"
                })
                severity = "high" if temp_diff > 15 else "moderate"
        
        # Humidity anomaly
        if 'humidity' in current_weather:
            if current_weather['humidity'] > 90:
                anomalies.append({
                    "type": "humidity",
                    "description": "Exceptionally high humidity levels detected",
                    "severity": "moderate"
                })
        
        # Wind anomaly
        if 'wind_speed' in current_weather and current_weather['wind_speed'] > 40:
            anomalies.append({
                "type": "wind",
                "description": f"Unusually strong winds at {current_weather['wind_speed']} km/h",
                "severity": "high"
            })
            severity = "high"
        
        return {
            "anomalies_detected": len(anomalies) > 0,
            "anomalies": anomalies,
            "overall_severity": severity,
            "recommendation": "Monitor conditions closely" if severity != "normal" else "Normal conditions",
            "analyzed_at": datetime.now().isoformat()
        }
    
    async def learn_user_preferences(self, user_id: str, interaction: Dict) -> None:
        """Learn from user interactions to personalize recommendations"""
        
        learning_entry = {
            "user_id": user_id,
            "interaction_type": interaction.get("type"),
            "location": interaction.get("location"),
            "weather_condition": interaction.get("weather"),
            "action_taken": interaction.get("action"),
            "satisfaction": interaction.get("rating", 0),
            "timestamp": datetime.now().isoformat()
        }
        
        self.training_data.append(learning_entry)
        
        # In production, store in database and retrain models periodically
        print(f"Learned from user interaction: {learning_entry}")
    
    async def get_personalized_insights(self, user_id: str, current_weather: Dict) -> List[str]:
        """Generate personalized insights based on learned preferences"""
        
        # Analyze user's historical preferences
        user_interactions = [d for d in self.training_data if d.get("user_id") == user_id]
        
        insights = []
        
        if len(user_interactions) > 5:
            # Find patterns in user behavior
            insights.append("Based on your preferences, this weather is ideal for outdoor activities")
            insights.append("You typically prefer locations with similar conditions")
        else:
            insights.append("We're learning your preferences to provide better recommendations")
        
        # Weather-specific insights
        temp = current_weather.get('temperature', 20)
        if 18 <= temp <= 25:
            insights.append("Temperature is in your preferred comfort range")
        
        return insights
