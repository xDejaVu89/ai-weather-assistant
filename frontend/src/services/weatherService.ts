import axios from 'axios';
import { WeatherData, ForecastData, QueryResponse } from '../types/weather';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const weatherService = {
  // Get current weather for a location
  getCurrentWeather: async (location: string): Promise<WeatherData> => {
    const response = await api.get(`/api/weather/current`, {
      params: { location },
    });
    return response.data;
  },

  // Get 7-day forecast
  getForecast: async (location: string): Promise<ForecastData[]> => {
    const response = await api.get(`/api/weather/forecast`, {
      params: { location },
    });
    return response.data;
  },

  // Natural language query
  queryWeather: async (query: string): Promise<QueryResponse> => {
    const response = await api.post(`/api/weather/query`, { query });
    return response.data;
  },

  // Get personalized recommendations
  getRecommendations: async (): Promise<any> => {
    const response = await api.get(`/api/user/recommendations`);
    return response.data;
  },
};
