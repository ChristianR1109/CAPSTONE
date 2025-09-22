import React, { useEffect, useState } from "react";
import { Table, Badge, Container, Row, Col, Spinner, Alert } from "react-bootstrap";

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

  useEffect(() => {
    // Fetch standings
    const fetchStandings = fetch("http://localhost:1313/standings")
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel caricamento della classifica");
        return res.json();
      })
      .then((data) => setStandings(data));

    // Fetch matches
    const fetchMatches = fetch("http://localhost:1313/matches")
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel caricamento degli incontri");
        return res.json();
      })
      .then((data) => {
        console.log("Matches fetched:", data);
        setMatches(data.content || data || []);
      });

    Promise.all([fetchStandings, fetchMatches])
      .then(() => setLoading(false))
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
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
    <Container className="mx-5 my-3">
      <Row>
        <Col lg={8}>
          <Table className="rounded" striped bordered hover variant="dark" responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Team</th>
                <th>P</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>DIFF</th>
                <th>Goals</th>
                <th>Last 5</th>
                <th>PTS</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(standings) && standings.length > 0 ? (
                [...standings]
                  .sort((a, b) => a.pos - b.pos)
                  .map((team) => (
                    <tr key={team.team.name}>
                      <td>{team.pos}</td>
                      <td>{team.team.name}</td>
                      <td>{team.played}</td>
                      <td>{team.won}</td>
                      <td>{team.drawn}</td>
                      <td>{team.lost}</td>
                      <td>{team.diff}</td>
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
                      <td>{team.pts}</td>
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
        <Col lg={4}>
          <Table striped bordered hover variant="dark" responsive className="rounded text-center">
            <thead>
              <tr>PROSSIMA GIORNATA</tr>
            </thead>

            <tbody>
              <tr>
                <th>Date</th>
                <th>Home</th>
                <th>Away</th>
              </tr>
              {Array.isArray(matches) && matches.length > 0 ? (
                [...matches]
                  .sort((a, b) => new Date(a.date) - new Date(b.date)) // Ordina per data crescente
                  .slice(0, 10)
                  .map((match, idx) => {
                    const teams = match.matchTitle.split(" vs ");
                    const team1 = teams[0] || "";
                    const team2 = teams[1] || "";
                    return (
                      <tr key={idx}>
                        <td>{match.date}</td>
                        <td>{team1}</td>
                        <td>{team2}</td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No matches available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default LeagueTable;
