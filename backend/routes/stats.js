var express = require('express');
var router = express.Router();

/* GET stats listing. */
router.get('/', function (req, res, next) {
  res.send('GET /question/:id\nPOST /question/:id/answer');
});

router.get('/question/:id', (req, res, next) => {
  res.send("Is this a hardcoded question?");
});

router.post('/question/:id/answer', (req, res, next) => {
  const answer = req.body.answer;
  if (!answer) {
    res.status(401);
    res.send("no answer provided")
  }
  Math.random()
  res.send({
    correct: Math.round(Math.random()) === 0 ? false : true,
    answer: req.body.answer
  })
});

module.exports = router;
