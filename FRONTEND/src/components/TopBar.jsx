import React, { useEffect, useState } from "react";
import { Container, Navbar, Row, Col, Spinner, Alert, Button, Dropdown, DropdownButton } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Image from "../../public/Easytickets.png";
import useAuth from "../auth/useAuth";

const TopBar = () => {
  const { user, logout } = useAuth();
  const isAuthenticated = !!user;
  const location = useLocation();
  const navigate = useNavigate();

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

  // Fetch squadre
  useEffect(() => {
    fetch("http://localhost:1313/public/teams?size=20")
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel caricamento delle squadre");
        return res.json();
      })
      .then((data) => {
        const sortedTeams = (data.content || []).sort((a, b) => a.name.localeCompare(b.name));
        setTeams(sortedTeams);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Container className="mx-5 my-3 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Caricamento squadre...</p>
      </Container>
    );

  if (error)
    return (
      <Container className="mx-5 my-3">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  const currentTeam = (() => {
    const pathTeam = location.pathname.split("/")[1];
    const foundTeam = teams.find((t) => t.name.toLowerCase() === pathTeam?.toLowerCase());
    return foundTeam?.name || null;
  })();

  const numColumns = Math.ceil((teams?.length || 0) / 5);

  return (
    <Navbar expand="lg" className="sticky-top nav-bg mt-0" variant="dark">
      <Container fluid className="page-container mx-auto d-flex justify-content-between align-items-start">
        {/* Brand + Dropdown */}
        <div className="d-flex flex-column">
          <Navbar.Brand className="d-flex align-items-center text-white mb-0 p-0">
            {currentTeam ? (
              <>
                <span style={{ fontWeight: "bold", marginRight: 10 }}>{currentTeam} Tickets</span>
                <img src={teamLogos[currentTeam]} alt={currentTeam} style={{ width: 30, height: 30, objectFit: "contain" }} />
              </>
            ) : (
              "EASYTICKETS"
            )}
            <img src={Image} alt="Easytickets" style={{ width: 50, marginLeft: 10 }} />
          </Navbar.Brand>

          {/* Messaggio per utenti non loggati */}
          {!isAuthenticated && (
            <div>
              <h6 className="text-white mb-0 brand-subtitle">Accedi per acquistare i biglietti!</h6>
            </div>
          )}

          {/* Dropdown biglietti per utenti loggati */}
          {isAuthenticated && (
            <DropdownButton
              id="dropdown-item-button"
              title={<span style={{ color: "white", cursor: "pointer" }}>Acquista biglietti</span>}
              variant="dark"
              className="p-0 m-0"
            >
              <Dropdown.Item as="div" className="bg-dark text-white my-dark-dropdown p-2" style={{ minWidth: "550px", width: "100%" }}>
                <Row>
                  {[...Array(numColumns)].map((_, colIndex) => (
                    <Col key={colIndex} xs={3}>
                      {teams.slice(colIndex * 5, colIndex * 5 + 5).map((team, idx) => (
                        <a href={`/${team.name.toLowerCase()}`} className="text-decoration-none" key={idx}>
                          <div className="nav-div mb-3 d-flex justify-content-between align-items-center">
                            <h6>{team.name}</h6>
                            <img
                              src={team.logo || team.img}
                              alt={team.name}
                              style={{
                                width: "30%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                            />
                          </div>
                        </a>
                      ))}
                    </Col>
                  ))}
                </Row>
              </Dropdown.Item>
            </DropdownButton>
          )}
        </div>

        {/* Bottoni login/register o logout */}
        <div className="d-flex gap-2 align-self-start">
          {!isAuthenticated ? (
            <>
              <Button variant="outline-light mt-2" onClick={() => navigate("/home")}>
                Home
              </Button>
              <Button variant="outline-light mt-2" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button variant="outline-light mt-2" onClick={() => navigate("/register")}>
                Registrazione
              </Button>
            </>
          ) : user.role === "ADMIN" ? (
            <>
              <Button variant="outline-light mt-2" onClick={() => navigate("/backoffice")}>
                Backoffice
              </Button>
              <Button variant="outline-light mt-2" onClick={() => navigate("/home")}>
                Home
              </Button>
              <Button variant="outline-light mt-2" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            // USER loggato
            <>
              <Button variant="outline-light mt-2" onClick={() => navigate("/home")}>
                Home
              </Button>
              <Button variant="outline-light mt-2" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default TopBar;
