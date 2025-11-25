import { useMemo, useState } from "react";
import { Mode, ThemeContextValue } from "./types";
import theme from "@theme/theme";
import ThemeContext from "./context";

const ThemeProvider: React.FC<{ initialMode?: Mode; children: React.ReactNode }> = ({
  initialMode = "light",
  children
}) => {
  const [mode, setMode] = useState<Mode>(initialMode);

  const value = useMemo<ThemeContextValue>(() => {
    // build color lookup (name -> light/dark value)
    const colors = theme.colors.reduce<Record<string, string>>((acc, c) => {
      acc[c.name] = c[mode] ?? c.light; // fallback to light if dark missing
      return acc;
    }, {});

    return {
      theme,
      mode,
      colors,
      text: theme.text,
      toggleMode: () => setMode((prev) => (prev === "light" ? "dark" : "light"))
    };
  }, [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
