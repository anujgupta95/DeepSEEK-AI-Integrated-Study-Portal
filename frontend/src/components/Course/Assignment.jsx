import React, { useState } from "react";
import {Button} from "@/components/ui/button";

export default function Assignment({ module }) {
  const deadline = new Date(module.deadline).toLocaleString();
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Handle answer selection for MCQ & MSQ
  const handleAnswerChange = (questionIndex, value, isMultiSelect = false) => {
    setUserAnswers((prev) => {
      if (isMultiSelect) {
        const updatedAnswers = prev[questionIndex] ? [...prev[questionIndex]] : [];
        if (updatedAnswers.includes(value)) {
          return { ...prev, [questionIndex]: updatedAnswers.filter((v) => v !== value) };
        } else {
          return { ...prev, [questionIndex]: [...updatedAnswers, value] };
        }
      } else {
        return { ...prev, [questionIndex]: value };
      }
    });
  };

  // Handle input change for NAT
  const handleInputChange = (questionIndex, event) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: event.target.value }));
  };

  // Check answers when the button is clicked
  const checkAnswers = () => {
    setShowResults(true);
  };

  return (
    <div>
      {/* Display Deadline */}
      <h3 className="font-semibold">Deadline: {deadline}</h3>

      <h4 className="font-medium mt-4">Quiz Questions:</h4>

      {module.questions.map((question, index) => {
        const userAnswer = userAnswers[index] || "";
        const correctAnswer = question.correctAnswer;
        let isCorrect = false;

        // Check correctness for different question types
        if (showResults) {
          if (question.type === "mcq" || question.type === "nat") {
            isCorrect = userAnswer.toString().trim().toLowerCase() === correctAnswer.toString().trim().toLowerCase();
          } else if (question.type === "msq") {
            const correctSet = new Set(Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer]);
            const userSet = new Set(Array.isArray(userAnswer) ? userAnswer : [userAnswer]);
            isCorrect = correctSet.size === userSet.size && [...correctSet].every((val) => userSet.has(val));
          }
        }

        return (
          <div key={index} className="mt-4">
            <p>{question.question}</p>

            {/* Multiple Choice Question (MCQ) */}
            {question.type === "mcq" &&
              question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    id={`option-${index}-${optionIndex}`}
                    checked={userAnswer === option}
                    onChange={() => handleAnswerChange(index, option)}
                  />
                  <label htmlFor={`option-${index}-${optionIndex}`}> {option}</label>
                </div>
              ))}

            {/* Multiple Select Question (MSQ) */}
            {question.type === "msq" &&
              question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <input
                    type="checkbox"
                    name={`question-${index}`}
                    id={`option-${index}-${optionIndex}`}
                    checked={userAnswer.includes(option)}
                    onChange={() => handleAnswerChange(index, option, true)}
                  />
                  <label htmlFor={`option-${index}-${optionIndex}`}> {option}</label>
                </div>
              ))}

            {/* Numeric Answer Type (NAT) */}
            {question.type === "nat" && (
              <input
                type="text"
                placeholder="Type your answer here"
                className="border border-gray-300 rounded-md p-2 mt-2 w-full"
                value={userAnswer}
                onChange={(e) => handleInputChange(index, e)}
              />
            )}

            {/* Show Results After Checking */}
            {showResults && (
              <p className={`mt-2 text-sm font-semibold ${isCorrect ? "text-green-500" : "text-red-500"}`}>
                {isCorrect ? "✅ Correct!" : `❌ Incorrect. Correct answer: ${correctAnswer}`}
              </p>
            )}
          </div>
        );
      })}

      {/* Conditional Button */}
      <div className="mt-4">
        {!module.isGraded && (
          <Button onClick={checkAnswers} variant="default">Check Answers</Button>
        )}
        {module.isGraded && (
          <Button variant="default">Submit Answers</Button>
        )}
      </div>
    </div>
  );
}
