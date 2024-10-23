import React, { useState, useEffect } from 'react';

const MCQPage = ({ match }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const subject = match.params.subject;

  useEffect(() => {
    fetch(`http://localhost:5000/questions/${subject}`)
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, [subject]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:5000/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers })
    });
    if (response.ok) {
      // Handle submission and navigate to result page
    }
  };

  return (
    <div className="mcq-page">
      <h2>{subject.charAt(0).toUpperCase() + subject.slice(1)} Questions</h2>
      {questions.map((q, index) => (
        <div key={q.id}>
          <p>{index + 1}. {q.question}</p>
          {q.options.map((option, i) => (
            <div key={i}>
              <input 
                type="radio" 
                name={q.id} 
                value={option} 
                onChange={() => handleAnswerChange(q.id, option)} 
              /> {option}
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default MCQPage;
