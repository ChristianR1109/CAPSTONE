import React, { useEffect, useState } from "react";
import { Container, Table, Card, Alert, Spinner, Button, Form } from "react-bootstrap";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Stati per modifica inline
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    username: "",
    email: "",
    role: "",
  });

  // Stati per aggiungere nuovo utente
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "",
  });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:1313/public/users");
      if (!res.ok) throw new Error("Errore nel recupero degli utenti");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo utente?")) return;

    try {
      const res = await fetch(`http://localhost:1313/public/users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Errore durante l'eliminazione");
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setEditFormData({
      username: user.username,
      email: user.email,
      role: user.role,
    });
  };

  const handleSave = async (id) => {
    try {
      const res = await fetch(`http://localhost:1313/public/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: editFormData.username,
          email: editFormData.email,
          role: editFormData.role,
        }),
      });
      if (!res.ok) throw new Error("Errore durante il salvataggio");
      const updatedUser = await res.json();
      setUsers((prev) => prev.map((user) => (user.id === id ? updatedUser : user)));
      setEditingUserId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:1313/public/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
          password: newUser.password,
          name: newUser.name,
          surname: newUser.surname,
        }),
      });
      if (!res.ok) throw new Error("Errore durante l'aggiunta");
      const created = await res.json();
      setUsers((prev) => [...prev, created]);
      setNewUser({ username: "", email: "", role: "" });
      setAdding(false);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container>
      <h2 className="my-4">Gestione Utenti</h2>

      {loading && <Spinner animation="border" />}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Card>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Ruolo</th>
                  <th>Azioni</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(users) && users.length > 0 ? (
                  users.map((user, idx) => (
                    <tr key={user.id}>
                      <td>{idx + 1}</td>
                      <td>
                        {editingUserId === user.id ? (
                          <Form.Control
                            type="text"
                            value={editFormData.username}
                            onChange={(e) => setEditFormData((prev) => ({ ...prev, username: e.target.value }))}
                          />
                        ) : (
                          user.username
                        )}
                      </td>
                      <td>
                        {editingUserId === user.id ? (
                          <Form.Control
                            type="email"
                            value={editFormData.email}
                            onChange={(e) => setEditFormData((prev) => ({ ...prev, email: e.target.value }))}
                          />
                        ) : (
                          user.email
                        )}
                      </td>
                      <td>
                        {editingUserId === user.id ? (
                          <Form.Control
                            type="text"
                            value={editFormData.role}
                            onChange={(e) => setEditFormData((prev) => ({ ...prev, role: e.target.value }))}
                          />
                        ) : (
                          user.role
                        )}
                      </td>
                      <td>
                        {editingUserId === user.id ? (
                          <>
                            <Button variant="success" size="sm" className="me-2" onClick={() => handleSave(user.id)}>
                              Salva
                            </Button>
                            <Button variant="secondary" size="sm" onClick={() => setEditingUserId(null)}>
                              Annulla
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(user)}>
                              Modifica
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>
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
                      Nessun utente trovato.
                    </td>
                  </tr>
                )}
                {adding && (
                  <>
                    <tr>
                      <td>Nuovo</td>
                      <td>
                        <Form.Control
                          type="text"
                          value={newUser.username}
                          onChange={(e) => setNewUser((prev) => ({ ...prev, username: e.target.value }))}
                          placeholder="Username"
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
                          placeholder="Email"
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="text"
                          value={newUser.role}
                          onChange={(e) => setNewUser((prev) => ({ ...prev, role: e.target.value }))}
                          placeholder="Ruolo"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <Form.Control
                          type="password"
                          value={newUser.password}
                          onChange={(e) => setNewUser((prev) => ({ ...prev, password: e.target.value }))}
                          placeholder="Password"
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="text"
                          value={newUser.name}
                          onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
                          placeholder="Name"
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="text"
                          value={newUser.surname}
                          onChange={(e) => setNewUser((prev) => ({ ...prev, surname: e.target.value }))}
                          placeholder="Surname"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td colSpan={3}>
                        <Button variant="success" size="sm" className="me-2 mt-3" onClick={handleAddUser}>
                          Aggiungi
                        </Button>
                        <Button variant="secondary" size="sm" className="mt-3" onClick={() => setAdding(false)}>
                          Annulla
                        </Button>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </Table>

            {!adding && (
              <Button variant="primary" onClick={() => setAdding(true)}>
                Aggiungi Utente
              </Button>
            )}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Users;
