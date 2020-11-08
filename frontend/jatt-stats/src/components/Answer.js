import React from 'react';
import PropTypes from 'prop-types';

function Answer(props) {
	return (
		<div>
			<label className="block text-xl text-liquid-darkgold font-bold text-left mb-1 md:mb-0 pr-4">Your Answer:</label>
			<input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-liquid-navy leading-tight focus:outline-none focus:bg-white focus:border-liquid-navy"
				type="text"
				value={props.value}
				onChange={props.onAnswerChange}
				onKeyDown={props.onAnswerSubmitted}
				/>
		</div>);
}

Answer.propTypes = {
	value: PropTypes.string.isRequired,
	onAnswerChange: PropTypes.func.isRequired,
	onAnswerSubmitted: PropTypes.func.isRequired
};

export default Answer;