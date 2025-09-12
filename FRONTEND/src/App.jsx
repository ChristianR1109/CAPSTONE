import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import TopBar from "./components/Topbar";

function App() {
  return (
    <BrowserRouter>
      <TopBar claim="" />
      <Routes>
        {/* i componenti possono tranquillamente ricevere props al loro interno */}
        <Route path="/" element="" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
