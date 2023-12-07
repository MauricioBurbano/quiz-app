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
  const [quizIsActive, setQuizIsActive] = useState(true);
  const currentQuestion = answers.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(answer) {
    updateQuizIsActive();
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

  function updateQuizIsActive() {
    setQuizIsActive((prev) => {
      if (prev === true) return null;
      if (prev === null) return false;
      if (prev === false) return true;
    });
  }

  if (answers.length === questions.length && quizIsActive) {
    return (
      <div id="summary">
        <img src={Trofe} alt="Trofe" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      {quizIsActive === true && (
        <div id="question">
          <QuestionTimer
            key={currentQuestion}
            timeout={3000}
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
      )}
      {quizIsActive === null && (
        <div id="question">
          <QuestionTimer timeout={1000} onTimeout={updateQuizIsActive} />
          <h2>{questions[currentQuestion - 1].text}</h2>
          <ul id="answers">
            {shuffledQuestions[currentQuestion - 1].answers.map((answer) => (
              <li className="answer" key={answer}>
                <button
                  className={
                    answer === answers[answers.length - 1] ? "selected" : ""
                  }
                  onClick={() => {}}
                >
                  {answer}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {quizIsActive === false && (
        <div id="question">
          <QuestionTimer timeout={1000} onTimeout={updateQuizIsActive} />
          <h2>{questions[currentQuestion - 1].text}</h2>
          <ul id="answers">
            {shuffledQuestions[currentQuestion - 1].answers.map((answer) => (
              <li className="answer" key={answer}>
                <button
                  className={
                    answer === answers[answers.length - 1] &&
                    answer === questions[answers.length - 1].answers[0]
                      ? "correct"
                      : answer === answers[answers.length - 1] &&
                        answer !== questions[answers.length - 1].answers[0]
                      ? "wrong"
                      : ""
                  }
                  onClick={() => {}}
                >
                  {answer}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
