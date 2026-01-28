import { useState, useContext } from "react";
import { Card, Nav } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import ViewProfile from "./ViewProfile";
import UpdateProfile from "./UpdateProfile";
import UploadProfilePic from "./UploadProfilePic";

function Profile() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("view");

  if (!user) return <div className="text-center mt-5 spinner-border" />;

  return (
    <div className="container mt-4">
      <Card className="shadow-sm">
        <Card.Body>
          <h4 className="mb-3">Profile Settings</h4>

          {/* SETTINGS TABS */}
          <Nav
            variant="tabs"
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-4"
          >
            <Nav.Item>
              <Nav.Link eventKey="view">Profile</Nav.Link>
            </Nav.Item>
          </Nav>

          {/* TAB CONTENT */}
          {activeTab === "view" && <ViewProfile />}
          {activeTab === "edit" && <UpdateProfile />}
          {activeTab === "pic" && <UploadProfilePic />}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Profile;
