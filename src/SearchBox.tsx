import React, { useState } from "react";
import "./SearchBox.css";
import SearchIcon from "@mui/icons-material/Search";
import RoomIcon from "@mui/icons-material/Room";
import MapModal from "./MapModal"; // importo modalin e hartës

interface SearchBoxProps {
  onSearch: (cityOrCoords: string | { lat: number; lon: number }) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [showMap, setShowMap] = useState(false);

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city);
      setCity("");
    }
  };

  

  const handleSelectLocation = (lat: number, lon: number) => {
    console.log(lat, lon);
    onSearch({ lat, lon });
    setShowMap(false);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Enter city name"
        className="search-input"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      <button className="search-button" onClick={handleSearch}>
        <SearchIcon />
      </button>

      <button
        className="location-button"
        onClick={() => setShowMap(true)}
        title="Select location on map"
      >
        <RoomIcon />
      </button>

      {showMap && (
        <MapModal
          onSelectLocation={(lat, lon) => handleSelectLocation(lat, lon)}
          onClose={() => setShowMap(false)}
        />
      )}
    </div>
  );
};

export default SearchBox;
