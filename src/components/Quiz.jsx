import { useCallback, useState } from "react";
import questions from "../questions.js";
import Trofe from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

// Shuffle answers recursively
const shuffledQuestions = JSON.parse(JSON.stringify(questions));

shuffledQuestions.forEach((question) => {
  question.answers = shuffledArr(question.answers);
});

function shuffledArr(arr) {
  const originalArr = [...arr];
  const newArr = [];
  shuffle(originalArr, newArr);
  return newArr;
}

function shuffle(arr, newArr) {
  if (arr.length === 0) return;
  const randomIndex = Math.floor(Math.random() * arr.length);
  newArr.push(arr[randomIndex]);
  arr.splice(randomIndex, 1);
  shuffle(arr, newArr);
}
// Shuffle answers recursively

export default function Quiz() {
  const [answers, setAnswers] = useState([]);
  const currentQuestion =
    answers.length < questions.length ? answers.length : questions.length - 1;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(answer) {
    setAnswers((prev) => {
      return [...prev, answer];
    });
  }, []);

  const handleTimeout = useCallback(
    function handleTimeout() {
      handleSelectAnswer(null);
    },
    [handleSelectAnswer]
  );

  if (answers.length === questions.length) {
    return (
      <div id="summary">
        <img src={Trofe} alt="Trofe" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={currentQuestion}
          timeout={4000}
          onTimeout={handleTimeout}
        />
        <h2>{questions[currentQuestion].text}</h2>
        <ul id="answers">
          {shuffledQuestions[currentQuestion].answers.map((answer) => (
            <li className="answer" key={answer}>
              <button
                onClick={() => {
                  handleSelectAnswer(answer);
                }}
              >
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
