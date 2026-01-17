import React from 'react';

interface WeatherCardProps {
  title: string;
  icon: React.ReactNode;
  value: string;
  description: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ title, icon, value, description }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:bg-white/15 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-white/80">{icon}</div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <div className="text-4xl font-bold text-white mb-2">{value}</div>
      <p className="text-white/70">{description}</p>
    </div>
  );
};

export default WeatherCard;
