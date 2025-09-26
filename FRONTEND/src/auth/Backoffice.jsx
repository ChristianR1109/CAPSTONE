import React, { useState } from "react";
import { Container, Card, Nav } from "react-bootstrap";
import Orders from "./Orders";
import Matches from "./Matches";
import Users from "./Users";
import Standings from "./Standings";

const Backoffice = () => {
  // Stato per tracciare componente attivo
  const [activeComponent, setActiveComponent] = useState("Orders");

  // Renderizza il componente selezionato
  const renderComponent = () => {
    switch (activeComponent) {
      case "Orders":
        return <Orders />;
      case "Matches":
        return <Matches />;
      case "Users":
        return <Users />;
      case "Standings":
        return <Standings />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard" style={{ minHeight: "100vh", background: "#f4f4f4", padding: "20px" }}>
      <Container>
        <Card className="mb-4 shadow">
          <Card.Body>
            <h2 className="text-center">📊 Pannello di Controllo Admin</h2>
            <Nav
              fill
              variant="tabs"
              defaultActiveKey="Orders"
              onSelect={(selectedKey) => setActiveComponent(selectedKey)}
              className="justify-content-center mb-3"
            >
              <Nav.Item>
                <Nav.Link eventKey="Orders">Orders</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Matches">Matches</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Users">Users</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Standings">Standings</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Body>
        </Card>

        {/* Render del componente selezionato */}
        {renderComponent()}
      </Container>
    </div>
  );
};

export default Backoffice;
