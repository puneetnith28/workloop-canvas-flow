
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tabParam = searchParams.get('tab');

  const handleLogin = (email: string, password: string) => {
    console.log('Login attempt', { email, password });
    // In a real app, we would authenticate the user here
    navigate('/dashboard');
  };

  const handleRegister = (name: string, email: string, password: string) => {
    console.log('Register attempt', { name, email, password });
    // In a real app, we would register the user here
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <LoginForm 
          onLogin={handleLogin} 
          onRegister={handleRegister} 
          initialTab={tabParam === 'register' ? 'register' : 'login'} 
        />
      </div>
    </div>
  );
};

export default Login;
