const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.post('/quiz-questions', quizController.getQuizQuestions);
router.post('/quiz-feedback', quizController.getQuizFeedback);
router.post('/chat-Bot', quizController.chatBot);

module.exports = router;
