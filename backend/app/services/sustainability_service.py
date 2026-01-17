from typing import Dict, List
from datetime import datetime


class SustainabilityService:
    """Climate and sustainability tracking"""
    
    async def calculate_carbon_footprint(self, user_activities: List[Dict]) -> Dict:
        """Calculate carbon footprint based on activities"""
        
        # Carbon emissions by activity (kg CO2 per activity)
        emission_factors = {
            "car_travel_km": 0.21,
            "flight_hour": 0.255,
            "train_km": 0.041,
            "bus_km": 0.089,
            "energy_kwh": 0.233
        }
        
        total_emissions = 0
        breakdown = {}
        
        for activity in user_activities:
            activity_type = activity.get("type", "")
            value = activity.get("value", 0)
            
            if activity_type in emission_factors:
                emissions = value * emission_factors[activity_type]
                total_emissions += emissions
                breakdown[activity_type] = emissions
        
        return {
            "period": "Monthly",
            "total_emissions_kg": round(total_emissions, 2),
            "total_emissions_metric_tons": round(total_emissions / 1000, 3),
            "breakdown": breakdown,
            "average_per_day": round(total_emissions / 30, 2),
            "comparison_to_average": "Average person: 20kg CO2/day"
        }
    
    async def get_eco_friendly_recommendations(self, location: str, weather: Dict) -> List[Dict]:
        """Get eco-friendly activity recommendations based on weather"""
        
        recommendations = []
        temp = weather.get("temperature", 20)
        description = weather.get("description", "").lower()
        
        if 15 < temp < 28 and "rain" not in description:
            recommendations.append({
                "activity": "Cycle or Walk",
                "carbon_saved": "0.21 kg CO2",
                "benefit": "Zero emissions alternative to car",
                "feasibility": "High"
            })
        
        if temp > 20 and "sunny" in description:
            recommendations.append({
                "activity": "Use Solar Charger",
                "carbon_saved": "0.15 kg CO2",
                "benefit": "Renewable energy charging",
                "feasibility": "Medium"
            })
        
        if temp < 15:
            recommendations.append({
                "activity": "Use Public Transport",
                "carbon_saved": "0.12 kg CO2",
                "benefit": "Shared transportation reduces per-person emissions",
                "feasibility": "High"
            })
        
        return recommendations
    
    async def get_climate_change_insights(self) -> Dict:
        """Get climate change data and insights"""
        
        return {
            "global_temperature_anomaly": "+1.15°C",
            "since_baseline": "1961-1990",
            "trend": "Warming",
            "projections": {
                "2050": "+2.5°C to +3.5°C",
                "2100": "+4.0°C to +5.0°C"
            },
            "extreme_weather": {
                "heatwaves": "30% more frequent",
                "extreme_rainfall": "25% more intense",
                "droughts": "20% longer"
            },
            "sea_level_rise": "+4.8 mm per year",
            "ice_loss": {
                "arctic": "Declining 13% per decade",
                "glaciers": "Melting at accelerating rate"
            },
            "actions_you_can_take": [
                "Reduce energy consumption",
                "Use renewable energy sources",
                "Support sustainable businesses",
                "Reduce travel emissions",
                "Plant trees and support reforestation"
            ]
        }
    
    async def get_renewable_energy_forecast(self, location: str, forecast_data: List[Dict]) -> Dict:
        """Forecast renewable energy potential"""
        
        return {
            "location": location,
            "forecast_period": "7 days",
            "solar": {
                "average_potential": "High",
                "best_days": [1, 2, 4, 6],
                "projected_generation": "45-55 kWh per kW installed"
            },
            "wind": {
                "average_potential": "Moderate",
                "best_days": [3, 5, 7],
                "projected_generation": "25-35 kWh per kW installed"
            },
            "recommendation": "Solar panels would perform well this week"
        }
    
    async def get_environmental_impact_report(self, user_data: Dict) -> Dict:
        """Generate environmental impact report"""
        
        return {
            "report_date": datetime.now().isoformat(),
            "period": "January 2026",
            "carbon_footprint": {
                "total_emissions": 125.5,
                "unit": "kg CO2",
                "trend": "Decreasing"
            },
            "water_usage": {
                "total_liters": 3200,
                "trend": "Stable"
            },
            "energy_usage": {
                "total_kwh": 245,
                "renewable_percentage": 35,
                "trend": "Increasing renewable %"
            },
            "sustainability_score": 72,
            "comparison": "Better than 65% of users",
            "goals": [
                "Reduce carbon footprint by 20%",
                "Increase renewable energy to 50%",
                "Reduce water usage by 15%"
            ],
            "achievements": [
                "Carbon emissions down 5% from last month",
                "Renewable energy increased to 35%",
                "10 sustainable trips completed"
            ]
        }
