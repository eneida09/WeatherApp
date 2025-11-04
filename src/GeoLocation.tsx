import React, { useEffect } from "react";

interface GeoLocationProps {
  onLocationFetch: (lat: number, lon: number) => void;
  onError: (msg: string) => void;
}

const GeoLocation: React.FC<GeoLocationProps> = ({ onLocationFetch, onError }) => {
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationFetch(latitude, longitude);
        },
        () => {
          onError("Couldn't access location");
        }
      );
    } else {
      onError("Geolocation not supported");
    }
  }, [onLocationFetch, onError]); 

  return null; 
};

export default GeoLocation;
