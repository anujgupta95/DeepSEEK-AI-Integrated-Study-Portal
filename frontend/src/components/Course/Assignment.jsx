import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Assignment({ module, deadline, isGraded }) {
  const formattedDeadline = deadline ? new Date(deadline).toLocaleString() : "No deadline provided";
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showHintIndex, setShowHintIndex] = useState(null); // Track which hint is shown
  const [showAnswerIndex, setShowAnswerIndex] = useState(null); // Track which answer is shown

  // Handle answer selection for MCQ & MSQ
  const handleAnswerChange = (questionIndex, value, isMultiSelect = false) => {
    setUserAnswers((prev) => {
      if (isMultiSelect) {
        const updatedAnswers = prev[questionIndex] ? [...prev[questionIndex]] : [];
        return {
          ...prev,
          [questionIndex]: updatedAnswers.includes(value)
            ? updatedAnswers.filter((v) => v !== value)
            : [...updatedAnswers, value],
        };
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

  // Show hint for a specific question
  const showHint = (index) => {
    setShowHintIndex(index);
  };

  // Show correct answer for a specific question
  const showAnswer = (index) => {
    setShowAnswerIndex(index);
  };

  return (
    <div>
      {/* Display Deadline */}
      <h3 className="font-semibold">Deadline: {formattedDeadline}</h3>

      <h4 className="font-medium mt-4">Quiz Questions:</h4>

      {module.questions.map((question, index) => {
        const userAnswer = userAnswers[index] || "";
        const correctAnswer = question.correctAnswer;
        const hint = question.hint || null; // Use null if no hint provided
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
            {showResults && !isGraded && (
              <p className={`mt-2 text-sm font-semibold ${isCorrect ? "text-green-500" : "text-red-500"}`}>
                {isCorrect ? "✅ Correct!" : "❌ Incorrect."}
              </p>
            )}

            {/* Show Hint Button or Message */}
            {showResults && !isCorrect && !isGraded && (
              <div className="mt-2">
                {showHintIndex === index ? (
                  <p className="text-blue-500 text-sm">💡 
                    {hint ? ` Hint: ${hint}` : " No hint available"}
                  </p>
                ) : (
                  <Button className="text-xs p-2" onClick={() => showHint(index)}>Show Hint</Button>
                )}

                {/* Show Answer Button */}
                {showHintIndex === index && showAnswerIndex !== index && (
                  <Button className="text-xs p-2 ml-2" onClick={() => showAnswer(index)}>Show Answer</Button>
                )}

                {/* Show Correct Answer */}
                {showAnswerIndex === index && (
                  <p className="text-green-500 text-sm mt-2">✅ Correct Answer: {Array.isArray(correctAnswer) ? correctAnswer.join(", ") : correctAnswer}</p>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Conditional Button */}
      <div className="mt-4">
        {!isGraded && (
          <Button onClick={checkAnswers} variant="default">Check Answers</Button>
        )}
        {isGraded && (
          <Button variant="default" onClick={() => {alert("Your submission is successful.")}}>Submit Answers</Button>
        )}
      </div>
    </div>
  );
}
