import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Chatbox from './Chatbox';
import 'tailwindcss/tailwind.css';
import 'daisyui/dist/full.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chatbox" element={<Chatbox />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
