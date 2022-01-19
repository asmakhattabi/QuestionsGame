import React from "react";

import { useState } from "react";
const Difficulty = ({
  difficulty,
  setDifficulty,
  setDifficultyChosed,
  difficultyChosed
}) => {
  const listofDifficulties = ["Any difficulty", "Easy", "Meduim", "Hard"];

  const handleChange = (e) => {
    setDifficulty(e.target.value);
  };
  const handleChose = (e) => {
    setDifficultyChosed(true);
  };

  return (
    <div className="Difficulty">
      <label>
        Select Difficulty :
        <select value={difficulty} onChange={handleChange}>
          {listofDifficulties.map((elem, index) => (
            <option key={index} value={elem}>
              {elem}
            </option>
          ))}
        </select>
      </label>
      <input type="button" value="Chose" onClick={handleChose} />
    </div>
  );
};
export default Difficulty;
