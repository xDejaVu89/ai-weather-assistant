import React, { useEffect, useState } from 'react';
import { Wind, Droplets, Activity } from 'lucide-react';

interface AirQualityData {
  aqi: number;
  category: string;
  color: string;
  description: string;
  pollutants: {
    pm25: number;
    pm10: number;
    o3: number;
    no2: number;
    so2: number;
    co: number;
  };
}

interface AirQualityCardProps {
  location: string;
}

const AirQualityCard: React.FC<AirQualityCardProps> = ({ location }) => {
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location) {
      fetchAirQuality();
    }
  }, [location]);

  const fetchAirQuality = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/weather/air-quality?location=${encodeURIComponent(location)}`);
      const data = await response.json();
      setAirQuality(data);
    } catch (error) {
      console.error('Failed to fetch air quality:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !airQuality) {
    return <div className="text-white">Loading air quality...</div>;
  }

  const getAQIColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Good: 'from-green-400 to-green-600',
      Moderate: 'from-yellow-400 to-yellow-600',
      'Unhealthy for Sensitive Groups': 'from-orange-400 to-orange-600',
      Unhealthy: 'from-red-400 to-red-600',
      'Very Unhealthy': 'from-purple-400 to-purple-600',
    };
    return colors[category] || 'from-gray-400 to-gray-600';
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <Wind className="w-8 h-8 text-white" />
        <h3 className="text-2xl font-semibold text-white">Air Quality</h3>
      </div>
      
      <div className={`bg-gradient-to-r ${getAQIColor(airQuality.category)} rounded-xl p-6 mb-4`}>
        <div className="text-6xl font-bold text-white mb-2">{airQuality.aqi}</div>
        <div className="text-xl font-semibold text-white mb-1">{airQuality.category}</div>
        <div className="text-sm text-white/90">{airQuality.description}</div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/10 rounded-lg p-3">
          <div className="text-xs text-white/70 mb-1">PM2.5</div>
          <div className="text-lg font-semibold text-white">{airQuality.pollutants.pm25}</div>
        </div>
        <div className="bg-white/10 rounded-lg p-3">
          <div className="text-xs text-white/70 mb-1">PM10</div>
          <div className="text-lg font-semibold text-white">{airQuality.pollutants.pm10}</div>
        </div>
        <div className="bg-white/10 rounded-lg p-3">
          <div className="text-xs text-white/70 mb-1">O₃</div>
          <div className="text-lg font-semibold text-white">{airQuality.pollutants.o3}</div>
        </div>
      </div>
    </div>
  );
};

export default AirQualityCard;
