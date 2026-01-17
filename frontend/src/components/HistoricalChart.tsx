import React, { useEffect, useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface HistoricalChartProps {
  location: string;
}

const HistoricalChart: React.FC<HistoricalChartProps> = ({ location }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(7);

  useEffect(() => {
    if (location) {
      fetchHistoricalData();
    }
  }, [location, days]);

  const fetchHistoricalData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/weather/trends?location=${encodeURIComponent(location)}&days=${days}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch historical data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) {
    return <div className="text-white">Loading historical data...</div>;
  }

  const getTrendIcon = () => {
    if (data.trend === 'warming') return <TrendingUp className="w-5 h-5 text-red-300" />;
    if (data.trend === 'cooling') return <TrendingDown className="w-5 h-5 text-blue-300" />;
    return <Minus className="w-5 h-5 text-gray-300" />;
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-2xl font-semibold text-white">Temperature Trends</h3>
          {getTrendIcon()}
        </div>
        <div className="flex gap-2">
          {[7, 14, 30].map(d => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                days === d
                  ? 'bg-white text-blue-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {d}d
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white/10 rounded-xl p-4">
          <div className="text-white/70 text-sm mb-1">Average</div>
          <div className="text-2xl font-bold text-white">{data.average_temperature}°C</div>
        </div>
        <div className="bg-white/10 rounded-xl p-4">
          <div className="text-white/70 text-sm mb-1">Maximum</div>
          <div className="text-2xl font-bold text-red-300">{data.max_temperature}°C</div>
        </div>
        <div className="bg-white/10 rounded-xl p-4">
          <div className="text-white/70 text-sm mb-1">Minimum</div>
          <div className="text-2xl font-bold text-blue-300">{data.min_temperature}°C</div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data.data}>
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f87171" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.3}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="date" 
            stroke="rgba(255,255,255,0.7)"
            tick={{ fontSize: 12 }}
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
          <Area
            type="monotone"
            dataKey="temp_avg"
            stroke="#f87171"
            fill="url(#tempGradient)"
            name="Temperature (°C)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoricalChart;
