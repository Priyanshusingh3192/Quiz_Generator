import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuestionComponent from './QuestionComponent';

async function fetchQuestionsFromBackend(topic, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await axios.post('http://localhost:5000/api/quiz-questions', { topic });
      if (response.data && Array.isArray(response.data.questions) && response.data.questions.length === 5) {
        return response.data.questions;
      }
    } catch (e) {
      // Try again if error
    }
  }
  throw new Error('Malformed server response');
}

async function fetchFeedbackFromBackend(topic, score, total, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await axios.post('http://localhost:5000/api/quiz-feedback', { topic, score, total });
      if (response.data && typeof response.data.feedback === 'string') {
        return response.data.feedback;
      }
    } catch (e) {}
  }
  return 'Thank you for taking the quiz!';
}

function QuizScreen({ topic, onComplete }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    fetchQuestionsFromBackend(topic)
      .then((questions) => {
        if (isMounted) {
          setQuestions(questions);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Failed to load questions. Please try again.');
          setLoading(false);
        }
      });
    return () => { isMounted = false; };
  }, [topic]);

  const handleAnswer = (selectedIdx) => {
    const updated = [...answers];
    updated[current] = selectedIdx;
    setAnswers(updated);
  };

  const handleNext = () => setCurrent((c) => c + 1);
  const handlePrev = () => setCurrent((c) => c - 1);

  const handleFinish = async () => {
    const correct = questions.reduce((acc, q, i) =>
      acc + (answers[i] === q.correctOption ? 1 : 0), 0);
    const feedback = await fetchFeedbackFromBackend(topic, correct, questions.length);
    onComplete(correct, questions, feedback);
  };

  if (loading) return <div>Loading questions...</div>;
  if (error) return <div>{error}</div>;
  if (!questions.length) return <div>No questions found.</div>;

  const styles = {
    container: {
      height: '100vh',
      width: '100%',
      margin: 0,
      padding: '2rem 1rem',
      background: 'linear-gradient(-45deg, #FF512F, #DD2476, #4776E6, #8E54E9)',
      backgroundSize: '400% 400%',
      animation: 'gradient 15s ease infinite',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      overflow: 'hidden',
    },
    progressContainer: {
      width: '100%',
      maxWidth: '800px',
      marginBottom: '2rem',
      padding: '1rem',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '15px',
      backdropFilter: 'blur(10px)',
    },
    progressBar: {
      width: '100%',
      height: '8px',
      marginBottom: '1rem',
      appearance: 'none',
      border: 'none',
      borderRadius: '10px',
      background: 'rgba(255, 255, 255, 0.2)',
    },
    progressText: {
      color: 'white',
      fontSize: '1.1rem',
      textAlign: 'center',
      fontWeight: '500',
    },
    contentCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '800px',
      maxHeight: 'calc(100vh - 200px)',
      overflowY: 'auto',
      backdropFilter: 'blur(10px)',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      marginTop: '2rem',
    },
    button: {
      padding: '0.8rem 1.5rem',
      fontSize: '1rem',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: '600',
      color: 'white',
      background: 'linear-gradient(135deg, #3498db, #2980b9)',
    },
    disabledButton: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.progressContainer}>
        <progress 
          value={current + 1} 
          max={questions.length} 
          style={styles.progressBar}
        />
        <div style={styles.progressText}>
          Question {current + 1} of {questions.length}
        </div>
      </div>
      <div style={styles.contentCard}>
        <QuestionComponent
          question={questions[current]}
          selected={answers[current]}
          onSelect={handleAnswer}
        />
        <div style={styles.buttonContainer}>
          <button 
            onClick={handlePrev} 
            disabled={current === 0}
            style={{
              ...styles.button,
              ...(current === 0 ? styles.disabledButton : {})
            }}
          >
            Previous
          </button>
          {current < questions.length - 1 ? (
            <button 
              onClick={handleNext} 
              disabled={answers[current] == null}
              style={{
                ...styles.button,
                ...(answers[current] == null ? styles.disabledButton : {})
              }}
            >
              Next
            </button>
          ) : (
            <button 
              onClick={handleFinish} 
              disabled={answers[current] == null}
              style={{
                ...styles.button,
                background: 'linear-gradient(135deg, #2ecc71, #27ae60)',
                ...(answers[current] == null ? styles.disabledButton : {})
              }}
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizScreen;
