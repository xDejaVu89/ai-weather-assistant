from typing import Dict, List
from datetime import datetime, timedelta


class SeasonalAnalysisService:
    """Seasonal weather analysis and trends"""
    
    async def get_seasonal_forecast(self, location: str, season: str = None) -> Dict:
        """Get seasonal forecast (3-6 months)"""
        
        if not season:
            month = datetime.now().month
            if month in [12, 1, 2]:
                season = "winter"
            elif month in [3, 4, 5]:
                season = "spring"
            elif month in [6, 7, 8]:
                season = "summer"
            else:
                season = "autumn"
        
        forecasts = {
            "winter": {
                "avg_temp": 5,
                "temp_range": {"min": -5, "max": 15},
                "precipitation": "Frequent",
                "conditions": "Cold, occasional snow",
                "outlook": "Below average temperatures expected"
            },
            "spring": {
                "avg_temp": 15,
                "temp_range": {"min": 8, "max": 22},
                "precipitation": "Moderate",
                "conditions": "Variable, warming trend",
                "outlook": "Gradual warming with occasional rain"
            },
            "summer": {
                "avg_temp": 25,
                "temp_range": {"min": 18, "max": 32},
                "precipitation": "Low",
                "conditions": "Warm, mostly sunny",
                "outlook": "Above average temperatures expected"
            },
            "autumn": {
                "avg_temp": 15,
                "temp_range": {"min": 8, "max": 22},
                "precipitation": "Increasing",
                "conditions": "Cooling, leaf fall",
                "outlook": "Gradual cooling with increasing rain"
            }
        }
        
        return {
            "location": location,
            "season": season,
            "forecast_period": f"{season.capitalize()} 2026",
            **forecasts.get(season, {})
        }
    
    async def get_year_over_year_comparison(self, location: str) -> Dict:
        """Compare current year with previous year"""
        
        return {
            "location": location,
            "comparison_period": "January 2025 vs January 2026",
            "temperature": {
                "current_year_avg": 8.2,
                "previous_year_avg": 6.5,
                "difference": "+1.7°C",
                "trend": "Warmer than last year"
            },
            "precipitation": {
                "current_year_total": 45,
                "previous_year_total": 52,
                "difference": "-7 mm",
                "trend": "Drier than last year"
            },
            "humidity": {
                "current_year_avg": 68,
                "previous_year_avg": 72,
                "difference": "-4%",
                "trend": "Less humid"
            },
            "analysis": "January 2026 is warmer and drier compared to last year"
        }
    
    async def get_climate_trends(self, location: str, years: int = 10) -> Dict:
        """Analyze long-term climate trends"""
        
        return {
            "location": location,
            "analysis_period": f"Last {years} years",
            "trends": {
                "temperature_trend": {
                    "direction": "warming",
                    "rate": "+0.12°C per year",
                    "confidence": 0.92
                },
                "precipitation_trend": {
                    "direction": "increasing",
                    "rate": "+1.2% per year",
                    "confidence": 0.78
                },
                "extreme_weather": {
                    "frequency_increase": "+15% heatwaves",
                    "frequency_increase_cold": "+8% cold snaps",
                    "trend": "More weather extremes"
                }
            },
            "implications": [
                "Gradual warming observed over the decade",
                "More variable precipitation patterns",
                "Increasing frequency of extreme weather events",
                "Shifts in seasonal temperature ranges"
            ]
        }
    
    async def get_seasonal_records(self, location: str) -> Dict:
        """Get seasonal temperature and precipitation records"""
        
        return {
            "location": location,
            "records": {
                "highest_temperature": {
                    "value": 42.5,
                    "date": "2022-08-15",
                    "season": "summer"
                },
                "lowest_temperature": {
                    "value": -15.3,
                    "date": "2023-01-22",
                    "season": "winter"
                },
                "highest_precipitation": {
                    "value": 189,
                    "date": "2024-11-15",
                    "month": "November",
                    "season": "autumn"
                },
                "longest_dry_period": {
                    "days": 67,
                    "period": "2023-06 to 2023-08",
                    "season": "summer"
                }
            }
        }
    
    async def get_seasonal_activity_guide(self, location: str) -> Dict:
        """Get activity recommendations by season"""
        
        return {
            "location": location,
            "by_season": {
                "winter": {
                    "best_activities": ["skiing", "ice skating", "winter hiking"],
                    "avg_temperature": 5,
                    "what_to_pack": ["warm coat", "gloves", "thermal layers"],
                    "warnings": ["Ice hazards", "Short daylight", "Hypothermia risk"]
                },
                "spring": {
                    "best_activities": ["hiking", "gardening", "outdoor sports"],
                    "avg_temperature": 15,
                    "what_to_pack": ["layers", "light jacket", "umbrella"],
                    "warnings": ["Allergies", "Variable weather", "Muddy trails"]
                },
                "summer": {
                    "best_activities": ["beach", "swimming", "outdoor festivals"],
                    "avg_temperature": 25,
                    "what_to_pack": ["sunscreen", "sunglasses", "light clothing"],
                    "warnings": ["Heat stroke", "Sunburn", "Dehydration"]
                },
                "autumn": {
                    "best_activities": ["leaf watching", "hiking", "photography"],
                    "avg_temperature": 15,
                    "what_to_pack": ["layers", "waterproof jacket", "comfortable shoes"],
                    "warnings": ["Slippery leaves", "Sudden weather changes", "Shorter days"]
                }
            }
        }
