import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

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

function App() {
  return (
    <BrowserRouter>
      <TopBar claim="" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
