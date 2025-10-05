import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const password = watch('password', '');

  const SubmitHandler = async (data) => {
    // Handle signup logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6]">
      <div className="w-[400px] dark:bg-gray-900 rounded-3xl shadow-2xl px-10 py-7 flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-white text-center mb-4">Create Account</h1>
        <form onSubmit={handleSubmit(SubmitHandler)} className="flex flex-col gap-3">
          <div>
            <label className="text-white text-lg mb-1 block">Username</label>
            <input
              {...register('username', { required: true })}
              placeholder="Your username"
              className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <label className="text-white text-lg mb-1 block">Email</label>
            <input
              {...register('email', { required: true })}
              placeholder="Your email"
              className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <label className="text-white text-lg mb-1 block">Password</label>
            <input
              {...register('password', { required: true })}
              type="password"
              placeholder="Your password"
className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"            />
          </div>
          <div>
            <label className="text-white text-lg mb-1 block">Confirm Password</label>
            <input
              {...register('confirmPassword', {
                required: true,
                validate: value => value === password || 'Passwords do not match'
              })}
              type="password"
              placeholder="Confirm your password"
className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"            />
            {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
          </div>
          <button
            type="submit"
            className="mt-4 rounded-xl py-3 font-semibold text-white text-lg bg-primary transition-all duration-150 hover:brightness-110"
          >
            Signup
          </button>
        </form>
        <p
          className="mt-5 text-center text-blue-400 cursor-pointer hover:underline text-base"
          onClick={() => navigate('/')}
        >
          Already have an account? <span className="font-semibold">Login</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
