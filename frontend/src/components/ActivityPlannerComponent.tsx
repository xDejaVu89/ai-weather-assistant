import React, { useState } from "react";
import { Activity, Calendar, Trophy } from "lucide-react";

interface ActivityRecommendation {
  date: string;
  temperature: number;
  weather: string;
  recommended_activities: Array<{
    name: string;
    category: string;
    suitability: number;
    tips: string;
  }>;
  activity_score: number;
}

export const ActivityPlannerComponent: React.FC = () => {
  const [activities] = useState<ActivityRecommendation[]>([
    {
      date: "2026-01-17",
      temperature: 18,
      weather: "sunny",
      recommended_activities: [
        {
          name: "Running/Jogging",
          category: "sport",
          suitability: 95,
          tips: "Perfect weather for cardio",
        },
        {
          name: "Cycling",
          category: "sport",
          suitability: 85,
          tips: "Ideal cycling weather",
        },
        {
          name: "Picnic",
          category: "social",
          suitability: 88,
          tips: "Perfect for outdoor dining",
        },
      ],
      activity_score: 89,
    },
    {
      date: "2026-01-18",
      temperature: 16,
      weather: "rainy",
      recommended_activities: [
        {
          name: "Indoor Activities",
          category: "indoor",
          suitability: 85,
          tips: "Consider gym, movies, or museums",
        },
      ],
      activity_score: 45,
    },
  ]);

  const getScoreColor = (score: number) => {
    if (score >= 80)
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    if (score >= 60)
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="flex items-center space-x-2 mb-4">
        <Activity className="w-6 h-6 text-purple-500" />
        <h2 className="text-xl font-bold dark:text-white">Activity Planner</h2>
      </div>

      <div className="space-y-4">
        {activities.map((day, idx) => (
          <div
            key={idx}
            className="border rounded-lg p-4 dark:border-gray-700 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="font-semibold dark:text-white">
                  {new Date(day.date).toLocaleDateString()}
                </span>
                <span className="text-sm text-gray-500">
                  {day.temperature}°C - {day.weather}
                </span>
              </div>
              <div className={`px-3 py-1 rounded-full font-semibold text-sm ${getScoreColor(day.activity_score)}`}>
                {Math.round(day.activity_score)}% Score
              </div>
            </div>

            <div className="space-y-2">
              {day.recommended_activities.map((activity, actIdx) => (
                <div
                  key={actIdx}
                  className="bg-gray-50 dark:bg-gray-700 p-2 rounded flex items-center justify-between"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm dark:text-white">
                      {activity.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.tips}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 ml-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-semibold dark:text-white">
                      {activity.suitability}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
