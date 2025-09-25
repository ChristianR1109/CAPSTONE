import React, { useState } from "react";

function PayButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePay = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:1313/api/create-order", {
        // backend su Spring Boot
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
        // reindirizza utente alla pagina di pagamento PayPal
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

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handlePay} disabled={loading}>
        {loading ? "Caricamento..." : "Paga con PayPal"}
      </button>
    </div>
  );
}

export default PayButton;
