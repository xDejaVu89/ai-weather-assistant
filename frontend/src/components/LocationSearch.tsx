import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface Location {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

interface LocationSearchProps {
  onLocationSelect: (location: Location) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Location[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (searchQuery.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    try {
      const response = await fetch(`/api/weather/locations/search?query=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setResults(data.results || []);
      setShowResults(true);
    } catch (error) {
      console.error('Location search error:', error);
    }
  };

  const selectLocation = (location: Location) => {
    setQuery(location.name);
    setShowResults(false);
    onLocationSelect(location);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-white/20 rounded-xl px-4 py-3 border border-white/30">
        <Search className="w-5 h-5 text-white" />
        <input
          type="text"
          placeholder="Search cities..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => results.length > 0 && setShowResults(true)}
          className="flex-1 bg-transparent text-white placeholder-white/60 focus:outline-none"
        />
      </div>
      
      {showResults && results.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {results.map((location, index) => (
            <button
              key={index}
              onClick={() => selectLocation(location)}
              className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex justify-between items-center"
            >
              <span className="font-medium text-gray-800">{location.name}</span>
              <span className="text-sm text-gray-500">{location.country}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
