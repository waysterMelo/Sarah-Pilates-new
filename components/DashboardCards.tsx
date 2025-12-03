import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../src/contexts/ThemeContext';
import { 
  UsersRound, 
  Award, 
  CalendarRange, 
  HeartPulse, 
  TrendingUp, 
  PieChart, 
  Sliders,
  ArrowUpRight,
  Sparkles,
  Dumbbell
} from 'lucide-react';

const DashboardCards: React.FC = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const cardItems = [
    { 
      icon: UsersRound, 
      label: 'Alunos', 
      path: '/students',
      description: 'Gestão de matrículas',
      stats: '147 ativos',
      gradient: 'from-blue-500 to-cyan-500',
      shadow: 'shadow-blue-500/20'
    },
    { 
      icon: Award, 
      label: 'Instrutores', 
      path: '/instructors',
      description: 'Equipe técnica',
      stats: '12 profs',
      gradient: 'from-violet-500 to-purple-500',
      shadow: 'shadow-violet-500/20'
    },
    { 
      icon: CalendarRange, 
      label: 'Agenda', 
      path: '/schedule',
      description: 'Grade de horários',
      stats: '24 hoje',
      gradient: 'from-fuchsia-500 to-pink-500',
      shadow: 'shadow-fuchsia-500/20'
    },
    { 
      icon: Dumbbell, 
      label: 'Aulas', 
      path: '/classes',
      description: 'Modalidades & Serviços',
      stats: '8 tipos',
      gradient: 'from-indigo-500 to-blue-600',
      shadow: 'shadow-indigo-500/20'
    },
    { 
      icon: HeartPulse, 
      label: 'Avaliação', 
      path: '/physical',
      description: 'Testes físicos',
      stats: '89 regs',
      gradient: 'from-emerald-500 to-teal-500',
      shadow: 'shadow-emerald-500/20'
    },
    { 
      icon: TrendingUp, 
      label: 'Evolução', 
      path: '/records',
      description: 'Diário de progresso',
      stats: '234 fch',
      gradient: 'from-amber-500 to-orange-500',
      shadow: 'shadow-amber-500/20'
    },
    { 
      icon: PieChart, 
      label: 'Relatórios', 
      path: '/reports',
      description: 'Dados financeiros',
      stats: 'Pro',
      gradient: 'from-rose-500 to-red-500',
      shadow: 'shadow-rose-500/20'
    },
    { 
      icon: Sliders, 
      label: 'Ajustes', 
      path: '/settings',
      description: 'Configurações',
      stats: 'System',
      gradient: 'from-slate-500 to-gray-500',
      shadow: 'shadow-slate-500/20'
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-8">
        <div className={`p-2 rounded-xl ${darkMode ? 'bg-primary-500/20' : 'bg-primary-50'}`}>
            <Sparkles className={`w-5 h-5 ${darkMode ? 'text-primary-400' : 'text-primary-600'}`} />
        </div>
        <div>
            <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Acesso Rápido</h2>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Selecione um módulo para gerenciar</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardItems.map((item, index) => {
          const Icon = item.icon;
          
          return (
            <div
              key={index}
              onClick={() => navigate(item.path)}
                            className={`group relative p-6 h-[200px] rounded-[2rem] border cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2 ${
                              darkMode
                                ? 'bg-slate-900/60 border-slate-800 hover:border-primary-500/50 hover:bg-slate-800/70 shadow-lg'
                                : 'bg-white border-slate-200 shadow-md hover:shadow-xl'
                            }`}>
              {/* Hover Background Tint */}
              <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none`} />

              <div className="relative h-full flex flex-col justify-between z-10">
                
                {/* Top Section: Icon & Action */}
                <div className="flex justify-between items-start">
                  {/* Icon Container */}
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                                      darkMode
                                          ? `bg-gradient-to-br ${item.gradient} text-white shadow-2xl`
                                          : `bg-gradient-to-br ${item.gradient} text-white shadow-xl ${item.shadow}`
                                    }`}>                    <Icon className="w-7 h-7" strokeWidth={1.5} />
                  </div>

                  {/* Arrow Action */}
                  <div className={`p-2 rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 ${
                     darkMode ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Section: Text Info */}
                <div>
                  <h3 className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                    darkMode ? 'text-slate-200 group-hover:text-white' : 'text-slate-700 group-hover:text-slate-900'
                  }`}>
                    {item.label}
                  </h3>
                  
                  <div className="flex justify-between items-end mt-2">
                    <p className={`text-xs font-medium leading-relaxed max-w-[120px] ${
                        darkMode ? 'text-slate-500 group-hover:text-slate-400' : 'text-slate-400 group-hover:text-slate-500'
                    }`}>
                        {item.description}
                    </p>
                    
                    {/* Stats Pill */}
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm transition-all duration-300 ${
                      darkMode 
                        ? 'bg-white/5 text-slate-400 border border-white/5 group-hover:bg-white/10 group-hover:text-white' 
                        : 'bg-slate-50 text-slate-500 border border-slate-100 group-hover:bg-white group-hover:shadow-sm group-hover:text-slate-700'
                    }`}>
                      {item.stats}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardCards;