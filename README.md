# 🌦️ Weather App

A modern, responsive **Weather Application** built with **React + TypeScript + Vite** that displays current weather and forecasts using the **OpenWeather API**.  
It also includes an **interactive map (Leaflet)** where users can select a location to view weather data instantly.

---

## 🚀 Features

- 🔍 **Search weather** by city name  
- 📍 **Select location** directly on an interactive map  
- 🌤️ View:
  - Current temperature and condition
  - Weather icon (day/night)
  - Wind speed and humidity
  - 5-day forecast
- 💎 Clean and responsive UI design  
- ⚡ Fast performance using Vite + TypeScript  

---

## 🖼️ Screenshots

### 🏙️ Weather Overview  
<img width="1067" height="1038" alt="Screenshot 2025-11-11 121046" src="https://github.com/user-attachments/assets/c977545c-f992-4411-ae76-644321a3da9b" />

### 🗺️ Location Picker  
<img width="1613" height="843" alt="Screenshot 2025-11-11 121111" src="https://github.com/user-attachments/assets/6d06ab8d-836b-414b-a168-6c88d0013cc2" />

---

## ⚙️ Tech Stack

| Technology | Purpose |
|-------------|----------|
| **React + TypeScript** | Frontend framework |
| **Vite** | Development & build tool |
| **Leaflet + React-Leaflet** | Interactive map component |
| **OpenWeather API** | Weather data source |
| **CSS / TailwindCSS** | Styling and layout |

---

## 🔑 API Setup

This project uses the free [OpenWeather API](https://openweathermap.org/api).

1. Create a free account on OpenWeather.
2. Go to your account → **API Keys** and copy your key.
3. In your project root folder, create a new file named `.env` and add:
   ```bash
   VITE_API_KEY=your_openweather_api_key_here
