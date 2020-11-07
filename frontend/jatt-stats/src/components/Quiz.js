import React from 'react';
import PropTypes from 'prop-types';

// Component imports
import Question from './Question';
import QuestionCount from './QuestionCount';
import Answer from './Answer';

function Quiz(props) {
	return (
		<div>
		<QuestionCount
			counter={props.questionId}
			total={props.questionTotal}
			/>

		<Question content={props.question}/>
      
      	<Answer value={props.answer} onAnswerChange={props.onAnswerChange} onAnswerSubmitted={props.onAnswerSubmitted}/>
      	</div>
      );
}

Quiz.propTypes = {
	questionId: PropTypes.number.isRequired,
	questionTotal: PropTypes.number.isRequired,
	question: PropTypes.string.isRequired,
	onAnswerChange: PropTypes.func.isRequired,
	onAnswerSubmitted: PropTypes.func.isRequired,
	answer: PropTypes.string.isRequired
}

export default Quiz;