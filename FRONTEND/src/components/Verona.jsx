import React, { useState } from "react";
import { Container, Navbar, Nav, Form, Button, Row, Col, Card, Alert } from "react-bootstrap";

const matches = ["Atalanta vs Juventus - 05/10/2025", "Atalanta vs Milan - 19/10/2025", "Atalanta vs Inter - 02/11/2025"];

const Roma = () => {
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
      <div className="stripe-verona" style={{ minHeight: "100vh", color: "white" }}>
        <Container fluid className=" my-5 " style={{ maxWidth: "600px" }}>
          <Card className="p-0 mb-4 border-dark border-2">
            <h1 className="text-center team-title m-0">Hellas Verona FC</h1>
          </Card>
          <Card bg="black" text="white" className=" p-0 card-box-shadow" style={{ border: "2px solid #ffffffff" }}>
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
                  <Form.Label style={{ color: "#ffffffff" }}>Numero biglietti</Form.Label>
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ backgroundColor: "#ffffffff", color: "white", borderColor: "#ffffffff" }}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ backgroundColor: "#ffffffff", color: "black", borderColor: "#ffffffff" }}
                        className="custom-placeholder"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button type="submit" variant="black" style={{ backgroundColor: "#000000", borderColor: "#ffffff", color: "white" }}>
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

export default Roma;
