from typing import List, Dict
import httpx


class LocationService:
    """Service for location search and autocomplete"""
    
    def __init__(self):
        self.cities_cache = self._load_popular_cities()
    
    def _load_popular_cities(self) -> List[Dict]:
        """Load popular cities for autocomplete"""
        return [
            {"name": "London", "country": "UK", "lat": 51.5074, "lon": -0.1278},
            {"name": "New York", "country": "US", "lat": 40.7128, "lon": -74.0060},
            {"name": "Tokyo", "country": "JP", "lat": 35.6762, "lon": 139.6503},
            {"name": "Paris", "country": "FR", "lat": 48.8566, "lon": 2.3522},
            {"name": "Sydney", "country": "AU", "lat": -33.8688, "lon": 151.2093},
            {"name": "Los Angeles", "country": "US", "lat": 34.0522, "lon": -118.2437},
            {"name": "Mumbai", "country": "IN", "lat": 19.0760, "lon": 72.8777},
            {"name": "Berlin", "country": "DE", "lat": 52.5200, "lon": 13.4050},
            {"name": "Toronto", "country": "CA", "lat": 43.6532, "lon": -79.3832},
            {"name": "Singapore", "country": "SG", "lat": 1.3521, "lon": 103.8198},
            {"name": "Dubai", "country": "AE", "lat": 25.2048, "lon": 55.2708},
            {"name": "Barcelona", "country": "ES", "lat": 41.3851, "lon": 2.1734},
            {"name": "Amsterdam", "country": "NL", "lat": 52.3676, "lon": 4.9041},
            {"name": "Rome", "country": "IT", "lat": 41.9028, "lon": 12.4964},
            {"name": "Hong Kong", "country": "HK", "lat": 22.3193, "lon": 114.1694},
        ]
    
    async def search_locations(self, query: str, limit: int = 10) -> List[Dict]:
        """Search for locations matching the query"""
        if not query or len(query) < 2:
            return []
        
        query_lower = query.lower()
        results = [
            city for city in self.cities_cache
            if query_lower in city["name"].lower() or query_lower in city["country"].lower()
        ]
        
        return results[:limit]
    
    async def get_location_details(self, lat: float, lon: float) -> Dict:
        """Get location details from coordinates"""
        # Find closest city in cache
        for city in self.cities_cache:
            if abs(city["lat"] - lat) < 0.1 and abs(city["lon"] - lon) < 0.1:
                return city
        
        return {
            "name": f"Location ({lat:.2f}, {lon:.2f})",
            "country": "Unknown",
            "lat": lat,
            "lon": lon
        }
