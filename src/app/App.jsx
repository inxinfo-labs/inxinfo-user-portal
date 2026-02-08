import AppRoutes from "../routes/AppRoutes";
import ServiceModal from "../components/ServiceModal";
import AuthModal from "../components/AuthModal";
import PageModal from "../components/PageModal";
import UserModal from "../components/UserModal";

export default function App() {
  return (
    <>
      <AppRoutes />
      <ServiceModal />
      <AuthModal />
      <PageModal />
      <UserModal />
    </>
  );
}
