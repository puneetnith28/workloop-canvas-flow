
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    console.log('Login attempt', { email, password });
    // In a real app, we would authenticate the user here
    navigate('/');
  };

  const handleRegister = (name: string, email: string, password: string) => {
    console.log('Register attempt', { name, email, password });
    // In a real app, we would register the user here
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <LoginForm onLogin={handleLogin} onRegister={handleRegister} />
      </div>
    </div>
  );
};

export default Login;
