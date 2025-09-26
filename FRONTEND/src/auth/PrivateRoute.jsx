import { Navigate } from "react-router-dom";
import useAuth from "../auth/useAuth"; // il tuo hook custom

function PrivateRoute({ children, requireAdmin = false }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Caricamento...</p>; // oppure uno spinner
  }

  // Se non loggato
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Se serve essere admin e l'utente non lo è
  if (requireAdmin && user.role !== "ADMIN") {
    return <Navigate to="/home" replace />; // oppure una pagina di "Accesso negato"
  }

  // Altrimenti mostra il contenuto
  return children;
}
export default PrivateRoute;
