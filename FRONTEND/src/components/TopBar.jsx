import { Container, Nav, Navbar } from "react-bootstrap";

const TopBar = (props) => (
  <Navbar expand="lg" className="nav-bg">
    <Container className="ms-0">
      <Navbar.Brand href="#home">EASYTICKETS {props.claim}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto"></Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default TopBar;
