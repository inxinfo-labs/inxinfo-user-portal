import { createContext, useContext, useState, useCallback } from "react";

const UserModalContext = createContext(null);

export const USER_MODAL_VIEWS = {
  HOME: "home",
  PROFILE: "profile",
};

export function UserModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(USER_MODAL_VIEWS.HOME);

  const openUserModal = useCallback((v = USER_MODAL_VIEWS.HOME) => {
    setView(v);
    setOpen(true);
  }, []);

  const closeUserModal = useCallback(() => {
    setOpen(false);
    setView(USER_MODAL_VIEWS.HOME);
  }, []);

  const setUserModalView = useCallback((v) => setView(v), []);

  return (
    <UserModalContext.Provider value={{ open, view, openUserModal, closeUserModal, setUserModalView }}>
      {children}
    </UserModalContext.Provider>
  );
}

export function useUserModal() {
  const ctx = useContext(UserModalContext);
  if (!ctx) throw new Error("useUserModal must be used within UserModalProvider");
  return ctx;
}
