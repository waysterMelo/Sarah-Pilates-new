import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../src/contexts/ThemeContext';
import DashboardCards from '../components/DashboardCards';
import QuickActions from '../components/QuickActions';
import { 
  Search, 
  Sun, 
  Moon, 
  Bell,
  TrendingUp,
  Users,
  DollarSign,
  Activity
} from 'lucide-react';

import api from '../src/services/api';

const Dashboard: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [quickStats, setQuickStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    const fetchDashboardStats = async () => {
      try {
        const response = await api.get('/api/dashboard/stats');
        const { data } = response;
        const formattedStats = [
          { label: 'Receita', value: `R$ ${data.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, change: data.revenueChange, icon: DollarSign, color: 'emerald' },
          { label: 'Alunos', value: data.totalStudents, change: data.studentsChange, icon: Users, color: 'blue' },
          { label: 'Aulas', value: `${data.todayClasses} hoje`, change: data.classesChange, icon: Activity, color: 'purple' },
        ];
        setQuickStats(formattedStats);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError('Erro ao carregar as estatísticas.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();

    return () => clearInterval(timer);
  }, []);

  return (
    <main className={`min-h-screen relative overflow-hidden p-6 lg:p-10 transition-colors duration-500 font-sans ${
      darkMode ? 'text-white selection:bg-primary-500/30' : 'text-slate-800 selection:bg-primary-100'
    }`}>
      
      {/* Ambient Background */}
      <div className={`fixed inset-0 -z-10 transition-opacity duration-700 ${darkMode ? 'opacity-100' : 'opacity-60'}`}>
        <div className={`absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] rounded-full blur-[120px] transition-colors duration-700 ${
          darkMode ? 'bg-primary-900/20' : 'bg-purple-200/40'
        }`} />
        <div className={`absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[100px] transition-colors duration-700 ${
          darkMode ? 'bg-indigo-900/20' : 'bg-blue-100/40'
        }`} />
      </div>

      <div className="max-w-[1600px] mx-auto h-full flex flex-col">
        
        {/* Header Section */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
          <div className="flex flex-col">
            <h1 className="text-4xl font-light tracking-tight mb-2">
              Olá, <span className="font-semibold bg-gradient-to-r from-primary-500 to-fuchsia-500 bg-clip-text text-transparent">Sarah</span>
            </h1>
            <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {currentTime.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
              <span className="mx-2">•</span>
              {currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            {/* Search Bar */}
            <div className={`relative flex-1 lg:w-80 group transition-all duration-300 ${
              darkMode ? 'bg-white/5 focus-within:bg-white/10' : 'bg-white shadow-sm focus-within:shadow-md'
            } rounded-2xl`}>
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
              <input 
                type="text" 
                placeholder="Buscar..." 
                className={`w-full bg-transparent py-3 pl-11 pr-4 outline-none text-sm font-medium rounded-2xl ${
                   darkMode ? 'placeholder:text-slate-600 text-white' : 'placeholder:text-slate-400 text-slate-700'
                }`}
              />
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className={`p-3 rounded-2xl transition-all duration-300 ${
                darkMode 
                  ? 'bg-white/5 hover:bg-white/10 text-yellow-400' 
                  : 'bg-white hover:bg-slate-50 text-slate-600 shadow-sm'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {/* Notifications */}
            <button className={`p-3 rounded-2xl transition-all duration-300 relative ${
                darkMode 
                  ? 'bg-white/5 hover:bg-white/10 text-slate-300' 
                  : 'bg-white hover:bg-slate-50 text-slate-600 shadow-sm'
              }`}>
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
            </button>
          </div>
        </header>

        {/* Quick Stats Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {loading ? (
            <p>Carregando estatísticas...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            quickStats.map((stat, index) => (
              <div key={index} className={`flex items-center gap-4 p-6 rounded-3xl border transition-all ${
                 darkMode ? 'bg-slate-800/60 border-slate-700 hover:border-slate-600 shadow-md' : 'bg-white border-slate-100 shadow-lg'
              }`}>
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    darkMode ? `bg-${stat.color}-500/20 text-${stat.color}-400` : `bg-${stat.color}-50 text-${stat.color}-500`
                 }`}>
                    <stat.icon className="w-5 h-5" />
                 </div>
                 <div>
                    <p className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{stat.label}</p>
                    <div className="flex items-baseline gap-2">
                       <span className="text-3xl font-extrabold">{stat.value}</span>
                       <span className={`text-xs font-medium ${
                          stat.change.includes('+') 
                             ? (darkMode ? 'text-emerald-400' : 'text-emerald-600') 
                             : 'text-slate-400'
                       }`}>{stat.change}</span>
                    </div>
                 </div>
              </div>
            ))
          )}
        </div>

        {/* Main Navigation Cards */}
        <DashboardCards darkMode={darkMode} />
        
        {/* Quick Actions */}
        <QuickActions darkMode={darkMode} />

        {/* Footer */}
        <div className={`mt-auto pt-10 flex justify-center lg:justify-between text-xs font-medium ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>
           <p>© 2024 Pilates Studio Pro</p>
           <p className="hidden lg:block">Sistema de Gestão v2.1</p>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;