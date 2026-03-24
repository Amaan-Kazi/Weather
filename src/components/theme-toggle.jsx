import { Moon, Sun } from "lucide-react";

import { useTheme } from "../context/theme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return <div>
    {theme === "dark" ? <div>
      <Sun onClick={toggleTheme} />
    </div> : <div>
      <Moon onClick={toggleTheme} />
    </div>}
  </div>
}
