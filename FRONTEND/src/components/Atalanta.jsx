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
      <div className="stripe-background" style={{ minHeight: "100vh", color: "white" }}>
        <Navbar bg="dark" variant="dark" className="mb-4 sticky-top" style={{ borderBottom: "4px solid #0a2e6e" }}>
          <Container>
            <Navbar.Brand href="#home" style={{ color: "#0a2e6e", fontWeight: "bold" }}>
              Atalanta Tickets
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home" style={{ color: "#0a2e6e" }}>
                Home
              </Nav.Link>
              <Nav.Link href="#matches" style={{ color: "#0a2e6e" }}>
                Partite
              </Nav.Link>
              <Nav.Link href="#contact" style={{ color: "#0a2e6e" }}>
                Contatti
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Container style={{ maxWidth: "600px" }}>
          <Card bg="black" text="white" className="p-4 shadow-lg" style={{ border: "2px solid #0a2e6e" }}>
            <Card.Body>
              <Card.Title style={{ color: "#0a2e6e" }}>Acquista i tuoi biglietti per Atalanta</Card.Title>
              <Card.Subtitle className="mb-3" style={{ color: "#c0c7d0" }}>
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
                    style={{ backgroundColor: "#0a2e6e", color: "white", borderColor: "#0a2e6e" }}
                  >
                    <option value="" style={{ color: "black" }}>
                      Seleziona partita
                    </option>
                    {matches.map((match, idx) => (
                      <option key={idx} value={match} style={{ color: "black" }}>
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
                    style={{ backgroundColor: "#0a2e6e", color: "white", borderColor: "#0a2e6e" }}
                  />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formName">
                      <Form.Label style={{ color: "#c0c7d0" }}>Nome</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nome completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ backgroundColor: "#0a2e6e", color: "white", borderColor: "#0a2e6e" }}
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
                        style={{ backgroundColor: "#0a2e6e", color: "white", borderColor: "#0a2e6e" }}
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
