import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

export default function MainLayout({ children }) {
  return (
    <>
      <AppHeader />
      <div style={{ paddingTop: "70px", minHeight: "100vh" }}>
        {children}
      </div>
      <AppFooter/>
    </>
  );
}
