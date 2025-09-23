import React, { useState } from "react";
import { Container, Navbar, Nav, Form, Button, Row, Col, Card, Alert } from "react-bootstrap";

const matches = ["Atalanta vs Juventus - 05/10/2025", "Atalanta vs Milan - 19/10/2025", "Atalanta vs Inter - 02/11/2025"];

const Atalanta = () => {
  const [selectedMatch, setSelectedMatch] = useState("");
  const [tickets, setTickets] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMatch && name && email) {
      setSuccess(true);
      setSelectedMatch("");
      setTickets(1);
      setName("");
      setEmail("");
    }
  };

  return (
    <>
      <div className="stripe-atalanta" style={{ minHeight: "100vh", color: "white" }}>
        <Container fluid className=" my-5 " style={{ maxWidth: "600px" }}>
          <Card bg="black" text="white" className=" p-0 shadow-lg" style={{ border: "2px solid #ffffffff" }}>
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
                  <Form.Label style={{ color: "#c0c7d0" }}>Partita</Form.Label>
                  <Form.Select
                    value={selectedMatch}
                    onChange={(e) => setSelectedMatch(e.target.value)}
                    required
                    style={{ backgroundColor: "#0a2e6e", color: "white", borderColor: "#ffffffff" }}
                  >
                    <option value="" style={{ color: "black" }}>
                      Seleziona partita
                    </option>
                    {matches.map((match, idx) => (
                      <option key={idx} value={match} style={{ color: "white" }}>
                        {match}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formTickets">
                  <Form.Label style={{ color: "#c0c7d0" }}>Numero biglietti</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    max="10"
                    value={tickets}
                    onChange={(e) => setTickets(e.target.value)}
                    required
                    style={{ backgroundColor: "#0a2e6e", color: "white", borderColor: "#ffffffff" }}
                  />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formName">
                      <Form.Label style={{ color: "#ffffffff" }}>Nome</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nome completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ backgroundColor: "#4268aaff", color: "white", borderColor: "#ffffffff" }}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label style={{ color: "#c0c7d0" }}>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="esempio@mail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ backgroundColor: "#4268aaff", color: "white", borderColor: "#ffffffff" }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button type="submit" variant="primary" style={{ backgroundColor: "#0a2e6e", borderColor: "#0a2e6e" }}>
                  Acquista
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default Atalanta;
