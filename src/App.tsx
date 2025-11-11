import React, { useState } from "react";
import SearchBox from "./SearchBox";
import WeatherCard from "./WeatherCard";
import CurrentLocationWeather from "./CurrentLocationWeather";
import type { weatherData } from "./WeatherCard";
import "./App.css";

const API_KEY = import.meta.env.VITE_API_KEY;
const App: React.FC = () => {
  const [weather, setWeather] = useState<weatherData | null>(null);
  const [error, setError] = useState("");

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

  const handleSearch = (cityOrCoords: string | { lat: number; lon: number }) => {
    if (typeof cityOrCoords === "string") {
      fetchWeatherByCity(cityOrCoords);
    } else {
      fetchWeatherByCoords(cityOrCoords);
    }
  };

  return (
    <div className="app">
    

      {!weather && <CurrentLocationWeather onSearch={handleSearch} />}

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {weather && <WeatherCard data={weather} onSearch={handleSearch} />}
    </div>
  );
};

export default App;
