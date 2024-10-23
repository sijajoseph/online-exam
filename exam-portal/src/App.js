// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import Tests from './components/Tests';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/tests" element={<Tests />} />
      </Routes>
    </Router>
  );
}

export default App;
