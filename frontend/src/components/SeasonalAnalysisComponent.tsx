import React, { useState } from "react";
import { Calendar, TrendingUp, LineChart } from "lucide-react";

interface SeasonalData {
  season: string;
  avg_temp: number;
  precipitation: string;
  outlook: string;
}

export const SeasonalAnalysisComponent: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState("spring");
  const [seasonalData] = useState({
    winter: {
      avg_temp: 5,
      temp_range: { min: -5, max: 15 },
      precipitation: "Frequent",
      conditions: "Cold, occasional snow",
      outlook: "Below average temperatures expected",
    },
    spring: {
      avg_temp: 15,
      temp_range: { min: 8, max: 22 },
      precipitation: "Moderate",
      conditions: "Variable, warming trend",
      outlook: "Gradual warming with occasional rain",
    },
    summer: {
      avg_temp: 25,
      temp_range: { min: 18, max: 32 },
      precipitation: "Low",
      conditions: "Warm, mostly sunny",
      outlook: "Above average temperatures expected",
    },
    autumn: {
      avg_temp: 15,
      temp_range: { min: 8, max: 22 },
      precipitation: "Increasing",
      conditions: "Cooling, leaf fall",
      outlook: "Gradual cooling with increasing rain",
    },
  });

  const trends = {
    temperature_trend: {
      direction: "warming",
      rate: "+0.12°C per year",
      confidence: 0.92,
    },
    precipitation_trend: {
      direction: "increasing",
      rate: "+1.2% per year",
      confidence: 0.78,
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="w-6 h-6 text-green-500" />
        <h2 className="text-xl font-bold dark:text-white">Seasonal Analysis</h2>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium dark:text-gray-300 mb-2">
          Select Season
        </label>
        <div className="grid grid-cols-4 gap-2">
          {Object.keys(seasonalData).map((season) => (
            <button
              key={season}
              onClick={() => setSelectedSeason(season)}
              className={`p-2 rounded capitalize font-medium transition ${
                selectedSeason === season
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {season}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded mb-4">
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Average Temp
            </p>
            <p className="text-2xl font-bold dark:text-white">
              {seasonalData[selectedSeason as keyof typeof seasonalData].avg_temp}°C
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Range</p>
            <p className="text-lg font-bold dark:text-white">
              {
                seasonalData[selectedSeason as keyof typeof seasonalData]
                  .temp_range.min
              }
              ° to{" "}
              {
                seasonalData[selectedSeason as keyof typeof seasonalData]
                  .temp_range.max
              }
              °
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Conditions</p>
          <p className="dark:text-gray-100">
            {seasonalData[selectedSeason as keyof typeof seasonalData].conditions}
          </p>
        </div>

        <div className="mt-3 p-2 bg-blue-100 dark:bg-blue-900 rounded">
          <p className="text-xs font-semibold dark:text-blue-200">
            {seasonalData[selectedSeason as keyof typeof seasonalData].outlook}
          </p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold dark:text-white mb-3 flex items-center space-x-2">
          <TrendingUp className="w-4 h-4" />
          <span>10-Year Trends</span>
        </h3>

        <div className="space-y-2">
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium dark:text-white">
                Temperature Trend
              </p>
              <span className="text-red-600 dark:text-red-400 font-semibold">
                {trends.temperature_trend.rate}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Direction: {trends.temperature_trend.direction} |
              Confidence: {(trends.temperature_trend.confidence * 100).toFixed(0)}%
            </p>
            <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2 mt-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{ width: `${trends.temperature_trend.confidence * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium dark:text-white">
                Precipitation Trend
              </p>
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                {trends.precipitation_trend.rate}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Direction: {trends.precipitation_trend.direction} |
              Confidence: {(trends.precipitation_trend.confidence * 100).toFixed(0)}%
            </p>
            <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2 mt-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${trends.precipitation_trend.confidence * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
