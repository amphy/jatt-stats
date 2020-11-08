import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

// Component imports
import Question from './Question';
import QuestionCount from './QuestionCount';
import Answer from './Answer';


function Quiz(props) {
	return (
		<CSSTransition nodeRef={props.nodeRef} key={props.questionId} in={props.inProp} timeout={200} classNames="question">
		<div ref={props.nodeRef} className="flex flex-row justify-around items-start flex-wrap transition-opacity duration-1000 ease-in-out">
			<div className="flex flex-col max-w-lg p-12">
				<div className="md:text-2xl text-lg text-liquid-white">
					<QuestionCount
						counter={props.questionId}
						total={props.questionTotal}
						/>

					{props.hi}
				</div>

				<div className="lg:text-4xl md:text-3xl text-gray-200 text-2xl py-4">
					<Question content={props.question}/>
				</div>
			</div>
	      	<div className="flex flex-col max-h-screen">
	      		<div className="max-w-full px-8 lg:pt-24"><Answer value={props.answer} onAnswerChange={props.onAnswerChange} onAnswerSubmitted={props.onAnswerSubmitted}/></div>
	      		<div><img className="max-w-md max-h-md lg:max-w-lg lg:max-h-lg" src={process.env.PUBLIC_URL + '/jatt.png'}/></div>
	      	</div>
      	</div>   
      	</CSSTransition>
      );
}

Quiz.propTypes = {
	questionId: PropTypes.number.isRequired,
	questionTotal: PropTypes.number.isRequired,
	question: PropTypes.string.isRequired,
	onAnswerChange: PropTypes.func.isRequired,
	onAnswerSubmitted: PropTypes.func.isRequired,
	answer: PropTypes.string.isRequired,
}

export default Quiz;