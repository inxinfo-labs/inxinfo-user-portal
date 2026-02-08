import { createTheme } from "@mui/material/styles";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: "#ea580c",
      dark: "#c2410c",
      light: "#fb923c",
    },
    secondary: {
      main: "#64748b",
    },
    background: {
      default: mode === "light" ? "#ffffff" : "#0f172a",
      paper: mode === "light" ? "#f8fafc" : "#1e293b",
    },
    text: {
      primary: mode === "light" ? "#0f172a" : "#e2e8f0",
      secondary: mode === "light" ? "#64748b" : "#94a3b8",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: { fontWeight: 700 },
    button: { fontWeight: 600 },
  },
  shape: { borderRadius: 8 },
});

export const lightTheme = createTheme(getDesignTokens("light"));
export const darkTheme = createTheme(getDesignTokens("dark"));
