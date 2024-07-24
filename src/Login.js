import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const SubmitHandler = async (data) => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
          expiresInMins: 30,
        }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed. Please check your username and password.');
      }

      const result = await response.json();
      console.log("Login Result:", result);

      if (result.token && result.id) { 
        toast.success('Login successful!');
        localStorage.setItem('username', data.username); // Store username
        setTimeout(() => {
            navigate('/chatbox');
        }, 1000);
        
      } else {
        throw new Error('Authentication failed. Please check your username and password.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setError(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className=" mt-12 flex items-center justify-center mb-12 ">
      <div className="max-w-md w-full mx-auto p-8 bg-white rounded-3xl shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-8 ">Login</h1>
        <form onSubmit={handleSubmit(SubmitHandler)}>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2 text-2xl" htmlFor="username">
              Username
            </label>
            <input
              {...register('username')}
              type="text"
              id="username"
              className="w-full px-3 py-2 text-xl border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2 text-2xl" htmlFor="password">
              Password
            </label>
            <input
              {...register('password')}
              type="password"
              id="password"
              className="w-full px-3 py-2 text-xl border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <center><button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white text-2xl font-bold py-2 px-4 mb-10 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
            <p onClick={()=>{navigate('/Chatbox')}} className=' text-center text-blue-500 text-xl'>Don't have an account ? Signup</p></center>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
