import { useRef, useEffect } from "react";
import fetchWeather from "./fetchWeather"

function App() {
  const firstFetch = useRef(false);

  useEffect(() => {
    if (firstFetch.current) return;

    fetchWeather();
    firstFetch.current = true;

  }, [firstFetch]);

  return (
    <>
      Hello World
    </>
  )
}

export default App
