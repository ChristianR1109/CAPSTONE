import React, { useEffect, useState } from "react";
import { Container, Table, Card, Alert, Spinner, Button, Form } from "react-bootstrap";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Stati per modifica inline
  const [editingMatchId, setEditingMatchId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    homeTeam: "",
    awayTeam: "",
    matchDate: "",
  });

  // Stati per aggiungere nuovo match
  const [newMatch, setNewMatch] = useState({
    homeTeam: "",
    awayTeam: "",
    matchDate: "",
  });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await fetch("http://localhost:1313/public/matches");
      if (!res.ok) throw new Error("Errore nel recupero delle partite");
      const data = await res.json();
      setMatches(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Elimina partita
  const handleDelete = async (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questa partita?")) return;

    try {
      const res = await fetch(`http://localhost:1313/public/matches/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Errore durante l'eliminazione");
      setMatches((prev) => prev.filter((match) => match.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // Attiva modalità modifica
  const handleEdit = (match) => {
    setEditingMatchId(match.id);
    setEditFormData({
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      matchDate: match.matchDate.substring(0, 16), // per input datetime-local
    });
  };

  // Salva modifica
  const handleSave = async (id) => {
    try {
      const res = await fetch(`http://localhost:1313/public/matches/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          homeTeam: editFormData.homeTeam,
          awayTeam: editFormData.awayTeam,
          matchDate: new Date(editFormData.matchDate).toISOString(),
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

  // Gestisci inserimento nuovo match (submit)
  const handleAddMatch = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:1313/public/matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          homeTeam: newMatch.homeTeam,
          awayTeam: newMatch.awayTeam,
          matchDate: new Date(newMatch.matchDate).toISOString(),
        }),
      });
      if (!res.ok) throw new Error("Errore durante l'aggiunta");
      const created = await res.json();
      setMatches((prev) => [...prev, created]);
      setNewMatch({ homeTeam: "", awayTeam: "", matchDate: "" });
      setAdding(false);
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
                  <th>Squadra Casa</th>
                  <th>Squadra Ospite</th>
                  <th>Data partita</th>
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
                            type="text"
                            value={editFormData.homeTeam}
                            onChange={(e) => setEditFormData((prev) => ({ ...prev, homeTeam: e.target.value }))}
                          />
                        ) : (
                          match.homeTeam
                        )}
                      </td>
                      <td>
                        {editingMatchId === match.id ? (
                          <Form.Control
                            type="text"
                            value={editFormData.awayTeam}
                            onChange={(e) => setEditFormData((prev) => ({ ...prev, awayTeam: e.target.value }))}
                          />
                        ) : (
                          match.awayTeam
                        )}
                      </td>
                      <td>
                        {editingMatchId === match.id ? (
                          <Form.Control
                            type="datetime-local"
                            value={editFormData.matchDate}
                            onChange={(e) => setEditFormData((prev) => ({ ...prev, matchDate: e.target.value }))}
                          />
                        ) : (
                          new Date(match.matchDate).toLocaleString()
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
                    <td colSpan={5} className="text-center">
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
                        value={newMatch.homeTeam}
                        onChange={(e) => setNewMatch((prev) => ({ ...prev, homeTeam: e.target.value }))}
                        placeholder="Squadra Casa"
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        value={newMatch.awayTeam}
                        onChange={(e) => setNewMatch((prev) => ({ ...prev, awayTeam: e.target.value }))}
                        placeholder="Squadra Ospite"
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="datetime-local"
                        value={newMatch.matchDate}
                        onChange={(e) => setNewMatch((prev) => ({ ...prev, matchDate: e.target.value }))}
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
