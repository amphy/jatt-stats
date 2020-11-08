import _ from 'lodash';
import axios from 'axios';



/*let quizQuestions = [];

;(async () => {
  const response = await axios({
	url: 'stats/question',
	method: 'get'
  });

  console.log(response.data);

  quizQuestions = _.sampleSize(response.data, 1);
  console.log(quizQuestions);

})()*/

async function getQuizQuestions() {
	return new Promise((resolve, reject) => {
		axios({
			url: 'stats/question',
			method: 'get'
		}).then((response, error) => {
			if (!error && response.status === 200) {
				console.log(response.data);
				resolve(response.data);
			} else {
				reject(new Error("getQuizQuestions call failed"));
			}
		});

		/*if (!error && response.status === 200) {
				console.log(response.data);
				resolve(response.data);
			} else {
				reject(new Error("getQuizQuestions call failed"));
			}*/
	});
}


export default quizQuestions = getQuizQuestions();

