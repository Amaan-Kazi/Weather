import { MapPin } from "lucide-react";

export default function SearchBar() {
  return (
    <>
      <style>{`
        .search-bar {
          display: flex;
          flex: 1;
          align-items: center;
          gap: 12px;
          width: 100%;
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
      `}</style>
      <div className="search-bar">
        <div className="search-input-wrapper">
          <MapPin className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Location"
          />
          <button className="detect-btn">
            Detect
          </button>
        </div>
      </div>
    </>
  );
}