"use client"
import React, { useState, ChangeEvent } from 'react';
import { Mail, Lock, User, EyeOff, Eye } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

const AuthForms = () => {
  const [activeForm, setActiveForm] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGoogleLogin = () => {
    console.log('Iniciando login com Google');
    // Placeholder for Google OAuth implementation
  };

  const renderLoginForm = () => (
    <form className="space-y-4">
      <div className="relative">
        <Mail className="absolute left-3 top-3 text-gray-400" />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="relative">
        <Lock className="absolute left-3 top-3 text-gray-400" />
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          className="w-full pl-10 pr-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-gray-400"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
      >
        Entrar
      </button>

      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-4 text-gray-500 text-sm">ou</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <button 
        type="button"
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center bg-white border border-gray-300 p-2 rounded-md hover:bg-gray-50 transition"
      >
        <FcGoogle className="mr-2" size={24} />
        Entrar com Google
      </button>

      <div className="text-center space-y-2">
        <button 
          type="button" 
          onClick={() => setActiveForm('forgot')}
          className="text-sm text-blue-500 hover:underline block"
        >
          Esqueceu a senha?
        </button>
        <button 
          type="button" 
          onClick={() => setActiveForm('register')}
          className="text-sm text-green-500 hover:underline block"
        >
          Criar uma conta
        </button>
      </div>
    </form>
  );

  const renderRegisterForm = () => (
    <form className="space-y-4">
      <div className="relative">
        <User className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          name="username"
          placeholder="Nome de usuário"
          value={formData.username}
          onChange={handleChange}
          className="w-full pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="relative">
        <Mail className="absolute left-3 top-3 text-gray-400" />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="relative">
        <Lock className="absolute left-3 top-3 text-gray-400" />
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          className="w-full pl-10 pr-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-gray-400"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div className="relative">
        <Lock className="absolute left-3 top-3 text-gray-400" />
        <input
          type={showPassword ? 'text' : 'password'}
          name="confirmPassword"
          placeholder="Confirmar senha"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full pl-10 pr-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-gray-400"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <button 
        type="submit" 
        className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
      >
        Criar Conta
      </button>

      <div className="text-center">
        <button 
          type="button" 
          onClick={() => setActiveForm('login')}
          className="text-sm text-blue-500 hover:underline"
        >
          Voltar para Login
        </button>
      </div>
    </form>
  );

  const renderForgotPasswordForm = () => (
    <form className="space-y-4">
      <div className="relative">
        <Mail className="absolute left-3 top-3 text-gray-400" />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600 transition"
      >
        Redefinir Senha
      </button>

      <div className="text-center">
        <button 
          type="button" 
          onClick={() => setActiveForm('login')}
          className="text-sm text-blue-500 hover:underline"
        >
          Voltar para Login
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {activeForm === 'login' && renderLoginForm()}
        {activeForm === 'register' && renderRegisterForm()}
        {activeForm === 'forgot' && renderForgotPasswordForm()}
      </div>
    </div>
  );
};

export default AuthForms;