import React, { useEffect, useState } from 'react';
import { Shirt, Footprints, Glasses } from 'lucide-react';

interface OutfitSuggestions {
  outfit: string[];
  accessories: string[];
  footwear: string[];
  tips: string[];
  color_palette: string[];
}

interface OutfitCardProps {
  location: string;
}

const OutfitSuggestions: React.FC<OutfitCardProps> = ({ location }) => {
  const [suggestions, setSuggestions] = useState<OutfitSuggestions | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location) {
      fetchOutfitSuggestions();
    }
  }, [location]);

  const fetchOutfitSuggestions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/weather/outfit?location=${encodeURIComponent(location)}`);
      const data = await response.json();
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error('Failed to fetch outfit suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !suggestions) {
    return <div className="text-white">Loading outfit suggestions...</div>;
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Shirt className="w-8 h-8 text-white" />
        <h3 className="text-2xl font-semibold text-white">What to Wear</h3>
      </div>

      <div className="space-y-6">
        {/* Outfit */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Shirt className="w-5 h-5" />
            Clothing
          </h4>
          <div className="flex flex-wrap gap-2">
            {suggestions.outfit.map((item, index) => (
              <span key={index} className="bg-white/20 px-3 py-1 rounded-full text-sm text-white">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Accessories */}
        {suggestions.accessories.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Glasses className="w-5 h-5" />
              Accessories
            </h4>
            <div className="flex flex-wrap gap-2">
              {suggestions.accessories.map((item, index) => (
                <span key={index} className="bg-white/20 px-3 py-1 rounded-full text-sm text-white">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footwear */}
        {suggestions.footwear.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Footprints className="w-5 h-5" />
              Footwear
            </h4>
            <div className="flex flex-wrap gap-2">
              {suggestions.footwear.map((item, index) => (
                <span key={index} className="bg-white/20 px-3 py-1 rounded-full text-sm text-white">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        {suggestions.tips.length > 0 && (
          <div className="bg-white/10 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-white/90 mb-2">💡 Tips</h4>
            <ul className="space-y-1">
              {suggestions.tips.map((tip, index) => (
                <li key={index} className="text-sm text-white/80">• {tip}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Color Palette */}
        {suggestions.color_palette.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-white/90 mb-2">🎨 Suggested Colors</h4>
            <div className="flex gap-2">
              {suggestions.color_palette.map((color, index) => (
                <span key={index} className="text-sm text-white/80 bg-white/10 px-3 py-1 rounded-lg">
                  {color}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutfitSuggestions;
