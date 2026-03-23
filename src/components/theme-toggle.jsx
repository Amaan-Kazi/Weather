import { Moon } from "lucide-react";

import { useTheme } from "../context/theme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return <div>
    <div>
      <Moon onClick={toggleTheme} />
    </div>
  </div>
}
