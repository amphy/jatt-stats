import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

function Result(props) {
	const score = parseInt(props.quizResult.charAt(0));

	return (
		<CSSTransition nodeRef={props.nodeRef} key={props.quizResult} in={props.inProp} timeout={200} classNames="question">
		<div ref={props.nodeRef} className="flex flex-col text-center text-3xl text-gray-300 transition-opacity duration-1000 ease-in-out">
			<div className="pt-12">
				{score < 4 && <div className="flex flex-col justify-center items-center"><img className="max-w-full" src={process.env.PUBLIC_URL + '/tense_blue.png'} /><br/><blockquote className="block italic text-xl text-liquid-lightgold border-l-4 border-liquid-darkgold max-w-sm my-8 p-2">This is my fault. I expected too much from you. Adjusting difficulty settings, noob.</blockquote></div>}
				{(score >= 4 && score <= 7) && <div className="flex flex-col justify-center items-center"><img className="max-w-full" src={process.env.PUBLIC_URL + '/tense_blue.png'} /><br/><blockquote className="block italic text-xl text-liquid-lightgold border-l-4 border-liquid-darkgold max-w-sm my-8 p-2">J.A.T.T. stats has concluded. I hope you have found this interaction pleasant and fulfilling. You may resume your electronic sports variety program now.</blockquote></div>}
				{score > 7 && <div className="flex flex-col justify-center items-center"><img className="max-w-full" src={process.env.PUBLIC_URL + '/tense_blue.png'} /><br/><blockquote className="block italic text-xl text-liquid-lightgold border-l-4 border-liquid-darkgold max-w-sm my-8 p-2">[*nondescript beeping noises*] You've outsmarted J.A.T.T., but it seems angry so come back later for your prize.</blockquote></div>}
			</div>
			<div>
				You scored {props.quizResult}
			</div>
			<div className="py-4">
				<button className="transition-color duration-500 ease-in-out bg-liquid-darkgold px-4 py-2 rounded hover:bg-liquid-white hover:text-gray-800" onClick={props.onRestart}>Try Again</button>
			</div>
		</div>
		</CSSTransition>
		);
}

Result.propTypes = {
	quizResult: PropTypes.string.isRequired,
	onRestart: PropTypes.func.isRequired,
};

export default Result;