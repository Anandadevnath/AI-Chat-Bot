import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

function App() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  async function generateAnswer() {
    setAnswer('Generating answer...');

    const apiKey = import.meta.env.VITE_API_KEY;

    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      method: 'POST',
      data: {
        contents: [
          { parts: [{ text: question }] },
        ],
      },
    });

    setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text'])
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
      <button onClick={clearFields}>Clear</button>
      {/* interface */}
      <div className="chat-interface">
        <SyntaxHighlighter language="javascript" style={dracula}>
          {answer}
        </SyntaxHighlighter>
      </div>
    </>
  )
}

export default App;
