import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useLocation } from "react-router-dom"; // Importa location hook

const TopBar = (props) => {
  const location = useLocation();
  const isAtalantaPage = location.pathname.startsWith("/atalanta");

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
    <Navbar expand="lg" className="nav-bg sticky-top d-flex flex-column" variant="dark">
      <Container fluid className="page-container mx-auto">
        {/* Prima riga: brand */}
        <div className="d-block w-100">
          <div className="w-100 d-flex mb-0">
            <Navbar.Brand className="text-white text-center" href="home">
              {isAtalantaPage ? <span style={{ color: "#1b9af7", fontWeight: "bold" }}>Atalanta Tickets</span> : "EASYTICKETS"}
              {props.claim}
            </Navbar.Brand>
          </div>
          <div>
            <DropdownButton
              id="dropdown-item-button"
              title={<span style={{ color: "white", cursor: "pointer", textDecoration: "none" }}>Acquista biglietti</span>}
              variant="dark"
              className="p-0 m-0"
            >
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
          </div>
        </div>
        <div className="w-100 d-flex justify-content-end gap-3">
          {/* Seconda riga: bottoni e dropdown */}

          {isAtalantaPage ? (
            <>
              <Button variant="outline-light" href="/home">
                Home
              </Button>
              <Button variant="outline-light" href="/atalanta/matches">
                Partite
              </Button>
              <Button variant="outline-light" href="/atalanta/contact">
                Contatti
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline-light" href="/home">
                Home
              </Button>

              <Button variant="outline-light" href="/about">
                Info
              </Button>
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default TopBar;
