import { useState } from 'react';
import { Brain, Sparkles, TrendingUp, MessageSquare, Calendar } from 'lucide-react';
import AIInsights from './AIInsights';
import MLPredictions from './MLPredictions';
import ExtendedForecast from './ExtendedForecast';

interface AIDashboardProps {
  location: string;
}

export default function AIDashboard({ location }: AIDashboardProps) {
  const [activeTab, setActiveTab] = useState<'insights' | 'predictions' | 'extended'>('insights');
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAIQuery = async () => {
    if (!aiQuery.trim()) return;

    try {
      setLoading(true);
      const response = await fetch(
        `http://127.0.0.1:8000/api/weather/ai/query?query=${encodeURIComponent(aiQuery)}&location=${location}`
      );
      const data = await response.json();
      setAiResponse(data);
    } catch (error) {
      console.error('Error querying AI:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=\"space-y-6\">
      {/* AI Header */}
      <div className=\"bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-8 rounded-2xl shadow-2xl text-white\">
        <div className=\"flex items-center gap-3 mb-4\">
          <Sparkles className=\"animate-pulse\" size={32} />
          <h1 className=\"text-3xl font-bold\">AI Weather Intelligence</h1>
        </div>
        <p className=\"text-lg opacity-90\">
          Powered by machine learning, real-time web data, and advanced predictions
        </p>
        
        {/* AI Query Input */}
        <div className=\"mt-6 bg-white/10 backdrop-blur-md rounded-xl p-4\">
          <div className=\"flex items-center gap-2 mb-3\">
            <MessageSquare size={20} />
            <span className=\"font-semibold\">Ask AI Anything About Weather</span>
          </div>
          <div className=\"flex gap-2\">
            <input
              type=\"text\"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAIQuery()}
              placeholder=\"e.g., Should I plan outdoor activities this weekend?\"
              className=\"flex-1 px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50\"
            />
            <button
              onClick={handleAIQuery}
              disabled={loading}
              className=\"px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50\"
            >
              {loading ? 'Thinking...' : 'Ask AI'}
            </button>
          </div>
          
          {aiResponse && (
            <div className=\"mt-4 p-4 bg-white/20 backdrop-blur-sm rounded-lg\">
              <p className=\"text-sm font-semibold mb-2\">AI Response:</p>
              <p className=\"text-sm leading-relaxed\">{aiResponse.answer}</p>
              <div className=\"mt-3 flex items-center gap-2 text-xs opacity-75\">
                <Brain size={14} />
                <span>Confidence: {(aiResponse.confidence * 100).toFixed(0)}%</span>
                <span></span>
                <span>{aiResponse.source === 'ai_enhanced' ? ' Enhanced with GPT-4' : 'Basic Analysis'}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className=\"flex gap-2\">
        <button
          onClick={() => setActiveTab('insights')}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
            activeTab === 'insights'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <div className=\"flex items-center justify-center gap-2\">
            <Brain size={20} />
            <span>Online Intelligence</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('predictions')}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
            activeTab === 'predictions'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <div className=\"flex items-center justify-center gap-2\">
            <TrendingUp size={20} />
            <span>ML Predictions</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('extended')}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
            activeTab === 'extended'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <div className=\"flex items-center justify-center gap-2\">
            <Calendar size={20} />
            <span>Extended Forecast</span>
          </div>
        </button>
      </div>

      {/* Tab Content */}
      <div className=\"animate-fadeIn\">
        {activeTab === 'insights' && <AIInsights location={location} />}
        {activeTab === 'predictions' && <MLPredictions location={location} />}
        {activeTab === 'extended' && <ExtendedForecast location={location} />}
      </div>

      {/* Learning Indicator */}
      <div className=\"bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-xl shadow-lg text-white\">
        <div className=\"flex items-center justify-between\">
          <div>
            <h3 className=\"text-lg font-bold mb-2\"> Continuously Learning</h3>
            <p className=\"text-sm opacity-90\">
              This AI is getting smarter every minute by analyzing weather patterns, 
              expert predictions, community reports, and your interactions.
            </p>
          </div>
          <div className=\"hidden md:block\">
            <div className=\"bg-white/20 backdrop-blur-sm px-6 py-4 rounded-lg text-center\">
              <p className=\"text-3xl font-bold\"></p>
              <p className=\"text-xs mt-1\">Always Learning</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
