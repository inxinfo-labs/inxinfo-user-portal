import { useState, useContext } from "react";
import { Card, Nav, Row, Col } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import ViewProfile from "./ViewProfile";
import UpdateProfile from "./UpdateProfile";
import UploadProfilePic from "./UploadProfilePic";
import { FaUser, FaEdit, FaCamera } from "react-icons/fa";

function Profile() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("view");

  if (!user) return <div className="text-center mt-5 spinner-border text-teal" />;

  const tabs = [
    { key: "view", label: "Profile", icon: <FaUser className="me-2" /> },
    { key: "edit", label: "Update Profile", icon: <FaEdit className="me-2" /> },
    { key: "pic", label: "Upload Photo", icon: <FaCamera className="me-2" /> },
  ];

  return (
    <div className="profile-settings theme-teal">
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Account Settings</h2>
        <p className="text-muted mb-0">Manage your profile and preferences</p>
      </div>

      <Card className="border-0 shadow-sm overflow-hidden">
        <Nav
          variant="pills"
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="nav-pills-teal px-3 pt-3 gap-2 flex-nowrap overflow-auto"
          style={{
            borderBottom: "1px solid #e2e8f0",
            background: "#f8fafc",
          }}
        >
          {tabs.map((t) => (
            <Nav.Item key={t.key}>
              <Nav.Link
                eventKey={t.key}
                className="rounded-pill px-3 py-2"
                style={{
                  fontWeight: 600,
                  color: activeTab === t.key ? "#fff" : "#64748b",
                  background: activeTab === t.key ? "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)" : "transparent",
                  border: activeTab === t.key ? "none" : "1px solid #e2e8f0",
                }}
              >
                {t.icon}
                {t.label}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <Card.Body className="p-4">
          {activeTab === "view" && <ViewProfile />}
          {activeTab === "edit" && <UpdateProfile />}
          {activeTab === "pic" && <UploadProfilePic />}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Profile;
