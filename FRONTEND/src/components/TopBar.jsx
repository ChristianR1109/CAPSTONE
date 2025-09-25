import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Link, useLocation } from "react-router-dom"; // Importa location hook
import Image from "../../public/Easytickets.png";

const TopBar = ({ props, isAuthenticated }) => {
  const location = useLocation();
  const isAtalantaPage = location.pathname.startsWith("/atalanta");
  const isBolognaPage = location.pathname.startsWith("/bologna");
  const isCagliariPage = location.pathname.startsWith("/cagliari");
  const isComoPage = location.pathname.startsWith("/como");
  const isCremonesePage = location.pathname.startsWith("/cremonese");
  const isFiorentinaPage = location.pathname.startsWith("/fiorentina");
  const isGenoaPage = location.pathname.startsWith("/genoa");
  const isInterPage = location.pathname.startsWith("/inter");
  const isJuventusPage = location.pathname.startsWith("/juventus");
  const isLazioPage = location.pathname.startsWith("/lazio");
  const isLeccePage = location.pathname.startsWith("/lecce");
  const isMilanPage = location.pathname.startsWith("/milan");
  const isNapoliPage = location.pathname.startsWith("/napoli");
  const isParmaPage = location.pathname.startsWith("/parma");
  const isPisaPage = location.pathname.startsWith("/pisa");
  const isRomaPage = location.pathname.startsWith("/roma");
  const isSassuoloPage = location.pathname.startsWith("/sassuolo");
  const isTorinoPage = location.pathname.startsWith("/torino");
  const isUdinesePage = location.pathname.startsWith("/udinese");
  const isVeronaPage = location.pathname.startsWith("/verona");

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const teamLogos = {
    Atalanta: "https://upload.wikimedia.org/wikipedia/it/thumb/8/81/Logo_Atalanta_Bergamo.svg/800px-Logo_Atalanta_Bergamo.svg.png",
    Bologna: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Bologna_F.C._1909_logo.svg/244px-Bologna_F.C._1909_logo.svg.png",
    Cagliari: "https://upload.wikimedia.org/wikipedia/it/thumb/8/88/Cagliari_calcio.svg/800px-Cagliari_calcio.svg.png",
    Como: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Calcio_Como_-_logo_%28Italy%2C_2019-%29.svg/726px-Calcio_Como_-_logo_%28Italy%2C_2019-%29.svg.png",
    Cremonese: "https://upload.wikimedia.org/wikipedia/it/thumb/2/23/Unione_Sportiva_Cremonese_logo.svg/330px-Unione_Sportiva_Cremonese_logo.svg.png",
    Fiorentina:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/ACF_Fiorentina_-_logo_%28Italy%2C_2022%29.svg/1024px-ACF_Fiorentina_-_logo_%28Italy%2C_2022%29.svg.png",
    Genoa: "https://upload.wikimedia.org/wikipedia/it/thumb/9/99/Genoa_Cricket_and_Football_Club_logo.svg/800px-Genoa_Cricket_and_Football_Club_logo.svg.png",
    Verona: "https://upload.wikimedia.org/wikipedia/it/thumb/9/92/Hellas_Verona_FC_logo_%282020%29.svg/800px-Hellas_Verona_FC_logo_%282020%29.svg.png",
    Inter: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/1024px-FC_Internazionale_Milano_2021.svg.png",
    Juventus:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Juventus_FC_-_logo_black_%28Italy%2C_2020%29.svg/246px-Juventus_FC_-_logo_black_%28Italy%2C_2020%29.svg.png",
    Lazio:
      "https://upload.wikimedia.org/wikipedia/it/thumb/6/62/Stemma_della_Societ%C3%A0_Sportiva_Lazio.svg/1280px-Stemma_della_Societ%C3%A0_Sportiva_Lazio.svg.png",
    Lecce: "https://upload.wikimedia.org/wikipedia/it/thumb/3/36/US_Lecce_Stemma.svg/720px-US_Lecce_Stemma.svg.png?20241002144328",
    Milan: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/541px-Logo_of_AC_Milan.svg.png",
    Napoli: "https://images.seeklogo.com/logo-png/55/2/ssc-napoli-logo-png_seeklogo-550076.png",
    Parma:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Logo_Parma_Calcio_1913_%28adozione_2016%29.svg/800px-Logo_Parma_Calcio_1913_%28adozione_2016%29.svg.png",
    Pisa: "https://upload.wikimedia.org/wikipedia/it/thumb/d/d7/Logo_Pisa_SC_2017.svg/800px-Logo_Pisa_SC_2017.svg.png",
    Roma: "https://upload.wikimedia.org/wikipedia/it/thumb/0/0e/AS_Roma_Logo_2017.svg/800px-AS_Roma_Logo_2017.svg.png",
    Sassuolo: "https://upload.wikimedia.org/wikipedia/it/thumb/a/a4/Ussassuolostemma.svg/800px-Ussassuolostemma.svg.png",
    Torino: "https://upload.wikimedia.org/wikipedia/it/thumb/0/04/Torino_FC_logo.svg/800px-Torino_FC_logo.svg.png",
    Udinese: "https://upload.wikimedia.org/wikipedia/it/thumb/a/ae/Logo_Udinese_Calcio_2010.svg/1024px-Logo_Udinese_Calcio_2010.svg.png",
  };

  useEffect(() => {
    fetch("http://localhost:1313/public/teams?size=20")
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
  if (!isAuthenticated) {
    return (
      <Navbar expand="lg" className="sticky-top nav-bg d-flex flex-column mt-0" variant="dark">
        <Container fluid className="page-container mx-auto d-flex justify-content-space-between gap-3 p-2">
          <div className="d-flex align-items-center ms-2">
            <h2 className="d-inline text-white text-center m-0 flex-start">EASYTICKETS</h2>
            <img src={Image} style={{ width: 50 }}></img>
          </div>
          <div>
            <Button variant="outline-light" href="/login" className="me-3">
              Login
            </Button>
            <Button variant="outline-light" href="/register" className="me-2">
              Registrazione
            </Button>
          </div>
        </Container>
      </Navbar>
    );
  }
  return (
    <Navbar expand="lg" className="nav-bg sticky-top d-flex flex-column mt-0" variant="dark">
      <Container fluid className="page-container mx-auto">
        {/* Prima riga: brand */}
        <div className="d-block w-100">
          <div className="w-100 d-flex mb-0">
            <Navbar.Brand className="text-white text-center d-flex align-items-center">
              {isAtalantaPage ? (
                <>
                  <span style={{ color: "#0a2e6e", fontWeight: "bold", marginRight: 10 }}>Atalanta Tickets</span>
                  <img src={teamLogos["Atalanta"]} alt="Logo Atalanta" style={{ width: 30, height: 30, objectFit: "contain" }} />
                </>
              ) : isBolognaPage ? (
                <>
                  <span style={{ color: "#dc3545", fontWeight: "bold", marginRight: 10 }}>Bologna Tickets</span>
                  <img src={teamLogos["Bologna"]} alt="Logo Bologna" style={{ width: 30, height: 30, objectFit: "contain" }} />
                </>
              ) : isCagliariPage ? (
                <>
                  <span style={{ color: "#d50110", fontWeight: "bold", marginRight: 10 }}>Cagliari Tickets</span>
                  <img src={teamLogos["Cagliari"]} alt="Logo Cagliari" style={{ width: 30, height: 30, objectFit: "contain" }} />
                </>
              ) : isComoPage ? (
                <>
                  <span style={{ color: "#073f6a", fontWeight: "bold", marginRight: 10 }}>Como Tickets</span>
                  <img src={teamLogos["Como"]} alt="Logo Como" style={{ width: 30, height: 30, objectFit: "contain" }} />
                </>
              ) : isCremonesePage ? (
                <>
                  <span style={{ color: "#ed221c", fontWeight: "bold", marginRight: 10 }}>Cremonese Tickets</span>
                  <img src={teamLogos["Cremonese"]} alt="Logo Cremonese" style={{ width: 30, height: 30, objectFit: "contain" }} />
                </>
              ) : isFiorentinaPage ? (
                <>
                  <span style={{ color: "#61328C", fontWeight: "bold", marginRight: 10 }}>Fiorentina Tickets</span>
                  <img src={teamLogos["Fiorentina"]} alt="Logo Fiorentina" style={{ width: 30, height: 30, objectFit: "contain" }} />
                </>
              ) : isGenoaPage ? (
                <>
                  <span style={{ color: "#AC0B15", fontWeight: "bold", marginRight: 10 }}>Genoa Tickets</span>
                  <img src={teamLogos["Genoa"]} alt="Logo Genoa" style={{ width: 30, height: 30, objectFit: "contain" }} />
                </>
              ) : isInterPage ? (
                <>
                  <span style={{ color: "#0d2dbcff", fontWeight: "bold", marginRight: 10 }}>Inter Tickets</span>
                  <img src={teamLogos["Inter"]} alt="Logo Inter" style={{ width: 30, height: 30, objectFit: "contain" }} />
                </>
              ) : isJuventusPage ? (
                <>
                  <span style={{ color: "#ffffffff", fontWeight: "bold", marginRight: 10 }}>Juventus Tickets</span>
                  <img src={teamLogos["Juventus"]} alt="Logo Juventus" style={{ width: 30, height: 30, objectFit: "contain" }} />
                </>
              ) : isLazioPage ? (
                <>
                  <span style={{ color: "#75D2EB", fontWeight: "bold", marginRight: 10 }}>Lazio Tickets</span>
                  <img src={teamLogos["Lazio"]} alt="Logo Lazio" style={{ width: 30, height: 30, objectFit: "contain" }} />
                </>
              ) : isLeccePage ? (
                <>
                  <span style={{ color: "#fef200", fontWeight: "bold", marginRight: 10 }}>Lecce Tickets</span>
                  <img src={teamLogos["Lecce"]} alt="Logo Lecce" style={{ width: 30, height: 30, objectFit: "contain" }} />
                </>
              ) : isMilanPage ? (
                <>
                  <span style={{ color: "#FE0032", fontWeight: "bold", marginRight: 10 }}>Milan Tickets</span>
                  <img src={teamLogos["Milan"]} alt="Logo Milan" style={{ width: 30, height: 30, objectFit: "contain" }} />
                </>
              ) : isNapoliPage ? (
                <>
                  <span style={{ color: "#61C4E2", fontWeight: "bold", marginRight: 10 }}>Napoli Tickets</span>
                  <img src={teamLogos["Napoli"]} alt="Logo Napoli" style={{ width: 30, height: 30, objectFit: "contain" }} />
                </>
              ) : isParmaPage ? (
                <>
                  <span style={{ color: "#FFD000", fontWeight: "bold", marginRight: 10 }}>Parma Tickets</span>
                  <img src={teamLogos["Parma"]} alt="Logo Parma" style={{ width: 30, height: 30, objectFit: "contain" }} />
                </>
              ) : isPisaPage ? (
                <>
                  <span style={{ color: "#005eb8", fontWeight: "bold", marginRight: 10 }}>Pisa Tickets</span>
                  <img src={teamLogos["Pisa"]} alt="Logo Pisa" style={{ width: 30, height: 30, objectFit: "contain" }} />
                </>
              ) : isRomaPage ? (
                <>
                  <span style={{ color: "#98142B", fontWeight: "bold", marginRight: 10 }}>Roma Tickets</span>
                  <img src={teamLogos["Roma"]} alt="Logo Roma" style={{ width: 30, height: 30, objectFit: "contain" }} />
                </>
              ) : isSassuoloPage ? (
                <>
                  <span style={{ color: "#00a452", fontWeight: "bold", marginRight: 10 }}>Sassuolo Tickets</span>
                  <img src={teamLogos["Sassuolo"]} alt="Logo Sassuolo" style={{ width: 30, height: 30, objectFit: "contain" }} />
                </>
              ) : isTorinoPage ? (
                <>
                  <span style={{ color: "#8c2519", fontWeight: "bold", marginRight: 10 }}>Torino Tickets</span>
                  <img src={teamLogos["Torino"]} alt="Logo Torino" style={{ width: 30, height: 30, objectFit: "contain" }} />
                </>
              ) : isUdinesePage ? (
                <>
                  <span style={{ color: "#ffffff", fontWeight: "bold", marginRight: 10 }}>Udinese Tickets</span>
                  <img src={teamLogos["Udinese"]} alt="Logo Udinese" style={{ width: 30, height: 30, objectFit: "contain" }} />
                </>
              ) : isVeronaPage ? (
                <>
                  <span style={{ color: "#ffd101", fontWeight: "bold", marginRight: 10 }}>Verona Tickets</span>
                  <img src={teamLogos["Verona"]} alt="Logo Verona" style={{ width: 30, height: 30, objectFit: "contain" }} />
                </>
              ) : (
                "EASYTICKETS"
              )}
              {props.claim}
              <img src={Image} style={{ width: 50 }}></img>
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
                        <a href={`/${item.name.toLowerCase()}`} className="text-decoration-none">
                          <div key={idx} className="nav-div mb-3 d-flex justify-content-between align-items-center">
                            <h6>{item.name}</h6>
                            <img src={item.logo || item.img} alt={item.name} style={{ width: "30%", height: "100%", objectFit: "contain" }} />
                          </div>
                        </a>
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
          ) : isBolognaPage ? (
            <>
              <Button variant="outline-light" href="/home">
                Home
              </Button>
              <Button variant="outline-light" href="/bologna/matches">
                Partite
              </Button>
              <Button variant="outline-light" href="/bologna/contact">
                Contatti
              </Button>
            </>
          ) : isCagliariPage ? (
            <>
              <Button variant="outline-light" href="/home">
                Home
              </Button>
              <Button variant="outline-light" href="/cagliari/matches">
                Partite
              </Button>
              <Button variant="outline-light" href="/cagliari/contact">
                Contatti
              </Button>
            </>
          ) : isComoPage ? (
            <>
              <Button variant="outline-light" href="/home">
                Home
              </Button>
              <Button variant="outline-light" href="/como/matches">
                Partite
              </Button>
              <Button variant="outline-light" href="/como/contact">
                Contatti
              </Button>
            </>
          ) : isCremonesePage ? (
            <>
              <Button variant="outline-light" href="/home">
                Home
              </Button>
              <Button variant="outline-light" href="/cremonese/matches">
                Partite
              </Button>
              <Button variant="outline-light" href="/cremonese/contact">
                Contatti
              </Button>
            </>
          ) : isFiorentinaPage ? (
            <>
              <Button variant="outline-light" href="/home">
                Home
              </Button>
              <Button variant="outline-light" href="/cremonese/matches">
                Partite
              </Button>
              <Button variant="outline-light" href="/cremonese/contact">
                Contatti
              </Button>
            </>
          ) : isGenoaPage ? (
            <>
              <Button variant="outline-light" href="/home">
                Home
              </Button>
              <Button variant="outline-light" href="/cremonese/matches">
                Partite
              </Button>
              <Button variant="outline-light" href="/cremonese/contact">
                Contatti
              </Button>
            </>
          ) : isInterPage ? (
            <>
              <Button variant="outline-light" href="/home">
                Home
              </Button>
              <Button variant="outline-light" href="/cremonese/matches">
                Partite
              </Button>
              <Button variant="outline-light" href="/cremonese/contact">
                Contatti
              </Button>
            </>
          ) : isJuventusPage ? (
            <>
              <Button variant="outline-light" href="/home">
                Home
              </Button>
              <Button variant="outline-light" href="/cremonese/matches">
                Partite
              </Button>
              <Button variant="outline-light" href="/cremonese/contact">
                Contatti
              </Button>
            </>
          ) : isLazioPage ? (
            <>
              <Button variant="outline-light" href="/home">
                Home
              </Button>
              <Button variant="outline-light" href="/cremonese/matches">
                Partite
              </Button>
              <Button variant="outline-light" href="/cremonese/contact">
                Contatti
              </Button>
            </>
          ) : isLeccePage ? (
            <>
              <Button variant="outline-light" href="/home">
                Home
              </Button>
              <Button variant="outline-light" href="/cremonese/matches">
                Partite
              </Button>
              <Button variant="outline-light" href="/cremonese/contact">
                Contatti
              </Button>
            </>
          ) : isMilanPage ? (
            <>
              <Button variant="outline-light" href="/home">
                Home
              </Button>
              <Button variant="outline-light" href="/cremonese/matches">
                Partite
              </Button>
              <Button variant="outline-light" href="/cremonese/contact">
                Contatti
              </Button>
            </>
          ) : isNapoliPage ? (
            <>
              <Button variant="outline-light" href="/home">
                Home
              </Button>
              <Button variant="outline-light" href="/cremonese/matches">
                Partite
              </Button>
              <Button variant="outline-light" href="/cremonese/contact">
                Contatti
              </Button>
            </>
          ) : isParmaPage ? (
            <>
              <Button variant="outline-light" href="/home">
                Home
              </Button>
              <Button variant="outline-light" href="/cremonese/matches">
                Partite
              </Button>
              <Button variant="outline-light" href="/cremonese/contact">
                Contatti
              </Button>
            </>
          ) : isPisaPage ? (
            <>
              <Button variant="outline-light" href="/home">
                Home
              </Button>
              <Button variant="outline-light" href="/cremonese/matches">
                Partite
              </Button>
              <Button variant="outline-light" href="/cremonese/contact">
                Contatti
              </Button>
            </>
          ) : isRomaPage ? (
            <>
              <Button variant="outline-light" href="/home">
                Home
              </Button>
              <Button variant="outline-light" href="/cremonese/matches">
                Partite
              </Button>
              <Button variant="outline-light" href="/cremonese/contact">
                Contatti
              </Button>
            </>
          ) : isSassuoloPage ? (
            <>
              <Button variant="outline-light" href="/home">
                Home
              </Button>
              <Button variant="outline-light" href="/cremonese/matches">
                Partite
              </Button>
              <Button variant="outline-light" href="/cremonese/contact">
                Contatti
              </Button>
            </>
          ) : isTorinoPage ? (
            <>
              <Button variant="outline-light" href="/home">
                Home
              </Button>
              <Button variant="outline-light" href="/cremonese/matches">
                Partite
              </Button>
              <Button variant="outline-light" href="/cremonese/contact">
                Contatti
              </Button>
            </>
          ) : isUdinesePage ? (
            <>
              <Button variant="outline-light" href="/home">
                Home
              </Button>
              <Button variant="outline-light" href="/cremonese/matches">
                Partite
              </Button>
              <Button variant="outline-light" href="/cremonese/contact">
                Contatti
              </Button>
            </>
          ) : isVeronaPage ? (
            <>
              <Button variant="outline-light" href="/home">
                Home
              </Button>
              <Button variant="outline-light" href="/cremonese/matches">
                Partite
              </Button>
              <Button variant="outline-light" href="/cremonese/contact">
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
