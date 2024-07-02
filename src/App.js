import React, { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://benevolent-bubblegum-e215ee.netlify.app/.netlify/functions/analyze",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }
    );
    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sentiment Analysis</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to analyze"
            rows="4"
            cols="50"
          />
          <br />
          <button type="submit">Analyze</button>
        </form>
        {result && (
          <div>
            <h2>Analysis Result</h2>
            <p>Score: {result.score}</p>
            <p>Comparative: {result.comparative}</p>
            <p>
              {result.score > 0
                ? "Positive"
                : result.score < 0
                ? "Negative"
                : "Neutral"}
            </p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
