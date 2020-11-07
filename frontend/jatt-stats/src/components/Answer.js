import React from 'react';
import PropTypes from 'prop-types';

function Answer(props) {
	return (
		<input 
			type="text"
			value={props.value}
			onChange={props.onAnswerChange}
			onKeyDown={props.onAnswerSubmitted}
			/>);
}

Answer.propTypes = {
	value: PropTypes.string.isRequired,
	onAnswerChange: PropTypes.func.isRequired,
	onAnswerSubmitted: PropTypes.func.isRequired
};

export default Answer;