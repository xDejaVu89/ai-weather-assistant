import React, { useState } from 'react';
import { Plus, X, Award } from 'lucide-react';

interface CityComparisonProps {
  onCompare: (cities: string[]) => void;
}

const CityComparison: React.FC<CityComparisonProps> = ({ onCompare }) => {
  const [cities, setCities] = useState<string[]>(['London', 'New York']);
  const [newCity, setNewCity] = useState('');
  const [comparisonData, setComparisonData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const addCity = () => {
    if (newCity && !cities.includes(newCity) && cities.length < 5) {
      setCities([...cities, newCity]);
      setNewCity('');
    }
  };

  const removeCity = (city: string) => {
    setCities(cities.filter(c => c !== city));
  };

  const compareCities = async () => {
    if (cities.length < 2) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/weather/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cities })
      });
      const data = await response.json();
      setComparisonData(data);
      onCompare(cities);
    } catch (error) {
      console.error('Comparison failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg">
      <h3 className="text-2xl font-semibold text-white mb-6">Compare Cities</h3>

      {/* City Input */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Add city..."
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addCity()}
          className="flex-1 px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
          disabled={cities.length >= 5}
        />
        <button
          onClick={addCity}
          disabled={cities.length >= 5}
          className="px-4 py-2 bg-white text-blue-600 rounded-xl font-semibold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* City List */}
      <div className="flex flex-wrap gap-2 mb-4">
        {cities.map((city) => (
          <div key={city} className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-full">
            <span className="text-white">{city}</span>
            <button
              onClick={() => removeCity(city)}
              className="text-white/70 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={compareCities}
        disabled={cities.length < 2 || loading}
        className="w-full px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Comparing...' : `Compare ${cities.length} Cities`}
      </button>

      {/* Comparison Results */}
      {comparisonData && (
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {comparisonData.cities.map((city: any) => (
              <div key={city.city} className="bg-white/10 rounded-xl p-4">
                <h4 className="text-lg font-semibold text-white mb-3">{city.city}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">Temperature:</span>
                    <span className="text-white font-semibold">{city.temperature}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Feels Like:</span>
                    <span className="text-white font-semibold">{city.feels_like}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Humidity:</span>
                    <span className="text-white font-semibold">{city.humidity}%</span>
                  </div>
                  <div className="text-white/80 mt-2 capitalize">{city.description}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Extremes */}
          {comparisonData.extremes && (
            <div className="bg-white/10 rounded-xl p-4">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Highlights
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <div className="text-white/70 mb-1">Hottest</div>
                  <div className="text-white font-semibold">{comparisonData.extremes.hottest?.city}</div>
                  <div className="text-red-300">{comparisonData.extremes.hottest?.temperature}°C</div>
                </div>
                <div>
                  <div className="text-white/70 mb-1">Coldest</div>
                  <div className="text-white font-semibold">{comparisonData.extremes.coldest?.city}</div>
                  <div className="text-blue-300">{comparisonData.extremes.coldest?.temperature}°C</div>
                </div>
                <div>
                  <div className="text-white/70 mb-1">Most Humid</div>
                  <div className="text-white font-semibold">{comparisonData.extremes.most_humid?.city}</div>
                  <div className="text-cyan-300">{comparisonData.extremes.most_humid?.humidity}%</div>
                </div>
                <div>
                  <div className="text-white/70 mb-1">Windiest</div>
                  <div className="text-white font-semibold">{comparisonData.extremes.windiest?.city}</div>
                  <div className="text-gray-300">{comparisonData.extremes.windiest?.wind_speed} km/h</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CityComparison;
