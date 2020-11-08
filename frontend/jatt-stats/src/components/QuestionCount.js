import React from 'react';
import PropTypes from 'prop-types';

function QuestionCount(props) {
	return (
		<div className="questionCount">
			Question <span className="text-liquid-darkgold">{props.counter}</span> of <span className="text-liquid-darkgold">{props.total}</span>
		</div>);
}

QuestionCount.propTypes = {
	counter: PropTypes.number.isRequired,
	total: PropTypes.number.isRequired
};

export default QuestionCount;