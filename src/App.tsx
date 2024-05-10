import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Pokemons } from "./pages/Pokemons";
import { Pokemon } from "./pages/Pokemon";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pokemons />} />
        <Route path="/:id" element={<Pokemon />} />
      </Routes>
    </Router>
  );
}

export default App;
