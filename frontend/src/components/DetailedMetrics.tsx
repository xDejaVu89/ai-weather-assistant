import React, { useEffect, useState } from 'react';
import { Wind, Droplets, Eye, Gauge } from 'lucide-react';

interface DetailedMetricsProps {
  location: string;
}

const DetailedMetrics: React.FC<DetailedMetricsProps> = ({ location }) => {
  const [windData, setWindData] = useState<any>(null);
  const [pressureData, setPressureData] = useState<any>(null);
  const [visibilityData, setVisibilityData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location) {
      fetchDetailedData();
    }
  }, [location]);

  const fetchDetailedData = async () => {
    setLoading(true);
    try {
      const [wind, pressure, visibility] = await Promise.all([
        fetch(`/api/weather/wind?location=${encodeURIComponent(location)}`).then(r => r.json()),
        fetch(`/api/weather/pressure?location=${encodeURIComponent(location)}`).then(r => r.json()),
        fetch(`/api/weather/visibility?location=${encodeURIComponent(location)}`).then(r => r.json())
      ]);
      setWindData(wind);
      setPressureData(pressure);
      setVisibilityData(visibility);
    } catch (error) {
      console.error('Failed to fetch detailed data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !windData || !pressureData || !visibilityData) {
    return <div className="text-white">Loading detailed metrics...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Wind Details */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Wind className="w-8 h-8 text-white" />
          <h3 className="text-xl font-semibold text-white">Wind</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="text-4xl font-bold text-white mb-1">{windData.speed} km/h</div>
            <div className="text-white/70 text-sm">{windData.description}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-xs text-white/70 mb-1">Direction</div>
              <div className="text-lg font-semibold text-white">{windData.direction}</div>
              <div className="text-xs text-white/60">{windData.direction_degrees}°</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-xs text-white/70 mb-1">Gusts</div>
              <div className="text-lg font-semibold text-white">{windData.gust_speed} km/h</div>
            </div>
          </div>
          
          <div className="text-sm text-white/60">
            {windData.speed_mph} mph
          </div>
        </div>
      </div>

      {/* Pressure */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Gauge className="w-8 h-8 text-white" />
          <h3 className="text-xl font-semibold text-white">Pressure</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="text-4xl font-bold text-white mb-1">{pressureData.current}</div>
            <div className="text-white/70 text-sm">{pressureData.unit}</div>
          </div>
          
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
            pressureData.trend === 'rising' ? 'bg-green-500/20' :
            pressureData.trend === 'falling' ? 'bg-red-500/20' : 'bg-gray-500/20'
          }`}>
            <span className="text-2xl">
              {pressureData.trend === 'rising' ? '↑' : 
               pressureData.trend === 'falling' ? '↓' : '→'}
            </span>
            <div>
              <div className="text-sm font-semibold text-white capitalize">{pressureData.trend}</div>
              <div className="text-xs text-white/70">{pressureData.change_last_hour} hPa/hr</div>
            </div>
          </div>
          
          <div className="text-sm text-white/80 bg-white/10 rounded-lg p-3">
            {pressureData.forecast}
          </div>
        </div>
      </div>

      {/* Visibility */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Eye className="w-8 h-8 text-white" />
          <h3 className="text-xl font-semibold text-white">Visibility</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="text-4xl font-bold text-white mb-1">{visibilityData.distance_km} km</div>
            <div className="text-white/70 text-sm">{visibilityData.quality}</div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-sm text-white/80 mb-2">{visibilityData.description}</div>
            <div className="text-xs text-white/60">{visibilityData.distance_miles} miles</div>
          </div>
          
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className={`h-full ${
                visibilityData.quality === 'Excellent' ? 'bg-green-500' :
                visibilityData.quality === 'Good' ? 'bg-blue-500' :
                visibilityData.quality === 'Moderate' ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min(100, (visibilityData.distance_km / 15) * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedMetrics;
