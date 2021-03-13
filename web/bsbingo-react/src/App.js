import "./App.css";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Footer from "./Footer";
import Game from "./Game";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Dashboard />
        <div className="game-card" id="game-card">
          <Game />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
