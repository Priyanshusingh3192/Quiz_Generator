// aiService.js: Handles AI call, JSON validation, error handling, and retry
import { QUESTIONS_SCHEMA } from './questionsSchema';

// Simulate AI call for questions and feedback
function mockAIResponse(topic, score, total, feedbackOnly) {
  if (feedbackOnly) {
    return Promise.resolve({
      feedback: `Great job! You scored ${score} out of ${total} on the ${topic} quiz.`
    });
  }
  // 5 MCQs
  return Promise.resolve({
    questions: Array.from({ length: 5 }, (_, i) => ({
      text: `${topic} Question ${i + 1}?`,
      options: [
        'Option A',
        'Option B',
        'Option C',
        'Option D',
      ],
      correctOption: Math.floor(Math.random() * 4),
    }))
  });
}

function validateQuestions(data) {
  if (!data || !Array.isArray(data.questions)) return false;
  for (const q of data.questions) {
    if (
      typeof q.text !== 'string' ||
      !Array.isArray(q.options) ||
      typeof q.correctOption !== 'number' ||
      q.options.length !== 4
    ) return false;
  }
  return true;
}

export async function fetchQuestionsAndFeedback(topic, score, total, feedbackOnly = false, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const data = await mockAIResponse(topic, score, total, feedbackOnly);
      if (feedbackOnly) return data;
      if (validateQuestions(data)) return data;
    } catch (e) {}
  }
  throw new Error('Malformed AI response');
}
