import React, { useEffect, useState } from 'react';
import { Flower2, AlertCircle } from 'lucide-react';

interface PollenCardProps {
  location: string;
}

const PollenCard: React.FC<PollenCardProps> = ({ location }) => {
  const [pollenData, setPollenData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location) {
      fetchPollenData();
    }
  }, [location]);

  const fetchPollenData = async () => {
    setLoading(true);
    try:
      const response = await fetch(`/api/weather/pollen?location=${encodeURIComponent(location)}`);
      const data = await response.json();
      setPollenData(data);
    } catch (error) {
      console.error('Failed to fetch pollen data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !pollenData) {
    return <div className="text-white">Loading pollen data...</div>;
  }

  const getLevelColor = (level: string) => {
    const colors: { [key: string]: string } = {
      Low: 'from-green-400 to-green-600',
      Moderate: 'from-yellow-400 to-yellow-600',
      High: 'from-orange-400 to-orange-600',
      'Very High': 'from-red-400 to-red-600',
    };
    return colors[level] || 'from-gray-400 to-gray-600';
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Flower2 className="w-8 h-8 text-white" />
        <h3 className="text-2xl font-semibold text-white">Pollen & Allergies</h3>
      </div>

      <div className={`bg-gradient-to-r ${getLevelColor(pollenData.overall_level)} rounded-xl p-6 mb-6`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/90 font-medium">Overall Level</span>
          <span className="text-4xl font-bold text-white">{pollenData.overall_index}</span>
        </div>
        <div className="text-xl font-semibold text-white mb-2">{pollenData.overall_level}</div>
        <div className="text-sm text-white/90">Dominant: {pollenData.dominant_type}</div>
      </div>

      <div className="bg-white/10 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-white/80 mt-0.5" />
          <div>
            <div className="text-sm font-semibold text-white mb-1">Advice</div>
            <div className="text-sm text-white/80">{pollenData.advice}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {Object.entries(pollenData.pollen_types).map(([type, value]: [string, any]) => (
          <div key={type} className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/70 capitalize">{type}</span>
              <span className="text-lg font-bold text-white">{value}</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className={`h-full ${
                  value < 30 ? 'bg-green-500' :
                  value < 60 ? 'bg-yellow-500' :
                  value < 90 ? 'bg-orange-500' : 'bg-red-500'
                }`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PollenCard;
