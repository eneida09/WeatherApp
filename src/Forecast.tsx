import React, { useEffect, useState } from "react";

interface ForecastItem {
  dt_txt: string;
  main: { temp_min: number; temp_max: number };
  weather: { description: string; icon: string }[];
}

interface ForecastData {
  list: ForecastItem[];
}

interface ForecastProps {
  city: string;
  apiKey: string;
}

const Forecast: React.FC<ForecastProps> = ({ city, apiKey }) => {
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) return;

    const fetchForecast = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );
        const data: ForecastData = await res.json();
        console.log("API forecast data:", data);

        if (!res.ok) {
          setError((data as any)?.message || "Forecast not available");
          setLoading(false);
          return;
        }

     
        const dailyMap: { [date: string]: ForecastItem[] } = {};
        data.list.forEach((item) => {
          const date = item.dt_txt.split(" ")[0];
          if (!dailyMap[date]) dailyMap[date] = [];
          dailyMap[date].push(item);
        });

     
        const dailyForecast = Object.entries(dailyMap)
          .slice(0, 5)
          .map(([date, items]) => {
            const temp_min = Math.min(...items.map((i) => i.main.temp_min));
            const temp_max = Math.max(...items.map((i) => i.main.temp_max));

          
            const descriptionMap: { [desc: string]: number } = {};
            const iconMap: { [icon: string]: number } = {};

            items.forEach((i) => {
              const desc = i.weather?.[0]?.description || "Unknown";
              descriptionMap[desc] = (descriptionMap[desc] || 0) + 1;

              const icon = i.weather?.[0]?.icon;
              if (icon && icon.trim() !== "") {
                iconMap[icon] = (iconMap[icon] || 0) + 1;
              }
            });

            const description =
              Object.entries(descriptionMap).sort((a, b) => b[1] - a[1])[0][0];

          
            const icon =
              Object.keys(iconMap).length > 0
                ? Object.entries(iconMap).sort((a, b) => b[1] - a[1])[0][0]
                : "01d";

            console.log(`Forecast for ${date}:`, { description, icon });

            return {
              dt_txt: date,
              main: { temp_min, temp_max },
              weather: [{ description, icon }],
            };
          });

        setForecast(dailyForecast);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Error loading forecast");
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city, apiKey]);

  if (loading) return <p>Loading 5-day forecast...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        justifyContent: "space-between",
        marginTop: "1rem",
      }}
    >
      {forecast.map((item, index) => (
        <div
          key={index}
          style={{
            textAlign: "center",
            padding: "0.75rem",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "1rem",
            flex: 1,
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
            {new Date(item.dt_txt).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </p>

          <img
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt={item.weather[0].description}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://openweathermap.org/img/wn/01d@2x.png";
            }}
            style={{
              width: "60px",
              height: "60px",
              objectFit: "contain",
              filter: "drop-shadow(0 0 5px rgba(255,255,255,0.6))",
            }}
          />

          <p style={{ marginTop: "0.5rem" }}>
            {Math.round(item.main.temp_max)}°C /{" "}
            {Math.round(item.main.temp_min)}°C
          </p>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
