import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInFailure, signInSuccess } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false); // Local loading state
  const { error } = useSelector((state) => state.user); // Only using error from Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when the form is submitted
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        setLoading(false); // Stop loading if login fails
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
      setLoading(false); // Stop loading if there’s an error
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
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
        <button
          disabled={loading} // Disable the button when loading
          className='bg-slate-700 text-white p-3 rounded-2xl uppercase hover:opacity-90 disabled:opacity-80 '
        >
          {loading ? "Loading..." : "Sign In"} {/* Show "Loading..." if loading */}
        </button>
        <OAuth />
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Don't Have An Account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-700 hover:underline'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>} {/* Display any error */}
    </div>
  );
};

export default SignIn;
