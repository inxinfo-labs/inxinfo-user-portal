import { createContext, useContext, useState, useCallback } from "react";

const PageModalContext = createContext(null);

export const PAGE_MODAL_TYPES = {
  ABOUT: "about",
  CONTACT: "contact",
  BLOG: "blog",
};

export function PageModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(null);

  const openPage = useCallback((type) => {
    setPage(type);
    setOpen(true);
  }, []);

  const closePage = useCallback(() => {
    setOpen(false);
    setPage(null);
  }, []);

  return (
    <PageModalContext.Provider value={{ open, page, openPage, closePage }}>
      {children}
    </PageModalContext.Provider>
  );
}

export function usePageModal() {
  const ctx = useContext(PageModalContext);
  if (!ctx) throw new Error("usePageModal must be used within PageModalProvider");
  return ctx;
}
