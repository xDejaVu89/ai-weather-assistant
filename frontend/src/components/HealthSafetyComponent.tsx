import React, { useState } from "react";
import { AlertTriangle, Heart, Droplets, Sun, Wind } from "lucide-react";

interface HealthRisk {
  level: string;
  condition: string;
  risk: string;
  advice: string;
}

export const HealthSafetyComponent: React.FC = () => {
  const [risks] = useState({
    temperature_risk: {
      level: "moderate",
      condition: "Warm",
      risk: "Increased sweating, fatigue",
      advice: "Drink plenty of water, take breaks",
    },
    humidity_risk: {
      level: "low",
      condition: "Normal Humidity",
      risk: "None",
      advice: "Normal activity",
    },
    uv_risk: {
      level: "high",
      condition: "Very High UV",
      risk: "Sunburn likely, skin damage",
      advice: "Use SPF 30+ sunscreen, seek shade",
    },
    air_quality_risk: {
      level: "moderate",
      condition: "Unhealthy for Sensitive Groups",
      risk: "Sensitive groups may experience issues",
      advice: "Limit outdoor activity for at-risk groups",
    },
    overall_health_impact: "moderate",
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "critical":
        return "bg-red-100 border-red-300 dark:bg-red-900 dark:border-red-700";
      case "high":
        return "bg-orange-100 border-orange-300 dark:bg-orange-900 dark:border-orange-700";
      case "moderate":
        return "bg-yellow-100 border-yellow-300 dark:bg-yellow-900 dark:border-yellow-700";
      default:
        return "bg-green-100 border-green-300 dark:bg-green-900 dark:border-green-700";
    }
  };

  const getRiskIcon = (type: string) => {
    switch (type) {
      case "temperature":
        return <Sun className="w-5 h-5" />;
      case "humidity":
        return <Droplets className="w-5 h-5" />;
      case "uv":
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Heart className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="flex items-center space-x-2 mb-4">
        <AlertTriangle className="w-6 h-6 text-orange-500" />
        <h2 className="text-xl font-bold dark:text-white">Health & Safety</h2>
      </div>

      <div className="mb-4 p-3 bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700 rounded">
        <p className="text-sm font-semibold dark:text-blue-200">
          Overall Health Impact: <span className="capitalize">{risks.overall_health_impact}</span>
        </p>
      </div>

      <div className="space-y-3">
        {Object.entries(risks).map(([key, risk]: any) => {
          if (key === "overall_health_impact") return null;

          const displayKey = key.replace("_risk", "").replace("_", " ");

          return (
            <div
              key={key}
              className={`p-3 rounded border-l-4 ${getLevelColor(risk.level)}`}
            >
              <div className="flex items-start space-x-2">
                <div className="mt-1">{getRiskIcon(displayKey)}</div>
                <div className="flex-1">
                  <p className="font-semibold text-sm capitalize dark:text-gray-100">
                    {risk.condition}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    <strong>Risk:</strong> {risk.risk}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <strong>Advice:</strong> {risk.advice}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 rounded">
        <p className="text-sm font-semibold dark:text-green-200">
          Use SPF 50+ sunscreen and stay hydrated today
        </p>
      </div>
    </div>
  );
};
