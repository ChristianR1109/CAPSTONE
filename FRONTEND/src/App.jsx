import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import React, { useState, useEffect } from "react";

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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Qui controlli se esiste un token nello storage
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <BrowserRouter>
      <TopBar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/atalanta" element={<Atalanta />} />
        <Route path="/bologna" element={<Bologna />} />
        <Route path="/cagliari" element={<Cagliari />} />
        <Route path="/como" element={<Como />} />
        <Route path="/cremonese" element={<Cremonese />} />
        <Route path="/fiorentina" element={<Fiorentina />} />
        <Route path="/genoa" element={<Genoa />} />
        <Route path="/inter" element={<Inter />} />
        <Route path="/juventus" element={<Juventus />} />
        <Route path="/lazio" element={<Lazio />} />
        <Route path="/lecce" element={<Lecce />} />
        <Route path="/milan" element={<Milan />} />
        <Route path="/napoli" element={<Napoli />} />
        <Route path="/parma" element={<Parma />} />
        <Route path="/pisa" element={<Pisa />} />
        <Route path="/roma" element={<Roma />} />
        <Route path="/sassuolo" element={<Sassuolo />} />
        <Route path="/torino" element={<Torino />} />
        <Route path="/udinese" element={<Udinese />} />
        <Route path="/verona" element={<Verona />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
