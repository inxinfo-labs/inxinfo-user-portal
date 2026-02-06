import { useState, useContext } from "react";
import { Card, Nav } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import ViewProfile from "./ViewProfile";
import UpdateProfile from "./UpdateProfile";
import UploadProfilePic from "./UploadProfilePic";
import { FaUser, FaEdit, FaCamera } from "react-icons/fa";

function Profile() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("view");

  if (!user) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-teal" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: "view", label: "View Profile", icon: <FaUser className="me-2" /> },
    { key: "edit", label: "Edit Profile", icon: <FaEdit className="me-2" /> },
    { key: "pic", label: "Profile Picture", icon: <FaCamera className="me-2" /> },
  ];

  return (
    <div className="profile-settings theme-teal">
      <div className="mb-4">
        <h2 className="fw-bold mb-1">My Profile</h2>
        <p className="text-muted mb-0">Manage your profile information and preferences</p>
      </div>

      <Card className="border-0 shadow-lg overflow-hidden" style={{ borderRadius: "20px" }}>
        <Nav
          variant="pills"
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="px-4 pt-4 gap-2 flex-nowrap overflow-auto"
          style={{
            borderBottom: "2px solid #e2e8f0",
            background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
          }}
        >
          {tabs.map((t) => (
            <Nav.Item key={t.key}>
              <Nav.Link
                eventKey={t.key}
                className="rounded-pill px-4 py-2 fw-semibold"
                style={{
                  color: activeTab === t.key ? "#fff" : "#64748b",
                  background: activeTab === t.key 
                    ? "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)" 
                    : "transparent",
                  border: activeTab === t.key ? "none" : "2px solid #e2e8f0",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== t.key) {
                    e.target.style.background = "rgba(13, 148, 136, 0.1)";
                    e.target.style.borderColor = "#0d9488";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== t.key) {
                    e.target.style.background = "transparent";
                    e.target.style.borderColor = "#e2e8f0";
                  }
                }}
              >
                {t.icon}
                {t.label}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <Card.Body className="p-4 p-lg-5">
          {activeTab === "view" && <ViewProfile />}
          {activeTab === "edit" && <UpdateProfile />}
          {activeTab === "pic" && <UploadProfilePic />}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Profile;
