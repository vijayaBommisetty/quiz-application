import React from "react";
import TimeUp  from "./TimeUp";
function QuizQuestion({
  currentQuestion,
  questions,
  showHint,
  timeLeft,
  showTimeUp,
  handleAnswerClick,
}) {
  return (
    <div>
      <h2 className="quiz-question">
        Question {currentQuestion + 1}/{questions.length}
      </h2>
      <h3>{questions[currentQuestion].question}</h3>
      {showHint && (
        <p className="quiz-hint">Hint: {questions[currentQuestion].hint}</p>
      )}
      <p>Time left: {timeLeft}</p>
      {showTimeUp && <TimeUp questions={questions} currentQuestion={currentQuestion} />}

      <div>
        {questions[currentQuestion].choices.map((choice, index) => (
          <button
            key={index}
            onClick={() =>
              handleAnswerClick(index, questions[currentQuestion].answer_index)
            }
            className="answer-button"
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuizQuestion;
