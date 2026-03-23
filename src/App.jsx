import { useState, useRef, useEffect } from "react";
import fetchWeather from "./fetchWeather"

import Header from "./components/header";

function App() {
  // Initialize from localStorage so it persists on refresh
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    // This adds [data-theme="dark"] to the <html> tag
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };


  const firstFetch = useRef(false);

  useEffect(() => {
    if (firstFetch.current) return;

    fetchWeather();
    firstFetch.current = true;

  }, [firstFetch]);


  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Header />

      <div style={{ backgroundColor: "royalblue", flex: 1 }}>Main</div>
    </div>
  )
}

export default App
