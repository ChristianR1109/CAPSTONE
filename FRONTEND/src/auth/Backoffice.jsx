import React, { useEffect, useState } from "react";
import { Container, Table, Card, Alert, Spinner } from "react-bootstrap";

const Backoffice = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="admin-dashboard" style={{ minHeight: "100vh", background: "#f4f4f4", padding: "20px" }}>
      <Container>
        <Card className="mb-4 shadow">
          <Card.Body>
            <h2 className="text-center">📊 Pannello di Controllo Admin</h2>
            <p className="text-center text-muted">Gestione degli ordini PayPal</p>
          </Card.Body>
        </Card>

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
                    <th>Stato</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={order.id}>
                      <td>{index + 1}</td>
                      <td>{order.match}</td>
                      <td>{order.name}</td>
                      <td>{order.email}</td>
                      <td>{order.tickets}</td>
                      <td>{order.amount} €</td>
                      <td>
                        {order.status === "COMPLETED" ? (
                          <span style={{ color: "green", fontWeight: "bold" }}>✔ Pagato</span>
                        ) : (
                          <span style={{ color: "red", fontWeight: "bold" }}>✘ Non pagato</span>
                        )}
                      </td>
                      <td>{new Date(order.createdAt).toLocaleString()}</td>
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

export default Backoffice;
