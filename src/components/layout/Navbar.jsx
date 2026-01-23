import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function AppNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/user/home">INXINFO</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/user/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/user/about">About</Nav.Link>
            <Nav.Link as={Link} to="/user/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/user/profile">Profile</Nav.Link>
          </Nav>
          <Button variant="outline-danger" onClick={logout}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
