from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import Optional, List, Dict
from app.services.auth_service import AuthService
from app.services.alert_notification_service import AlertNotificationService
from app.services.data_export_service import DataExportService
from app.services.health_safety_service import HealthSafetyService
from app.services.activity_planner_service import ActivityPlannerService
from app.services.seasonal_analysis_service import SeasonalAnalysisService
from app.services.travel_planner_service import TravelPlannerService
from app.services.integration_service import IntegrationService
from app.services.sustainability_service import SustainabilityService

router = APIRouter()

# Service instances
auth_service = AuthService()
alert_notif_service = AlertNotificationService()
export_service = DataExportService()
health_safety_service = HealthSafetyService()
activity_planner_service = ActivityPlannerService()
seasonal_analysis_service = SeasonalAnalysisService()
travel_planner_service = TravelPlannerService()
integration_service = IntegrationService()
sustainability_service = SustainabilityService()

# ==================== AUTH ENDPOINTS ====================

class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/auth/register")
async def register(request: RegisterRequest):
    """Register a new user"""
    try:
        result = await auth_service.register_user(request.email, request.password, request.name)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/auth/login")
async def login(request: LoginRequest):
    """Login user"""
    try:
        result = await auth_service.login_user(request.email, request.password)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/auth/profile")
async def get_profile(email: str = Query(...)):
    """Get user profile"""
    try:
        profile = await auth_service.get_user_profile(email)
        if not profile:
            raise HTTPException(status_code=404, detail="User not found")
        return profile
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/auth/preferences")
async def update_preferences(email: str = Query(...), preferences: Dict = None):
    """Update user preferences"""
    try:
        result = await auth_service.update_preferences(email, preferences or {})
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/auth/favorites")
async def add_favorite(email: str = Query(...), location: str = Query(...)):
    """Add favorite location"""
    try:
        result = await auth_service.add_favorite(email, location)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/auth/favorites")
async def remove_favorite(email: str = Query(...), location: str = Query(...)):
    """Remove favorite location"""
    try:
        result = await auth_service.remove_favorite(email, location)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ==================== NOTIFICATIONS & ALERTS ====================

class AlertRequest(BaseModel):
    user_id: str
    alert_type: str
    condition: Dict
    message: str

@router.post("/alerts/create")
async def create_alert(request: AlertRequest):
    """Create a weather alert"""
    try:
        alert = await alert_notif_service.create_alert(
            request.user_id, request.alert_type, request.condition, request.message
        )
        return alert
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/alerts/notifications")
async def get_notifications(user_id: str = Query(...), limit: int = Query(50)):
    """Get user notifications"""
    try:
        notifications = await alert_notif_service.get_notifications(user_id, limit)
        return {"notifications": notifications}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/alerts/weather-summary")
async def get_weather_summary(location: str = Query(...), weather_data: Dict = None):
    """Get weather summary with warnings and recommendations"""
    try:
        summary = await alert_notif_service.get_weather_summary(location, weather_data or {})
        return summary
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ==================== DATA EXPORT ====================

@router.get("/export/json")
async def export_json(location: str = Query(...)):
    """Export weather data as JSON"""
    try:
        result = await export_service.export_to_json({}, [], f"{location}_export.json")
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/export/csv")
async def export_csv(location: str = Query(...)):
    """Export forecast data as CSV"""
    try:
        result = await export_service.export_to_csv([], f"{location}_forecast.csv")
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/export/pdf")
async def export_pdf(location: str = Query(...)):
    """Export weather report as PDF"""
    try:
        result = await export_service.generate_pdf_report(location, {}, [], None, f"{location}_report.pdf")
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ==================== HEALTH & SAFETY ====================

@router.get("/health/risks")
async def get_health_risks(weather_data: Dict = None):
    """Get health risks based on weather"""
    try:
        risks = await health_safety_service.get_health_risks(weather_data or {})
        return risks
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/health/pollen-impact")
async def get_pollen_impact(pollen_data: Dict = None):
    """Get health impact of pollen levels"""
    try:
        impact = await health_safety_service.get_pollen_health_impact(pollen_data or {})
        return impact
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ==================== ACTIVITY PLANNER ====================

@router.get("/activities/recommendations")
async def get_activity_recommendations(days: int = Query(7)):
    """Get activity recommendations for next days"""
    try:
        # Mock forecast data
        forecast = [{"temperature": 18 + i, "description": "sunny", "date": f"2026-01-{17+i}"} for i in range(days)]
        recommendations = await activity_planner_service.get_activity_recommendations(forecast)
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ==================== SEASONAL ANALYSIS ====================

@router.get("/seasonal/forecast")
async def get_seasonal_forecast(location: str = Query(...), season: Optional[str] = None):
    """Get seasonal weather forecast"""
    try:
        forecast = await seasonal_analysis_service.get_seasonal_forecast(location, season)
        return forecast
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/seasonal/comparison")
async def get_year_comparison(location: str = Query(...)):
    """Get year-over-year weather comparison"""
    try:
        comparison = await seasonal_analysis_service.get_year_over_year_comparison(location)
        return comparison
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/seasonal/trends")
async def get_climate_trends(location: str = Query(...), years: int = Query(10)):
    """Get long-term climate trends"""
    try:
        trends = await seasonal_analysis_service.get_climate_trends(location, years)
        return trends
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/seasonal/records")
async def get_seasonal_records(location: str = Query(...)):
    """Get seasonal weather records"""
    try:
        records = await seasonal_analysis_service.get_seasonal_records(location)
        return records
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ==================== TRAVEL PLANNER ====================

@router.get("/travel/best-dates")
async def find_best_travel_dates(
    destination: str = Query(...),
    duration: int = Query(7),
    preferences: Dict = None
):
    """Find best dates to travel based on weather"""
    try:
        result = await travel_planner_service.find_best_travel_dates(destination, duration, preferences or {})
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/travel/compare-destinations")
async def compare_destinations(destinations: str = Query(...), travel_date: str = Query(...)):
    """Compare weather across destinations"""
    try:
        dest_list = destinations.split(",")
        result = await travel_planner_service.compare_travel_destinations(dest_list, travel_date)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/travel/packing-list")
async def get_packing_list(destination: str = Query(...), dates: str = Query(...)):
    """Get packing list based on destination weather"""
    try:
        date_range = {"start": dates.split(",")[0], "end": dates.split(",")[1] if "," in dates else dates}
        result = await travel_planner_service.get_travel_packing_list(destination, date_range)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ==================== INTEGRATIONS ====================

@router.get("/integrations/available")
async def get_available_integrations():
    """Get list of available third-party integrations"""
    try:
        integrations = await integration_service.get_available_integrations()
        return integrations
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ==================== SUSTAINABILITY ====================

@router.get("/sustainability/carbon-footprint")
async def get_carbon_footprint(user_activities: List[Dict] = None):
    """Calculate user carbon footprint"""
    try:
        result = await sustainability_service.calculate_carbon_footprint(user_activities or [])
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/sustainability/recommendations")
async def get_eco_recommendations(location: str = Query(...), weather_data: Dict = None):
    """Get eco-friendly activity recommendations"""
    try:
        recommendations = await sustainability_service.get_eco_friendly_recommendations(location, weather_data or {})
        return {"recommendations": recommendations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/sustainability/climate-insights")
async def get_climate_insights():
    """Get climate change insights"""
    try:
        insights = await sustainability_service.get_climate_change_insights()
        return insights
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/sustainability/energy-forecast")
async def get_renewable_energy_forecast(location: str = Query(...)):
    """Forecast renewable energy potential"""
    try:
        forecast = await sustainability_service.get_renewable_energy_forecast(location, [])
        return forecast
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/sustainability/impact-report")
async def get_impact_report(user_id: str = Query(...)):
    """Generate environmental impact report"""
    try:
        report = await sustainability_service.get_environmental_impact_report({})
        return report
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
