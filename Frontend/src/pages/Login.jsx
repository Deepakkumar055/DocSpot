import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const { setToken,token, backendUrl } = useContext(AppContext); 
  const navigate = useNavigate();
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if (data.success) {
          console.log(data.token);
          localStorage.setItem('token', data.token);
          setToken(data.token); // set token in context
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/users/login`, {
          email,
          password,
        });
        if (data.success) {
          console.log(data.token);
          localStorage.setItem('token', data.token); // consistent naming for token
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);


  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex flex-col items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-lg shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p className='text-gray-600'>Please {state === 'Sign Up' ? 'Sign Up' : 'Login'} to Book Appointment</p>
        
        {state === 'Sign Up' && (
          <div className='w-full max-w-sm'>
            <p className='text-sm'>Full Name</p>
            <input
              type="text"
              className='w-full p-2 border rounded-md'
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              placeholder="Enter your full name"
            />
          </div>
        )}

        <div className='w-full max-w-sm'>
          <p className='text-sm'>Email</p>
          <input
            type="email"
            className='w-full p-2 border rounded-md'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className='w-full max-w-sm'>
          <p className='text-sm'>Enter Password</p>
          <input
            type="password"
            className='w-full p-2 border rounded-md'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className='flex bg-blue-500 text-white px-6 py-2 rounded-full items-center'>
          {state === 'Sign Up' ? 'Sign Up' : 'Login'}
        </button>

        <p
          className='text-blue-600 cursor-pointer mt-4'
          onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
        >
          {state === 'Sign Up' ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </p>
      </div>
    </form>
  );
};

export default Login;
