import React, { useEffect, useState } from 'react';
import { AlertTriangle, Info, XCircle } from 'lucide-react';

interface Alert {
  type: string;
  severity: string;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
}

interface WeatherAlertsProps {
  location: string;
}

const WeatherAlerts: React.FC<WeatherAlertsProps> = ({ location }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location) {
      fetchAlerts();
    }
  }, [location]);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/weather/alerts?location=${encodeURIComponent(location)}`);
      const data = await response.json();
      setAlerts(data.alerts || []);
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'warning':
        return 'bg-red-500/20 border-red-500 text-red-100';
      case 'advisory':
        return 'bg-yellow-500/20 border-yellow-500 text-yellow-100';
      case 'watch':
        return 'bg-orange-500/20 border-orange-500 text-orange-100';
      default:
        return 'bg-blue-500/20 border-blue-500 text-blue-100';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'warning':
        return <XCircle className="w-6 h-6" />;
      case 'advisory':
        return <AlertTriangle className="w-6 h-6" />;
      default:
        return <Info className="w-6 h-6" />;
    }
  };

  if (loading) {
    return <div className="text-white text-center">Loading alerts...</div>;
  }

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert, index) => (
        <div
          key={index}
          className={`rounded-xl p-4 border-2 ${getSeverityColor(alert.severity)} backdrop-blur-md`}
        >
          <div className="flex items-start gap-3">
            {getSeverityIcon(alert.severity)}
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{alert.title}</h3>
              <p className="text-sm opacity-90 mb-2">{alert.description}</p>
              <div className="text-xs opacity-75">
                Valid until: {new Date(alert.end_time).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherAlerts;
