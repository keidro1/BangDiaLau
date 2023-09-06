import React from 'react';
import { login } from '../services/auth';

const handleLogin = () => {
    login();
}

const LoginButton = () => {
  return (
    <button onClick={handleLogin}>Login</button>
  );
}

export default LoginButton;