import React, { useState } from 'react';
import { useAuth } from '../src/contexts/AuthContext';
import { useTheme } from '../src/contexts/ThemeContext';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Activity,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login: React.FC = () => {
  const { darkMode } = useTheme();
  const { signIn, loading } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signIn({ email: formData.email, password: formData.password });
      // Navigation is now handled by AppRoutes after state update
    } catch (err) {
      console.error('Login failed:', err);
      setError('Email ou senha inválidos. Tente novamente.');
    }
  };

  return (
      <div className={`min-h-screen flex ${darkMode ? 'bg-slate-950' : 'bg-gray-50'}`}>

        {/* Lado Esquerdo - Visual & Branding (Escondido em mobile) */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900 items-center justify-center">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-primary-gradient opacity-90" />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500 rounded-full blur-[128px] opacity-50 animate-pulse" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500 rounded-full blur-[128px] opacity-50 animate-pulse delay-1000" />

          {/* Conteúdo Sobreposto */}
          <div className="relative z-10 p-12 text-white max-w-xl">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center mb-8 shadow-xl border border-white/10">
              <Sparkles className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Gerencie seu estúdio com <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">fluidez e precisão.</span>
            </h1>

            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              "A contrologia desenvolve um corpo uniforme, corrige posturas erradas, restaura a vitalidade física, vigora a mente e eleva o espírito."
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-300" />
                </div>
                <div>
                  <p className="font-bold">Gestão Completa</p>
                  <p className="text-xs text-white/60">Alunos, Aulas e Financeiro</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Activity className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                  <p className="font-bold">Acompanhamento Clínico</p>
                  <p className="text-xs text-white/60">Evolução e Ficha de Avaliação</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito - Formulário */}
        <div className={`flex-1 flex items-center justify-center p-6 sm:p-12 transition-colors duration-500 ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
          <div className="w-full max-w-md space-y-8">

            {/* Cabeçalho Mobile (Logo) */}
            <div className="lg:hidden flex justify-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">P</span>
              </div>
            </div>

            <div className="text-center lg:text-left">
              <h2 className={`text-3xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Bem-vindo de volta
              </h2>
              <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Acesse sua conta para gerenciar o estúdio
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Bloco de Erro Corrigido */}
              {error && (
                  <div className="bg-red-500/10 text-red-500 text-sm font-medium p-3 rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                  </div>
              )}

              <div className="space-y-5">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email
                  </label>
                  <div className="relative group">
                    <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${darkMode ? 'text-gray-500 group-focus-within:text-primary-400' : 'text-gray-400 group-focus-within:text-primary-500'}`}>
                      <Mail className="h-5 w-5" />
                    </div>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={`block w-full pl-11 pr-4 py-4 rounded-xl border outline-none transition-all duration-300 ${
                            darkMode
                                ? 'bg-white/5 border-white/10 text-white focus:border-primary-500 focus:bg-white/10 placeholder:text-gray-600'
                                : 'bg-gray-50 border-gray-200 text-gray-900 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10'
                        }`}
                        placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Senha
                    </label>
                    <button type="button" className="text-sm font-medium text-primary-500 hover:text-primary-600">
                      Esqueceu a senha?
                    </button>
                  </div>
                  <div className="relative group">
                    <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${darkMode ? 'text-gray-500 group-focus-within:text-primary-400' : 'text-gray-400 group-focus-within:text-primary-500'}`}>
                      <Lock className="h-5 w-5" />
                    </div>
                    <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className={`block w-full pl-11 pr-12 py-4 rounded-xl border outline-none transition-all duration-300 ${
                            darkMode
                                ? 'bg-white/5 border-white/10 text-white focus:border-primary-500 focus:bg-white/10 placeholder:text-gray-600'
                                : 'bg-gray-50 border-gray-200 text-gray-900 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10'
                        }`}
                        placeholder="••••••••"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer ${darkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl text-white font-bold text-lg bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 shadow-lg shadow-primary-500/25 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? (
                    <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                      Entrar no Sistema <ArrowRight className="w-5 h-5" />
                    </>
                )}
              </button>

              <p className={`text-center text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                Ainda não tem uma conta?{' '}
                <button type="button" onClick={() => navigate('/register')} className="font-bold text-primary-500 hover:text-primary-600 transition-colors">
                  Cadastre-se
                </button>
              </p>
            </form>

            <div className="pt-8 text-center">
              <p className={`text-xs ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>© 2024 Pilates Studio Pro v2.1</p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;