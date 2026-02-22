import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { SidebarProvider } from "../context/SidebarContext";
// eslint-disable-next-line no-unused-vars -- used as JSX <AuthModalProvider>
import { AuthModalProvider } from "../context/AuthModalContext";
import { ServiceModalProvider } from "../context/ServiceModalContext";
// eslint-disable-next-line no-unused-vars -- used as JSX below
import { PageModalProvider } from "../context/PageModalContext";
// eslint-disable-next-line no-unused-vars -- used as JSX below
import { UserModalProvider } from "../context/UserModalContext";
import { ThemeProvider, ThemeContext } from "../context/ThemeContext";
import { lightTheme, darkTheme } from "../theme/muiTheme";
import AppConfig from "../config/appConfig";

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
  const googleClientId = AppConfig.googleClientId || "";
  const app = (
    <ThemeProvider>
      <MuiThemeWrapper>
        <AuthProvider>
          <BrowserRouter>
            <CartProvider>
            <ServiceModalProvider>
              <AuthModalProvider>
                <PageModalProvider>
                  <UserModalProvider>
                    <SidebarProvider>
                      {children}
                    </SidebarProvider>
                  </UserModalProvider>
                </PageModalProvider>
              </AuthModalProvider>
            </ServiceModalProvider>
            </CartProvider>
          </BrowserRouter>
        </AuthProvider>
      </MuiThemeWrapper>
    </ThemeProvider>
  );
  return googleClientId ? (
    <GoogleOAuthProvider clientId={googleClientId}>
      {app}
    </GoogleOAuthProvider>
  ) : (
    app
  );
}
