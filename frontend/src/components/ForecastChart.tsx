import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ForecastChart: React.FC = () => {
  // Sample data - will be replaced with real API data
  const data = [
    { day: 'Mon', temp: 22, humidity: 65 },
    { day: 'Tue', temp: 24, humidity: 60 },
    { day: 'Wed', temp: 20, humidity: 70 },
    { day: 'Thu', temp: 23, humidity: 55 },
    { day: 'Fri', temp: 25, humidity: 50 },
    { day: 'Sat', temp: 26, humidity: 48 },
    { day: 'Sun', temp: 24, humidity: 52 },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-6">7-Day Forecast</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="day" stroke="rgba(255,255,255,0.7)" />
          <YAxis stroke="rgba(255,255,255,0.7)" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#ffffff"
            strokeWidth={2}
            name="Temperature (°C)"
            dot={{ fill: '#ffffff', r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#93c5fd"
            strokeWidth={2}
            name="Humidity (%)"
            dot={{ fill: '#93c5fd', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart;
