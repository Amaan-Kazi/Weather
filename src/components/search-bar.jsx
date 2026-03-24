import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import fetchWeather from "../fetchWeather";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json`
        );
        const data = await response.json();
        setResults(data.results || []);
      } catch (error) {
        console.error("Error fetching location:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setResults([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (result) => {
    setSelectedLocation({
      name: result.name,
      latitude: result.latitude,
      longitude: result.longitude,
    });
    setQuery(result.name);
    setResults([]);
    console.log("Selected location:", result.name, result.latitude, result.longitude);
  };

  useEffect(() => {
    if (selectedLocation) {
      fetchWeather(selectedLocation.latitude, selectedLocation.longitude);
    }
  }, [selectedLocation]);

  return (
    <>
      <style>{`
        .search-bar {
          display: flex;
          flex: 1;
          align-items: center;
          gap: 12px;
          width: 100%;
          position: relative;
        }

        .search-input-wrapper {
          display: flex;
          align-items: center;
          flex: 1;
          background: var(--search-bg);
          border: 1px solid var(--search-border);
          border-radius: 12px;
          padding: 0 6px 0 14px;
          height: 48px;
          transition: border-color 0.2s ease;
        }

        .search-input-wrapper:focus-within {
          border-color: var(--primary);
        }

        .search-icon {
          color: var(--icon-color);
          flex-shrink: 0;
        }

        .search-input {
          flex: 1;
          border: none;
          background: transparent;
          padding: 0 12px;
          font-size: 16px;
          color: var(--search-text);
          outline: none;
        }

        .search-input::placeholder {
          color: var(--search-placeholder);
        }

        .detect-btn {
          background: var(--detect-btn-bg);
          color: var(--detect-btn-text);
          border: none;
          border-radius: 8px;
          padding: 0 14px;
          height: 36px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease;
          white-space: nowrap;
        }

        .detect-btn:hover {
          background-color: var(--detect-btn-hover);
        }

        .search-results {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          margin-top: 4px;
          background: var(--search-results-bg);
          border: 1px solid var(--search-results-border);
          border-radius: 12px;
          overflow: hidden;
          z-index: 1000;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .search-result-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          cursor: pointer;
          transition: background-color 0.15s ease;
        }

        .search-result-item:hover {
          background: var(--search-result-hover);
        }

        .search-result-name {
          color: var(--search-result-text);
          font-size: 15px;
          font-weight: 500;
        }

        .search-result-coords {
          color: var(--search-result-secondary);
          font-size: 13px;
        }
      `}</style>
      <div className="search-bar" ref={wrapperRef}>
        <div className="search-input-wrapper">
          <MapPin className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Location"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="detect-btn">
            Detect
          </button>
        </div>
        {results.length > 0 && (
          <div className="search-results">
            {results.map((result) => (
              <div
                key={result.id}
                className="search-result-item"
                onClick={() => handleSelect(result)}
              >
                <span className="search-result-name">{result.name}</span>
                <span className="search-result-coords">
                  {result.latitude.toFixed(4)}, {result.longitude.toFixed(4)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}