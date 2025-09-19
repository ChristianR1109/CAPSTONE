// import { Table, Badge, Container, Row, Col } from "react-bootstrap";

// const standings = [
//   { pos: 1, team: "Napoli", p: 3, w: 3, d: 0, l: 0, diff: "+5", goals: "6:1", last5: ["W", "W", "W"], pts: 9 },
//   { pos: 2, team: "Juventus", p: 3, w: 3, d: 0, l: 0, diff: "+4", goals: "7:3", last5: ["W", "W", "W"], pts: 9 },
//   { pos: 3, team: "Cremonese", p: 3, w: 2, d: 1, l: 0, diff: "+2", goals: "5:3", last5: ["W", "W", "D"], pts: 7 },
//   { pos: 4, team: "Udinese", p: 3, w: 2, d: 1, l: 0, diff: "+2", goals: "4:2", last5: ["D", "W", "W"], pts: 7 },
//   { pos: 5, team: "Milan", p: 3, w: 2, d: 0, l: 1, diff: "+2", goals: "4:2", last5: ["L", "W", "W"], pts: 6 },
//   { pos: 6, team: "Roma", p: 3, w: 2, d: 0, l: 1, diff: "+1", goals: "2:1", last5: ["W", "W", "L"], pts: 6 },
//   { pos: 7, team: "Atalanta", p: 3, w: 1, d: 2, l: 0, diff: "+3", goals: "6:3", last5: ["D", "D", "W"], pts: 5 },
//   { pos: 8, team: "Como", p: 3, w: 1, d: 1, l: 1, diff: "+1", goals: "3:2", last5: ["W", "L", "D"], pts: 4 },
//   { pos: 9, team: "Cagliari", p: 3, w: 1, d: 1, l: 1, diff: "+1", goals: "3:2", last5: ["L", "D", "W"], pts: 4 },
//   { pos: 10, team: "Torino", p: 3, w: 1, d: 1, l: 1, diff: "-4", goals: "1:5", last5: ["L", "D", "W"], pts: 4 },
//   { pos: 11, team: "Inter", p: 3, w: 1, d: 0, l: 2, diff: "+3", goals: "9:6", last5: ["W", "L", "L"], pts: 3 },
//   { pos: 12, team: "Lazio", p: 3, w: 1, d: 0, l: 2, diff: "+1", goals: "4:3", last5: ["L", "W", "L"], pts: 3 },
//   { pos: 13, team: "Bologna", p: 3, w: 1, d: 0, l: 2, diff: "-1", goals: "1:2", last5: ["L", "W", "L"], pts: 3 },
//   { pos: 14, team: "Sassuolo", p: 3, w: 1, d: 0, l: 2, diff: "-2", goals: "3:5", last5: ["L", "L", "W"], pts: 3 },
//   { pos: 15, team: "Genoa", p: 3, w: 0, d: 2, l: 1, diff: "-1", goals: "1:2", last5: ["D", "L", "D"], pts: 2 },
//   { pos: 16, team: "Fiorentina", p: 3, w: 0, d: 2, l: 1, diff: "-2", goals: "2:4", last5: ["D", "D", "L"], pts: 2 },
//   { pos: 17, team: "Verona", p: 3, w: 0, d: 2, l: 1, diff: "-4", goals: "1:5", last5: ["D", "L", "D"], pts: 2 },
//   { pos: 18, team: "Pisa", p: 3, w: 0, d: 1, l: 2, diff: "-2", goals: "1:3", last5: ["L", "L", "D"], pts: 1 },
//   { pos: 19, team: "Parma", p: 3, w: 0, d: 1, l: 2, diff: "-4", goals: "1:5", last5: ["L", "L", "D"], pts: 1 },
//   { pos: 20, team: "Lecce", p: 3, w: 0, d: 1, l: 2, diff: "-5", goals: "1:6", last5: ["D", "L", "L"], pts: 1 },
// ];
// const matches = [
//   { date: "2025/09/25", time: "20:45", home: "Lecce", away: "Cagliari" },
//   { date: "2025/09/25", time: "15:00", home: "Bologna", away: "Genoa" },
//   { date: "2025/09/25", time: "18:00", home: "Verona", away: "Juventus" },
//   { date: "2025/09/25", time: "20:45", home: "Udinese", away: "Milan" },
//   { date: "2025/09/21", time: "12:30", home: "Lazio", away: "Roma" },
//   { date: "2025/09/25", time: "15:00", home: "Cremonese", away: "Parma" },
//   { date: "2025/09/25", time: "15:00", home: "Torino", away: "Atalanta" },
//   { date: "2025/09/25", time: "18:00", home: "Fiorentina", away: "Como" },
//   { date: "2025/09/25", time: "20:45", home: "Inter", away: "Sassuolo" },
//   { date: "2025/09/25", time: "20:45", home: "Napoli", away: "Pisa" },
// ];

// const getBadgeVariant = (result) => {
//   switch (result) {
//     case "W":
//       return "success";
//     case "L":
//       return "danger";
//     case "D":
//       return "secondary";
//     default:
//       return "light";
//   }
// };

// const LeagueTable = () => {
//   return (
//     <Container className="mx-5 my-3">
//       <Row>
//         <Col lg={8}>
//           <Table className="rounded" striped bordered hover variant="dark" responsive>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Team</th>
//                 <th>P</th>
//                 <th>W</th>
//                 <th>D</th>
//                 <th>L</th>
//                 <th>DIFF</th>
//                 <th>Goals</th>
//                 <th>Last 5</th>
//                 <th>PTS</th>
//               </tr>
//             </thead>
//             <tbody>
//               {standings.map((team) => (
//                 <tr key={team.pos}>
//                   <td>{team.pos}</td>
//                   <td>{team.team}</td>
//                   <td>{team.p}</td>
//                   <td>{team.w}</td>
//                   <td>{team.d}</td>
//                   <td>{team.l}</td>
//                   <td>{team.diff}</td>
//                   <td>{team.goals}</td>
//                   <td>
//                     {team.last5.map((res, i) => (
//                       <Badge key={i} bg={getBadgeVariant(res)} className="me-1 px-2 py-1">
//                         {res}
//                       </Badge>
//                     ))}
//                   </td>
//                   <td>{team.pts}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Col>
//         <Col lg={4}>
//           <Table striped bordered hover variant="dark" responsive className="rounded text-center">
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Time</th>
//                 <th>Home</th>
//                 <th>Away</th>
//               </tr>
//             </thead>
//             <tbody>
//               {matches.map((match, idx) => (
//                 <tr key={idx}>
//                   <td>{match.date}</td>
//                   <td>{match.time}</td>
//                   <td>{match.home}</td>
//                   <td>{match.away}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default LeagueTable;

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
                standings.map((team) => (
                  <tr key={team.pos}>
                    <td>{team.pos}</td>
                    <td>{team.team}</td>
                    <td>{team.p}</td>
                    <td>{team.w}</td>
                    <td>{team.d}</td>
                    <td>{team.l}</td>
                    <td>{team.diff}</td>
                    <td>{team.goals}</td>
                    <td>
                      {Array.isArray(team.last5) ? (
                        team.last5.map((res, i) => (
                          <Badge key={i} bg={getBadgeVariant(res)} className="me-1 px-2 py-1">
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
              <tr>
                <th>Date</th>
                {/* <th>Time</th> */}
                <th>Home</th>
                <th>Away</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(matches) && matches.length > 0 ? (
                matches.map((match, idx) => {
                  const teams = match.matchTitle.split(" vs ");
                  const team1 = teams[0] || "";
                  const team2 = teams[1] || "";
                  return (
                    <tr key={idx}>
                      <td>{match.date}</td>
                      {/* <td>{match.time}</td> */}
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
