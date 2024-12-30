import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import Timer from "./Timer";

const TestInterface = ({ questions, duration }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(duration);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (timeLeft === 0) handleSubmit(); // Auto-submit when time runs out
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (selectedOption) => {
    setAnswers({ ...answers, [currentQuestionIndex]: selectedOption });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Test Submitted:", answers);
    // Add API call to submit answers
  };

  return (
    <div className="test-interface">
      <div className="header">
        <h1>Skill Assessment Test</h1>
        <Timer timeLeft={timeLeft} />
      </div>
      <QuestionCard
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
        selectedAnswer={answers[currentQuestionIndex]}
      />
      <div className="controls">
        <button
          className="btn"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <button
          className="btn"
          onClick={handleNext}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Next
        </button>
        <button className="btn submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default TestInterface;

