import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [timeLeft, setTimeLeft] = useState(timeout);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1000);
    }, 1000);
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
      <progress id="question-time" value={timeLeft} max={timeout} />
    </>
  );
}
