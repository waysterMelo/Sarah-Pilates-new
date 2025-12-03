import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Plus,
  Search,
  Filter,
  Edit2,
  Eye,
  Trash2,
  Phone,
  Mail,
  Calendar,
  Activity,
  MoreVertical,
  UserCheck,
  TrendingUp,
  ArrowLeft,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Loader
} from 'lucide-react';
import { useTheme } from '../src/contexts/ThemeContext';

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  plan: string;
  status: 'Ativo' | 'Inativo' | 'Suspenso';
  lastClass: string;
  totalClasses: number;
  avatar?: string;
}

const Students: React.FC = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/students');
      setStudents(response.data.content);
    } catch (err) {
      setError('Falha ao buscar alunos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este aluno?')) {
      try {
        await api.delete(`/api/students/${id}`);
        fetchStudents();
      } catch (err) {
        console.error('Failed to delete student', err);
        setError('Falha ao excluir aluno.');
      }
    }
  };


  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // Filter Logic
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.phone.includes(searchTerm);
    const matchesFilter = filterStatus === 'Todos' || student.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Ativo': return darkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Inativo': return darkMode ? 'bg-slate-500/10 text-slate-400 border-slate-500/20' : 'bg-slate-100 text-slate-500 border-slate-200';
      case 'Suspenso': return darkMode ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-red-50 text-red-600 border-red-100';
      default: return '';
    }
  };

  return (
    <main className={`min-h-screen relative transition-colors duration-500 ${
      darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-gray-900'
    }`}>
      
      {/* Header Estilo Agenda */}
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
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Gestão de Alunos
                </h1>
                <p className={`mt-1 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  Gerencie matrículas, status e progresso
                </p>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/students/new')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full md:w-auto justify-center"
            >
              <Plus className="w-5 h-5" />
              Novo Aluno
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 pb-6 relative z-10">
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total de Alunos', value: students.length, icon: Users, color: 'text-blue-500', sub: '+12% este mês' },
            { label: 'Ativos', value: students.filter(s => s.status === 'Ativo').length, icon: UserCheck, color: 'text-emerald-500', sub: '94% taxa de retenção' },
            { label: 'Aulas Hoje', value: '8', icon: Calendar, color: 'text-purple-500', sub: '6 confirmadas' },
            { label: 'Receita', value: '12.4k', icon: TrendingUp, color: 'text-orange-500', sub: '+8% vs anterior' }
          ].map((stat, index) => (
            <div key={index} className={`p-5 rounded-2xl border transition-all ${
              darkMode ? 'bg-slate-900/60 border-white/5' : 'bg-white border-gray-100 shadow-sm'
            }`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                    {stat.label}
                  </p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-slate-50'} ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <p className={`text-xs font-medium flex items-center gap-1 ${
                stat.sub.includes('+') 
                  ? (darkMode ? 'text-emerald-400' : 'text-emerald-600') 
                  : (darkMode ? 'text-slate-400' : 'text-slate-500')
              }`}>
                <Activity className="w-3 h-3" />
                {stat.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Controls Bar */}
        <div className={`p-4 rounded-2xl border mb-6 flex flex-col lg:flex-row gap-4 items-center justify-between transition-all ${
          darkMode ? 'bg-slate-900/60 border-white/5' : 'bg-white border-gray-100 shadow-sm'
        }`}>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto flex-1">
            <div className={`relative flex-1 lg:max-w-md rounded-xl transition-all ${
              darkMode ? 'bg-white/5 focus-within:bg-white/10' : 'bg-slate-50 focus-within:bg-white focus-within:shadow-md'
            }`}>
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
              <input
                type="text"
                placeholder="Buscar por nome, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent py-2.5 pl-10 pr-4 outline-none text-sm font-medium rounded-xl"
              />
            </div>
            
            <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border ${
               darkMode ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-white'
            }`}>
              <Filter className={`w-4 h-4 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-transparent text-sm font-medium outline-none cursor-pointer min-w-[120px]"
              >
                <option value="Todos">Status: Todos</option>
                <option value="Ativo">Ativos</option>
                <option value="Inativo">Inativos</option>
                <option value="Suspenso">Suspensos</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
             <div className="flex items-center gap-2 text-sm">
               <span className={darkMode ? 'text-slate-500' : 'text-slate-400'}>Linhas:</span>
               <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className={`px-2 py-1 rounded-lg text-sm font-bold outline-none cursor-pointer ${
                    darkMode ? 'bg-white/5 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <option value={8}>8</option>
                  <option value={16}>16</option>
                  <option value={24}>24</option>
                </select>
             </div>

             <div className={`h-8 w-[1px] mx-2 ${darkMode ? 'bg-white/10' : 'bg-gray-200'}`} />

             <div className={`flex p-1 rounded-lg ${darkMode ? 'bg-white/5' : 'bg-slate-100'}`}>
               <button
                 onClick={() => setViewMode('cards')}
                 className={`p-1.5 rounded-md transition-all ${
                   viewMode === 'cards' 
                    ? (darkMode ? 'bg-slate-700 text-white shadow-sm' : 'bg-white text-primary-600 shadow-sm') 
                    : (darkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600')
                 }`}
               >
                 <LayoutGrid className="w-4 h-4" />
               </button>
               <button
                 onClick={() => setViewMode('table')}
                 className={`p-1.5 rounded-md transition-all ${
                   viewMode === 'table' 
                    ? (darkMode ? 'bg-slate-700 text-white shadow-sm' : 'bg-white text-primary-600 shadow-sm') 
                    : (darkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600')
                 }`}
               >
                 <List className="w-4 h-4" />
               </button>
             </div>
          </div>
        </div>

        {/* Content Area */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {currentStudents.map((student) => (
              <div
                key={student.id}
                className={`group relative rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 ${
                  darkMode 
                    ? 'bg-slate-900/50 border-white/5 hover:border-primary-500/30 hover:bg-slate-800/50' 
                    : 'bg-white border-gray-100 hover:border-primary-200 shadow-sm hover:shadow-xl hover:shadow-primary-500/5'
                }`}
              >
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={student.avatar} 
                      alt={student.name} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-800"
                    />
                    <div>
                      <h3 className="font-bold text-sm leading-tight line-clamp-1">{student.name}</h3>
                      <span className={`inline-flex mt-1 items-center px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusStyles(student.status)}`}>
                        {student.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <button 
                      onClick={() => setActiveDropdown(activeDropdown === student.id ? null : student.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        darkMode ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-50 text-slate-400'
                      }`}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    
                    {activeDropdown === student.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setActiveDropdown(null)} />
                        <div className={`absolute right-0 mt-2 w-40 rounded-xl border shadow-lg z-20 overflow-hidden ${
                          darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-100'
                        }`}>
                          <button onClick={() => navigate(`/students/${student.id}`)} className={`w-full px-4 py-2.5 text-left text-xs font-medium flex items-center gap-2 ${darkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                            <Eye className="w-3 h-3" /> Ver Perfil
                          </button>
                          <button 
                            onClick={() => navigate(`/students/${student.id}/edit`, { state: { student } })}
                            className={`w-full px-4 py-2.5 text-left text-xs font-medium flex items-center gap-2 ${darkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}
                          >
                            <Edit2 className="w-3 h-3" /> Editar
                          </button>
                          <div className={`h-[1px] w-full ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`} />
                          <button onClick={() => handleDelete(student.id)} className="w-full px-4 py-2.5 text-left text-xs font-medium flex items-center gap-2 text-red-500 hover:bg-red-500/10">
                            <Trash2 className="w-3 h-3" /> Excluir
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Info Grid */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-xs opacity-70">
                    <Mail className="w-3.5 h-3.5" />
                    <span className="truncate">{student.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs opacity-70">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{student.phone}</span>
                  </div>
                </div>

                {/* Footer Stats */}
                <div className={`pt-3 border-t flex items-center justify-between ${
                   darkMode ? 'border-white/5' : 'border-gray-50'
                }`}>
                   <div>
                      <p className="text-[10px] uppercase tracking-wider opacity-50 font-bold">Plano</p>
                      <p className="text-xs font-bold">{student.plan}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] uppercase tracking-wider opacity-50 font-bold">Aulas</p>
                      <p className="text-xs font-bold text-primary-500">{student.totalClasses}</p>
                   </div>
                </div>
                
                <button 
                  onClick={() => navigate(`/students/${student.id}`)}
                  className="absolute inset-0 z-0" 
                />
              </div>
            ))}
          </div>
        ) : (
          // Table View
          <div className={`rounded-2xl border overflow-hidden mb-8 ${
            darkMode ? 'bg-slate-900/40 border-white/5' : 'bg-white border-gray-100 shadow-sm'
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className={`text-xs font-bold uppercase tracking-wider border-b ${
                   darkMode ? 'bg-white/5 border-white/5 text-slate-400' : 'bg-slate-50 border-gray-100 text-slate-500'
                }`}>
                  <tr>
                    <th className="p-4">Aluno</th>
                    <th className="p-4">Contato</th>
                    <th className="p-4">Plano</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Última Aula</th>
                    <th className="p-4">Total</th>
                    <th className="p-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                  {currentStudents.map((student) => (
                    <tr 
                      key={student.id} 
                      onClick={() => navigate(`/students/${student.id}`)}
                      className={`cursor-pointer transition-colors ${
                        darkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={student.avatar} 
                            alt={student.name} 
                            className="w-9 h-9 rounded-xl object-cover"
                          />
                          <div>
                            <p className="font-bold">{student.name}</p>
                            <p className="text-xs opacity-50">ID: #{student.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1 text-xs opacity-80">
                          <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {student.email}</span>
                          <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {student.phone}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${
                          darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                        }`}>{student.plan}</span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold border ${getStatusStyles(student.status)}`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="text-xs">
                          <p className="opacity-80">{new Date(student.lastClass).toLocaleDateString('pt-BR')}</p>
                          <p className="opacity-50 text-[10px]">há 5 dias</p>
                        </div>
                      </td>
                      <td className="p-4 font-bold text-primary-500">
                        {student.totalClasses}
                      </td>
                      <td className="p-4 text-right">
                         <button className={`p-2 rounded-lg transition-colors ${
                            darkMode ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
                         }`}>
                           <ChevronRight className="w-4 h-4" />
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
            darkMode ? 'bg-slate-900/40 border-white/5' : 'bg-white border-gray-100'
          }`}>
             <div className={`text-xs font-medium ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                Mostrando <span className={darkMode ? 'text-white' : 'text-gray-900'}>{startIndex + 1}-{Math.min(endIndex, filteredStudents.length)}</span> de {filteredStudents.length} resultados
             </div>

             <div className="flex items-center gap-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg transition-all ${
                    darkMode 
                      ? 'hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent' 
                      : 'hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                   let pageNum = i + 1;
                   if (totalPages > 5 && currentPage > 3) {
                      pageNum = currentPage - 2 + i;
                      if (pageNum > totalPages) pageNum = i + 1; // Fallback simple logic for demo
                   }
                   
                   return (
                    <button
                      key={i}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                        currentPage === pageNum
                          ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25 scale-105'
                          : (darkMode ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-100 text-slate-600')
                      }`}
                    >
                      {pageNum}
                    </button>
                   )
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg transition-all ${
                    darkMode 
                      ? 'hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent' 
                      : 'hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
             </div>
          </div>
        )}

      </div>
    </main>
  );
};

export default Students;