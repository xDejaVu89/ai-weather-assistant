import React, { useState } from "react";
import { Plug, Zap, Calendar, Shield } from "lucide-react";

interface IntegrationService {
  name: string;
  type: string;
  connected: boolean;
  icon: React.ReactNode;
}

export const IntegrationComponent: React.FC = () => {
  const [integrations, setIntegrations] = useState<IntegrationService[]>([
    {
      name: "Google Calendar",
      type: "calendar",
      connected: true,
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      name: "Google Home",
      type: "smart_home",
      connected: false,
      icon: <Zap className="w-5 h-5" />,
    },
    {
      name: "Fitbit",
      type: "health",
      connected: true,
      icon: <Shield className="w-5 h-5" />,
    },
    {
      name: "Alexa",
      type: "smart_home",
      connected: false,
      icon: <Zap className="w-5 h-5" />,
    },
  ]);

  const handleToggleIntegration = (index: number) => {
    const updated = [...integrations];
    updated[index].connected = !updated[index].connected;
    setIntegrations(updated);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="flex items-center space-x-2 mb-4">
        <Plug className="w-6 h-6 text-purple-500" />
        <h2 className="text-xl font-bold dark:text-white">Integrations</h2>
      </div>

      <div className="space-y-2">
        {integrations.map((integration, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 border rounded dark:border-gray-700 dark:bg-gray-700"
          >
            <div className="flex items-center space-x-3">
              <div className="text-gray-600 dark:text-gray-400">
                {integration.icon}
              </div>
              <div>
                <p className="font-medium dark:text-white">{integration.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {integration.type}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleToggleIntegration(idx)}
              className={`px-4 py-2 rounded font-medium text-sm transition ${
                integration.connected
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white"
              }`}
            >
              {integration.connected ? "Connected" : "Connect"}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded text-sm dark:text-blue-200">
        <p className="font-semibold mb-2">Benefits of Integration:</p>
        <ul className="text-xs space-y-1">
          <li>✓ Automatic weather alerts on your calendar</li>
          <li>✓ Smart home adjustments based on weather</li>
          <li>✓ Activity recommendations synced with fitness data</li>
          <li>✓ One-click weather sharing on social media</li>
        </ul>
      </div>
    </div>
  );
};
