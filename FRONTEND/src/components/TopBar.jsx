import { Container, Nav, Navbar, Row, Col } from "react-bootstrap";

const TopBar = (props) => (
  <Navbar expand="lg" className="nav-bg flex-column">
    <Container className="ms-5 ">
      <Navbar.Brand className="text-white" href="#home">
        EASYTICKETS {props.claim}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto"></Nav>
      </Navbar.Collapse>
    </Container>
    <Container className="mt-4">
      <Row>
        <Col lg={1}>
          <div className="p-3 border">1</div>
        </Col>
        <Col lg={1}>
          <div className="p-3 border">1</div>
        </Col>
        <Col lg={1}>
          <div className="p-3 border">1</div>
        </Col>
        <Col lg={1}>
          <div className="p-3 border">1</div>
        </Col>
        <Col lg={1}>
          <div className="p-3 border">2</div>
        </Col>
        <Col lg={1}>
          <div className="p-3 border">3</div>
        </Col>
        <Col lg={1}>
          <div className="p-3 border">4</div>
        </Col>
        <Col lg={1}>
          <div className="p-3 border">5</div>
        </Col>
        <Col lg={1}>
          <div className="p-3 border">6</div>
        </Col>
        <Col lg={1}>
          <div className="p-3 border">7</div>
        </Col>
        <Col lg={1}>
          <div className="p-3 border">8</div>
        </Col>
        <Col lg={1}>
          <div className="p-3 border">9</div>
        </Col>
        <Col lg={1}>
          <div className="p-3 border">10</div>
        </Col>
        <Col lg={1}>
          <div className="p-3 border">1</div>
        </Col>
      </Row>
      <Row>
        <Col lg={1}>
          <div className="p-3 border">11</div>
        </Col>
        <Col lg={1}>
          <div className="p-3 border">12</div>
        </Col>
        <Col lg={1}>
          <div className="p-3 border">13</div>
        </Col>
        <Col lg={1}>
          <div className="p-3 border">14</div>
        </Col>
        <Col lg={1}>
          <div className="p-3 border">15</div>
        </Col>
        <Col lg={1}>
          <div className="p-3 border">16</div>
        </Col>
        <Col lg={1}>
          <div className="p-3 border">17</div>
        </Col>
        <Col lg={1}>
          <div className="p-3 border">18</div>
        </Col>
        <Col lg={1}>
          <div className="p-3 border">19</div>
        </Col>
        <Col lg={1}>
          <div className="p-3 border">20</div>
        </Col>
      </Row>
    </Container>
  </Navbar>
);

export default TopBar;
