import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import TopBar from "./components/Topbar";
import TeamCarousel from "./components/TeamCarousel";

function App() {
  return (
    <BrowserRouter>
      <TopBar claim="" />
      <TeamCarousel />
      <Routes>
        {/* i componenti possono tranquillamente ricevere props al loro interno */}
        <Route path="/" element="" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
