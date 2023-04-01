import React, { useState, useEffect} from 'react';
//import axios from 'axios';
import './Quiz.css';
import _ from 'lodash';
import questionsData from'./questionsSet.js';
import QuizFinished from "./QuizFinished";
import QuizStart from "./QuizStart";
import QuizQuestion from "./QuizQuestion";

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
        let randomQuestions = (_.shuffle(questionsData)).slice(0,selectedNumberOfQuestions);
       //const {data} = await axios.get(`http://localhost:7000/quiz/${selectedNumberOfQuestions}`);
        //setQuestions(data.data);
        setQuestions(randomQuestions);
      } catch (error) {
        console.error(error);
        alert("Oops! Something went wrong. Please try again later.");
      }
    };

    // Fetch questions from server when quiz starts
    useEffect(() => {
      if (quizStarted && !quizFinished && questions.length === 0) {
        fetchData();
      }
    }, [fetchData,questionsData,quizStarted, quizFinished, selectedNumberOfQuestions]);


    useEffect(() => {
      if (quizStarted && !quizFinished && timeLeft > 0) {
        console.log('Current timeLeft:', timeLeft); 
        const timerId = setInterval(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(timerId);
      }else if ((quizStarted && !quizFinished && timeLeft === 0) || (quizStarted && !quizFinished && currentQuestion === questions.length - 1)) {
         // Display the "Time's up!" message for 2 seconds
         setShowTimeUp(true);
         setTimeout(() => {
          console.log("Move to the next question or finish the quiz");
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
    }, [quizStarted, quizFinished, timeLeft,currentQuestion, correctAnswer, questions]);
      
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
        console.log("moving to next question")
        const nextQuestion = questions[currentQuestion + 1];
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(20);
        setCorrectAnswer(nextQuestion.choices[nextQuestion.answer_index]);
        setShowHint(false);
      }
    };

    return (
      <div>
        {!quizStarted ? (
          <QuizStart
            handleStartQuizClick={handleStartQuizClick}
            selectedNumberOfQuestions={selectedNumberOfQuestions}
            handleNumberOfQuestionsChange={handleNumberOfQuestionsChange}
          />
        ) : quizStarted && !quizFinished && questions.length > 0 ? (
          <QuizQuestion
            currentQuestion={currentQuestion}
            questions={questions}
            showHint={showHint}
            timeLeft={timeLeft}
            showTimeUp={showTimeUp}
            handleAnswerClick={handleAnswerClick}
          />
        ) : quizFinished ? (
          <QuizFinished score={score} numQuestions={questions.length}/>
        ) : null}
      </div>
    );
    
};
export default Quiz;
