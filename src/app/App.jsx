import AppRoutes from "../routes/AppRoutes";
import ServiceModal from "../components/ServiceModal";
import AuthModal from "../components/AuthModal";

export default function App() {
  return (
    <>
      <AppRoutes />
      <ServiceModal />
      <AuthModal />
    </>
  );
}
