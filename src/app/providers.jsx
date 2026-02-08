import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "../context/AuthContext";
// eslint-disable-next-line no-unused-vars -- used as JSX <AuthModalProvider>
import { AuthModalProvider } from "../context/AuthModalContext";
import { ServiceModalProvider } from "../context/ServiceModalContext";
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
          <BrowserRouter>
            <ServiceModalProvider>
              <AuthModalProvider>
                {children}
              </AuthModalProvider>
            </ServiceModalProvider>
          </BrowserRouter>
        </AuthProvider>
      </MuiThemeWrapper>
    </ThemeProvider>
  );
}
