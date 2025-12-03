import React, { useState, useEffect } from 'react';
import api from '../src/services/api';
import {
  Calendar as CalendarIcon,
  Clock,
  Filter,
  MoreHorizontal,
  Plus,
  User,
  ChevronLeft,
  ChevronRight,
  Layers,
  Zap
} from 'lucide-react';

interface StudioFlowProps {
  darkMode?: boolean;
  toggleTheme?: () => void;
}

// Types for our specialized Kanban view
interface ClassSession {
  id: string;
  title: string;
  instructor: string;
  startTime: string;
  endTime: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  currentStudents: number;
  maxStudents: number;
  intensity: number; // 1-100
  type: 'Reformer' | 'Cadillac' | 'Mat' | 'Chair';
  color: string;
  attendees: string[]; // Avatar URLs
}

const StudioFlow: React.FC<StudioFlowProps> = ({ darkMode = false }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeFilter, setActiveFilter] = useState<'All' | 'Reformer' | 'Cadillac' | 'Mat'>('All');
  const [classes, setClasses] = useState<ClassSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true);
      try {
        const dateStr = selectedDate.toISOString().split('T')[0];
        const response = await api.get('/api/schedules', {
          params: {
            startDate: dateStr,
            endDate: dateStr,
            size: 100 // Get all schedules for the day
          }
        });
        
        // Map API response to the ClassSession interface
        const mappedClasses = response.data.content.map((s: any) => ({
          id: s.id.toString(),
          title: s.classType.name,
          instructor: s.instructor.name,
          startTime: s.startTime,
          endTime: s.endTime,
          level: 'Intermediário', // This field is not in the DTO, using a default
          currentStudents: 1, // This is not in the DTO, using a default
          maxStudents: s.classType.capacity,
          intensity: 75, // This is not in the DTO, using a default
          type: s.classType.name.includes('Reformer') ? 'Reformer' : 
                s.classType.name.includes('Cadillac') ? 'Cadillac' : 
                s.classType.name.includes('Chair') ? 'Chair' : 'Mat',
          color: s.classType.color || 'bg-gray-500',
          attendees: [] // This is not in the DTO
        }));
        setClasses(mappedClasses);

      } catch (err) {
        console.error("Failed to fetch studio flow data", err);
        setError("Não foi possível carregar o fluxo do estúdio.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [selectedDate]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [classes, setClasses] = useState<ClassSession[]>([]);

  const equipmentZones = [
    { id: 'Reformer', label: 'Reformer Zone', icon: Layers, color: 'text-purple-500' },
    { id: 'Cadillac', label: 'Cadillac & Chair', icon: Zap, color: 'text-emerald-500' },
    { id: 'Mat', label: 'Mat Studio', icon: User, color: 'text-blue-500' },
  ];

  return (
    <main className={`min-h-screen relative overflow-hidden p-4 sm:p-6 transition-colors duration-500 ${
      darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-gray-900'
    }`}>
       {/* Background Ambient Light */}
       <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[100px] -z-10 opacity-30 pointer-events-none ${
        darkMode ? 'bg-primary-600' : 'bg-primary-300'
      }`} />

      <div className="max-w-7xl mx-auto h-full flex flex-col">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className={`text-3xl font-bold flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Studio Flow
              <span className="text-xs px-2 py-1 rounded-full bg-primary-500 text-white font-normal tracking-wide">AO VIVO</span>
            </h1>
            <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
              Gerenciamento visual de zonas e equipamentos
            </p>
          </div>

          <div className="flex items-center gap-3">
             {/* Date Navigator */}
            <div className={`flex items-center gap-2 p-1 rounded-xl border ${
              darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
            }`}>
              <button className={`p-1.5 rounded-lg hover:bg-gray-500/10 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2 px-2 font-medium text-sm">
                <CalendarIcon className="w-4 h-4 text-primary-500" />
                <span>{selectedDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}</span>
              </div>
              <button className={`p-1.5 rounded-lg hover:bg-gray-500/10 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 shadow-lg shadow-primary-500/20 transition-all active:scale-95">
              <Plus className="w-4 h-4" />
              Nova Aula
            </button>
          </div>
        </header>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 hide-scrollbar">
          {['All', 'Reformer', 'Cadillac', 'Mat'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter as any)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                activeFilter === filter
                  ? 'bg-primary-500 border-primary-500 text-white shadow-md'
                  : (darkMode 
                      ? 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10' 
                      : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50')
              }`}
            >
              {filter === 'All' ? 'Todos' : filter}
            </button>
          ))}
        </div>

        {/* Kanban / Swimlane View */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          {equipmentZones.map((zone) => {
            // Filter classes for this zone
            const zoneClasses = classes.filter(c => 
              (zone.id === 'Cadillac' ? ['Cadillac', 'Chair'].includes(c.type) : c.type === zone.id)
            );
            
            if (activeFilter !== 'All' && activeFilter !== zone.id && !(activeFilter === 'Cadillac' && zone.id === 'Cadillac')) return null;

            return (
              <div key={zone.id} className="flex flex-col h-full">
                {/* Zone Header */}
                <div className={`flex items-center justify-between p-4 rounded-t-2xl border-b-0 border mb-0 ${
                   darkMode 
                   ? 'bg-slate-900/50 border-white/10' 
                   : 'bg-white/80 border-gray-200'
                } backdrop-blur-md`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-opacity-10 ${zone.color.replace('text-', 'bg-')} ${zone.color}`}>
                      <zone.icon className="w-5 h-5" />
                    </div>
                    <span className={`font-bold ${darkMode ? 'text-slate-200' : 'text-gray-700'}`}>
                      {zone.label}
                    </span>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded bg-opacity-10 ${
                    darkMode ? 'bg-white text-slate-400' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {zoneClasses.length} Aulas
                  </span>
                </div>

                {/* Lane Background */}
                <div className={`flex-1 p-4 rounded-b-2xl border border-t-0 space-y-4 overflow-y-auto min-h-[500px] ${
                  darkMode ? 'bg-slate-900/30 border-white/10' : 'bg-slate-50/50 border-gray-200'
                }`}>
                  {zoneClasses.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center opacity-30">
                      <CalendarIcon className="w-10 h-10 mb-2" />
                      <span className="text-sm font-medium">Sem aulas agendadas</span>
                    </div>
                  ) : (
                    zoneClasses.map((session) => (
                      <div 
                        key={session.id}
                        className={`group relative rounded-2xl p-4 border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer ${
                          darkMode 
                            ? 'bg-slate-800/80 border-white/5 hover:border-primary-500/30' 
                            : 'bg-white border-gray-100 hover:border-primary-200 shadow-sm'
                        }`}
                      >
                        {/* Time Line connector decoration */}
                        <div className={`absolute left-0 top-6 w-1 h-8 rounded-r-full ${session.color}`} />

                        <div className="flex justify-between items-start mb-3 pl-3">
                          <div>
                            <span className={`inline-block text-xs font-bold uppercase tracking-wider mb-1 ${session.color.replace('bg-', 'text-')}`}>
                              {session.level}
                            </span>
                            <h3 className={`font-bold text-lg leading-tight ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                              {session.title}
                            </h3>
                            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                              {session.instructor}
                            </p>
                          </div>
                          <div className={`flex flex-col items-center justify-center px-2 py-1 rounded-lg border ${
                            darkMode ? 'bg-slate-950 border-white/10' : 'bg-gray-50 border-gray-100'
                          }`}>
                            <span className={`text-xs font-bold ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                              {session.startTime}
                            </span>
                            <span className="text-[10px] text-gray-400">
                              {session.endTime}
                            </span>
                          </div>
                        </div>

                        {/* Stats & Footer */}
                        <div className="pl-3">
                          {/* Intensity Bar */}
                          <div className="mb-4">
                            <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                              <span>Intensidade</span>
                              <span>{session.intensity}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${session.color}`} 
                                style={{ width: `${session.intensity}%` }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-white/5">
                             {/* Avatars */}
                             <div className="flex -space-x-2">
                                {session.attendees.map((src, idx) => (
                                  <img 
                                    key={idx} 
                                    src={src} 
                                    alt="User" 
                                    className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-800"
                                  />
                                ))}
                                {session.maxStudents - session.currentStudents > 0 && (
                                  <div className={`w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center text-[8px] font-bold ${
                                    darkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-600'
                                  }`}>
                                    +{session.maxStudents - session.currentStudents}
                                  </div>
                                )}
                             </div>

                             <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                                <User className="w-3 h-3" />
                                {session.currentStudents}/{session.maxStudents}
                             </div>
                          </div>
                        </div>
                        
                        {/* Hover Action */}
                        <button className={`absolute right-4 bottom-4 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-100 shadow-lg ${
                           darkMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'
                        }`}>
                           <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default StudioFlow;