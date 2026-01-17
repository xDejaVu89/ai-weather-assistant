import React, { useState } from "react";
import { Bell, AlertCircle, X } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "alert" | "severe";
  createdAt: string;
}

export const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Heat Warning",
      message: "Extreme heat expected today. Stay hydrated!",
      type: "severe",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Heavy Rain",
      message: "Rain probability 85% tomorrow. Bring umbrella.",
      type: "warning",
      createdAt: new Date().toISOString(),
    },
  ]);

  const [showPanel, setShowPanel] = useState(false);

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "severe":
        return "border-red-500 bg-red-50 dark:bg-red-900";
      case "alert":
        return "border-orange-500 bg-orange-50 dark:bg-orange-900";
      case "warning":
        return "border-yellow-500 bg-yellow-50 dark:bg-yellow-900";
      default:
        return "border-blue-500 bg-blue-50 dark:bg-blue-900";
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
      >
        <Bell className="w-6 h-6 dark:text-white" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {showPanel && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 p-4 max-h-96 overflow-y-auto">
          <h3 className="font-semibold dark:text-white mb-3">Notifications</h3>

          {notifications.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No notifications</p>
          ) : (
            <div className="space-y-2">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`border-l-4 p-3 rounded flex items-start justify-between ${getNotificationColor(
                    notif.type
                  )}`}
                >
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">{notif.title}</p>
                      <p className="text-xs text-gray-600">{notif.message}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeNotification(notif.id)}
                    className="ml-2 hover:opacity-70"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
