import React from 'react';

const TOPICS = [
  'Wellness',
  'Tech Trends',
  'Science',
  'History',
  'Geography',
  'Sports',
  'Movies',
  'Music',
  'Literature',
  'Art',
  'Mathematics',
  'Biology',
  'Physics',
  'Chemistry',
  'Space',
  'Politics',
  'Economics',
  'Business',
  'Programming',
  'Artificial Intelligence',
  'Environment',
  'Travel',
  'Food',
  'Fashion',
  'Philosophy',
  'Psychology',
  'Education',
  'Languages',
  'Mythology',
  'Technology',
  'Current Events',
];

const styles = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    margin: 0,
    padding: '2rem 1rem',
    background: 'linear-gradient(-45deg, #FF512F, #DD2476, #4776E6, #8E54E9)',
    backgroundSize: '400% 400%',
    animation: 'gradient 15s ease infinite',
    overflowX: 'hidden',
    overflowY: 'auto',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  '@keyframes gradient': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
    position: 'relative',
    zIndex: 2,
    animation: 'fadeIn 1s ease-out',
  },
  title: {
    fontSize: '4rem',
    fontWeight: '700',
    background: 'linear-gradient(45deg, #2c3e50, #3498db)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '1rem',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
    letterSpacing: '-1px',
  },
  subtitle: {
    fontSize: '1.4rem',
    color: '#34495e',
    opacity: 0.9,
    fontWeight: '500',
    maxWidth: '600px',
    margin: '0 auto',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    gap: '2rem',
    padding: '1rem',
    width: '100%',
    marginTop: '1rem',
  },
  card: {
    margin: '0.5rem',
    flex: '0 0 auto',
  },
  button: {
    width: '100px',
    height: '100px',
    padding: '1rem',
    border: 'none',
    background: 'rgba(255, 255, 255, 0.85)',
    color: '#2c3e50',
    fontSize: '0.95rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '50%',
    aspectRatio: '1',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    wordBreak: 'break-word',
    lineHeight: '1.2',
    backdropFilter: 'blur(8px)',
    border: '2px solid rgba(255, 255, 255, 0.1)',
  },
};

function TopicSelectionScreen({ onSelect }) {
  const handleHover = (e) => {
    e.currentTarget.style.transform = 'scale(1.15) translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 15px 30px rgba(52, 152, 219, 0.3)';
    e.currentTarget.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
    e.currentTarget.style.color = 'white';
    e.currentTarget.style.border = '2px solid rgba(255, 255, 255, 0.3)';
  };

  const handleLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
    e.currentTarget.style.color = '#2c3e50';
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Quiz Master</h1>
        <p style={styles.subtitle}>Choose your topic and test your knowledge!</p>
      </header>
      <div style={styles.grid}>
        {TOPICS.map((topic) => (
          <div key={topic} style={styles.card}>
            <button 
              onClick={() => onSelect(topic)}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
              style={styles.button}
            >
              {topic}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopicSelectionScreen;
