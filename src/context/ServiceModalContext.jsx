import { createContext, useContext, useState, useCallback } from "react";

const ServiceModalContext = createContext(null);

export const SERVICE_TYPES = {
  PRODUCTS: "products",
  PUJA: "puja",
  ORDER: "order",
  PANDIT: "pandit",
  PUJA_OFFERS: "puja_offers",
};

export function ServiceModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState(null);

  const openService = useCallback((type) => {
    setService(type);
    setOpen(true);
  }, []);

  const closeService = useCallback(() => {
    setOpen(false);
    setService(null);
  }, []);

  return (
    <ServiceModalContext.Provider
      value={{ open, service, openService, closeService }}
    >
      {children}
    </ServiceModalContext.Provider>
  );
}

export function useServiceModal() {
  const ctx = useContext(ServiceModalContext);
  if (!ctx) {
    throw new Error("useServiceModal must be used within ServiceModalProvider");
  }
  return ctx;
}
