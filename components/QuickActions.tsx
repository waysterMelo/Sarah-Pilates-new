import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../src/contexts/ThemeContext';
import {
  Plus,
  UserPlus,
  UserCog,
  CreditCard,
  CheckCircle2,
  CalendarPlus,
  Zap
} from 'lucide-react';

const QuickActions: React.FC = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Nova Aula',
      icon: CalendarPlus,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
      action: () => navigate('/schedule')
    },
    {
      label: 'Novo Aluno',
      icon: UserPlus,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      action: () => navigate('/students/new')
    },
    {
      label: 'Novo Instrutor',
      icon: UserCog,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      action: () => navigate('/instructors/new')
    }
  ];

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-6 opacity-80">
        <Zap className={`w-4 h-4 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
        <h2 className="text-sm font-bold uppercase tracking-widest">Ações Rápidas</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {actions.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={item.action}
              className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-1 group ${
                darkMode 
                  ? 'bg-slate-900/50 border-white/5 hover:bg-slate-800/80' 
                  : 'bg-white border-gray-100 hover:shadow-lg hover:shadow-primary-500/5'
              }`}
            >
              <div className={`p-3 rounded-xl transition-transform duration-300 group-hover:scale-110 ${
                darkMode ? item.bg : item.bg.replace('/10', '-50')
              } ${item.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className={`text-xs font-bold text-center ${
                darkMode ? 'text-slate-300 group-hover:text-white' : 'text-slate-600 group-hover:text-slate-900'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;