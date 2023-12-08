import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout, quizIsActive }) {
  const [timeLeft, setTimeLeft] = useState(timeout);

  useEffect(() => {
    const intervalSpeed = 10;
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - intervalSpeed);
    }, intervalSpeed);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);
    return () => {
      clearTimeout(timer);
    };
  }, [onTimeout, timeout]);

  return (
    <>
      <progress
        className={quizIsActive === null ? "answered" : ""}
        id="question-timer"
        value={timeLeft}
        max={timeout}
      />
    </>
  );
}
