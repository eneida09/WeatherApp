import React, { useState } from "react";
import SearchBox from "./SearchBox";
import WeatherCard from "./WeatherCard";
import CurrentLocationWeather from "./CurrentLocationWeather";
import type { weatherData } from "./WeatherCard";
import "./App.css";
import Forecast from "./Forecast";
import MapModal from "./MapModal";

const App: React.FC = () => {
  const [weather, setWeather] = useState<weatherData | null>(null);
  const [error, setError] = useState("");

  const API_KEY = "6b816b89f57f6da87c825987c761dd98";

  const fetchWeatherByCity = async (city: string) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        setError("City not found");
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
      }
    } catch {
      setError("Error fetching data");
    }
  };

  const fetchWeatherByCoords = async (coords: { lat: number; lon: number }) => {
  const { lat, lon } = coords; 
  console.log("lat", lat)
  console.log("lon", lon)

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();

    if (data.cod !== 200) {
      setError("Location not found");
      setWeather(null);
    } else {
      setWeather(data);
      setError("");
    }
  } catch {
    setError("Error fetching data");
  }
};
  return (
    <div className="app">
      {/* <SearchBox onSearch={fetchWeatherByCity} /> */}

      {!weather && <CurrentLocationWeather onSearch={fetchWeatherByCoords} />}

      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && <WeatherCard data={weather} onSearch={fetchWeatherByCoords} />}

      
    </div>
  );
};

export default App;
