import React from "react";
import getQuestionsService from "../Services/gameService";
import { useEffect, useState } from "react";
const Game = ({
  difficultyChosed,
  setDifficultyChosed,
  setDifficulty,
  difficulty
}) => {
  const [quetions, setQuestions] = useState([]);
  const [quetion, setQuestion] = useState({});
  const [userAnswer, setUserAnswer] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [counter, setCounter] = useState(0);
  const [checkAnswer, setCheckAnswer] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");

  useEffect(() => {
    getQuestions();
  }, []);

  //get ALL Questions
  const getQuestions = async () => {
    setCounter(0);
    setQuestions([]);
    setUserAnswer([]);
    setCheckAnswer(false);
    const response = await getQuestionsService(difficulty);
    const data = await response;
    setQuestions(data.data.results);
  };
  useEffect(() => {
    quetions && quetions.length > 0 && getAllAnswers(counter);
  }, [quetions, quetion]);

  const checkAnswerHandler = () => {
    setCheckAnswer(!checkAnswer);
  };
  //initialise states in order to be ready for a new quetion
  const initiliaseQuesion = () => {
    setQuestion({});
    setAnswers([]);
    setCorrectAnswer("");
    setCheckAnswer(false);
    setUserAnswer([]);
  };

  const handleOnChange = (index) => {
    const elemChecked = answers[index];
    userAnswer.includes(elemChecked)
      ? setUserAnswer(userAnswer.filter((item) => item !== elemChecked))
      : setUserAnswer([...userAnswer, elemChecked]);
  };
  //check if the answer is correct
  const isCorrect = (value) => {
    return correctAnswer === value;
  };

  const handleNextQuestions = () => {
    initiliaseQuesion();

    setCounter(counter + 1);

    getAllAnswers(counter);
  };
  //fill up the current quetion and  the correct and incorrect  answers
  const getAllAnswers = (index) => {
    setQuestion(quetions[index]);

    const allAnswers = quetion &&
      quetion.incorrect_answers && [
        ...quetion.incorrect_answers,
        quetion.correct_answer
      ];
    //sort the list of answers randomly
    setAnswers(allAnswers?.sort(() => Math.random() - 0.5));

    setCorrectAnswer(quetion?.correct_answer);
  };

  const ChangeDifficulty = () => {
    setDifficultyChosed(!difficultyChosed);
    setDifficulty("");
  };
  return (
    <div className="container">
      <input
        type="button"
        value="Change Difficulty"
        onClick={ChangeDifficulty}
      />
      {counter === 5 && (
        <input type="button" value="New Quetions" onClick={getQuestions} />
      )}
      <h2>Category : {quetion?.category}</h2>
      <p>{quetion?.question}</p>
      <h3>Answers : </h3>
      <form>
        <div className="answers">
          {answers?.map((elem, index) => (
            <div>
              <label
                className={
                  checkAnswer
                    ? isCorrect(elem)
                      ? "correct-answer"
                      : "wrong-answer"
                    : "answer"
                }
              >
                <input
                  key={index}
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  name={elem}
                  value={elem}
                  checked={userAnswer.includes(elem)}
                  onChange={() => handleOnChange(index)}
                />
                {elem}
                {checkAnswer && (
                  <span>{isCorrect(elem) ? "Correct" : "Wrong"}</span>
                )}
              </label>
            </div>
          ))}
        </div>
        <div>
          <input
            type="button"
            value="check Answer"
            onClick={checkAnswerHandler}
          />
          {counter < 5 && (
            <input type="button" value="Next" onClick={handleNextQuestions} />
          )}
        </div>
      </form>
    </div>
  );
};

export default Game;
