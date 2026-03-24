import { useState } from "react";
import fetchWeather from "./fetchWeather"

import Header from "./components/header";
import Main from "./components/main";

import { ThemeProvider } from "./context/theme"

function App() {
  const [weatherData, setWeatherData] = useState(null);

  const handleLocationSelect = async (location) => {
    const data = await fetchWeather(location.latitude, location.longitude);
    setWeatherData(data);
  };

  return (
    <ThemeProvider>
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Header onLocationSelect={handleLocationSelect} />

        <Main weatherData={weatherData} />
      </div>
    </ThemeProvider>
  )
}

export default App