import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dumbbell,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Clock,
  Users,
  DollarSign,
  Zap,
  LayoutGrid,
  List,
  MoreVertical,
  ArrowLeft,
  BarChart3,
  Star,
  Calendar,
  AlertTriangle,
  Loader
} from 'lucide-react';
import api from '../src/services/api';

import { useTheme } from '../src/contexts/ThemeContext';

interface ClassType {
  id: number;
  name: string;
  description: string;
  duration: number;
  price: number;
  capacity: number;
  intensity: 'Baixa' | 'Média' | 'Alta';
  color: string;
  equipment: string[];
  totalSessions: number;
  rating: number;
  active: boolean;
}

const Classes: React.FC = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const [classes, setClasses] = useState<ClassType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getIntensityColor = (intensity: 'Baixa' | 'Média' | 'Alta') => {
    switch (intensity) {
        case 'Baixa': return 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300';
        case 'Média': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-300';
        case 'Alta': return 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-300';
        default: return 'bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-300';
    }
  }

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/classtypes');
      setClasses(response.data.content);
    } catch (err) {
      setError('Falha ao buscar modalidades.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja arquivar esta modalidade?')) {
      try {
        await api.delete(`/api/classtypes/${id}`);
        fetchClasses(); // Refresh data
      } catch (err) {
        console.error('Failed to delete class type', err);
        setError('Falha ao arquivar modalidade.');
      }
    }
    setActiveDropdown(null);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      {/* Header */}
      <div className={`shadow-lg mb-8 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
                  Catálogo de Aulas
                </h1>
                <p className={`mt-1 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  Gerencie as modalidades oferecidas pelo estúdio
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/classes/new')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full md:w-auto justify-center"
            >
              <Plus className="w-5 h-5" />
              Nova Modalidade
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-6">
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className={`p-5 rounded-2xl border transition-all ${darkMode ? 'bg-slate-900/60 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Modalidades Ativas</p>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{classes.length}</h3>
              </div>
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                <Dumbbell className="w-5 h-5" />
              </div>
            </div>
          </div>
          
          <div className={`p-5 rounded-2xl border transition-all ${darkMode ? 'bg-slate-900/60 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Média de Preço</p>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  R$ {(classes.reduce((acc, c) => acc + c.price, 0) / classes.length).toFixed(2)}
                </h3>
              </div>
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-green-500/10 text-green-400' : 'bg-green-50 text-green-600'}`}>
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className={`p-5 rounded-2xl border transition-all ${darkMode ? 'bg-slate-900/60 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Total de Sessões</p>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {classes.reduce((acc, c) => acc + c.totalSessions, 0)}
                </h3>
              </div>
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
                <BarChart3 className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className={`p-4 rounded-2xl border mb-6 flex flex-col md:flex-row justify-between gap-4 ${darkMode ? 'bg-slate-900/60 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              <input 
                type="text" 
                placeholder="Buscar modalidade..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder:text-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
              />
            </div>
            <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border ${darkMode ? 'border-slate-700 bg-slate-800' : 'border-gray-200 bg-gray-50'}`}>
              <Filter className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <select className={`bg-transparent text-sm font-medium outline-none cursor-pointer ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                <option value="Todos">Todas as Intensidades</option>
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setViewMode('cards')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'cards' ? (darkMode ? 'bg-slate-800 text-white shadow-sm' : 'bg-white text-blue-600 shadow-sm') : (darkMode ? 'text-gray-500' : 'text-gray-400')}`}>
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button onClick={() => setViewMode('table')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'table' ? (darkMode ? 'bg-slate-800 text-white shadow-sm' : 'bg-white text-blue-600 shadow-sm') : (darkMode ? 'text-gray-500' : 'text-gray-400')}`}>
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Grid View */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="w-8 h-8 animate-spin text-primary-500" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64 bg-red-500/10 text-red-500 rounded-2xl">
            <AlertTriangle className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold">Ocorreu um erro</h3>
            <p>{error}</p>
          </div>
        ) : viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredClasses.map(cls => (
              <div key={cls.id} className={`group relative rounded-3xl border overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl ${darkMode ? 'bg-slate-900 border-white/5 hover:border-white/10' : 'bg-white border-gray-100 shadow-sm'}`}>
                {/* Header com Gradiente */}
                <div className={`h-24 bg-gradient-to-r ${cls.color} p-6 relative`}>
                  <div className="absolute -bottom-6 left-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${darkMode ? 'bg-slate-800 text-white' : 'bg-white text-gray-800'}`}>
                      <Dumbbell className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="relative">
                      <button 
                        onClick={() => setActiveDropdown(activeDropdown === cls.id ? null : cls.id)}
                        className="p-2 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-colors"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      {activeDropdown === cls.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setActiveDropdown(null)} />
                          <div className={`absolute right-0 mt-2 w-40 rounded-xl border shadow-xl z-20 overflow-hidden ${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-100'}`}>
                            <button onClick={() => navigate(`/classes/${cls.id}/edit`, { state: { classData: cls } })} className={`w-full px-4 py-3 text-left text-sm font-medium flex items-center gap-2 ${darkMode ? 'hover:bg-white/5 text-gray-200' : 'hover:bg-gray-50 text-gray-700'}`}>
                              <Edit2 className="w-4 h-4" /> Editar
                            </button>
                            <button onClick={() => navigate('/schedule')} className={`w-full px-4 py-3 text-left text-sm font-medium flex items-center gap-2 ${darkMode ? 'hover:bg-white/5 text-gray-200' : 'hover:bg-gray-50 text-gray-700'}`}>
                              <Calendar className="w-4 h-4" /> Ver na Agenda
                            </button>
                            <div className={`h-px ${darkMode ? 'bg-white/10' : 'bg-gray-100'}`} />
                            <button onClick={() => handleDelete(cls.id)} className="w-full px-4 py-3 text-left text-sm font-medium flex items-center gap-2 text-red-500 hover:bg-red-500/10">
                              <Trash2 className="w-4 h-4" /> Arquivar
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-8 px-6 pb-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{cls.name}</h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-bold">{cls.rating}</span>
                    </div>
                  </div>
                  
                  <p className={`text-sm line-clamp-2 mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {cls.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${getIntensityColor(cls.intensity)}`}>
                      <Zap className="w-3 h-3" /> {cls.intensity}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300`}>
                      {cls.duration} min
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300`}>
                      Max: {cls.capacity}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-dashed border-gray-200 dark:border-white/10">
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Preço/Sessão</p>
                      <p className={`text-xl font-bold text-green-500`}>R$ {cls.price.toFixed(2)}</p>
                    </div>
                    <button 
                        onClick={() => navigate('/schedule')}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${darkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                    >
                        Agendar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-slate-900/40 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
            <table className="w-full text-sm text-left">
              <thead className={`text-xs font-bold uppercase tracking-wider border-b ${darkMode ? 'bg-white/5 border-white/5 text-slate-400' : 'bg-slate-50 border-gray-100 text-slate-500'}`}>
                <tr>
                  <th className="p-4">Modalidade</th>
                  <th className="p-4">Duração</th>
                  <th className="p-4">Intensidade</th>
                  <th className="p-4">Capacidade</th>
                  <th className="p-4">Preço</th>
                  <th className="p-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-white/5' : 'divide-gray-100'}`}>
                {filteredClasses.map(cls => (
                  <tr key={cls.id} className={`group ${darkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                    <td className="p-4">
                      <div className="font-bold text-base text-primary-600">{cls.name}</div>
                      <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>ID: #{cls.id}</div>
                    </td>
                    <td className={`p-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {cls.duration} min</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${getIntensityColor(cls.intensity)}`}>
                        {cls.intensity}
                      </span>
                    </td>
                    <td className={`p-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <div className="flex items-center gap-2"><Users className="w-4 h-4" /> {cls.capacity} alunos</div>
                    </td>
                    <td className="p-4 font-bold text-green-500">R$ {cls.price.toFixed(2)}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => navigate(`/classes/${cls.id}/edit`, { state: { classData: cls } })} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(cls.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Classes;