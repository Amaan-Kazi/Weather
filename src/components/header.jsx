import SearchBar from "./search-bar"
import ThemeToggle from "./theme-toggle"
import Title from "./title"

export default function Header() {
  return <div
    style={{
      backgroundColor: "sandybrown",
      padding: "10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}
  >
    <Title />
    <SearchBar />
    <ThemeToggle />
  </div>
}
