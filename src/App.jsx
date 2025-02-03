import { useState } from 'react';
import './App.css';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  async function generateAnswer() {
    setAnswer("Generating answer...");

    try {
      const response = await axios.post(apiUrl, {
        contents: [{ parts: [{ text: question }] }],
      });

      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      setAnswer("Failed to generate answer.");
    }
  }

  async function tellJoke() {
    setAnswer("Fetching a joke...");

    try {
      const response = await axios.post(apiUrl, {
        contents: [{ parts: [{ text: "Tell me a funny joke." }] }],
      });

      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      setAnswer("Failed to fetch a joke.");
    }
  }

  function clearFields() {
    setQuestion("");
    setAnswer("");
  }

  return (
    <>
      <h1>AI Chat Bot</h1>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        cols="30"
        rows="10">
      </textarea>
      <button onClick={generateAnswer}>Generate Answer</button>
      <button onClick={tellJoke}>Tell me a Joke</button>
      <button onClick={clearFields}>Clear</button>
      
      {/* Interface */}
      <div className="chat-interface">
        <SyntaxHighlighter language="javascript" style={dracula}>
          {answer}
        </SyntaxHighlighter>
      </div>
    </>
  );
}

export default App;
