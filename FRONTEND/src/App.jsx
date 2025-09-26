import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./auth/AuthContext.jsx";
import TopBar from "./components/Topbar";
import Home from "./components/Home";
import Atalanta from "./components/Atalanta";
import Bologna from "./components/Bologna";
import Cagliari from "./components/Cagliari";
import Como from "./components/Como";
import Cremonese from "./components/Cremonese";
import Fiorentina from "./components/Fiorentina";
import Genoa from "./components/Genoa";
import Inter from "./components/Inter";
import Juventus from "./components/Juventus";
import Lazio from "./components/Lazio";
import Lecce from "./components/Lecce";
import Milan from "./components/Milan";
import Napoli from "./components/Napoli";
import Parma from "./components/Parma";
import Pisa from "./components/Pisa";
import Roma from "./components/Roma";
import Sassuolo from "./components/Sassuolo";
import Torino from "./components/Torino";
import Udinese from "./components/Udinese";
import Verona from "./components/Verona";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import PrivateRoute from "./auth/PrivateRoute.jsx";
import Backoffice from "./auth/Backoffice.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/backoffice" element={<Backoffice />} />
          <Route
            path="/atalanta"
            element={
              <PrivateRoute>
                <Atalanta />
              </PrivateRoute>
            }
          />
          <Route
            path="/bologna"
            element={
              <PrivateRoute>
                <Bologna />
              </PrivateRoute>
            }
          />
          <Route
            path="/cagliari"
            element={
              <PrivateRoute>
                <Cagliari />
              </PrivateRoute>
            }
          />
          <Route
            path="/como"
            element={
              <PrivateRoute>
                <Como />
              </PrivateRoute>
            }
          />
          <Route
            path="/cremonese"
            element={
              <PrivateRoute>
                <Cremonese />
              </PrivateRoute>
            }
          />
          <Route
            path="/fiorentina"
            element={
              <PrivateRoute>
                <Fiorentina />
              </PrivateRoute>
            }
          />
          <Route
            path="/genoa"
            element={
              <PrivateRoute>
                <Genoa />
              </PrivateRoute>
            }
          />
          <Route
            path="/inter"
            element={
              <PrivateRoute>
                <Inter />
              </PrivateRoute>
            }
          />
          <Route
            path="/juventus"
            element={
              <PrivateRoute>
                <Juventus />
              </PrivateRoute>
            }
          />
          <Route
            path="/lazio"
            element={
              <PrivateRoute>
                <Lazio />
              </PrivateRoute>
            }
          />
          <Route
            path="/lecce"
            element={
              <PrivateRoute>
                <Lecce />
              </PrivateRoute>
            }
          />
          <Route
            path="/milan"
            element={
              <PrivateRoute>
                <Milan />
              </PrivateRoute>
            }
          />
          <Route
            path="/napoli"
            element={
              <PrivateRoute>
                <Napoli />
              </PrivateRoute>
            }
          />
          <Route
            path="/parma"
            element={
              <PrivateRoute>
                <Parma />
              </PrivateRoute>
            }
          />
          <Route
            path="/pisa"
            element={
              <PrivateRoute>
                <Pisa />
              </PrivateRoute>
            }
          />
          <Route
            path="/roma"
            element={
              <PrivateRoute>
                <Roma />
              </PrivateRoute>
            }
          />
          <Route
            path="/sassuolo"
            element={
              <PrivateRoute>
                <Sassuolo />
              </PrivateRoute>
            }
          />
          <Route
            path="/torino"
            element={
              <PrivateRoute>
                <Torino />
              </PrivateRoute>
            }
          />
          <Route
            path="/udinese"
            element={
              <PrivateRoute>
                <Udinese />
              </PrivateRoute>
            }
          />
          <Route
            path="/verona"
            element={
              <PrivateRoute>
                <Verona />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
