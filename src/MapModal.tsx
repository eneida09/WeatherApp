import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";

interface MapModalProps {
  onSelectLocation: (lat: number, lon: number) => void;
  onClose: () => void;
}

const MapModal: React.FC<MapModalProps> = ({ onSelectLocation, onClose }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        onSelectLocation(lat, lng);
        onClose();
      },
    });
    return null;
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
        }}
        onClick={(e) => e.stopPropagation()} 
      >
        <MapContainer
          center={[41.3275, 19.8189]}
          zoom={7}
          style={{ height: "100%", width: "100%", pointerEvents: "auto" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />
          <LocationMarker />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapModal;
