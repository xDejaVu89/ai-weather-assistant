import React, { useState } from "react";
import { Leaf } from "lucide-react";

export const SustainabilityComponent: React.FC = () => {
  const [metrics] = useState({
    carbon_footprint: 125.5,
    trend: "Decreasing",
    monthly_comparison: {
      current: 125.5,
      previous: 132.3,
      change: -5.1,
    },
    breakdown: {
      car_travel: 45.2,
      flights: 32.1,
      energy: 48.2,
    },
    score: 72,
    goals: [
      "Reduce carbon footprint by 20%",
      "Increase renewable energy to 50%",
      "Reduce water usage by 15%",
    ],
  });

  const [recommendations] = useState([
    {
      activity: "Cycle or Walk",
      carbon_saved: "0.21 kg CO2",
      benefit: "Zero emissions alternative to car",
    },
    {
      activity: "Use Solar Charger",
      carbon_saved: "0.15 kg CO2",
      benefit: "Renewable energy charging",
    },
    {
      activity: "Use Public Transport",
      carbon_saved: "0.12 kg CO2",
      benefit: "Shared transportation reduces per-person emissions",
    },
  ]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="flex items-center space-x-2 mb-4">
        <Leaf className="w-6 h-6 text-green-500" />
        <h2 className="text-xl font-bold dark:text-white">
          Climate & Sustainability
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 dark:bg-green-900 p-4 rounded">
          <p className="text-xs text-gray-500 dark:text-green-300 uppercase tracking-wide">
            Carbon Footprint
          </p>
          <p className="text-3xl font-bold dark:text-white">
            {metrics.carbon_footprint}
          </p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
            ↓ {Math.abs(metrics.monthly_comparison.change)}% (monthly)
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded">
          <p className="text-xs text-gray-500 dark:text-blue-300 uppercase tracking-wide">
            Sustainability Score
          </p>
          <p className="text-3xl font-bold dark:text-white">{metrics.score}%</p>
          <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
            Better than 65% of users
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded">
          <p className="text-xs text-gray-500 dark:text-purple-300 uppercase tracking-wide">
            Trend
          </p>
          <p className="text-3xl font-bold dark:text-white">📉</p>
          <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
            {metrics.trend}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold dark:text-white mb-3">Emissions Breakdown</h3>
        <div className="space-y-2">
          {Object.entries(metrics.breakdown).map(([key, value]: [string, number]) => (
            <div key={key}>
              <div className="flex justify-between text-sm mb-1">
                <span className="dark:text-gray-300 capitalize">
                  {key.replace("_", " ")}
                </span>
                <span className="font-semibold dark:text-white">{value} kg</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                  style={{ width: `${(value / 50) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold dark:text-white mb-3">Eco-Friendly Recommendations</h3>
        <div className="space-y-2">
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="bg-green-50 dark:bg-green-900 p-3 rounded text-sm"
            >
              <p className="font-medium dark:text-white">{rec.activity}</p>
              <p className="text-xs text-gray-600 dark:text-green-300 mt-1">
                {rec.benefit}
              </p>
              <p className="text-xs font-semibold text-green-600 dark:text-green-400 mt-1">
                Save: {rec.carbon_saved}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold dark:text-white mb-3">Your Goals</h3>
        <ul className="space-y-2">
          {metrics.goals.map((goal, idx) => (
            <li key={idx} className="flex items-start space-x-2 text-sm">
              <input type="checkbox" className="mt-1" />
              <span className="dark:text-gray-300">{goal}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
