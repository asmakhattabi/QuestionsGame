import "./styles.css";
import { useEffect, useState } from "react";
import Game from "./Components/game";
import Difficulty from "./Components/choseDifficulty";
export default function App() {
  const [difficulty, setDifficulty] = useState("");
  const [difficultyChosed, setDifficultyChosed] = useState(false);
  return (
    <div className="App">
      <h1>Game</h1>
      {difficultyChosed && (
        <Game
          difficultyChosed={difficultyChosed}
          setDifficultyChosed={setDifficultyChosed}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
      )}
      {!difficultyChosed && (
        <Difficulty
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          difficultyChosed={difficultyChosed}
          setDifficultyChosed={setDifficultyChosed}
        />
      )}
    </div>
  );
}
