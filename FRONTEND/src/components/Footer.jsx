import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => (
  <Container fluid className="footer px-5">
    <Container className="page-container ">
      <div
        className="d-flex justify-content-between m-0 flex-wrap"
        style={{
          maxWidth: 1140,
        }}
      >
        {/* COLONNA 1 */}
        <div>
          <span style={{ fontWeight: "bold", letterSpacing: 1, fontSize: 16 }}>EASYTICKETS</span>
          <ul style={{ listStyle: "none", margin: "1rem 0", padding: 0, lineHeight: 2 }}>
            <li>Termini di utilizzo</li>
            <li>Informativa sulla privacy</li>

            <li>Contatti</li>
          </ul>
        </div>

        {/* COLONNA 2 */}
        <div>
          <span style={{ fontWeight: "bold", letterSpacing: 1, fontSize: 16 }}>&nbsp;</span>
          <ul style={{ listStyle: "none", margin: "1rem 0", padding: 0, lineHeight: 2 }}>
            <li>Cellulare</li>

            <li>Links</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* COLONNA 3 */}
        <div className="me-3">
          <span style={{ fontWeight: "bold", letterSpacing: 1, fontSize: 16 }}>SEGUICI</span>
          <ul style={{ listStyle: "none", margin: "1rem 0", padding: 0, lineHeight: 2 }}>
            <li>Facebook</li>
            <li>X</li>
            <li>Instagram</li>
            <li>TikTok</li>
          </ul>
        </div>
      </div>

      {/* FINE FOOTER */}
      <div
        style={{
          borderTop: "1px solid #22272c",
          marginTop: 0,
          paddingTop: 10,
          fontSize: 13,
          color: "#aeb4bb",
          textAlign: "left",
          maxWidth: 1200,
          margin: "20px auto 0 auto",
        }}
      >
        <div>
          Copyright © 2006-25 EASYTICKETS &nbsp;|&nbsp;
          <a href="#" style={{ color: "#aeb4bb", textDecoration: "underline", fontSize: 13 }}>
            Imposta Privacy
          </a>
        </div>
      </div>
    </Container>
  </Container>
);

export default Footer;
