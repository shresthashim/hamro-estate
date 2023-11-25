import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    const res = await fetch('/api/auth/signup',{
      method:"POST",
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const data = await req.json()
    if(data.success === false)
    {
      
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>SignUp</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Username'
          className='border p-3 rounded-2xl  bg-transparent focus:outline-none'
          id='username'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='Email'
          className='border p-3 rounded-2xl bg-transparent focus:outline-none '
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          className='border p-3 rounded-2xl bg-transparent focus:outline-none '
          id='password'
          onChange={handleChange}
        />
        <button className='bg-slate-700 text-white p-3 rounded-2xl uppercase hover:opacity-90 disabled:opacity-80 '>
          Sign Up
        </button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Already Have An Account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-700 hover:underline'>Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
