import React from 'react';
import { Link } from 'react-router-dom';

const ExamPage = () => {
  return (
    <div className="exam-page">
      <Link to="/mcq/aptitude" className="exam-button">Aptitude</Link>
      <Link to="/mcq/logical" className="exam-button">Logical Reasoning</Link>
      <Link to="/mcq/verbal" className="exam-button">Verbal Ability</Link>
    </div>
  );
};

export default ExamPage;
