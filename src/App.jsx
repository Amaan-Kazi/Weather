import { useState, useRef, useEffect } from "react";
import fetchWeather from "./fetchWeather"

import Header from "./components/header";

import { ThemeProvider } from "./context/theme"

function App() {
  const firstFetch = useRef(false);

  useEffect(() => {
    if (firstFetch.current) return;

    fetchWeather();
    firstFetch.current = true;

  }, [firstFetch]);


  return (
    <ThemeProvider>
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Header />

        <div style={{ backgroundColor: "royalblue", flex: 1 }}>Main</div>
      </div>
    </ThemeProvider>
  )
}

export default App
