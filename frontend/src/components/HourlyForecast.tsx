import React, { useEffect, useState } from 'react';
import { Clock, Droplets } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface HourlyForecastProps {
  location: string;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ location }) => {
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hours, setHours] = useState(12);

  useEffect(() => {
    if (location) {
      fetchHourlyForecast();
    }
  }, [location, hours]);

  const fetchHourlyForecast = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/weather/hourly?location=${encodeURIComponent(location)}&hours=${hours}`);
      const data = await response.json();
      setForecast(data.forecast || []);
    } catch (error) {
      console.error('Failed to fetch hourly forecast:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading hourly forecast...</div>;
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Clock className="w-8 h-8 text-white" />
          <h3 className="text-2xl font-semibold text-white">Hourly Forecast</h3>
        </div>
        <div className="flex gap-2">
          {[12, 24, 48].map(h => (
            <button
              key={h}
              onClick={() => setHours(h)}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                hours === h
                  ? 'bg-white text-blue-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {h}h
            </button>
          ))}
        </div>
      </div>

      {/* Temperature Chart */}
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={forecast}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="time" 
            stroke="rgba(255,255,255,0.7)"
            tick={{ fontSize: 11 }}
          />
          <YAxis stroke="rgba(255,255,255,0.7)" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
            }}
          />
          <Bar dataKey="temperature" fill="#60a5fa" name="Temperature (°C)" />
        </BarChart>
      </ResponsiveContainer>

      {/* Detailed Hourly Data */}
      <div className="mt-6 overflow-x-auto">
        <div className="flex gap-3 min-w-max pb-2">
          {forecast.slice(0, hours > 24 ? 24 : hours).map((hour, index) => (
            <div key={index} className="bg-white/10 rounded-xl p-3 min-w-[100px]">
              <div className="text-center">
                <div className="text-sm font-semibold text-white mb-2">{hour.time}</div>
                <div className="text-2xl font-bold text-white mb-2">{hour.temperature}°C</div>
                <div className="flex items-center justify-center gap-1 text-xs text-white/70 mb-1">
                  <Droplets className="w-3 h-3" />
                  {hour.precipitation_probability}%
                </div>
                <div className="text-xs text-white/60">{hour.description}</div>
                <div className="mt-2 text-xs text-white/50">
                  💨 {hour.wind_speed} km/h {hour.wind_direction}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;
