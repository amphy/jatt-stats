import React, { useState, useEffect, useCallback, useRef } from 'react';
import Quiz from './components/Quiz';
import Result from './components/Result';
import axios from 'axios';
import _ from 'lodash';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function App() {

  // set up state
  const [counter, setCounter] = useState(0);
  const [current, setCurrent] = useState(1);
  const [correct, setCorrect] = useState([]);
  const [questionId, setQuestionId] = useState(1);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState('');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [inProp, setInProp] = useState(false);
  const [showLanding, setShowLanding] = useState(true);

  const fetchData = (async () => {
    const result = await axios({
      url: 'stats/question',
      method: 'get'
    });

    const sample = _.sampleSize(result.data, 10);
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
          url: 'stats/question/' + questionId + '/answer',
          method: 'post',
          data: {
            answer: submission
          }
        });

        addToCorrect(result.data.correct);
        const allCorrect = [...correct, result.data.correct];
        console.log("CORRECT", allCorrect);

        if (counter + 1 < quizQuestions.length) {
          setTimeout(() => setNextQuestion(), 300);
        } else {
          //const res = String(allCorrect.filter(Boolean).length) + " out of " + String(current);
          setTimeout(() => setResults(allCorrect.filter(Boolean).length), 300);
        }

      })();
    }
  }, [questionId, counter, quizQuestions, current, correct]);

  const handleAnswerChange = useCallback((event) => {
    setAnswer(event.target.value);
  }, []);

  const handleOnClick = useCallback(() => {
    setShowLanding(false);
  }, []);

  const nodeRef = useRef(null);
  console.log("RESULT", result, showLanding);
  console.log((result === '' && !showLanding));

  return (
    <div className="bg-gradient-to-b from-liquid-navy to-liquid-blue h-screen overflow-hidden">
      {!showLanding && <div className="text-center">
        <h1 className="text-6xl text-gray-200 font-stencil pt-12">J.A.T.T. STATS</h1>
      </div>}

      {showLanding && <div className="h-screen bg-cover md:overflow-hidden" style={{ backgroundImage: "linear-gradient(0deg, rgba(12, 34, 62, 0.8), rgba(12, 34, 62, 0.8)), url('https://i.ytimg.com/vi/iA0e_nWKjGM/maxresdefault.jpg')" }}>
        <div className="flex flex-col justify-center md:py-12 py-2 text-center">
          <div><h1 className="text-6xl text-gray-200 font-stencil pt-2 md:pt-12">J.A.T.T. STATS</h1></div>
          <div><span className="italic text-xl text-liquid-darkgold font-stencil px-8">I am the Judgmental Automated Telemetry Testing unit.</span></div>

          <div className="w-screen flex md:flex-row flex-col items-center flex-wrap-reverse justify-center max-w-full">
            <div><img className="md:max-w-3xl md:max-h-3xl max-h-md max-w-md place-self-start flex-shrink" src={process.env.PUBLIC_URL + '/jatt.png'} /></div>
            <div><button className="flex-shrink-0 bg-liquid-darkgold text-liquid-blue py-4 px-8 md:mt-12 mb-2 rounded max-h-full max-w-md text-lg hover:bg-liquid-white hover:text-liquid-navy" onClick={handleOnClick}>Try Your Skills</button></div>
          </div>
        </div></div>}

      <TransitionGroup>

        {result !== '' ? <Result
          quizResult={result}
          questionTotal={quizQuestions.length}
          onRestart={restartQuiz}
          inProp={inProp}
          nodeRef={nodeRef} /> :

        //{(result === '' && !showLanding) ? 
        <Quiz
          questionId={current}
          question={question}
          questionTotal={quizQuestions.length}
          onAnswerChange={handleAnswerChange}
          onAnswerSubmitted={handleAnswerSubmitted}
          answer={answer}
          inProp={inProp}
          nodeRef={nodeRef}
        />}
      </TransitionGroup>
    </div>);
}

export default App;
