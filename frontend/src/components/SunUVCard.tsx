import React, { useEffect, useState } from 'react';
import { Sun, Sunrise, Sunset, Moon } from 'lucide-react';

interface SunData {
  sunrise: string;
  sunset: string;
  solar_noon: string;
  day_length: string;
  uv_index: number;
  uv_category: string;
  uv_recommendation: string;
}

interface SunUVCardProps {
  location: string;
}

const SunUVCard: React.FC<SunUVCardProps> = ({ location }) => {
  const [sunData, setSunData] = useState<SunData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location) {
      fetchSunData();
    }
  }, [location]);

  const fetchSunData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/weather/sun?location=${encodeURIComponent(location)}`);
      const data = await response.json();
      setSunData(data);
    } catch (error) {
      console.error('Failed to fetch sun data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !sunData) {
    return <div className="text-white">Loading sun data...</div>;
  }

  const getUVColor = (uvIndex: number) => {
    if (uvIndex < 3) return 'from-green-400 to-green-600';
    if (uvIndex < 6) return 'from-yellow-400 to-yellow-600';
    if (uvIndex < 8) return 'from-orange-400 to-orange-600';
    if (uvIndex < 11) return 'from-red-400 to-red-600';
    return 'from-purple-400 to-purple-600';
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Sun className="w-8 h-8 text-white" />
        <h3 className="text-2xl font-semibold text-white">Sun & UV</h3>
      </div>

      <div className={`bg-gradient-to-r ${getUVColor(sunData.uv_index)} rounded-xl p-6 mb-6`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/90 font-medium">UV Index</span>
          <span className="text-4xl font-bold text-white">{sunData.uv_index}</span>
        </div>
        <div className="text-lg font-semibold text-white mb-2">{sunData.uv_category}</div>
        <div className="text-sm text-white/90">{sunData.uv_recommendation}</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sunrise className="w-5 h-5 text-yellow-300" />
            <span className="text-white/70 text-sm">Sunrise</span>
          </div>
          <div className="text-2xl font-bold text-white">{sunData.sunrise}</div>
        </div>
        
        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sunset className="w-5 h-5 text-orange-300" />
            <span className="text-white/70 text-sm">Sunset</span>
          </div>
          <div className="text-2xl font-bold text-white">{sunData.sunset}</div>
        </div>
        
        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sun className="w-5 h-5 text-yellow-200" />
            <span className="text-white/70 text-sm">Solar Noon</span>
          </div>
          <div className="text-lg font-semibold text-white">{sunData.solar_noon}</div>
        </div>
        
        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Moon className="w-5 h-5 text-blue-200" />
            <span className="text-white/70 text-sm">Day Length</span>
          </div>
          <div className="text-lg font-semibold text-white">{sunData.day_length}</div>
        </div>
      </div>
    </div>
  );
};

export default SunUVCard;
