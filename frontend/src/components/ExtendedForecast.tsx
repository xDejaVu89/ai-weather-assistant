import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Calendar, TrendingUp, AlertCircle, Target, Cloud } from 'lucide-react';

interface ExtendedForecastProps {
  location: string;
}

export default function ExtendedForecast({ location }: ExtendedForecastProps) {
  const [forecastData, setForecastData] = useState<any>(null);
  const [ensembleData, setEnsembleData] = useState<any>(null);
  const [climatePatterns, setClimatePatterns] = useState<any>(null);
  const [accuracyMetrics, setAccuracyMetrics] = useState<any>(null);
  const [selectedWeeks, setSelectedWeeks] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExtendedForecast();
  }, [location, selectedWeeks]);

  const fetchExtendedForecast = async () => {
    try {
      setLoading(true);
      
      const [forecastRes, ensembleRes, climateRes, accuracyRes] = await Promise.all([
        fetch(`http://127.0.0.1:8000/api/weather/forecast/extended?location=${location}&weeks=${selectedWeeks}`),
        fetch(`http://127.0.0.1:8000/api/weather/forecast/ensemble?location=${location}&days=${selectedWeeks * 7}`),
        fetch(`http://127.0.0.1:8000/api/weather/climate/patterns?location=${location}`),
        fetch(`http://127.0.0.1:8000/api/weather/forecast/accuracy`)
      ]);

      const [forecast, ensemble, climate, accuracy] = await Promise.all([
        forecastRes.json(),
        ensembleRes.json(),
        climateRes.json(),
        accuracyRes.json()
      ]);

      setForecastData(forecast);
      setEnsembleData(ensemble);
      setClimatePatterns(climate);
      setAccuracyMetrics(accuracy);
    } catch (error) {
      console.error('Error fetching extended forecast:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="text-blue-500 animate-pulse" size={24} />
          <h2 className="text-xl font-bold dark:text-white">Loading Extended Forecast...</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400">Analyzing climate patterns and generating predictions...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Week Selection */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-xl shadow-lg text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Calendar size={32} />
            <div>
              <h1 className="text-2xl font-bold">Extended Forecast</h1>
              <p className="text-sm opacity-90">Long-range predictions powered by ensemble ML</p>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
            <p className="text-xs opacity-75">Forecast Period</p>
            <p className="text-2xl font-bold">{selectedWeeks} Weeks</p>
          </div>
        </div>

        {/* Week Selector */}
        <div className="flex gap-2">
          {[2, 3, 4, 6, 8].map(weeks => (
            <button
              key={weeks}
              onClick={() => setSelectedWeeks(weeks)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedWeeks === weeks
                  ? 'bg-white text-blue-600'
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              {weeks}w
            </button>
          ))}
        </div>
      </div>

      {/* Weekly Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {forecastData?.weekly_summary?.map((week: any) => (
          <div key={week.week} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900 dark:text-white">Week {week.week}</h3>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                week.avg_confidence > 0.7 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                week.avg_confidence > 0.5 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
              }`}>
                {(week.avg_confidence * 100).toFixed(0)}% conf
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Avg Temp</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{week.avg_temp}°C</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Range</span>
                <span className="text-gray-900 dark:text-white">{week.min_temp}° - {week.max_temp}°</span>
              </div>
              
              <div className="flex items-center gap-2 mt-3">
                <TrendingUp size={14} className={
                  week.temp_trend === 'warming' ? 'text-red-500' :
                  week.temp_trend === 'cooling' ? 'text-blue-500' :
                  'text-gray-500'
                } />
                <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                  {week.temp_trend}
                </span>
              </div>
              
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">{week.outlook}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Extended Forecast Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target className="text-purple-500" size={24} />
            <h2 className="text-xl font-bold dark:text-white">Daily Temperature Predictions</h2>
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {forecastData?.daily_predictions?.length} days
          </span>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={forecastData?.daily_predictions}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
              formatter={(value: any, name: string) => {
                if (name === 'predicted_temp') return [value + '°C', 'Predicted'];
                if (name === 'temp_min') return [value + '°C', 'Min'];
                if (name === 'temp_max') return [value + '°C', 'Max'];
                return [value, name];
              }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="temp_max" 
              stroke="#ef4444" 
              fill="none"
              strokeWidth={1}
              strokeDasharray="5 5"
              name="Max Range"
            />
            <Area 
              type="monotone" 
              dataKey="predicted_temp" 
              stroke="#8b5cf6" 
              fill="url(#tempGradient)"
              strokeWidth={3}
              name="Predicted"
            />
            <Area 
              type="monotone" 
              dataKey="temp_min" 
              stroke="#3b82f6" 
              fill="none"
              strokeWidth={1}
              strokeDasharray="5 5"
              name="Min Range"
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Note:</strong> Uncertainty increases with forecast distance. Shaded area shows confidence range. 
            Predictions beyond 2 weeks have higher uncertainty.
          </p>
        </div>
      </div>

      {/* Ensemble Model Comparison */}
      {ensembleData && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Cloud className="text-blue-500" size={24} />
            <h2 className="text-xl font-bold dark:text-white">Ensemble Model Analysis</h2>
          </div>
          
          <div className="mb-4 flex flex-wrap gap-2">
            {ensembleData.models_used?.map((model: string, index: number) => (
              <span key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                {model.replace(/_/g, ' ')}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-lg text-white">
              <p className="text-sm opacity-75">Total Models</p>
              <p className="text-3xl font-bold">{ensembleData.models_used?.length}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-lg text-white">
              <p className="text-sm opacity-75">Ensemble Confidence</p>
              <p className="text-3xl font-bold">{ensembleData.ensemble_confidence}</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-lg text-white">
              <p className="text-sm opacity-75">Predictions</p>
              <p className="text-3xl font-bold">{ensembleData.predictions?.length} days</p>
            </div>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {ensembleData.predictions?.slice(0, 10).map((pred: any, index: number) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {new Date(pred.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Range: {pred.temp_range.min}°C - {pred.temp_range.max}°C
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {pred.ensemble_temp}°C
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                    <span>Agreement:</span>
                    <span className="font-semibold">{(pred.model_agreement * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Climate Patterns */}
      {climatePatterns && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-green-500" size={24} />
            <h2 className="text-xl font-bold dark:text-white">Climate Pattern Analysis</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">El Niño Status</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {climatePatterns.climate_patterns?.el_nino_status}
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Temperature Anomaly</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {climatePatterns.climate_patterns?.temperature_anomaly}
                </p>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Seasonal Outlook</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {climatePatterns.climate_patterns?.seasonal_outlook}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Forecast Implications</h3>
              <ul className="space-y-2">
                {climatePatterns.forecast_implications?.map((implication: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <AlertCircle size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>{implication}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Accuracy Metrics */}
      {accuracyMetrics && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Target className="text-orange-500" size={24} />
            <h2 className="text-xl font-bold dark:text-white">Forecast Accuracy by Range</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(accuracyMetrics.accuracy_by_range || {}).map(([range, metrics]: [string, any]) => (
              <div key={range} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                  {range.replace(/_/g, ' ').replace('-', '-')}
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Accuracy</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{metrics.temperature_accuracy}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Confidence</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{metrics.confidence}</p>
                  </div>
                  <div className="pt-2">
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" 
                        style={{ width: `${metrics.skill_score * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Skill Score: {(metrics.skill_score * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
