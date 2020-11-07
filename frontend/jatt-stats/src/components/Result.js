import React from 'react';
import PropTypes from 'prop-types';

function Result(props) {
	return (
		<div>
			the result is {props.quizResult}
		</div>);
}

Result.propTypes = {
	quizResult: PropTypes.string.isRequired
};

export default Result;