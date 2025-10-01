import React, { useEffect, useState } from "react";
import { Table, Badge, Container, Row, Col, Spinner, Alert, Carousel } from "react-bootstrap";

import AuthContext from "../auth/AuthContext";
import Image from "../../public/Easytickets.png";

const getBadgeVariant = (result) => {
  switch (result) {
    case "W":
      return "success";
    case "L":
      return "danger";
    case "D":
      return "secondary";
    default:
      return "light";
  }
};

const LeagueTable = () => {
  const [standings, setStandings] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const itemsPerSlide = 10;
  const totalSlides = Math.ceil(matches.length / itemsPerSlide);

  useEffect(() => {
    const fetchStandings = fetch("http://localhost:1313/public/standings")
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel caricamento della classifica");
        return res.json(); // <--- qui converti in JSON
      })
      .then((data) => {
        console.log("Standings fetched:", data); // qui avrai l’array corretto
        setStandings(data);
      });
    // Fetch matches
    const fetchMatches = fetch("http://localhost:1313/public/matches")
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel caricamento degli incontri");
        return res.json();
      })
      .then((data) => {
        // console.log("Matches fetched:", data);
        setMatches(data.content || data || []);
      });

    Promise.all([fetchStandings, fetchMatches])
      .then(() => setLoading(false))
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    const query = new URLSearchParams(window.location.search);
    const tokenParam = query.get("token");
    if (tokenParam) {
      setShowConfirmation(true);
    }
  }, []);

  if (loading) {
    return (
      <Container className="mx-5 my-3 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Caricamento dati...</p>
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

  return (
    <Container fluid className="page-container">
      <div>
        {showConfirmation && (
          <div className="confirmation-popup text-white d-flex justify-content-center text-center border border-2 rounded card-box-shadoww mt-2 pb-2">
            <div>
              <h2>Acquisto completato con successo!</h2>
              <button
                className="rounded"
                onClick={() => {
                  setShowConfirmation(false);
                  const url = new URL(window.location);
                  url.searchParams.delete("token");
                  window.history.replaceState({}, document.title, url.toString());
                }}
              >
                Chiudi
              </button>
            </div>
          </div>
        )}{" "}
        <h1 className="text-center team-title m-0 text-white pt-4">
          EASYTICKETS <img src={Image} style={{ width: 80, marginBottom: 5 }} className="img-border"></img>
        </h1>
        <h5 className="text-center phrase m-0 p-0 text-white">Biglietti facili, emozioni vere.</h5>
        <Container fluid className="my-4 d-flex justify-content-center mx-auto p-0">
          <Row className="w-100">
            <Col lg={8} className="p-0">
              <Table striped bordered hover variant="dark" responsive>
                <thead>
                  <tr>
                    <th className="table-rnd-l">#</th>
                    <th>Team</th>
                    <th>P</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>DIFF</th>
                    <th>Goals</th>
                    <th>Last 5</th>
                    <th className="table-rnd-r">PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(standings) && standings.length > 0 ? (
                    [...standings]
                      .sort((a, b) => {
                        const pointsA = a.won * 3 + a.drawn;
                        const pointsB = b.won * 3 + b.drawn;

                        if (pointsB === pointsA) {
                          const diffA = a.goalsFor - a.goalsAgainst;
                          const diffB = b.goalsFor - b.goalsAgainst;

                          if (diffB === diffA) {
                            return b.goalsFor - a.goalsFor;
                          }
                          return diffB - diffA;
                        }
                        return pointsB - pointsA;
                      })

                      .map((team, c) => (
                        <tr key={team.team.name}>
                          <td>{c + 1}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={team.team.logo} // adatta il path corretto al logo
                                alt={team.team.name + " logo"}
                                style={{ width: "30px", height: "30px", objectFit: "contain", marginRight: "10px" }}
                              />
                              <span>{team.team.name}</span>
                            </div>
                          </td>
                          <td>{team.won + team.lost + team.drawn}</td>
                          <td>{team.won}</td>
                          <td>{team.drawn}</td>
                          <td>{team.lost}</td>
                          <td>{team.goalsFor - team.goalsAgainst}</td>
                          <td>{team.goalsFor + ":" + team.goalsAgainst}</td>
                          <td>
                            {typeof team.last5 === "string" && team.last5.length > 0 ? (
                              team.last5.split("").map((res, i) => (
                                <Badge key={`${res}-${i}`} bg={getBadgeVariant(res)} className="me-1 px-2 py-1">
                                  {res}
                                </Badge>
                              ))
                            ) : (
                              <span>-</span>
                            )}
                          </td>
                          <td>{team.won * 3 + team.drawn}</td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center">
                        No standings available
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
            <Col lg={4} className="pe-0">
              <Carousel prevIcon={<span className="minimal-arrow">{"<"}</span>} nextIcon={<span className="minimal-arrow">{">"}</span>} interval={null}>
                {[...Array(totalSlides)].map((_, idx) => {
                  const slideMatches = matches.slice(idx * itemsPerSlide, idx * itemsPerSlide + itemsPerSlide);
                  return (
                    <Carousel.Item key={idx}>
                      <Table striped bordered hover variant="dark" responsive className="text-center mb-0">
                        <thead>
                          <tr>
                            <th colSpan={3} className="text-center table-rnd-l table-rnd-r">
                              Giornata {idx + 6}
                            </th>
                          </tr>
                          <tr>
                            <th>Date</th>
                            <th>Home</th>
                            <th>Away</th>
                          </tr>
                        </thead>
                        <tbody>
                          {slideMatches.map((match, i) => {
                            const [home, away] = match.matchTitle.split(" vs ");
                            return (
                              <tr key={i}>
                                <td>{match.date}</td>
                                <td>{home}</td>
                                <td>{away}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </Col>
          </Row>
        </Container>{" "}
      </div>
    </Container>
  );
};

export default LeagueTable;
