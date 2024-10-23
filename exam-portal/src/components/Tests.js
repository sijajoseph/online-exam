import React, { useState, useEffect } from 'react';

const questionsData = {
  generalAptitude: [
    { question: "1 + 1 = ?", options: ["1", "2", "3", "4"], answer: "2" },
    { question: "2 * 2 = ?", options: ["2", "4", "6", "8"], answer: "4" },
    { question: "3 - 1 = ?", options: ["0", "1", "2", "3"], answer: "2" },
    { question: "5 / 5 = ?", options: ["0", "1", "2", "5"], answer: "1" },
    { question: "10 + 10 = ?", options: ["20", "10", "5", "0"], answer: "20" },
  ],
  logicalReasoning: [
    { question: "If A is B and B is C, then A is?", options: ["A", "B", "C", "D"], answer: "C" },
    { question: "Find the odd one out: 2, 3, 5, 7, 9", options: ["2", "3", "5", "9"], answer: "9" },
    { question: "Which number comes next: 1, 1, 2, 3, 5, ...?", options: ["6", "7", "8", "9"], answer: "8" },
    { question: "If today is Monday, what day will it be after 3 days?", options: ["Wednesday", "Thursday", "Friday", "Saturday"], answer: "Thursday" },
    { question: "What comes next in the series: A, B, C, ...?", options: ["D", "E", "F", "G"], answer: "D" },
  ],
  verbalAbility: [
    { question: "Synonym of happy?", options: ["Sad", "Joyful", "Angry", "Neutral"], answer: "Joyful" },
    { question: "Antonym of hot?", options: ["Cold", "Warm", "Cool", "Boiling"], answer: "Cold" },
    { question: "Choose the word that best completes the sentence: The cat sat on the ...", options: ["Chair", "Floor", "Table", "Roof"], answer: "Floor" },
    { question: "Find the misspelled word: Accomodate, Acknowledge, Achieve", options: ["Accomodate", "Acknowledge", "Achieve"], answer: "Accomodate" },
    { question: "What is the plural of child?", options: ["Childs", "Children", "Childes", "Childer"], answer: "Children" },
  ],
};

const Tests = () => {
  const [activeTab, setActiveTab] = useState('generalAptitude');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [testCompleted, setTestCompleted] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer(prevTimer => prevTimer - 1);
      } else {
        clearInterval(countdown);
        handleTestCompletion();
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const handleAnswerSelect = (questionIndex, selectedOption) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedOption,
    }));
  };

  const handleTestCompletion = () => {
    setTestCompleted(true);
    clearInterval();
  };

  const calculateResults = () => {
    const totalQuestions = questionsData[activeTab].length;
    const attendedQuestions = Object.keys(selectedAnswers).length;
    const correctAnswers = Object.values(selectedAnswers).filter((answer, index) => answer === questionsData[activeTab][index].answer).length;
    return { totalQuestions, attendedQuestions, correctAnswers };
  };

  const renderResultsDialog = () => {
    const { totalQuestions, attendedQuestions, correctAnswers } = calculateResults();
    return (
      <div style={{ border: '1px solid black', padding: '20px', background: '#f0f0f0' }}>
        <h3>Results</h3>
        <p>Total Questions: {totalQuestions}</p>
        <p>Attended Questions: {attendedQuestions}</p>
        <p>Correct Answers: {correctAnswers}</p>
        <button onClick={() => setTestCompleted(false)}>Close</button>
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: 'lightpink', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color: 'lightgreen' }}>Tests</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        {Object.keys(questionsData).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              backgroundColor: activeTab === tab ? 'lightgreen' : 'white',
              margin: '0 10px',
            }}
          >
            {tab.replace(/([A-Z])/g, ' $1').trim()} {/* Convert camelCase to spaced words */}
          </button>
        ))}
      </div>
      <div>
        <h3>{activeTab.replace(/([A-Z])/g, ' $1').trim()} Questions</h3>
        {questionsData[activeTab].map((question, index) => (
          <div key={index} style={{ marginBottom: '15px' }}>
            <p>{question.question}</p>
            {question.options.map((option, i) => (
              <div key={i}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  onChange={() => handleAnswerSelect(index, option)}
                  checked={selectedAnswers[index] === option}
                />
                {option}
              </div>
            ))}
          </div>
        ))}
      </div>
      {testCompleted ? (
        renderResultsDialog()
      ) : (
        <div>
          <button onClick={handleTestCompletion}>Submit Test</button>
          <p style={{ position: 'absolute', top: '10px', right: '10px' }}>
            Time Remaining: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
          </p>
        </div>
      )}
    </div>
  );
};

export default Tests;
