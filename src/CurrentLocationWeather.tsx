import React, { useState, useCallback } from "react";
import WeatherCard from "./WeatherCard";
import type { weatherData } from "./WeatherCard";
import GeoLocation from "./GeoLocation";

const API_KEY = "6b816b89f57f6da87c825987c761dd98";

interface CurrentLocationWeatherProps {
  onSearch: any
}

const CurrentLocationWeather: React.FC<CurrentLocationWeatherProps> = ({ onSearch }) => {
  const [weatherData, setWeatherData] = useState<weatherData | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchWeatherByCoordinates = useCallback(async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod !== 200) {
        setErrorMessage("Unable to fetch weather for your location.");
        setWeatherData(null);
      } else {
        setWeatherData(data);
        setErrorMessage("");
      }
    } catch {
      setErrorMessage("Error fetching weather data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLocationError = useCallback((message: string) => {
    setErrorMessage(message);
    setIsLoading(false);
  }, []);

  return (
    <div style={{ marginBottom: "1rem", textAlign: "center" }}>
      {isLoading && !errorMessage && <p>📍 Fetching your location...</p>}

      <GeoLocation
        onLocationFetch={fetchWeatherByCoordinates}
        onError={handleLocationError}
      />

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {weatherData && <WeatherCard data={weatherData} onSearch={onSearch} />}
    </div>
  );
};

export default CurrentLocationWeather;
