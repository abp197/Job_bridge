import React from "react";

const QuestionCard = ({ question, onAnswer, selectedAnswer }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">{question.question}</h2>
      <ul className="space-y-2">
        {question.options.map((option, index) => (
          <li
            key={index}
            className={`p-3 border rounded cursor-pointer ${
              selectedAnswer === option
                ? "bg-green-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => onAnswer(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionCard;
