/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import Timer from "./Timer";

const TestInterface = ({ questions, duration }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (timeLeft === 0) handleSubmit();
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
  };

  return (
    <div className="w-11/12 max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b">
        <h1 className="text-xl font-bold text-gray-700">Skill Assessment Test</h1>
        <Timer timeLeft={timeLeft} />
      </div>

      {/* Question Card */}
      <QuestionCard
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
        selectedAnswer={answers[currentQuestionIndex]}
      />

      {/* Controls */}
      <div className="flex justify-between items-center">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          onClick={handleNext}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Next
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TestInterface;
