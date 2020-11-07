import React, { useState, useEffect, useCallback } from 'react';
import Quiz from './components/Quiz';
import Result from './components/Result';
import axios from 'axios';
import _ from 'lodash';

//import quizQuestions from './api/quizQuestions';

function App() {

  const [counter, setCounter] = useState(0);
  const [current, setCurrent] = useState(1);
  const [correct, setCorrect] = useState([]);
  const [questionId, setQuestionId] = useState(1);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState('');
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
          url: '/stats/question',
          method: 'get'
      });
   
      const sample = _.sampleSize(result.data, 1);
      setQuizQuestions(sample);
      setQuestionId(sample[0]._id);
      setQuestion(sample[0].content);
    };
    fetchData();
  }, []);

  const handleAnswerSubmitted = useCallback((event) => {
    if (event.keyCode === 13) {
      const setNextQuestion = (() => {
        const newCounter = counter + 1;
        setCounter(newCounter);
        setCurrent(current + 1);
        setQuestionId(quizQuestions[counter + 1]._id);
        setQuestion(quizQuestions[counter + 1].content);
        setAnswer('');
      });

      const setResults = ((results) => {
        setResult(results);
      });

      const addToCorrect = (c) => {
        const newCorrect = [...correct, c];
        setCorrect(newCorrect);
      };

      event.preventDefault();
      // prints value from box, we need to verify this
      console.log(event.currentTarget.value);
      const submission = event.currentTarget.value; // needs to save the event info before its cleared
      
      // async call to verify the answer
      (async () => {
        const result = await axios({
          url: '/stats/question/' + questionId + '/answer',
          method: 'post',
          data: {
            answer: submission
          }});
        
        addToCorrect(result.data.correct);
        const allCorrect = [...correct, result.data.correct];
        console.log("CORRECT", allCorrect);

        if(counter + 1 < quizQuestions.length) {
          setTimeout(() => setNextQuestion(), 300);
        } else {
          const res = String(allCorrect.filter(Boolean).length) + " out of " + String(current);
          setTimeout(() => setResults(res), 300);
        }
        
      })();
    }
  }, [questionId, counter, quizQuestions, current, correct]);

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

  return (
    <div className="bg-blue-800 h-screen">

    <div className="text-center">
      <h1 className="text-6xl text-gray-300 font-stencil pt-12">J.A.T.T. Stats</h1>
    </div>

    <div>
      {(result !== '') ? <Result quizResult={result}/> : <Quiz 
        questionId={current}
        question={question}
        questionTotal={quizQuestions.length}
        onAnswerChange={handleAnswerChange}
        onAnswerSubmitted={handleAnswerSubmitted}
        answer={answer}
      />}
    </div>

    </div>);
  //console.log("Result", result);

}

export default App;
