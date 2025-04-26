"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, isAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  if (isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-purple-600">Autenticado com Sucesso</h1>
            <p className="text-gray-600 mt-2">Você já está conectado à plataforma.</p>
          </div>
          <div className="mt-6">
            <a 
              href="/"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors flex items-center justify-center"
            >
              Ir para o Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-purple-600">FÚRIA Fan Analytics</h1>
          <p className="text-gray-600 mt-2">Entre para acessar a plataforma</p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Usuário
            </label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <span className="inline-block animate-spin mr-2">⟳</span>
              ) : null}
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Credenciais de demonstração:
          </p>
          <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
            <div className="bg-gray-100 p-2 rounded">
              <p className="font-bold">Admin</p>
              <p>Usuário: admin</p>
              <p>Senha: admin123</p>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <p className="font-bold">Analista</p>
              <p>Usuário: analista</p>
              <p>Senha: analista123</p>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <p className="font-bold">Marketing</p>
              <p>Usuário: marketing</p>
              <p>Senha: marketing123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
