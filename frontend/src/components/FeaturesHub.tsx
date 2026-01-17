import React, { useState } from "react";
import { User, Zap, MapPin, Heart, Activity } from "lucide-react";
import { AuthComponent } from "./AuthComponent";
import { NotificationCenter } from "./NotificationCenter";
import { DataExportComponent } from "./DataExportComponent";
import { HealthSafetyComponent } from "./HealthSafetyComponent";
import { ActivityPlannerComponent } from "./ActivityPlannerComponent";
import { TravelPlannerComponent } from "./TravelPlannerComponent";
import { SeasonalAnalysisComponent } from "./SeasonalAnalysisComponent";
import { IntegrationComponent } from "./IntegrationComponent";
import { SustainabilityComponent } from "./SustainabilityComponent";

export const FeaturesHub: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<
    | "auth"
    | "health"
    | "activities"
    | "travel"
    | "seasonal"
    | "integrations"
    | "sustainability"
    | "export"
  >("auth");

  const handleAuthChange = (loggedIn: boolean, user?: any) => {
    setIsLoggedIn(loggedIn);
    setCurrentUser(user);
    if (loggedIn) {
      setActiveTab("health");
    }
  };

  const tabs = [
    { id: "auth", label: "Profile", icon: User },
    { id: "health", label: "Health & Safety", icon: Heart },
    { id: "activities", label: "Activities", icon: Activity },
    { id: "travel", label: "Travel", icon: MapPin },
    { id: "seasonal", label: "Seasonal", icon: Zap },
    { id: "integrations", label: "Integrations", icon: Zap },
    { id: "sustainability", label: "Sustainability", icon: Zap },
    { id: "export", label: "Export", icon: Zap },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold dark:text-white">
            Advanced Weather Features
          </h1>
          <NotificationCenter />
        </div>

        {/* Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 p-3 overflow-x-auto">
          <div className="flex space-x-2">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 whitespace-nowrap transition ${
                  activeTab === id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-6">
          {!isLoggedIn && activeTab === "auth" && (
            <AuthComponent onAuthChange={handleAuthChange} />
          )}

          {isLoggedIn && activeTab === "auth" && (
            <div>
              <AuthComponent onAuthChange={handleAuthChange} />
            </div>
          )}

          {activeTab === "health" && <HealthSafetyComponent />}
          {activeTab === "activities" && <ActivityPlannerComponent />}
          {activeTab === "travel" && <TravelPlannerComponent />}
          {activeTab === "seasonal" && <SeasonalAnalysisComponent />}
          {activeTab === "integrations" && <IntegrationComponent />}
          {activeTab === "sustainability" && <SustainabilityComponent />}
          {activeTab === "export" && <DataExportComponent />}
        </div>
      </div>
    </div>
  );
};
