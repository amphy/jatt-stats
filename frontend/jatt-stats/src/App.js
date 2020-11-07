import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Quiz from './components/Quiz';
import Result from './components/Result';
import quizQuestions from './api/quizQuestions';

function App() {

  const [counter, setCounter] = useState(0);
  const [questionId, setQuestionId] = useState(1);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    setQuestion(quizQuestions[0].question);
  }, []);

  const handleAnswerSubmitted = useCallback((event) => {
    if (event.keyCode === 13) {
      const setNextQuestion = (() => {
        const newCounter = counter + 1;
        setCounter(newCounter);
        setQuestionId(questionId + 1);
        setQuestion(quizQuestions[counter + 1].question);
        setAnswer('');
      });

      const setResults = ((results) => {
        setResult(results);
      });

      console.log(event.currentTarget.value);
      if(questionId < quizQuestions.length) {
        console.log("HERE");
        setTimeout(() => setNextQuestion(), 300);
      } else {
        setTimeout(() => setResults("done"), 300);
      }
    }
  }, [questionId, counter]);

  const handleAnswerChange = useCallback((event) => {
    setAnswer(event.target.value);
  }, [])

  /*const renderResult = useCallback(() => {
    return ;
  }, [result]);

  const renderQuiz = useCallback(() => {
    return (<Quiz 
      questionId={questionId}
      question={question}
      questionTotal={quizQuestions.length}
      onAnswerSubmitted={handleAnswerSubmitted}
    />);
  }, [handleAnswerSubmitted, questionId, question]);*/

  return (<div>

    <h1 className="text-2xl">J.A.T.T. Stats</h1>

    {(result !== '') ? <Result quizResult={result}/> : <Quiz 
      questionId={questionId}
      question={question}
      questionTotal={quizQuestions.length}
      onAnswerChange={handleAnswerChange}
      onAnswerSubmitted={handleAnswerSubmitted}
      answer={answer}
    />}

    </div>);
  //console.log("Result", result);

}

export default App;
