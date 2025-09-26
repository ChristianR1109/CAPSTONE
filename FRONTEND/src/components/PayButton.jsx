import React, { useState } from "react";

function PayButton({ disabled, tickets }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const pricePerTicket = 20.0;

  const handlePay = async () => {
    if (disabled) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:1313/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tickets: Number(tickets), pricePerTicket }),
      });

      if (!res.ok) {
        const errData = await res.json();
        setError(errData.error || "Errore nel creare l'ordine");
        setLoading(false);
        return;
      }

      const data = await res.json();
      const approveLink = data.links.find((link) => link.rel === "approve")?.href;

      if (approveLink) {
        window.location.href = approveLink;
      } else {
        setError("Impossibile ottenere il link PayPal");
      }
    } catch (err) {
      setError("Errore di connessione al server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  console.log("PREZZO ", pricePerTicket);
  return (
    <div style={{ marginTop: "1rem" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        type="button"
        onClick={handlePay}
        disabled={loading || disabled}
        style={{
          backgroundColor: "#089FDF", // giallo PayPal
          color: "white", // blu PayPal
          fontWeight: "bold",
          fontSize: "16px",
          border: "none",
          borderRadius: "8px",
          padding: "8px 15px",
          cursor: disabled || loading ? "not-allowed" : "pointer",
          opacity: disabled || loading ? 0.6 : 1,
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {loading ? (
          "Caricamento..."
        ) : (
          <>
            {/* Logo PayPal SVG */}
            Paga con PayPal
          </>
        )}
      </button>
    </div>
  );
}

export default PayButton;
