import { useCallback, useState } from "react";
import questions from "../questions.js";
import Trofe from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";
import Question from "./Question.jsx";

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
            quizIsActive={quizIsActive}
          />
          <Question
            question={questions[currentQuestion].text}
            questionAnswers={shuffledQuestions[currentQuestion].answers}
            buttonIsDisabled={false}
            handleClick={handleSelectAnswer}
            quizIsActive={quizIsActive}
            answers={answers}
          />
        </div>
      )}
      {quizIsActive === null && (
        <div id="question">
          <QuestionTimer
            timeout={2000}
            onTimeout={updateQuizIsActive}
            quizIsActive={quizIsActive}
          />
          <Question
            question={questions[currentQuestion - 1].text}
            questionAnswers={shuffledQuestions[currentQuestion - 1].answers}
            buttonIsDisabled={true}
            handleClick={() => {}}
            quizIsActive={quizIsActive}
            answers={answers}
          />
        </div>
      )}
      {quizIsActive === false && (
        <div id="question">
          <QuestionTimer
            timeout={1000}
            onTimeout={updateQuizIsActive}
            quizIsActive={quizIsActive}
          />
          <Question
            question={questions[currentQuestion - 1].text}
            questionAnswers={shuffledQuestions[currentQuestion - 1].answers}
            buttonIsDisabled={true}
            handleClick={() => {}}
            quizIsActive={quizIsActive}
            answers={answers}
          />
        </div>
      )}
    </div>
  );
}
