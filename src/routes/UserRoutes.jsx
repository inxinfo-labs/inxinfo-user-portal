import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "../features/user/Profile";
import UpdateProfile from "../features/user/UpdateProfile";
import UploadProfilePic from "../features/user/UploadProfilePic";
import ProtectedRoute from "../common/ProtectedRoute";
import Home from "../components/layout/Home";
import About from "../components/layout/About";
import Contact from "../components/Contact";

export default function UserRoutes() {
  return (
    <Routes>

      {/* /user → /user/home */}
      <Route path="/" element={<Navigate to="home" />} />

      <Route
        path="home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="profile/update"
        element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="profile/pic"
        element={
          <ProtectedRoute>
            <UploadProfilePic />
          </ProtectedRoute>
        }
      />
        <Route
          path="about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        <Route
          path="contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />

      </Routes>
      )
}
