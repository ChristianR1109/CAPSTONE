import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import TopBar from "./components/Topbar";
import Home from "./components/Home";
import Atalanta from "./components/Atalanta";

function App() {
  return (
    <BrowserRouter>
      <TopBar claim="" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/atalanta" element={<Atalanta />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
