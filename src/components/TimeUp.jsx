function TimeUp({ questions, currentQuestion }) {
    return (
      <div className="quiz-time-up top">
        <p>
          Time's up! The correct answer is:{" "}
          {questions[currentQuestion].choices[          questions[currentQuestion].answer_index
          ]}
        </p>
      </div>
    );
  }
  
  export default TimeUp;