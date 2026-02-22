import { Outlet } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";
import PublicHeader from "./PublicHeader";
import GuestSidebar from "./GuestSidebar";
import Footer from "./Footer";

export default function PublicLayout() {
  const { sidebarOpen, toggleSidebar } = useSidebar();

  return (
    <div className="app-layout public-layout" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <PublicHeader />
      <div className="app-body" style={{ flex: 1, display: "flex", minHeight: 0 }}>
        <GuestSidebar />
        {sidebarOpen && (
          <div
            className="app-sidebar-overlay d-md-none"
            role="button"
            tabIndex={0}
            aria-label="Close menu"
            onClick={toggleSidebar}
            onKeyDown={(e) => e.key === "Enter" && toggleSidebar()}
          />
        )}
        <main className={`app-main public-main ${!sidebarOpen ? "sidebar-closed" : ""}`} style={{ flex: 1 }}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
