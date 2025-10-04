import React from 'react';

function LoadingScreen() {
  const styles = {
    container: {
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
      backgroundSize: '400% 400%',
      animation: 'gradient 15s ease infinite',
    },
    loadingCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '2rem',
      maxWidth: '400px',
      width: '90%',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
    },
    spinner: {
      width: '50px',
      height: '50px',
      margin: '20px auto',
      border: '5px solid rgba(0, 0, 0, 0.1)',
      borderTopColor: '#3498db',
      borderRadius: '50%',
      animation: 'spin 1s ease-in-out infinite',
    },
    text: {
      fontSize: '1.5rem',
      color: '#2c3e50',
      marginTop: '1rem',
      fontWeight: '500',
    },
    subText: {
      fontSize: '1rem',
      color: '#7f8c8d',
      marginTop: '0.5rem',
    },
    '@keyframes spin': {
      to: { transform: 'rotate(360deg)' }
    },
    '@keyframes gradient': {
      '0%': { backgroundPosition: '0% 50%' },
      '50%': { backgroundPosition: '100% 50%' },
      '100%': { backgroundPosition: '0% 50%' }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loadingCard}>
        <div style={styles.spinner}></div>
        <div style={styles.text}>Generating Quiz</div>
        <div style={styles.subText}>Preparing your questions...</div>
      </div>
    </div>
  );
}

export default LoadingScreen;