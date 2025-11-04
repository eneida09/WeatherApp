import React from "react";
import SearchBox from "./SearchBox";
import Forecast from "./Forecast";

export interface weatherData {
  name: string;
  sys: { country: string };
  main: { temp: number; humidity: number };
  weather: { main: string; description: string; icon: string }[];
  wind: { speed: number };
  dt: number;
  timezone: number;
}

interface WeatherCardProps {
  data: weatherData;
  onSearch:any
}
const API_KEY = "6b816b89f57f6da87c825987c761dd98";

const WeatherCard: React.FC<WeatherCardProps> = ({ data,onSearch }) => {
  const weatherCondition = data.weather[0].main.toLowerCase();

  const localTime = new Date((data.dt + data.timezone) * 1000);
  const hours = localTime.getUTCHours();

  let timeOfDay = "day";
  if (hours >= 16 && hours < 18) timeOfDay = "sunset";
  else if (hours >= 5 && hours < 7) timeOfDay = "sunrise";
  else if (hours >= 20 || hours < 5) timeOfDay = "night";

  const gradientMap: Record<string, Record<string, string>> = {
    clear: {
      day: "radial-gradient(circle at center, #56ccf2, #2f80ed)",
      sunset: "radial-gradient(circle at center, #f2994a, #01153b7a)",
      sunrise: "radial-gradient(circle at center, #f5af19ab, #005a6611)",
      night: "radial-gradient(circle at center, #0f2027, #203a43, #2c5364)",
    },
    clouds: {
      day: "radial-gradient(circle at center, #bdc3c7, #2c3e50)",
      sunset: "radial-gradient(circle at center, #757f9a, #746f3eff)",
      sunrise: "radial-gradient(circle at center, #757f9a, #d7dde8)",
      night: "radial-gradient(circle at center, #434343, #232526)",
    },
    rain: {
      day: "radial-gradient(circle at center, #4e54c8, #8f94fb)",
      sunset: "radial-gradient(circle at center, #283048, #859398)",
      sunrise: "radial-gradient(circle at center, #283048, #859398)",
      night: "radial-gradient(circle at center, #1c1c1c, #3a6073)",
    },
    snow: {
      day: "radial-gradient(circle at center, #e0eafc, #cfdef3)",
      sunset: "radial-gradient(circle at center, #d7d2cc, #304352)",
      sunrise: "radial-gradient(circle at center, #d7d2cc, #304352)",
      night: "radial-gradient(circle at center, #3a6073, #16222a)",
    },
    thunderstorm: {
      day: "radial-gradient(circle at center, #0f0c29, #302b63, #24243e)",
      sunset: "radial-gradient(circle at center, #0f0c29, #302b63, #24243e)",
      sunrise: "radial-gradient(circle at center, #0f0c29, #302b63, #24243e)",
      night: "radial-gradient(circle at center, #0f0c29, #302b63, #24243e)",
    },
    mist: {
      day: "radial-gradient(circle at center, #606c88, #3f4c6b)",
      sunset: "radial-gradient(circle at center, #606c88, #3f4c6b)",
      sunrise: "radial-gradient(circle at center, #606c88, #3f4c6b)",
      night: "radial-gradient(circle at center, #3e3e3e, #1c1c1c)",
    },
    drizzle: {
      day: "radial-gradient(circle at center, #4e54c8, #8f94fb)",
      sunset: "radial-gradient(circle at center, #283048, #859398)",
      sunrise: "radial-gradient(circle at center, #283048, #859398)",
      night: "radial-gradient(circle at center, #1c1c1c, #3a6073)",
    },
    haze: {
      day: "radial-gradient(circle at center, #606c88, #3f4c6b)",
      sunset: "radial-gradient(circle at center, #606c88, #3f4c6b)",
      sunrise: "radial-gradient(circle at center, #606c88, #3f4c6b)",
      night: "radial-gradient(circle at center, #3e3e3e, #1c1c1c)",
    },
    fog: {
      day: "radial-gradient(circle at center, #606c88, #3f4c6b)",
      sunset: "radial-gradient(circle at center, #606c88, #3f4c6b)",
      sunrise: "radial-gradient(circle at center, #606c88, #3f4c6b)",
      night: "radial-gradient(circle at center, #3e3e3e, #1c1c1c)",
    },
  };

  const bgGradient =
    gradientMap[weatherCondition]?.[timeOfDay] || gradientMap.clear.day;


  const iconMap: Record<string, string> = {
    clear: "day",
    clouds: "cloudy-day-1",
    rain: "rainy-1",
    snow: "snowy-1",
    thunderstorm: "thunder",
    drizzle: "rainy-2",
    mist: "mist",
    haze: "mist",
    fog: "mist",
  };

  let iconBase = iconMap[weatherCondition] || "";

  if (timeOfDay === "night") {
    if (weatherCondition === "clear") iconBase = "night";
    else if (weatherCondition === "clouds") iconBase = "cloudy-night-1";
    else if (weatherCondition === "rain") iconBase = "rainy-2-night";
  }

  return (
    <div
      className="weather-container"
      style={{
        background: bgGradient,
        borderRadius: "1rem",
        padding: "1.5rem",
        color: "white",
        textAlign: "center",
        transition: "background 1s ease",
      }}
    >
      <SearchBox onSearch={onSearch}/>
     <div className="weather-header">
  <h2>
    {data.name}, {data.sys.country}
  </h2>
   <p style={{ fontSize: "0.85rem", marginTop: "0.2rem", opacity: 0.7 }}>
    {new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })}
    <br/>
  <span style={{ fontSize: "0.9rem", marginTop: "0.3rem", opacity: 0.8 }}>
    {timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}
  </span>
 
  </p>
</div>


      <div className="weather-main">
        <img
          src={`/assets/icons/animated/${iconBase}.svg`}
          alt={data.weather[0].description}
          className="weather-icon"
          style={{
            filter: "drop-shadow(6px 0 4px rgba(128,128,128,0.6))",
            width: "100px",
            height: "100px",
          }}
        />
        <h1>{Math.round(data.main.temp)}°C</h1>
        <p className="description">{data.weather[0].description}</p>
      </div>

      <div className="weather-details">
        <p>💨 Wind: {data.wind.speed} m/s</p>
        <p>💧 Humidity: {data.main.humidity}%</p>
      </div>
       <div className="forecast-container">
    <Forecast city={data.name} apiKey={API_KEY} />
  </div>
    </div>
  );
};

export default WeatherCard;
