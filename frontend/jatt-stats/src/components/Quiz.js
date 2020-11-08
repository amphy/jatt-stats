import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

// Component imports
import Question from './Question';
import QuestionCount from './QuestionCount';
import Answer from './Answer';


function Quiz(props) {
	return (
		<CSSTransition nodeRef={props.nodeRef} key={props.questionId} in={props.inProp} timeout={200} classNames="question" unmountOnExit>
		<div ref={props.nodeRef} className="flex flex-row justify-around items-center flex-wrap transition-opacity duration-1000 ease-in-out">
			<div className="flex flex-col max-w-lg p-12">
				<div className="md:text-2xl text-lg text-liquid-white">
					<QuestionCount
						counter={props.questionId}
						total={props.questionTotal}
						/>

					{props.hi}
				</div>

				<div className="md:text-4xl text-gray-200 text-2xl py-4">
					<Question content={props.question}/>
				</div>
			</div>
	      	<div>
	      		<Answer value={props.answer} onAnswerChange={props.onAnswerChange} onAnswerSubmitted={props.onAnswerSubmitted}/>
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