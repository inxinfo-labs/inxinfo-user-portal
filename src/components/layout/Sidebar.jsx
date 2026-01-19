import { Nav } from "react-bootstrap";

export default function Sidebar() {
    return (
        <Nav className="flex-column bg-light vh-100 p-3" style={{ width: "220px" }}>
            <Nav.Link href="/user/profile">Profile</Nav.Link>
            <Nav.Link href="/user/profile/update">Update Profile</Nav.Link>
            <Nav.Link href="/user/profile-pic">Upload Pic</Nav.Link>

        </Nav>
    );
}
