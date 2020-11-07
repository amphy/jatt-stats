import React from 'react';
import PropTypes from 'prop-types';

// Component imports
import Question from './Question';
import QuestionCount from './QuestionCount';
import Answer from './Answer';

function Quiz(props) {
	return (
		<div className="flex flex-row justify-around">
			<div className="flex flex-col max-w-lg p-12">
				<div className="text-2xl text-gray-300">
					<QuestionCount
						counter={props.questionId}
						total={props.questionTotal}
						/>
				</div>

				<div className="text-4xl text-gray-300">
					<Question content={props.question}/>
				</div>
			</div>
	      	<div className="content-center">
	      		<Answer value={props.answer} onAnswerChange={props.onAnswerChange} onAnswerSubmitted={props.onAnswerSubmitted}/>
	      	</div>
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