import { MapPin } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <MapPin className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Location"
        />
      </div>
      <button className="detect-btn">
        Detect
      </button>
    </div>
  );
}