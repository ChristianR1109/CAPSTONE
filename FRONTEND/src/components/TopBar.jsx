import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Row, Col, Spinner, Alert } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const TopBar = (props) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:1313/teams?size=20")
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel caricamento delle squadre");
        return res.json();
      })
      .then((data) => {
        const teamsSorted = (data.content || []).sort((a, b) => a.name.localeCompare(b.name));
        setTeams(teamsSorted);
        setLoading(false);
      })

      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container className="mx-5 my-3 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Caricamento squadre...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mx-5 my-3">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  const numColumns = Math.ceil((teams?.length || 0) / 5);

  return (
    <Navbar expand="lg" className="nav-bg flex-column ">
      <Container fluid className="ms-5 ps-0 me-0 align-self-start">
        <Navbar.Brand className="text-white" href="#home">
          <h4 className="my-2">EASYTICKETS</h4>
          {props.claim}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto"></Nav>
        </Navbar.Collapse>
      </Container>
      <Container className="ms-5 align-self-start ps-0">
        <DropdownButton id="dropdown-item-button" title="Acquista biglietti" variant="dark">
          <Dropdown.Item as="div" variant="dark" className="bg-dark text-white my-dark-dropdown p-2" style={{ minWidth: "550px", width: "100%" }}>
            <Row>
              {[...Array(numColumns)].map((_, colIndex) => (
                <Col key={colIndex} xs={3}>
                  {teams.slice(colIndex * 5, colIndex * 5 + 5).map((item, idx) => (
                    <div key={idx} className="nav-div mb-3 d-flex justify-content-between align-items-center">
                      <h6>{item.name}</h6>
                      <img src={item.logo || item.img} alt={item.name} style={{ width: "30%", height: "100%", objectFit: "contain" }} />
                    </div>
                  ))}
                </Col>
              ))}
            </Row>
          </Dropdown.Item>
        </DropdownButton>
      </Container>
    </Navbar>
  );
};

export default TopBar;
