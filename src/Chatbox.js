import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import 'tailwindcss/tailwind.css';
import 'daisyui/dist/full.css';

const Chatbox = () => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('messages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const [currentMessage, setCurrentMessage] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const inputRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = () => {
    if (currentMessage.trim() === '') return;

    const timestamp = new Date().toLocaleString();

    if (editIndex !== null) {
      const updatedMessages = messages.map((msg, index) =>
        index === editIndex ? { text: currentMessage, time: timestamp } : msg
      );
      setMessages(updatedMessages);
      setEditIndex(null);
    } else {
      setMessages([...messages, { text: currentMessage, time: timestamp }]);
    }
    setCurrentMessage('');
    inputRef.current?.focus();
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setCurrentMessage(messages[index].text);
    inputRef.current?.focus();
  };

  const handleDelete = (index) => {
    const filteredMessages = messages.filter((_, idx) => idx !== index);
    setMessages(filteredMessages);
    if (editIndex === index) {
      setEditIndex(null);
      setCurrentMessage('');
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all messages?')) {
      setMessages([]);
      setEditIndex(null);
      setCurrentMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-base-200 rounded-lg shadow-lg flex flex-col h-[600px]">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Chatbox
      </motion.h1>

      <div className="flex flex-col flex-1 bg-white rounded-lg shadow-inner p-4 overflow-auto mb-4">
        <div className="space-y-3">
          {messages.length === 0 && (
            <motion.p
              className="text-gray-400 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              No messages yet. Start the conversation!
            </motion.p>
          )}

          {messages.map((message, index) => (
            <motion.div
              key={index}
              className="flex justify-between items-center border-b border-gray-200 pb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div>
                <p className="text-gray-800">{message.text}</p>
                <span className="text-xs text-gray-400">{message.time}</span>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="btn btn-xs btn-outline btn-info"
                  aria-label="Edit message"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="btn btn-xs btn-outline btn-error"
                  aria-label="Delete message"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </div>

      <div className="flex space-x-2">
        <textarea
          ref={inputRef}
          rows={2}
          className="textarea textarea-bordered flex-1 resize-none"
          placeholder="Type your message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSend}
          className="btn btn-primary"
          aria-label={editIndex !== null ? 'Update message' : 'Send message'}
        >
          {editIndex !== null ? 'Update' : 'Send'}
        </button>
      </div>

      <button
        onClick={handleClearAll}
        className="btn btn-warning btn-sm mt-4 self-center"
        aria-label="Clear all messages"
      >
        Clear All
      </button>
    </div>
  );
};

export default Chatbox;
