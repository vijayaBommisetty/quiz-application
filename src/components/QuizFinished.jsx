function QuizFinished({ score, numQuestions }) {
  return (
    <div className="quiz-finished">
      <h2 className="quiz-finished-heading">Quiz Finished!</h2>
      <p className="quiz-finished-score">
        You scored {score} out of {numQuestions}.
      </p>
    </div>
  );
}

export default QuizFinished;