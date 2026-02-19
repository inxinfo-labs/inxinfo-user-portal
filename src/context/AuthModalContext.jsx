import { createContext, useContext, useState, useCallback } from "react";

const AuthModalContext = createContext(null);

export const AUTH_MODES = {
  LOGIN: "login",
  REGISTER: "register",
  REGISTER_PANDIT: "register-pandit",
  FORGOT_PASSWORD: "forgot-password",
};

export function AuthModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(null);

  const openAuth = useCallback((m) => {
    setMode(m);
    setOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    setOpen(false);
    setMode(null);
  }, []);

  return (
    <AuthModalContext.Provider
      value={{ open, mode, openAuth, closeAuth }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) {
    throw new Error("useAuthModal must be used within AuthModalProvider");
  }
  return ctx;
}
