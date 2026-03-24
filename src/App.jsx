import { useState, useRef, useEffect } from "react";
import fetchWeather from "./fetchWeather"

import Header from "./components/header";
import Main from "./components/main";

import { ThemeProvider } from "./context/theme"

function App() {
  const firstFetch = useRef(false);

  // useEffect(() => {
  // if (firstFetch.current) return;

  // fetchWeather();
  // firstFetch.current = true;

  // }, [firstFetch]);


  return (
    <ThemeProvider>
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Header />

        <Main />
      </div>
    </ThemeProvider>
  )
}

export default App