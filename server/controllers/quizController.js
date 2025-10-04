const fetch = require('node-fetch');

// Helper for Ollama streaming response
async function generateOllamaResponse(prompt) {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "gpt-oss:120b-cloud", prompt })
  });
  let fullResponse = '';
  const stream = response.body;
  for await (const chunk of stream) {
    const chunkStr = chunk.toString();
    chunkStr.split('\n').forEach(line => {
      if (line.trim()) {
        try {
          const json = JSON.parse(line);
          if (json.response) fullResponse += json.response;
        } catch (e) {}
      }
    });
  }
  return fullResponse;
}

exports.getQuizQuestions = async (req, res) => {
  const { topic } = req.body;
  if (!topic) return res.status(400).json({ error: 'Missing topic' });
  try {
    const prompt = `Generate 5 multiple choice questions about ${topic}. Each question should have 4 options and 1 correct answer. Respond ONLY as a JSON array: [{"text":"...","options":["...","...","...","..."],"correctOption":0}]`;
    const ollamaResponse = await generateOllamaResponse(prompt);
    let questions;
    try {
      questions = JSON.parse(ollamaResponse);
      if (Array.isArray(questions) && questions.length === 5) {
        return res.json({ questions });
      }
    } catch (err) {
      console.error("Failed to parse Ollama response:", err);
    }
    return res.status(500).json({ error: 'Malformed Ollama response' });
  } catch (error) {
    console.error('Ollama Question Generation Error:', error);
    return res.status(500).json({ error: 'Failed to generate questions' });
  }
};

exports.getQuizFeedback = async (req, res) => {
  const { topic, score, total } = req.body;
  if (typeof score !== 'number' || typeof total !== 'number' || !topic)
    return res.status(400).json({ error: 'Missing data' });
  try {
    const percent = Math.round((score / total) * 100);
    const prompt = `Give a detailed, encouraging feedback (about 100 words) for a student who scored ${score} out of ${total} (${percent}%) on a ${topic} quiz. Include specific advice for improvement and use a positive, motivating tone. Include emojis where appropriate.`;
    const ollamaResponse = await generateOllamaResponse(prompt);
    return res.json({ feedback: ollamaResponse.trim() });
  } catch (error) {
    console.error('Ollama Feedback Generation Error:', error);
    return res.status(500).json({ feedback: `You scored ${score}/${total} in ${topic}. Keep practicing to improve!` });
  }
};
exports.chatBot = async (req, res) => {
  const { topic, score, total, prompt } = req.body;
    // console.log("HIII");
  try {
    let finalPrompt;

    if (prompt) {
      // Normal chatbot mode
      finalPrompt = prompt;
    } else {
      // Quiz feedback mode
      if (typeof score !== "number" || typeof total !== "number" || !topic) {
        return res.status(400).json({ error: "Missing data" });
      }
      const percent = Math.round((score / total) * 100);
      finalPrompt = `Give a detailed, encouraging feedback (about 100 words) for a student who scored ${score} out of ${total} (${percent}%) on a ${topic} quiz. Include specific advice for improvement and use a positive, motivating tone. Include emojis where appropriate.`;
    }

    const ollamaResponse = await generateOllamaResponse(finalPrompt);
    // console.log("hiiii ",ollamaResponse);
    return res.json({ feedback: ollamaResponse.trim() });
  } catch (error) {
    console.error("Ollama Feedback Generation Error:", error);
    return res
      .status(500)
      .json({ feedback: "⚠️ Error generating AI response. Please try again." });
  }
};

