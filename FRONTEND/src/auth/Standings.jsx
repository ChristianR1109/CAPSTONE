import React, { useEffect, useState } from "react";
import { Container, Table, Card, Alert, Spinner, Button, Form } from "react-bootstrap";

const Standings = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    teamName: "",
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    points: 0,
  });

  const [newStanding, setNewStanding] = useState({
    teamName: "",
    played: "",
    won: "",
    drawn: "",
    lost: "",
    points: "",
  });

  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchStandings();
  }, []);

  const fetchStandings = async () => {
    try {
      const res = await fetch("http://localhost:1313/public/standings");
      if (!res.ok) throw new Error("Errore nel recupero delle classifiche");
      const data = await res.json();
      console.log("WEWE", data);
      setStandings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questa classifica?")) return;

    try {
      const res = await fetch(`http://localhost:1313/public/standings/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Errore durante l'eliminazione");
      setStandings((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (standing) => {
    setEditingId(standing.id);
    setEditFormData({
      teamName: standing.teamName,
      played: standing.played,
      won: standing.won,
      drawn: standing.drawn,
      lost: standing.lost,
      points: standing.points,
    });
  };

  const handleSave = async (id) => {
    try {
      const res = await fetch(`http://localhost:1313/public/standings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamName: editFormData.teamName,
          played: Number(editFormData.played),
          won: Number(editFormData.won),
          drawn: Number(editFormData.drawn),
          lost: Number(editFormData.lost),
          points: Number(editFormData.points),
        }),
      });
      if (!res.ok) throw new Error("Errore durante il salvataggio");
      const updated = await res.json();
      setStandings((prev) => prev.map((s) => (s.id === id ? updated : s)));
      setEditingId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:1313/public/standings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamName: newStanding.teamName,
          played: Number(newStanding.played),
          won: Number(newStanding.won),
          drawn: Number(newStanding.drawn),
          lost: Number(newStanding.lost),
          points: Number(newStanding.points),
        }),
      });
      if (!res.ok) throw new Error("Errore durante l'aggiunta");
      const created = await res.json();
      setStandings((prev) => [...prev, created]);
      setNewStanding({
        teamName: "",
        played: "",
        won: "",
        drawn: "",
        lost: "",
        points: "",
      });
      setAdding(false);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container>
      <h2 className="my-4">Gestione Classifiche</h2>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Card>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Squadra</th>
                  <th>Giocate</th>
                  <th>Vinte</th>
                  <th>Pareggiate</th>
                  <th>Perse</th>
                  <th>Punti</th>
                  <th>Azioni</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(standings) && standings.length > 0 ? (
                  standings.map((s, idx) => (
                    <tr key={s.id}>
                      <td>{idx + 1}</td>
                      <td>
                        {editingId === s.id ? (
                          <Form.Control
                            type="text"
                            value={editFormData.teamName}
                            onChange={(e) => setEditFormData((prev) => ({ ...prev, teamName: e.target.value }))}
                          />
                        ) : (
                          s.team.name
                        )}
                      </td>
                      <td>
                        {editingId === s.id ? (
                          <Form.Control
                            type="number"
                            min="0"
                            value={editFormData.played}
                            onChange={(e) => setEditFormData((prev) => ({ ...prev, played: e.target.value }))}
                          />
                        ) : (
                          s.won + s.lost + s.drawn
                        )}
                      </td>
                      <td>
                        {editingId === s.id ? (
                          <Form.Control
                            type="number"
                            min="0"
                            value={editFormData.won}
                            onChange={(e) => setEditFormData((prev) => ({ ...prev, won: e.target.value }))}
                          />
                        ) : (
                          s.won
                        )}
                      </td>
                      <td>
                        {editingId === s.id ? (
                          <Form.Control
                            type="number"
                            min="0"
                            value={editFormData.drawn}
                            onChange={(e) => setEditFormData((prev) => ({ ...prev, drawn: e.target.value }))}
                          />
                        ) : (
                          s.drawn
                        )}
                      </td>
                      <td>
                        {editingId === s.id ? (
                          <Form.Control
                            type="number"
                            min="0"
                            value={editFormData.lost}
                            onChange={(e) => setEditFormData((prev) => ({ ...prev, lost: e.target.value }))}
                          />
                        ) : (
                          s.lost
                        )}
                      </td>
                      <td>
                        {editingId === s.id ? (
                          <Form.Control
                            type="number"
                            min="0"
                            value={editFormData.points}
                            onChange={(e) => setEditFormData((prev) => ({ ...prev, points: e.target.value }))}
                          />
                        ) : (
                          s.won * 3 + s.drawn
                        )}
                      </td>
                      <td>
                        {editingId === s.id ? (
                          <>
                            <Button variant="success" size="sm" className="me-2" onClick={() => handleSave(s.id)}>
                              Salva
                            </Button>
                            <Button variant="secondary" size="sm" onClick={() => setEditingId(null)}>
                              Annulla
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(s)}>
                              Modifica
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(s.id)}>
                              Elimina
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center">
                      Nessuna classifica trovata.
                    </td>
                  </tr>
                )}

                {adding && (
                  <tr>
                    <td>Nuovo</td>
                    <td>
                      <Form.Control
                        type="text"
                        value={newStanding.teamName}
                        onChange={(e) => setNewStanding((prev) => ({ ...prev, teamName: e.target.value }))}
                        placeholder="Squadra"
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        min="0"
                        value={newStanding.played}
                        onChange={(e) => setNewStanding((prev) => ({ ...prev, played: e.target.value }))}
                        placeholder="Giocate"
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        min="0"
                        value={newStanding.won}
                        onChange={(e) => setNewStanding((prev) => ({ ...prev, won: e.target.value }))}
                        placeholder="Vinte"
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        min="0"
                        value={newStanding.drawn}
                        onChange={(e) => setNewStanding((prev) => ({ ...prev, drawn: e.target.value }))}
                        placeholder="Pareggiate"
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        min="0"
                        value={newStanding.lost}
                        onChange={(e) => setNewStanding((prev) => ({ ...prev, lost: e.target.value }))}
                        placeholder="Perse"
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        min="0"
                        value={newStanding.points}
                        onChange={(e) => setNewStanding((prev) => ({ ...prev, points: e.target.value }))}
                        placeholder="Punti"
                      />
                    </td>
                    <td>
                      <Button variant="success" size="sm" className="me-2" onClick={handleAdd}>
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
                Aggiungi Classifica
              </Button>
            )}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Standings;
