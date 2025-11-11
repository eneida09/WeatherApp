import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";

interface MapModalProps {
  onSelectLocation: (lat: number, lon: number) => void;
  onClose: () => void;
  apiKey: string; 
}

interface WeatherData {
  temp: number;
  description: string;
  icon: string;
}

const MapModal: React.FC<MapModalProps> = ({ onSelectLocation, onClose, apiKey }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
      },
    });
    return position ? <Marker position={position} /> : null;
  };

 
  useEffect(() => {
    if (!position) return;

    const [lat, lon] = position;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather({
          temp: data.main.temp,
          description: data.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        });
      })
      .catch((err) => console.error("Weather API error:", err));
  }, [position, apiKey]);

  const handleSaveFavorite = () => {
    if (position) {
      onSelectLocation(position[0], position[1]);
      onClose();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "80%",
          height: "80%",
          borderRadius: "10px",
          overflow: "hidden",
          background: "white",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 1001,
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            cursor: "pointer",
          }}
        >
          X
        </button>

      
        <MapContainer
          center={[41.3275, 19.8189]}
          zoom={7}
          style={{ flex: 1, pointerEvents: "auto" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />
          <LocationMarker />
        </MapContainer>

      
        {position && (
          <div
            style={{
              padding: "10px",
              background: "#f1f1f1",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              Lat: {position[0].toFixed(5)}, Lon: {position[1].toFixed(5)}
              {weather && (
                <div style={{ display: "flex", alignItems: "center", marginTop: 5 }}>
                  <img src={weather.icon} alt={weather.description} width={40} height={40} />
                  <div style={{ marginLeft: 10 }}>
                    <div style={{ fontWeight: "bold" }}>{weather.temp.toFixed(1)}°C</div>
                    <div style={{ textTransform: "capitalize" }}>{weather.description}</div>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={handleSaveFavorite}
              style={{
                padding: "5px 10px",
                background: "green",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              ❤️ Choose
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapModal;
