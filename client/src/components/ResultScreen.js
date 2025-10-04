// import React, { useState } from 'react';

// function ResultScreen({ score, questions, feedback, onRestart }) {
//   const [chatInput, setChatInput] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [chatLoading, setChatLoading] = useState(false);

//   const styles = {
//     container: {
//       minHeight: '100vh',
//       width: '100%',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       padding: '2rem',
//       background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
//       backgroundSize: '400% 400%',
//       animation: 'gradient 15s ease infinite',
//     },
//     card: {
//       background: 'rgba(255, 255, 255, 0.95)',
//       borderRadius: '20px',
//       padding: '2rem',
//       maxWidth: '600px',
//       width: '90%',
//       boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
//       backdropFilter: 'blur(10px)',
//       animation: 'slideUp 0.5s ease-out',
//     },
//     title: {
//       fontSize: '2.5rem',
//       color: '#2c3e50',
//       marginBottom: '1.5rem',
//       textAlign: 'center',
//       fontWeight: 'bold',
//     },
//     score: {
//       fontSize: '1.8rem',
//       textAlign: 'center',
//       margin: '1.5rem 0',
//       padding: '1rem',
//       borderRadius: '15px',
//       background: 'rgba(52, 152, 219, 0.1)',
//       color: '#2980b9',
//     },
//     feedbackCard: {
//       margin: '1.5rem 0',
//       padding: '1.5rem',
//       background: 'rgba(46, 204, 113, 0.1)',
//       borderRadius: '15px',
//       borderLeft: '4px solid #2ecc71',
//     },
//     feedbackTitle: {
//       color: '#27ae60',
//       marginBottom: '0.5rem',
//       fontSize: '1.2rem',
//       fontWeight: 'bold',
//     },
//     feedbackText: {
//       color: '#34495e',
//       lineHeight: '1.6',
//       fontSize: '1.1rem',
//     },
//     button: {
//       marginTop: '1.5rem',
//       padding: '1rem 2rem',
//       fontSize: '1.1rem',
//       color: 'white',
//       background: 'linear-gradient(135deg, #3498db, #2980b9)',
//       border: 'none',
//       borderRadius: '10px',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       fontWeight: '600',
//       width: '100%',
//     },
//     chatbot: {
//       marginTop: '2rem',
//       padding: '1.5rem',
//       background: 'rgba(255,255,255,0.85)',
//       borderRadius: '15px',
//       boxShadow: '0 2px 8px rgba(52, 152, 219, 0.08)',
//       maxWidth: '600px',
//       width: '100%',
//     },
//     chatTitle: {
//       fontWeight: 'bold',
//       color: '#2980b9',
//       marginBottom: '1rem',
//       fontSize: '1.2rem',
//     },
//     chatArea: {
//       minHeight: '60px',
//       maxHeight: '180px',
//       overflowY: 'auto',
//       marginBottom: '1rem',
//       background: '#f4f8fb',
//       borderRadius: '10px',
//       padding: '0.5rem 1rem',
//       fontSize: '1rem',
//       color: '#34495e',
//     },
//     chatInputRow: {
//       display: 'flex',
//       gap: '0.5rem',
//     },
//     chatInput: {
//       flex: 1,
//       padding: '0.7rem',
//       borderRadius: '8px',
//       border: '1px solid #b2bec3',
//       fontSize: '1rem',
//     },
//     chatSend: {
//       padding: '0.7rem 1.2rem',
//       borderRadius: '8px',
//       border: 'none',
//       background: 'linear-gradient(135deg, #23a6d5, #23d5ab)',
//       color: 'white',
//       fontWeight: 'bold',
//       fontSize: '1rem',
//       cursor: 'pointer',
//       transition: 'all 0.2s',
//     },
//     chatBubbleUser: {
//       background: '#dff9fb',
//       borderRadius: '10px',
//       padding: '0.5rem 1rem',
//       margin: '0.5rem 0',
//       alignSelf: 'flex-end',
//       color: '#0984e3',
//       maxWidth: '80%',
//     },
//     chatBubbleAI: {
//       background: '#eafaf1',
//       borderRadius: '10px',
//       padding: '0.5rem 1rem',
//       margin: '0.5rem 0',
//       alignSelf: 'flex-start',
//       color: '#00b894',
//       maxWidth: '80%',
//     },
//     '@keyframes slideUp': {
//       from: { transform: 'translateY(50px)', opacity: 0 },
//       to: { transform: 'translateY(0)', opacity: 1 }
//     },
//     '@keyframes gradient': {
//       '0%': { backgroundPosition: '0% 50%' },
//       '50%': { backgroundPosition: '100% 50%' },
//       '100%': { backgroundPosition: '0% 50%' }
//     }
//   };

//   async function handleChatSend(e) {
//     e.preventDefault();
//     if (!chatInput.trim()) return;
//     setChatLoading(true);
//     setChatHistory(h => [...h, { sender: 'user', text: chatInput }]);
//     try {

//       const res = await fetch('http://localhost:5000/api/chat-Bot', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ topic: 'Chat', score: 0, total: 1, prompt: chatInput })
//       });

//       const data = await res.json();
//       setChatHistory(h => [...h, { sender: 'ai', text: data.feedback || 'No response.' }]);
//     } catch {
//       setChatHistory(h => [...h, { sender: 'ai', text: 'Error getting response.' }]);
//     }
//     setChatInput("");
//     setChatLoading(false);
//   }

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h1 style={styles.title}>Quiz Complete! 🎉</h1>
//         <div style={styles.score}>
//           Score: {score} / {questions.length}
//           <div style={{ fontSize: '1rem', marginTop: '0.5rem', color: '#7f8c8d' }}>
//             ({Math.round((score / questions.length) * 100)}% correct)
//           </div>
//         </div>
//         <div style={styles.feedbackCard}>
//           <div style={styles.feedbackTitle}>AI Feedback</div>
//           <div style={styles.feedbackText}>{feedback}</div>
//         </div>
//         <button
//           style={styles.button}
//           onClick={onRestart}
//           onMouseOver={e => {
//             e.currentTarget.style.transform = 'scale(1.02)';
//             e.currentTarget.style.boxShadow = '0 15px 30px rgba(52, 152, 219, 0.2)';
//           }}
//           onMouseOut={e => {
//             e.currentTarget.style.transform = 'scale(1)';
//             e.currentTarget.style.boxShadow = 'none';
//           }}
//         >
//           Try Another Quiz
//         </button>


//         {/* Chatbot UI */}
//         <div style={styles.chatbot}>
//           <div style={styles.chatTitle}>Ask the AI Chatbot</div>
//           <div style={{ ...styles.chatArea, display: 'flex', flexDirection: 'column' }}>
//             {chatHistory.length === 0 && <div style={{ color: '#b2bec3' }}>Ask anything about your quiz or topic!</div>}
//             {chatHistory.map((msg, idx) => (
//               <div key={idx} style={msg.sender === 'user' ? styles.chatBubbleUser : styles.chatBubbleAI}>
//                 {msg.text}
//               </div>
//             ))}
//             {chatLoading && <div style={styles.chatBubbleAI}>Thinking...</div>}
//           </div>
//           <form style={styles.chatInputRow} onSubmit={handleChatSend}>
//             <input
//               style={styles.chatInput}
//               type="text"
//               placeholder="Type your question..."
//               value={chatInput}
//               onChange={e => setChatInput(e.target.value)}
//               disabled={chatLoading}
//             />
//             <button style={styles.chatSend} type="submit" disabled={chatLoading || !chatInput.trim()}>
//               Send
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ResultScreen;

import React, { useState } from 'react';

function ResultScreen({ score, questions, feedback, onRestart }) {
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);

  const styles = {
    container: {
      minHeight: '100vh',
      width: '100vw',  // full viewport width
      display: 'flex',
      flexDirection: 'row',
      background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
      backgroundSize: '400% 400%',
      animation: 'gradient 15s ease infinite',
    },
    contentWrapper: {
      display: 'flex',
      flex: 1,
    },
    card: {
      flex: "0 0 50%", // exactly half width
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center', // vertical centering
      alignItems: 'center',
      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)',
      backdropFilter: 'blur(10px)',
    },
    title: {
      fontSize: '2.2rem',
      color: '#2c3e50',
      marginBottom: '1.5rem',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    score: {
      fontSize: '1.6rem',
      textAlign: 'center',
      margin: '1rem 0',
      padding: '1rem',
      borderRadius: '15px',
      background: 'rgba(52, 152, 219, 0.1)',
      color: '#2980b9',
    },
    feedbackCard: {
      margin: '1.5rem 0',
      padding: '1.5rem',
      background: 'rgba(46, 204, 113, 0.1)',
      borderRadius: '15px',
      borderLeft: '4px solid #2ecc71',
      flexGrow: 1,
      overflowY: 'auto',
    },
    feedbackTitle: {
      color: '#27ae60',
      marginBottom: '0.5rem',
      fontSize: '1.2rem',
      fontWeight: 'bold',
    },
    feedbackText: {
      color: '#34495e',
      lineHeight: '1.6',
      fontSize: '1.05rem',
    },
    button: {
      marginTop: '1.5rem',
      padding: '1rem 2rem',
      fontSize: '1.1rem',
      color: 'white',
      background: 'linear-gradient(135deg, #3498db, #2980b9)',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: '600',
    },
    chatbot: {
      flex: "0 0 50%", // exactly half width
      background: 'rgba(255,255,255,0.95)',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center', // vertical centering
      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)',
    },
    chatTitle: {
      fontWeight: 'bold',
      color: '#2980b9',
      marginBottom: '1rem',
      fontSize: '1.3rem',
      textAlign: 'center',
    },
    chatArea: {
      flex: 1,
      minHeight: '250px',
      overflowY: 'auto',
      marginBottom: '1rem',
      background: '#f4f8fb',
      borderRadius: '10px',
      padding: '0.5rem 1rem',
      fontSize: '1rem',
      color: '#34495e',
      display: 'flex',
      flexDirection: 'column',
    },
    chatInputRow: {
      display: 'flex',
      gap: '0.5rem',
    },
    chatInput: {
      flex: 1,
      padding: '0.7rem',
      borderRadius: '8px',
      border: '1px solid #b2bec3',
      fontSize: '1rem',
    },
    chatSend: {
      padding: '0.7rem 1.2rem',
      borderRadius: '8px',
      border: 'none',
      background: 'linear-gradient(135deg, #23a6d5, #23d5ab)',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '1rem',
      cursor: 'pointer',
    },
    chatBubbleUser: {
      background: '#dff9fb',
      borderRadius: '10px',
      padding: '0.5rem 1rem',
      margin: '0.5rem 0',
      alignSelf: 'flex-end',
      color: '#0984e3',
      maxWidth: '80%',
    },
    chatBubbleAI: {
      background: '#eafaf1',
      borderRadius: '10px',
      padding: '0.5rem 1rem',
      margin: '0.5rem 0',
      alignSelf: 'flex-start',
      color: '#00b894',
      maxWidth: '80%',
    }
  };

  async function handleChatSend(e) {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatLoading(true);
    setChatHistory(h => [...h, { sender: 'user', text: chatInput }]);
    try {
      const res = await fetch('http://localhost:5000/api/chat-Bot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: chatInput })
      });
      const data = await res.json();
      setChatHistory(h => [...h, { sender: 'ai', text: data.feedback || 'No response.' }]);
    } catch {
      setChatHistory(h => [...h, { sender: 'ai', text: 'Error getting response.' }]);
    }
    setChatInput("");
    setChatLoading(false);
  }

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>

        {/* LEFT: RESULT */}
        <div style={styles.card}>
          <h1 style={styles.title}>Quiz Complete! 🎉</h1>
          <div style={styles.score}>
            Score: {score} / {questions.length}
            <div style={{ fontSize: '1rem', marginTop: '0.5rem', color: '#7f8c8d' }}>
              ({Math.round((score / questions.length) * 100)}% correct)
            </div>
          </div>
          <div style={styles.feedbackCard}>
            <div style={styles.feedbackTitle}>AI Feedback</div>
            <div style={styles.feedbackText}>{feedback}</div>
          </div>
          <button style={styles.button} onClick={onRestart}>
            Try Another Quiz
          </button>
        </div>

        {/* RIGHT: CHATBOT */}
        <div style={styles.chatbot}>
          <div style={styles.chatTitle}>💬 AI Chatbot</div>
          <div style={styles.chatArea}>
            {chatHistory.length === 0 && <div style={{ color: '#b2bec3' }}>Ask anything about your quiz or topic!</div>}
            {chatHistory.map((msg, idx) => (
              <div key={idx} style={msg.sender === 'user' ? styles.chatBubbleUser : styles.chatBubbleAI}>
                {msg.text}
              </div>
            ))}
            {chatLoading && <div style={styles.chatBubbleAI}>Thinking...</div>}
          </div>
          <form style={styles.chatInputRow} onSubmit={handleChatSend}>
            <input
              style={styles.chatInput}
              type="text"
              placeholder="Type your question..."
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              disabled={chatLoading}
            />
            <button style={styles.chatSend} type="submit" disabled={chatLoading || !chatInput.trim()}>
              Send
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default ResultScreen;
