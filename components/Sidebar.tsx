
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutGrid, 
  CalendarHeart, 
  Users, 
  Settings, 
  LogOut,
  Dumbbell,
  HeartPulse,
  TrendingUp
} from 'lucide-react';

interface SidebarProps {
  darkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ darkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: LayoutGrid, path: '/dashboard', label: 'Hub' },
    { icon: CalendarHeart, path: '/schedule', label: 'Flow' },
    { icon: Users, path: '/students', label: 'Alunos' },
    { icon: HeartPulse, path: '/physical', label: 'Avaliação' },
    { icon: TrendingUp, path: '/records', label: 'Evolução' },
    { icon: Dumbbell, path: '/classes', label: 'Aulas' },
    { icon: Settings, path: '/settings', label: 'Ajustes' },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <aside className={`w-20 lg:w-24 flex flex-col justify-between py-8 border-r transition-all duration-500 z-30 hidden sm:flex items-center ${
      darkMode 
        ? 'bg-slate-950 border-white/5' 
        : 'bg-white border-slate-100'
    }`}>
      <div className="flex flex-col items-center w-full">
        <div className="mb-12 relative group cursor-pointer" onClick={() => navigate('/dashboard')}>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-primary-500/30 transition-transform duration-300 group-hover:scale-110">
             <span className="text-white font-bold text-2xl">P</span>
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-primary-500/50 blur-md rounded-full group-hover:bg-primary-500/80 transition-all" />
        </div>

        <nav className="space-y-4 w-full px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.includes(item.path));
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300 relative group ${
                  isActive 
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' 
                    : (darkMode ? 'text-slate-500 hover:bg-white/5 hover:text-slate-200' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600')
                }`}
              >
                <Icon className={`w-6 h-6 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span className="text-xs font-medium opacity-80 scale-90">{item.label}</span>
                
                {!isActive && (
                  <div className={`absolute right-2 top-2 w-1.5 h-1.5 rounded-full bg-primary-500 opacity-0 transition-all duration-300 ${
                     location.pathname.includes(item.path) && item.path !== '/dashboard' ? 'opacity-100' : 'group-hover:opacity-100'
                  }`} />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="px-3 w-full">
        <button 
          onClick={handleLogout}
          className={`w-full aspect-square rounded-2xl flex items-center justify-center transition-all ${
          darkMode 
            ? 'text-slate-600 hover:text-red-400 hover:bg-red-500/10' 
            : 'text-slate-300 hover:text-red-500 hover:bg-red-50'
        }`}>
          <LogOut className="w-6 h-6" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
