import { useState } from 'react';
import { Sparkles, Cloud, Menu, X } from 'lucide-react';
import DarkModeToggle from './components/DarkModeToggle';
import WeatherDashboard from './components/WeatherDashboard';
import AIDashboard from './components/AIDashboard';
import './App.css';

function App() {
  const [location, setLocation] = useState('London');
  const [activeView, setActiveView] = useState<'weather' | 'ai'>('weather');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className=\"min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors\">
      <DarkModeToggle />

      {/* Navigation */}
      <nav className=\"bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50\">
        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">
          <div className=\"flex justify-between items-center h-16\">
            {/* Logo */}
            <div className=\"flex items-center gap-3\">
              <div className=\"bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg\">
                <Cloud className=\"text-white\" size={24} />
              </div>
              <div>
                <h1 className=\"text-xl font-bold text-gray-900 dark:text-white\">
                  AI Weather Assistant
                </h1>
                <p className=\"text-xs text-gray-500 dark:text-gray-400\">Super Smart & Learning</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className=\"hidden md:flex items-center gap-2\">
              <button
                onClick={() => setActiveView('weather')}
                className={px-6 py-2 rounded-lg font-semibold transition-all \}
              >
                <div className=\"flex items-center gap-2\">
                  <Cloud size={18} />
                  <span>Weather</span>
                </div>
              </button>
              <button
                onClick={() => setActiveView('ai')}
                className={px-6 py-2 rounded-lg font-semibold transition-all \}
              >
                <div className=\"flex items-center gap-2\">
                  <Sparkles size={18} />
                  <span>AI Intelligence</span>
                </div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className=\"md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700\"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {menuOpen && (
            <div className=\"md:hidden py-4 space-y-2\">
              <button
                onClick={() => {
                  setActiveView('weather');
                  setMenuOpen(false);
                }}
                className={w-full px-4 py-3 rounded-lg font-semibold transition-all text-left \}
              >
                <div className=\"flex items-center gap-2\">
                  <Cloud size={18} />
                  <span>Weather Dashboard</span>
                </div>
              </button>
              <button
                onClick={() => {
                  setActiveView('ai');
                  setMenuOpen(false);
                }}
                className={w-full px-4 py-3 rounded-lg font-semibold transition-all text-left \}
              >
                <div className=\"flex items-center gap-2\">
                  <Sparkles size={18} />
                  <span>AI Intelligence</span>
                </div>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8\">
        {activeView === 'weather' ? (
          <WeatherDashboard location={location} onLocationChange={setLocation} />
        ) : (
          <AIDashboard location={location} />
        )}
      </main>

      {/* Footer */}
      <footer className=\"bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12\">
        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8\">
          <div className=\"grid grid-cols-1 md:grid-cols-3 gap-8\">
            <div>
              <h3 className=\"text-lg font-bold text-gray-900 dark:text-white mb-2\">
                AI Weather Assistant
              </h3>
              <p className=\"text-sm text-gray-600 dark:text-gray-400\">
                Your super smart weather companion powered by AI, machine learning, 
                and real-time data from around the world.
              </p>
            </div>
            <div>
              <h3 className=\"text-lg font-bold text-gray-900 dark:text-white mb-2\">
                Features
              </h3>
              <ul className=\"text-sm text-gray-600 dark:text-gray-400 space-y-1\">
                <li> AI-Powered Predictions</li>
                <li> Real-time Web Insights</li>
                <li> Machine Learning Analysis</li>
                <li> Continuous Learning</li>
              </ul>
            </div>
            <div>
              <h3 className=\"text-lg font-bold text-gray-900 dark:text-white mb-2\">
                Data Sources
              </h3>
              <ul className=\"text-sm text-gray-600 dark:text-gray-400 space-y-1\">
                <li> Weather APIs</li>
                <li> Expert Meteorologists</li>
                <li> Community Reports</li>
                <li> ML Models</li>
              </ul>
            </div>
          </div>
          <div className=\"mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400\">
            <p> 2026 AI Weather Assistant. Built with React, FastAPI, and Machine Learning.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
