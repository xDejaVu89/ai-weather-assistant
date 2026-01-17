import { useState, useEffect } from 'react';
import { Cloud, MapPin, Calendar, Activity } from 'lucide-react';
import WeatherCard from './WeatherCard';
import ForecastChart from './ForecastChart';
import LocationSearch from './LocationSearch';
import QueryInput from './QueryInput';
import WeatherAlerts from './WeatherAlerts';
import AirQualityCard from './AirQualityCard';
import SunUVCard from './SunUVCard';
import OutfitSuggestions from './OutfitSuggestions';
import HistoricalChart from './HistoricalChart';
import DetailedMetrics from './DetailedMetrics';
import PollenCard from './PollenCard';
import CityComparison from './CityComparison';
import HourlyForecast from './HourlyForecast';

interface WeatherDashboardProps {
  location: string;
  onLocationChange: (location: string) => void;
}

export default function WeatherDashboard({ location, onLocationChange }: WeatherDashboardProps) {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeatherData();
  }, [location]);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://127.0.0.1:8000/api/weather/current?location=${location}`);
      const data = await response.json();
      setCurrentWeather(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-8 rounded-2xl shadow-2xl text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Cloud size={40} />
            <div>
              <h1 className="text-3xl font-bold">Weather Dashboard</h1>
              <div className="flex items-center gap-2 mt-1">
                <MapPin size={16} />
                <span className="text-lg">{location}</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-5xl font-bold">{currentWeather?.temperature}°C</p>
            <p className="text-lg mt-1">{currentWeather?.description}</p>
          </div>
        </div>
        
        <LocationSearch onLocationSelect={onLocationChange} />
      </div>

      {/* Alerts */}
      <WeatherAlerts location={location} />

      {/* Current Weather Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <WeatherCard
          title="Temperature"
          icon="🌡️"
          value={`${currentWeather?.temperature}°C`}
          description={currentWeather?.description}
        />
        <WeatherCard
          title="Humidity"
          icon="💧"
          value={`${currentWeather?.humidity}%`}
          description="Moisture level"
        />
        <WeatherCard
          title="Wind Speed"
          icon="💨"
          value={`${currentWeather?.wind_speed} km/h`}
          description="Current wind"
        />
        <WeatherCard
          title="Feels Like"
          icon="🌡️"
          value={`${currentWeather?.feels_like || currentWeather?.temperature}°C`}
          description="Apparent temperature"
        />
      </div>

      {/* Forecast Chart */}
      <ForecastChart location={location} />

      {/* Natural Language Query */}
      <QueryInput location={location} />

      {/* Air Quality & Sun/UV */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AirQualityCard location={location} />
        <SunUVCard location={location} />
      </div>

      {/* Pollen */}
      <PollenCard location={location} />

      {/* Hourly Forecast */}
      <HourlyForecast location={location} />

      {/* Outfit Suggestions */}
      <OutfitSuggestions location={location} />

      {/* Detailed Metrics */}
      <DetailedMetrics location={location} />

      {/* Historical Trends */}
      <HistoricalChart location={location} />

      {/* City Comparison */}
      <CityComparison />
    </div>
  );
}
