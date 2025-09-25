import { Navigate } from "react-router-dom";
import useAuth from "../auth/useAuth"; // il tuo hook custom

export default function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <p>Caricamento...</p>; // puoi mettere anche uno spinner
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
