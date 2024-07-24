import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import 'tailwindcss/tailwind.css';
import 'daisyui/dist/full.css';

const Chatbox = () => {
  const [messages, setMessages] = useState(() => {
    // Load messages from local storage on initial render
    const savedMessages = localStorage.getItem('messages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const [currentMessage, setCurrentMessage] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // Save messages to local storage whenever they change
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const handleSend = () => {
    if (currentMessage.trim() === '') return;
    if (editIndex !== null) {
      // Edit existing message
      const updatedMessages = messages.map((msg, index) => 
        index === editIndex ? currentMessage : msg
      );
      setMessages(updatedMessages);
      setEditIndex(null);
    } else {
      // Add new message
      setMessages([...messages, currentMessage]);
    }
    setCurrentMessage('');
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setCurrentMessage(messages[index]);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <motion.h1
        className="text-2xl font-bold mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Chatbox
      </motion.h1>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          className="input input-bordered flex-1"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSend}>
          {editIndex !== null ? 'Update' : 'Save'}
        </button>
      </div>
      <motion.div
        className="bg-white p-4 shadow rounded"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="space-y-2">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              className="flex justify-between items-center p-2 border-b border-gray-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span>{message}</span>
              <button className="ml-2 " onClick={() => handleEdit(index)}>
                Edit
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Chatbox;
