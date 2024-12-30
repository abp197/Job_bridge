/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const TestInterface = ({ questions, duration }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (option) => {
    setAnswers({ ...answers, [currentQuestion]: option });
  };

  const handleSubmit = () => {
    console.log("Test Submitted: ", answers);
    // Call backend API to save results
  };

  return (
    <div className="test-interface">
      <div className="question-card">
        <h2>{questions[currentQuestion].question}</h2>
        <ul>
          {questions[currentQuestion].options.map((option, index) => (
            <li key={index} onClick={() => handleAnswer(option)}>
              {option}
            </li>
          ))}
        </ul>
      </div>
      <div className="test-controls">
        <button
          onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))}
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentQuestion((prev) =>
              Math.min(prev + 1, questions.length - 1)
            )
          }
        >
          Next
        </button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className="timer">Time Left: {timeLeft}s</div>
    </div>
  );
};

export default TestInterface;
