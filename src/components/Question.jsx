import questions from "../questions";

export default function Question({
  question,
  questionAnswers,
  buttonIsDisabled,
  handleClick,
  quizIsActive,
  answers,
}) {
  return (
    <>
      <h2>{question}</h2>
      <ul id="answers">
        {questionAnswers.map((answer) => (
          <li className="answer" key={answer}>
            <button
              className={
                quizIsActive === null
                  ? answer === answers[answers.length - 1]
                    ? "selected"
                    : "answered"
                  : quizIsActive === false
                  ? answer === answers[answers.length - 1] &&
                    answer === questions[answers.length - 1].answers[0]
                    ? "correct"
                    : answer === answers[answers.length - 1] &&
                      answer !== questions[answers.length - 1].answers[0]
                    ? "wrong"
                    : "answered"
                  : ""
              }
              disabled={buttonIsDisabled}
              onClick={() => {
                handleClick(answer);
              }}
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
