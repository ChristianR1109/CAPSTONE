import React, { useState } from "react";
import { Container, Form, Row, Col, Card, Alert } from "react-bootstrap";
import PayButton from "./PayButton";

const matches = ["Atalanta vs Juventus - 05/10/2025", "Atalanta vs Milan - 19/10/2025", "Atalanta vs Inter - 02/11/2025"];

const Milan = () => {
  const [selectedMatch, setSelectedMatch] = useState("");
  const [tickets, setTickets] = useState(1);
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(buyerEmail);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMatch && buyerName && isEmailValid) {
      setSuccess(true);
      setSelectedMatch("");
      setTickets(1);
      setBuyerName("");
      setBuyerEmail("");
    }
  };

  return (
    <div className="stripe-milan" style={{ minHeight: "100vh", color: "white" }}>
      <Container fluid className="my-5" style={{ maxWidth: "600px" }}>
        <Card className="p-0 mb-4 border-dark border-2">
          <h1 className="text-center team-title m-0">AC Milan</h1>
        </Card>

        <Card bg="black" text="white" className="p-0 card-box-shadow" style={{ border: "2px solid #ffffffff" }}>
          <Card.Body>
            <Card.Title style={{ color: "#ffffffff" }}>Acquista i tuoi biglietti per Atalanta</Card.Title>
            <Card.Subtitle className="mb-3" style={{ color: "#ffffffff" }}>
              Seleziona la partita e inserisci i tuoi dati
            </Card.Subtitle>

            {success && (
              <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
                Acquisto completato con successo! Grazie per il supporto.
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formMatch">
                <Form.Label style={{ color: "#ffffffff" }}>Partita</Form.Label>
                <Form.Select
                  value={selectedMatch}
                  onChange={(e) => setSelectedMatch(e.target.value)}
                  required
                  style={{ backgroundColor: "#ffffffff", color: "black", borderColor: "#ffffffff" }}
                >
                  <option value="">Seleziona partita</option>
                  {matches.map((match, idx) => (
                    <option key={idx} value={match}>
                      {match}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formTickets">
                <Form.Label style={{ color: "#ffffffff" }}>Numero biglietti (max 5)</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  max="10"
                  value={tickets}
                  onChange={(e) => setTickets(e.target.value)}
                  required
                  style={{ backgroundColor: "#ffffffff", color: "black", borderColor: "#ffffffff" }}
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label style={{ color: "#ffffffff" }}>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nome completo"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      required
                      style={{ backgroundColor: "#ffffffff", color: "black", borderColor: "#ffffffff" }}
                      className="custom-placeholder"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label style={{ color: "#ffffffff" }}>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="esempio@mail.com"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      required
                      style={{ backgroundColor: "#ffffffff", color: "black", borderColor: "#ffffffff" }}
                      className="custom-placeholder"
                    />
                    {buyerEmail && !isEmailValid && <small style={{ color: "red" }}>Inserisci un indirizzo email valido</small>}
                  </Form.Group>
                </Col>
              </Row>

              {/* Passo i dati al PayButton */}
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <PayButton
                    disabled={!(selectedMatch && Number(tickets) > 0 && buyerName && isEmailValid)}
                    tickets={tickets}
                    buyerName={buyerName}
                    buyerEmail={buyerEmail}
                    matchName={selectedMatch}
                  />{" "}
                </div>
                <div>
                  <h4 className="p-0 mt-3"> Totale = {tickets * 20}€</h4>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Milan;
