import { Theme } from "@theme/types";

export type Mode = "light" | "dark";

export interface ThemeContextValue {
  theme: Theme;
  mode: Mode;
  colors: Record<string, string>; // quick lookup { Grey: "rgb(...)" }
  text: Theme["text"];
  toggleMode: () => void;
}
