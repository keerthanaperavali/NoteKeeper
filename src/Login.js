import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const SubmitHandler = async (data) => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: data.username, password: data.password, expiresInMins: 30 }),
      });
      if (!response.ok) throw new Error('Authentication failed. Check credentials.');
      const result = await response.json();
      if (result.token && result.id) {
        toast.success('Login successful!');
        localStorage.setItem('username', data.username);
        setTimeout(() => navigate('/chatbox'), 1000);
      } else throw new Error('Auth failed.');
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  font-sans">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-12 px-14 relative">
        <h1 className="text-4xl font-semibold mb-8 text-center text-gray-700 dark:text-gray-100">Welcome Back</h1>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form className="space-y-6" onSubmit={handleSubmit(SubmitHandler)}>
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-2 text-lg">Username</label>
            <input {...register('username')} placeholder="Your username" className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" required />
          </div>
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-2 text-lg">Password</label>
            <input {...register('password')} type="password" placeholder="Your password" className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" required />
          </div>
          <button type="submit" className="w-full bg-primary hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-4 rounded-xl text-xl shadow-lg hover:shadow-xl transition">Login</button>
        </form>
        <p onClick={() => navigate('/signup')} className="mt-6 text-center text-blue-500 cursor-pointer hover:underline text-lg">
          Don't have an account? Sign up
        </p>
        <ToastContainer position="top-center" autoClose={2500} hideProgressBar={false} theme="colored" />
      </div>
    </div>
  );
}

export default Login;
