import React, { FormEvent, useReducer, useState } from 'react';
import { axiosInstance as axios } from '../axios/axiosConfig';

interface User {
  username: string;
  error: string | null;
}

type InitialState = {
  user: undefined | string;
  error: null | string;
};

type ActionType =
  | { type: 'user'; payload: string }
  | { type: 'error'; payload: string | null };

const initialState: InitialState = {
  user: undefined,
  error: null,
};

const userReducer = (
  state: typeof initialState,
  { type, payload }: ActionType
) => {
  switch (type) {
    case 'user':
      return { ...state, error: null, user: payload! };
    case 'error':
      return { ...state, error: payload };
    default:
      return state;
  }
};

export const Login = () => {
  const [auth, dispatch] = useReducer(userReducer, initialState);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await axios.post<User>('/login', {
        username,
        password,
      });

      if (data.error) {
        dispatch({ type: 'error', payload: data.error });
      } else {
        dispatch({ type: 'user', payload: data.username });
      }
    } catch (err) {
      dispatch({ type: 'error', payload: err.error });
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            name='username'
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type='submit' />
      </form>
      {auth.error && <p>{auth.error}</p>}
    </div>
  );
};
