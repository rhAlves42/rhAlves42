import { createContext } from "react";
import { ThemeContextValue } from "./types";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
export default ThemeContext;
