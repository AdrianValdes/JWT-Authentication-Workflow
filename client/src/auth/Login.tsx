import React, { FormEvent, useReducer } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

type InitialState = {
  username: string;
  password: string;
  error: null | string;
};

type ActionType =
  | { type: 'username'; payload: string }
  | { type: 'password'; payload: string }
  | { type: 'error'; payload: string | null };

const initialState: InitialState = {
  username: '',
  password: '',
  error: null,
};

const userReducer = (
  state: typeof initialState,
  { type, payload }: ActionType
) => {
  switch (type) {
    case 'username':
      return { ...state, username: payload! };
    case 'password':
      return { ...state, password: payload! };
    case 'error':
      return { ...state, error: payload };
    default:
      return state;
  }
};

export const Login = () => {
  const [auth, dispatch] = useReducer(userReducer, initialState);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/login', { ...auth });
      if (data.error) {
        dispatch({ type: 'error', payload: data.error });
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
            onChange={(e) =>
              dispatch({ type: 'username', payload: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            onChange={(e) => {
              dispatch({ type: 'password', payload: e.target.value });
            }}
          />
        </div>
        <input type='submit' />
      </form>
      {auth.error && <p>{auth.error}</p>}
    </div>
  );
};
