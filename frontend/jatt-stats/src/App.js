import React, { useState, useEffect, useCallback, useRef } from 'react';
import Quiz from './components/Quiz';
import Result from './components/Result';
import axios from 'axios';
import _ from 'lodash';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function App() {

  const [counter, setCounter] = useState(0);
  const [current, setCurrent] = useState(1);
  const [correct, setCorrect] = useState([]);
  const [questionId, setQuestionId] = useState(1);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState('');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [inProp, setInProp] = useState(false);

  const fetchData = (async () => {
    const result = await axios({
        url: '/stats/question',
        method: 'get'
    });
 
    const sample = _.sampleSize(result.data, 2);
    setQuizQuestions(sample);
    setQuestionId(sample[0]._id);
    setQuestion(sample[0].content);
    setInProp(true);
  });

  useEffect(() => {
    fetchData();
  }, []);

  const restartQuiz = useCallback(() => {
    setInProp(false);
    setCounter(0);
    setCurrent(1);
    setCorrect([]);
    setResult('');
    setAnswer('');
    setQuestion('');
    fetchData();
  }, []);

  const handleAnswerSubmitted = useCallback((event) => {
    if (event.keyCode === 13) {
      setInProp(true);

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

  const nodeRef= useRef(null);

  return (
    <div className="bg-liquid-blue h-screen">

    <div className="text-center">
      <h1 className="text-6xl text-gray-200 font-stencil pt-12">J.A.T.T. STATS</h1>
    </div>
    <TransitionGroup unmountOnExit>
    
      <div>
      {(result !== '') ? <Result 
      quizResult={result} 
      onRestart={restartQuiz}
      inProp={inProp}
      nodeRef={nodeRef}/> 
      : <Quiz 
        questionId={current}
        question={question}
        questionTotal={quizQuestions.length}
        onAnswerChange={handleAnswerChange}
        onAnswerSubmitted={handleAnswerSubmitted}
        answer={answer}
        inProp={inProp}
        nodeRef={nodeRef}
      />}
      </div>

    </TransitionGroup>

    </div>);
}

export default App;
