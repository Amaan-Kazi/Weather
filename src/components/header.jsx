import SearchBar from "./search-bar"
import ThemeToggle from "./theme-toggle"
import Title from "./title"

export default function Header({ onLocationSelect }) {
  return <div
    style={{
      backgroundColor: "var(--background2)",
      padding: "10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "20px",
    }}
  >
    <Title />
    <SearchBar onLocationSelect={onLocationSelect} />
    <ThemeToggle />
  </div>
}