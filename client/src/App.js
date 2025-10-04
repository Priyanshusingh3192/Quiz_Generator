import React, { useState } from 'react';
import TopicSelectionScreen from './components/TopicSelectionScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';

const SCREENS = {
  TOPIC: 'TOPIC',
  QUIZ: 'QUIZ',
  RESULT: 'RESULT',
};

function App() {
  const [screen, setScreen] = useState(SCREENS.TOPIC);
  const [topic, setTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleTopicSelect = (selectedTopic) => {
    setTopic(selectedTopic);
    setScreen(SCREENS.QUIZ);
  };

  const handleQuizComplete = (userScore, questions, aiFeedback) => {
    setScore(userScore);
    setQuestions(questions);
    setFeedback(aiFeedback);
    setScreen(SCREENS.RESULT);
  };

  const handleRestart = () => {
    setScreen(SCREENS.TOPIC);
    setTopic(null);
    setQuestions([]);
    setScore(0);
    setFeedback('');
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      {screen === SCREENS.TOPIC && (
        <TopicSelectionScreen onSelect={handleTopicSelect} />
      )}
      {screen === SCREENS.QUIZ && topic && (
        <QuizScreen
          topic={topic}
          onComplete={handleQuizComplete}
        />
      )}
      {screen === SCREENS.RESULT && (
        <ResultScreen
          score={score}
          questions={questions}
          feedback={feedback}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
