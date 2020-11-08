import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

function Result(props) {
	return (
		<CSSTransition nodeRef={props.nodeRef} in={props.inProp} timeout={200} classNames="question">
		<div ref={props.nodeRef} className="flex flex-col text-center text-3xl text-gray-300 transition-opacity duration-1000 ease-in-out">
			<div>
				You scored {props.quizResult}
			</div>
			<div className="py-4">
				<button className="transition-color duration-500 ease-in-out bg-liquid-darkgold px-4 py-2 rounded hover:bg-liquid-white hover:text-gray-800" onClick={props.onRestart}>Try Again</button>
			</div>
		</div>
		</CSSTransition>);
}

Result.propTypes = {
	quizResult: PropTypes.string.isRequired,
	onRestart: PropTypes.func.isRequired,
};

export default Result;