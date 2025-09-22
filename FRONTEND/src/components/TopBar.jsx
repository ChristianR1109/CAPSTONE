import { Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const teams = [
  { name: "Atalanta", img: "https://upload.wikimedia.org/wikipedia/it/thumb/8/81/Logo_Atalanta_Bergamo.svg/800px-Logo_Atalanta_Bergamo.svg.png" },
  { name: "Bologna", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Bologna_F.C._1909_logo.svg/244px-Bologna_F.C._1909_logo.svg.png" },
  { name: "Cagliari", img: "https://upload.wikimedia.org/wikipedia/it/thumb/8/88/Cagliari_calcio.svg/800px-Cagliari_calcio.svg.png" },
  {
    name: "Como",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Calcio_Como_-_logo_%28Italy%2C_2019-%29.svg/726px-Calcio_Como_-_logo_%28Italy%2C_2019-%29.svg.png",
  },
  {
    name: "Cremonese",
    img: "https://upload.wikimedia.org/wikipedia/it/thumb/2/23/Unione_Sportiva_Cremonese_logo.svg/330px-Unione_Sportiva_Cremonese_logo.svg.png",
  },
  {
    name: "Fiorentina",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/ACF_Fiorentina_-_logo_%28Italy%2C_2022%29.svg/1024px-ACF_Fiorentina_-_logo_%28Italy%2C_2022%29.svg.png",
  },
  {
    name: "Genoa",
    img: "https://upload.wikimedia.org/wikipedia/it/thumb/9/99/Genoa_Cricket_and_Football_Club_logo.svg/800px-Genoa_Cricket_and_Football_Club_logo.svg.png",
  },
  {
    name: "Verona",
    img: "https://upload.wikimedia.org/wikipedia/it/thumb/9/92/Hellas_Verona_FC_logo_%282020%29.svg/800px-Hellas_Verona_FC_logo_%282020%29.svg.png",
  },
  {
    name: "Inter",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/1024px-FC_Internazionale_Milano_2021.svg.png",
  },
  {
    name: "Juventus",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Juventus_FC_-_logo_black_%28Italy%2C_2020%29.svg/246px-Juventus_FC_-_logo_black_%28Italy%2C_2020%29.svg.png",
  },
  {
    name: "Lazio",
    img: "https://upload.wikimedia.org/wikipedia/it/thumb/6/62/Stemma_della_Societ%C3%A0_Sportiva_Lazio.svg/1280px-Stemma_della_Societ%C3%A0_Sportiva_Lazio.svg.png",
  },
  { name: "Lecce", img: "https://upload.wikimedia.org/wikipedia/it/thumb/3/36/US_Lecce_Stemma.svg/720px-US_Lecce_Stemma.svg.png?20241002144328" },
  { name: "Milan", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/541px-Logo_of_AC_Milan.svg.png" },
  { name: "Napoli", img: "https://images.seeklogo.com/logo-png/55/2/ssc-napoli-logo-png_seeklogo-550076.png" },
  {
    name: "Parma",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Logo_Parma_Calcio_1913_%28adozione_2016%29.svg/800px-Logo_Parma_Calcio_1913_%28adozione_2016%29.svg.png",
  },
  { name: "Pisa", img: "https://upload.wikimedia.org/wikipedia/it/thumb/d/d7/Logo_Pisa_SC_2017.svg/800px-Logo_Pisa_SC_2017.svg.png" },
  { name: "Roma", img: "https://upload.wikimedia.org/wikipedia/it/thumb/0/0e/AS_Roma_Logo_2017.svg/800px-AS_Roma_Logo_2017.svg.png" },
  { name: "Sassuolo", img: "https://upload.wikimedia.org/wikipedia/it/thumb/a/a4/Ussassuolostemma.svg/800px-Ussassuolostemma.svg.png" },
  { name: "Torino", img: "https://upload.wikimedia.org/wikipedia/it/thumb/0/04/Torino_FC_logo.svg/800px-Torino_FC_logo.svg.png" },
  { name: "Udinese", img: "https://upload.wikimedia.org/wikipedia/it/thumb/a/ae/Logo_Udinese_Calcio_2010.svg/1024px-Logo_Udinese_Calcio_2010.svg.png" },

  // ... fino a 20 elementi unici
];

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
      <DropdownButton id="dropdown-item-button" title="Acquista biglietti" variant="dark">
        <Dropdown.Item as="div" variant="dark" className=" bg-dark text-white my-dark-dropdown p-2" style={{ minWidth: "550px", width: "100%" }}>
          <Row>
            {[...Array(4)].map((_, colIndex) => (
              <Col key={colIndex} xs={3}>
                {[...Array(5)].map((_, rowIndex) => {
                  const index = colIndex * 5 + rowIndex;
                  const item = teams[index];
                  return (
                    <div className="nav-div mb-3 d-flex justify-content-between align-items-center" key={index}>
                      <h6>{item.name}</h6>
                      <img src={item.img} alt={item.name} style={{ width: "30%", height: "100%", objectFit: "contain" }} />
                    </div>
                  );
                })}
              </Col>
            ))}
          </Row>
        </Dropdown.Item>
      </DropdownButton>
    </Container>
  </Navbar>
);

export default TopBar;

// import React, { useEffect, useState } from "react";
// import { Container, Nav, Navbar, Row, Col, Spinner, Alert } from "react-bootstrap";
// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";

// const TopBar = (props) => {
//   const [teams, setTeams] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:1313/teams") // Metti l'url reale della tua API
//       .then((res) => {
//         if (!res.ok) throw new Error("Errore nel caricamento delle squadre");
//         return res.json();
//       })
//       .then((data) => {
//         setTeams(data || []);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <Container className="mx-5 my-3 text-center">
//         <Spinner animation="border" variant="primary" />
//         <p>Caricamento squadre...</p>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="mx-5 my-3">
//         <Alert variant="danger">{error}</Alert>
//       </Container>
//     );
//   }

//   const numColumns = Math.ceil((teams?.length || 0) / 5);

//   return (
//     <Navbar expand="lg" className="nav-bg flex-column ">
//       <Container fluid className="ms-5 ps-0 me-0 align-self-start">
//         <Navbar.Brand className="text-white" href="#home">
//           <h4 className="my-2">EASYTICKETS</h4>
//           {props.claim}
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto"></Nav>
//         </Navbar.Collapse>
//       </Container>
//       <Container className="ms-5 align-self-start ps-0">
//         <DropdownButton id="dropdown-item-button" title="Acquista biglietti" variant="dark">
//           <Dropdown.Item as="div" variant="dark" className="bg-dark text-white my-dark-dropdown p-2" style={{ minWidth: "550px", width: "100%" }}>
//             <Row>
//               {[...Array(numColumns)].map((_, colIndex) => (
//                 <Col key={colIndex} xs={3}>
//                   {teams.slice(colIndex * 5, colIndex * 5 + 5).map((item, idx) => (
//                     <div key={idx} className="nav-div mb-3 d-flex justify-content-between align-items-center">
//                       <h6>{item.name}</h6>
//                       <img src={item.logo || item.img} alt={item.name} style={{ width: "30%", height: "100%", objectFit: "contain" }} />
//                     </div>
//                   ))}
//                 </Col>
//               ))}
//             </Row>
//           </Dropdown.Item>
//         </DropdownButton>
//       </Container>
//     </Navbar>
//   );
// };

// export default TopBar;
