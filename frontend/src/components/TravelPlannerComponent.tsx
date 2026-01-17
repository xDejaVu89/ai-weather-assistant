import React, { useState } from "react";
import { Plane, MapPin, TrendingUp } from "lucide-react";

interface Destination {
  name: string;
  temperature: number;
  conditions: string;
  rain_probability: number;
  suitability_score: number;
  recommendation: string;
}

export const TravelPlannerComponent: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState("2026-02-15 to 2026-02-22");
  const [destinations] = useState<Destination[]>([
    {
      name: "Barcelona",
      temperature: 22,
      conditions: "Sunny",
      rain_probability: 10,
      suitability_score: 95,
      recommendation: "Excellent",
    },
    {
      name: "Tokyo",
      temperature: 15,
      conditions: "Clear",
      rain_probability: 20,
      suitability_score: 85,
      recommendation: "Excellent",
    },
    {
      name: "Dubai",
      temperature: 35,
      conditions: "Sunny",
      rain_probability: 5,
      suitability_score: 88,
      recommendation: "Very Good",
    },
    {
      name: "Sydney",
      temperature: 26,
      conditions: "Sunny",
      rain_probability: 15,
      suitability_score: 92,
      recommendation: "Excellent",
    },
  ]);

  const getScoreColor = (score: number) => {
    if (score >= 90)
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    if (score >= 75)
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="flex items-center space-x-2 mb-4">
        <Plane className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-bold dark:text-white">Travel Planner</h2>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium dark:text-gray-300 mb-2">
          Travel Dates
        </label>
        <input
          type="text"
          value={selectedDates}
          onChange={(e) => setSelectedDates(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Select dates"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {destinations.map((dest, idx) => (
          <div
            key={idx}
            className="border rounded-lg p-4 dark:border-gray-700 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-red-500" />
                <h3 className="font-semibold dark:text-white">{dest.name}</h3>
              </div>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${getScoreColor(
                  dest.suitability_score
                )}`}
              >
                {dest.suitability_score}%
              </span>
            </div>

            <div className="space-y-1 text-sm dark:text-gray-400">
              <p>
                <strong className="dark:text-gray-300">Weather:</strong>{" "}
                {dest.temperature}°C, {dest.conditions}
              </p>
              <p>
                <strong className="dark:text-gray-300">Rain:</strong>{" "}
                {dest.rain_probability}%
              </p>
              <p>
                <strong className="dark:text-gray-300">Rating:</strong>{" "}
                <span className="text-green-600 dark:text-green-400">
                  {dest.recommendation}
                </span>
              </p>
            </div>

            <button className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 rounded">
              Plan Trip
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded">
        <div className="flex items-start space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5" />
          <div className="text-sm dark:text-blue-200">
            <p className="font-semibold">Travel Tips</p>
            <ul className="text-xs mt-1 space-y-1">
              <li>• Pack layers for variable weather</li>
              <li>• Book accommodations in advance</li>
              <li>• Check visa requirements</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
