useEffect(() => {
    const fetchData = async () => {
      try {
        let randomQuestions = (_.shuffle(questionsData)).slice(0,selectedNumberOfQuestions);
        setQuestions(randomQuestions);
      } catch (error) {
        console.error(error);
        alert("Oops! Something went wrong. Please try again later.");
      }
    };
  
    const timerId = setTimeout(() => {
      if (quizStarted && !quizFinished && timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else if ((quizStarted && !quizFinished && timeLeft === 0) || (quizStarted && !quizFinished && currentQuestion === questions.length - 1)) {
        handleTimeUp();
        handleTimeLeft();
      }
    }, 1000);
  
    if (quizStarted && !quizFinished && questions.length === 0) {
      fetchData();
    }
  
    if (timeLeft === 10) {
      setShowHint(true);
    }
  
    return () => clearTimeout(timerId);
  }, [questionsData, quizStarted, quizFinished, selectedNumberOfQuestions, timeLeft, currentQuestion, questions]);
  