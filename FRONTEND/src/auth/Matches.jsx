import React, { useEffect, useState } from "react";
import { Container, Table, Card, Alert, Spinner, Button, Form } from "react-bootstrap";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Stati per modifica inline
  const [editingMatchId, setEditingMatchId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    matchTitle: "",
    date: "",
    location: "",
    team1: "",
    team2: "",
  });

  // Stati per aggiungere nuovo match
  const [newMatch, setNewMatch] = useState({
    matchTitle: "",
    date: "",
    location: "",
    team1: "",
    team2: "",
  });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchTeams();
    fetchMatches();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await fetch("http://localhost:1313/public/teams");
      if (!res.ok) throw new Error("Errore nel recupero dei team");
      const data = await res.json();
      // se ritorna Page<Team>, prendiamo solo content
      setTeams(Array.isArray(data.content) ? data.content : []);
    } catch (err) {
      console.error("Errore nel caricamento dei team", err);
      setTeams([]);
    }
  };

  const fetchMatches = async () => {
    try {
      const res = await fetch("http://localhost:1313/public/matches");
      if (!res.ok) throw new Error("Errore nel recupero delle partite");
      const data = await res.json();
      setMatches(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isValidDate = (dateStr) => {
    if (!dateStr) return false;
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateStr);
  };

  const formatDate = (dateStr) => {
    if (!isValidDate(dateStr)) return "Data non valida";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questa partita?")) return;
    try {
      const res = await fetch(`http://localhost:1313/public/matches/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Errore durante l'eliminazione");
      setMatches((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (match) => {
    setEditingMatchId(match.id);
    setEditFormData({
      matchTitle: match.matchTitle,
      date: match.date ? match.date.substring(0, 10) : "",
      location: match.location || "",
      team1: match.team1 || "",
      team2: match.team2 || "",
    });
    console.log(match.id);
  };

  const handleSave = async (id) => {
    try {
      const res = await fetch(`http://localhost:1313/public/matches/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matchTitle: editFormData.matchTitle,
          date: isValidDate(editFormData.date) ? editFormData.date : null,
          location: editFormData.location,
          team1: editFormData.team1,
          team2: editFormData.team2,
        }),
      });
      if (!res.ok) throw new Error("Errore durante il salvataggio");
      const updatedMatch = await res.json();
      setMatches((prev) => prev.map((m) => (m.id === id ? updatedMatch : m)));
      setEditingMatchId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddMatch = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:1313/public/matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matchTitle: newMatch.matchTitle,
          date: isValidDate(newMatch.date) ? newMatch.date : null,
          location: newMatch.location,
          team1: newMatch.team1,
          team2: newMatch.team2,
        }),
      });
      if (!res.ok) throw new Error("Errore durante l'aggiunta");
      const created = await res.json();
      setMatches((prev) => [...prev, created]);
      setNewMatch({ matchTitle: "", date: "", location: "", team1: "", team2: "" });
      setAdding(false);
      await fetchMatches();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container>
      <h2 className="my-4">Gestione Partite</h2>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && (
        <Card>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Match</th>
                  <th>Data</th>
                  <th>Location</th>

                  <th>Azioni</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(matches) && matches.length > 0 ? (
                  matches.map((match, idx) => (
                    <tr key={match.id}>
                      <td>{idx + 1}</td>
                      <td>
                        {editingMatchId === match.id ? (
                          <Form.Control
                            required
                            type="text"
                            value={editFormData.matchTitle}
                            onChange={(e) => setEditFormData((prev) => ({ ...prev, matchTitle: e.target.value }))}
                          />
                        ) : (
                          match.matchTitle
                        )}
                      </td>
                      <td>
                        {editingMatchId === match.id ? (
                          <Form.Control
                            required
                            type="date"
                            value={editFormData.date}
                            onChange={(e) => setEditFormData((prev) => ({ ...prev, date: e.target.value }))}
                          />
                        ) : (
                          formatDate(match.date)
                        )}
                      </td>
                      <td>
                        {editingMatchId === match.id ? (
                          <Form.Control
                            required
                            type="text"
                            value={editFormData.location}
                            onChange={(e) => setEditFormData((prev) => ({ ...prev, location: e.target.value }))}
                          />
                        ) : (
                          match.location
                        )}
                      </td>

                      <td>
                        {editingMatchId === match.id ? (
                          <>
                            <Button variant="success" size="sm" className="me-2" onClick={() => handleSave(match.id)}>
                              Salva
                            </Button>
                            <Button variant="secondary" size="sm" onClick={() => setEditingMatchId(null)}>
                              Annulla
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(match)}>
                              Modifica
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(match.id)}>
                              Elimina
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center">
                      Nessun match trovato.
                    </td>
                  </tr>
                )}

                {adding && (
                  <tr>
                    <td>Nuovo</td>
                    <td>
                      <Form.Control
                        type="text"
                        value={newMatch.matchTitle}
                        onChange={(e) => setNewMatch((prev) => ({ ...prev, matchTitle: e.target.value }))}
                        placeholder="Match (es: Juventus vs Milan)"
                      />
                    </td>
                    <td>
                      <Form.Control type="date" value={newMatch.date} onChange={(e) => setNewMatch((prev) => ({ ...prev, date: e.target.value }))} />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        value={newMatch.location}
                        onChange={(e) => setNewMatch((prev) => ({ ...prev, location: e.target.value }))}
                        placeholder="Location"
                      />
                    </td>

                    <td>
                      <Button variant="success" size="sm" className="me-2" onClick={handleAddMatch}>
                        Aggiungi
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => setAdding(false)}>
                        Annulla
                      </Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            {!adding && (
              <Button variant="primary" onClick={() => setAdding(true)}>
                Aggiungi Partita
              </Button>
            )}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Matches;
