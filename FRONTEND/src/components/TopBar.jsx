import { Container, Nav, Navbar } from "react-bootstrap";

const TopBar = (props) => (
  <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="#home">Epicstaurant {props.claim}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <h1>SE ESCE è BUONO</h1>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default TopBar;
