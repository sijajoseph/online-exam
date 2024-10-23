import React, { useState, useEffect } from 'react';

const ResultPage = () => {
  const [result, setResult] = useState({ total: 0, correct: 0, incorrect: 0 });

  useEffect(() => {
    fetch('http://localhost:5000/result')
      .then(res => res.json())
      .then(data => setResult(data));
  }, []);

  return (
    <div className="result-page">
      <h2>Test Results</h2>
      <p>Total Questions: {result.total}</p>
      <p>Correct Answers: {result.correct}</p>
      <p>Incorrect Answers: {result.incorrect}</p>
    </div>
  );
};

export default ResultPage;
