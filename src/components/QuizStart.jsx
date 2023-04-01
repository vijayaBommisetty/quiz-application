import React from "react";

function QuizStart({ handleStartQuizClick, selectedNumberOfQuestions, handleNumberOfQuestionsChange }) {
  return (
    <div className="quiz-start">
      <h2 className="quiz-start-heading">Welcome to the Ancient Rome Quiz</h2>
      <button className="quiz-start-button" onClick={handleStartQuizClick}>
        Start Test
      </button>
      <label className="quiz-start-label" htmlFor="numberOfQuestions">
        Number of questions:
      </label>
      <select
        className="quiz-start-select"
        name="numberOfQuestions"
        id="numberOfQuestions"
        value={selectedNumberOfQuestions}
        onChange={handleNumberOfQuestionsChange}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
    </div>
  );
}

export default QuizStart;
