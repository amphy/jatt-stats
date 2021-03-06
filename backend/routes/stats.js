var express = require('express');
const mongoose = require('mongoose');
let debug = require('debug');

var router = express.Router();


// setup database connection

// Setup DB connection
const uri = 'mongodb+srv://jattAdmin:' + process.env.PW + '@jatt-stats.ysp08.mongodb.net/' + process.env.DB + '?retryWrites=true&w=majority';

mongoose.connect(uri, {  useNewUrlParser: true,  useUnifiedTopology: true});

// Get the default connection
var db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// define the two schemas for the collections
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  _id: Schema.Types.ObjectId,
  questionId: Number,
  content: String
});

var AnswerSchema = new Schema({
  _id: Schema.Types.ObjectId,
  questionId: Schema.Types.ObjectId,
  answer: String
});

/* GET stats listing. */
router.get('/', function (req, res, next) {
  res.send('GET /question/:id\nPOST /question/:id/answer');
});

router.get('/question/', (req, res, next) => {
  var Question = mongoose.model('Question', QuestionSchema);

  // find question with this id, selecting the 'questionId' and 'content' fields
  Question.find({}, '_id content', function (err, questions) {
    if (err) return handleError(err);
    res.send(questions);
  });

});

router.get('/question/:id', (req, res, next) => {
  var Question = mongoose.model('Question', QuestionSchema);

  // find question with this id, selecting the 'questionId' and 'content' fields
  Question.findOne({ '_id': req.params.id }, 'questionId content', function (err, questions) {
    if (err) return handleError(err);
    res.send(questions);
  });

});

router.post('/question/:id/answer', (req, res, next) => {
  let AnswerModel = mongoose.model('Answer', AnswerSchema);
  const answer = req.body.answer;
  console.log("ANSWER", answer);
  if (!answer) {
    return res.status(401);
    //res.send("no answer provided")
  }
  AnswerModel.findOne({'questionId': req.params.id}, 'answer', function (err, answerRes) {
    console.log(req.params.id);
    if (err) return next(err); //res.status(err.code).json({ error: err.toString() });
    if (answer.toLowerCase() === String(answerRes.answer).toLowerCase()) {
      res.send({
        correct: true,
        answer: String(answerRes.answer),
        yourAnswer: answer
      });
    } else {
      res.send({
        correct: false,
        answer: String(answerRes.answer),
        yourAnswer: answer
      });
    }
  });
});

module.exports = router;
