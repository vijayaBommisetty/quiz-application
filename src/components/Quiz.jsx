import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Quiz.css';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);
    const [selectedNumberOfQuestions, setSelectedNumberOfQuestions] = useState(5);
    const [timeLeft, setTimeLeft] = useState(20);
    const [showHint, setShowHint] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [showTimeUp, setShowTimeUp] = useState(false);

    const fetchData = async () => {
      try {
       const questionsData = [
        {
          "question_id": 1,
          "question": "What famous Roman general and statesman was assassinated on the Ides of March in 44 BC?",
          "answer_index": 0,
          "choices": ["Julius Caesar", "Augustus", "Nero", "Caligula"],
          "hint": "He was also a renowned military commander.",
        },
        {
          "question_id": 2,
          "question": "What was the name of the ancient Roman currency?",
          "answer_index": 1,
          "choices": ["Sestertius", "Denarius", "Aureus", "As"],
          "hint": "It was a silver coin.",
        },
        {
          "question_id": 3,
          "question": "What famous building in Rome was originally built as a stadium for chariot races and other public events?",
          "answer_index": 1,
          "choices": ["The Colosseum", "Circus Maximus", "Pantheon", "Forum Romanum"],
          "hint": "It could hold up to 250,000 spectators.",
        },
        {
          "question_id": 4,
          "question": "What famous Roman emperor built a wall in northern Britain to protect against Scottish tribes?",
          "answer_index": 0,
          "choices": ["Hadrian", "Constantine", "Trajan", "Augustus"],
          "hint": "The wall is named after him.",
        },
        {
          "question_id": 5,
          "question": "What was the name of the first Roman emperor?",
          "answer_index": 3,
          "choices": ["Julius Caesar", "Tiberius", "Caligula", "Augustus"],
          "hint": "He was the nephew of Julius Caesar.",
        }
      ]
       //const {data} = await axios.get(`http://localhost:7000/quiz/${selectedNumberOfQuestions}`);
        //setQuestions(data.data);
        setQuestions(questionsData);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch questions from server when quiz starts
    useEffect(() => {
      if (quizStarted && !quizFinished && questions.length === 0) {
        fetchData();
      }
    }, [quizStarted, quizFinished, selectedNumberOfQuestions, questions.length]);

    // Countdown timer for each question
    useEffect(() => {
      if (quizStarted && !quizFinished && timeLeft > 0) {
        const intervalId = setInterval(() => {  
          setTimeLeft((timeLeft) => timeLeft - 1);
        }, 1000);
        return () => clearInterval(intervalId);
      } else if ((quizStarted && !quizFinished && timeLeft === 0) || (quizStarted && !quizFinished && currentQuestion === questions.length - 1)) {
        // Display the "Time's up!" message for 2 seconds
        setShowTimeUp(true);
        setTimeout(() => {
          // Move to the next question or finish the quiz
          if (currentQuestion + 1 === questions.length) {
            setQuizFinished(true);
          } else {
            setCurrentQuestion(currentQuestion + 1);
            setTimeLeft(20);
            setCorrectAnswer(questions[currentQuestion + 1].choices[questions[currentQuestion + 1].answer_index]);
            setShowHint(false);
            setShowTimeUp(false); // Reset the "Time's up!" message state
          }
        }, 2000);
        if (timeLeft === 0 && correctAnswer === null) {
          setCorrectAnswer(questions[currentQuestion].choices[questions[currentQuestion].answer_index]);
        }
      }
    }, [quizStarted, quizFinished, timeLeft, currentQuestion, correctAnswer, questions]);

    // Show hint when time is running out
    useEffect(() => {
      if (timeLeft === 10) {
        setShowHint(true);
      }
    }, [timeLeft]);

    // Start quiz and reset state
    const handleStartQuizClick = () => {
      setQuizStarted(true);
      setCurrentQuestion(0);
      setScore(0);
      setShowHint(false);
      setTimeLeft(20);
    };

    // Update number of questions to fetch from server
    const handleNumberOfQuestionsChange = (event) => {
      setSelectedNumberOfQuestions(event.target.value);
    };

    // Check answer and update score
    const handleAnswerClick = (index, answer_index) => {
      if (index === answer_index) {
        setScore(score + 1);
      }
      if (currentQuestion + 1 === questions.length) {
        setQuizFinished(true);
      } else {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(20);
        setCorrectAnswer(questions[currentQuestion + 1].choices[questions[currentQuestion + 1].answer_index]);
        setShowHint(false);
      }
    };
    return (
      <div>         
        {!quizStarted && (
          <div className="quiz-start">
            <h2 className="quiz-start-heading">Welcome to the Ancient Rome Quiz</h2>
            <button className="quiz-start-button" onClick={handleStartQuizClick}>Start Test</button>
            <label className="quiz-start-label" htmlFor="numberOfQuestions">Number of questions:</label>
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
        )}
        {quizStarted && !quizFinished && questions.length > 0 && (
          <div>
            <h2 className="quiz-question">Question {currentQuestion + 1}/{questions.length}</h2>
            <h3>{questions[currentQuestion].question}</h3>
            {showHint && (
              <p className="quiz-hint">Hint: {questions[currentQuestion].hint}</p>
            )}
            <p>Time left: {timeLeft}</p>
            {showTimeUp  && (
              <div className="quiz-time-up top">
                <p>Time's up! The correct answer is: {questions[currentQuestion].choices[questions[currentQuestion].answer_index]}</p>
              </div>
            )}

            <div>
              {questions[currentQuestion].choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index,questions[currentQuestion].answer_index)}
                  className="answer-button"
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>
        )}
        {quizFinished && (
          <div className="quiz-finished">
            <h2>Quiz Finished!</h2>
            <p>Your score is: {score} out of {questions.length}</p>
          </div>
        )}
      </div>
    );
};
export default Quiz;
