import React, { useState, useEffect } from 'react';
import { loginAccount } from '../apiAdapters';
import { saveToLocalStorage } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken, token }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function getLogin(username, password) {
    try {
      const result = await loginAccount(username, password);

      if (result.token !== undefined) {
        setToken(result.token);
        saveToLocalStorage(result.token);
        setUsername('');
        setPassword('');
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <div className="center-form">
      <h1>Login</h1>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getLogin(username, password);
          }}
        >
          <h3>Username</h3>
          <input
            name="username"
            type="text"
            value={username}
            minLength="6"
            autoComplete="username"
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <h3>Password</h3>
          <input
            name="password"
            type="password"
            value={password}
            autoComplete="password"
            minLength="8"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
