import { Container, Nav, Navbar, Row, Col } from "react-bootstrap";

const TopBar = (props) => (
  <Navbar expand="lg" className="nav-bg flex-column ">
    <Container fluid className=" ms-5 ps-0 me-0 align-self-start">
      <Navbar.Brand className="text-white " href="#home">
        <h4 className="my-2">EASYTICKETS</h4>
        {props.claim}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto"></Nav>
      </Navbar.Collapse>
    </Container>
    <Container className="ms-5 align-self-start ps-0">
      <div className="d-flex flex-wrap text-white" style={{ gap: "10px" }}>
        <Row>
          <Col>
            <div className="nav-div">
              <h6>Atalanta</h6>
              <img
                src="https://upload.wikimedia.org/wikipedia/it/thumb/8/81/Logo_Atalanta_Bergamo.svg/800px-Logo_Atalanta_Bergamo.svg.png"
                alt="Atalanta"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Col>
          <Col>
            <div className="nav-div">
              <h6>Bologna</h6>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Bologna_F.C._1909_logo.svg/244px-Bologna_F.C._1909_logo.svg.png"
                alt="Bologna"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Col>
          <Col>
            <div className="nav-div">
              <h6>Cagliari</h6>
              <img
                src="https://upload.wikimedia.org/wikipedia/it/thumb/8/88/Cagliari_calcio.svg/800px-Cagliari_calcio.svg.png"
                alt="Cagliari"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Col>
          <Col>
            <div className="nav-div">
              <h6>Como</h6>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Calcio_Como_-_logo_%28Italy%2C_2019-%29.svg/726px-Calcio_Como_-_logo_%28Italy%2C_2019-%29.svg.png"
                alt="Como"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Col>
          <Col>
            <div className="nav-div">
              <h6>Cremonese</h6>
              <img
                src="https://upload.wikimedia.org/wikipedia/it/thumb/2/23/Unione_Sportiva_Cremonese_logo.svg/330px-Unione_Sportiva_Cremonese_logo.svg.png"
                alt="Cremonese"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Col>
          <Col>
            <div className="nav-div">
              <h6>Fiorentina</h6>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/ACF_Fiorentina_-_logo_%28Italy%2C_2022%29.svg/1024px-ACF_Fiorentina_-_logo_%28Italy%2C_2022%29.svg.png"
                alt="Fiorentina"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Col>
          <Col>
            <div className="nav-div">
              <h6>Genoa</h6>
              <img
                src="https://upload.wikimedia.org/wikipedia/it/thumb/9/99/Genoa_Cricket_and_Football_Club_logo.svg/800px-Genoa_Cricket_and_Football_Club_logo.svg.png"
                alt="Genoa"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Col>
          <Col>
            <div className="nav-div">
              <h6>Verona</h6>
              <img
                src="https://upload.wikimedia.org/wikipedia/it/thumb/9/92/Hellas_Verona_FC_logo_%282020%29.svg/800px-Hellas_Verona_FC_logo_%282020%29.svg.png"
                alt="Verona"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Col>
          <Col>
            <div className="nav-div">
              <h6>Inter</h6>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/1024px-FC_Internazionale_Milano_2021.svg.png"
                alt="Inter"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Col>
          <Col>
            <div className="nav-div">
              <h6>Juventus</h6>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Juventus_FC_-_logo_black_%28Italy%2C_2020%29.svg/246px-Juventus_FC_-_logo_black_%28Italy%2C_2020%29.svg.png"
                alt="Juventus"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="nav-div">
              <h6>Lazio</h6>
              <img
                src="https://upload.wikimedia.org/wikipedia/it/thumb/6/62/Stemma_della_Societ%C3%A0_Sportiva_Lazio.svg/1280px-Stemma_della_Societ%C3%A0_Sportiva_Lazio.svg.png"
                alt="Lazio"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Col>
          <Col>
            <div className="nav-div">
              <h6>Lecce</h6>
              <img
                src="https://upload.wikimedia.org/wikipedia/it/thumb/3/36/US_Lecce_Stemma.svg/720px-US_Lecce_Stemma.svg.png?20241002144328"
                alt="Lecce"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Col>
          <Col>
            <div className="nav-div">
              <h6>Milan</h6>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/541px-Logo_of_AC_Milan.svg.png"
                alt="Milan"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Col>
          <Col>
            <div className="nav-div">
              <h6>Napoli</h6>
              <img
                src="https://images.seeklogo.com/logo-png/55/2/ssc-napoli-logo-png_seeklogo-550076.png"
                alt="Napoli"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Col>
          <Col>
            <div className="nav-div">
              <h6>Parma</h6>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Logo_Parma_Calcio_1913_%28adozione_2016%29.svg/800px-Logo_Parma_Calcio_1913_%28adozione_2016%29.svg.png"
                alt="Parma"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Col>
          <Col>
            <div className="nav-div">
              <h6>Pisa</h6>
              <img
                src="https://upload.wikimedia.org/wikipedia/it/thumb/d/d7/Logo_Pisa_SC_2017.svg/800px-Logo_Pisa_SC_2017.svg.png"
                alt="Pisa"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Col>
          <Col>
            <div className="nav-div">
              <h6>Roma</h6>
              <img
                src="https://upload.wikimedia.org/wikipedia/it/thumb/0/0e/AS_Roma_Logo_2017.svg/800px-AS_Roma_Logo_2017.svg.png"
                alt="Roma"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Col>
          <Col>
            <div className="nav-div">
              <h6>Sassuolo</h6>
              <img
                src="https://upload.wikimedia.org/wikipedia/it/thumb/a/a4/Ussassuolostemma.svg/800px-Ussassuolostemma.svg.png"
                alt="Sassuolo"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Col>
          <Col>
            <div className="nav-div">
              <h6>Torino</h6>
              <img
                src="https://upload.wikimedia.org/wikipedia/it/thumb/0/04/Torino_FC_logo.svg/800px-Torino_FC_logo.svg.png"
                alt="Torino"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Col>
          <Col>
            <div className="nav-div">
              <h6>Udinese</h6>
              <img
                src="https://upload.wikimedia.org/wikipedia/it/thumb/a/ae/Logo_Udinese_Calcio_2010.svg/1024px-Logo_Udinese_Calcio_2010.svg.png"
                alt="Udinese"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  </Navbar>
);

export default TopBar;
