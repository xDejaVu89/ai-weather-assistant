export interface WeatherData {
  location: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  description: string;
  windSpeed: number;
  timestamp: string;
}

export interface ForecastData {
  date: string;
  tempMax: number;
  tempMin: number;
  description: string;
  humidity: number;
}

export interface QueryResponse {
  answer: string;
  weatherData?: WeatherData;
  confidence: number;
}

export interface UserPreferences {
  temperatureUnit: 'celsius' | 'fahrenheit';
  notificationEnabled: boolean;
  favoriteLocations: string[];
  activityPreferences: string[];
}
