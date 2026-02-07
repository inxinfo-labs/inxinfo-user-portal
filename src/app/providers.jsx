import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider, ThemeContext } from "../context/ThemeContext";
import { lightTheme, darkTheme } from "../theme/muiTheme";

function MuiThemeWrapper({ children }) {
  const { theme } = useContext(ThemeContext);
  const muiTheme = theme === "dark" ? darkTheme : lightTheme;
  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <MuiThemeWrapper>
        <AuthProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </AuthProvider>
      </MuiThemeWrapper>
    </ThemeProvider>
  );
}
