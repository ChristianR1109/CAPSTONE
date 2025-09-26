import React, { useEffect, useState } from "react";
import { Container, Table, Card, Alert, Spinner, Button } from "react-bootstrap";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Stato per gestione modifica inline
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    buyerName: "",
    buyerEmail: "",
    matchName: "",
    tickets: "",
    amount: "",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:1313/public/orders");
        if (!res.ok) {
          throw new Error("Errore nel recupero degli ordini");
        }
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo ordine?")) return;

    try {
      const res = await fetch(`http://localhost:1313/public/orders/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Errore durante l'eliminazione");
      }
      setOrders((prev) => prev.filter((order) => order.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (order) => {
    setEditingOrderId(order.id);
    setEditFormData({
      buyerName: order.buyerName,
      buyerEmail: order.buyerEmail,
      matchName: order.matchName,
      tickets: order.tickets,
      amount: order.amount,
    });
  };

  const handleSave = async (id) => {
    try {
      const response = await fetch(`http://localhost:1313/public/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerName: editFormData.buyerName,
          buyerEmail: editFormData.buyerEmail,
          matchName: editFormData.matchName,
          tickets: Number(editFormData.tickets),
          amount: Number(editFormData.amount),
          createdAt: orders.find((o) => o.id === id).createdAt, // Mantieni la data originale
        }),
      });

      if (!response.ok) {
        throw new Error("Errore durante il salvataggio");
      }

      const updatedOrder = await response.json();

      setOrders((prev) => prev.map((order) => (order.id === id ? updatedOrder : order)));
      setEditingOrderId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="admin-dashboard" style={{ minHeight: "100vh", background: "#f4f4f4", padding: "20px" }}>
      <Container>
        {loading && (
          <div className="text-center">
            <Spinner animation="border" /> Caricamento ordini...
          </div>
        )}

        {error && (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        )}

        {!loading && !error && orders.length === 0 && (
          <Alert variant="info" className="text-center">
            Nessun ordine trovato.
          </Alert>
        )}

        {!loading && orders.length > 0 && (
          <Card className="shadow">
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Partita</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Biglietti</th>
                    <th>Importo</th>
                    <th>Data</th>
                    <th>Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={order.id}>
                      <td>{index + 1}</td>
                      <td>
                        {editingOrderId === order.id ? (
                          <input
                            type="text"
                            value={editFormData.matchName}
                            onChange={(e) => setEditFormData((prev) => ({ ...prev, matchName: e.target.value }))}
                          />
                        ) : (
                          order.matchName
                        )}
                      </td>
                      <td>
                        {editingOrderId === order.id ? (
                          <input
                            type="text"
                            value={editFormData.buyerName}
                            onChange={(e) => setEditFormData((prev) => ({ ...prev, buyerName: e.target.value }))}
                          />
                        ) : (
                          order.buyerName
                        )}
                      </td>
                      <td>
                        {editingOrderId === order.id ? (
                          <input
                            type="email"
                            value={editFormData.buyerEmail}
                            onChange={(e) => setEditFormData((prev) => ({ ...prev, buyerEmail: e.target.value }))}
                          />
                        ) : (
                          order.buyerEmail
                        )}
                      </td>
                      <td>
                        {editingOrderId === order.id ? (
                          <input
                            type="number"
                            min="1"
                            value={editFormData.tickets}
                            onChange={(e) => setEditFormData((prev) => ({ ...prev, tickets: e.target.value }))}
                          />
                        ) : (
                          order.tickets
                        )}
                      </td>
                      <td>
                        {editingOrderId === order.id ? (
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={editFormData.amount}
                            onChange={(e) => setEditFormData((prev) => ({ ...prev, amount: e.target.value }))}
                          />
                        ) : (
                          order.amount + " €"
                        )}
                      </td>
                      <td>{new Date(order.createdAt).toLocaleString()}</td>
                      <td>
                        {editingOrderId === order.id ? (
                          <>
                            <Button variant="success" size="sm" className="me-2" onClick={() => handleSave(order.id)}>
                              Salva
                            </Button>
                            <Button variant="secondary" size="sm" onClick={() => setEditingOrderId(null)}>
                              Annulla
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(order)}>
                              Modifica
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(order.id)}>
                              Elimina
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}
      </Container>
    </div>
  );
};

export default Orders;
