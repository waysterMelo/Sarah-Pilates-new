import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Plus,
  Search,
  Filter,
  Eye,
  Edit2,
  Trash2,
  Phone,
  Mail,
  Star,
  MoreVertical,
  CheckCircle2,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

interface InstructorsProps {
  darkMode: boolean;
}

interface Instructor {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  status: 'Ativo' | 'Inativo' | 'Férias';
  rating: number;
  totalClasses: number;
  avatar?: string;
  hourlyRate: number;
}

const Instructors: React.FC<InstructorsProps> = ({ darkMode }) => {
  const navigate = useNavigate();
  
  // Mock Data
  const [instructors, setInstructors] = useState<Instructor[]>([
    {
      id: 1,
      name: 'Sarah Costa Silva',
      email: 'sarah.costa@email.com',
      phone: '(11) 99999-9999',
      specialties: ['Pilates Solo', 'Reformer'],
      status: 'Ativo',
      rating: 4.9,
      totalClasses: 1250,
      hourlyRate: 85,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 2,
      name: 'Roberto Lima',
      email: 'roberto@email.com',
      phone: '(11) 98888-8888',
      specialties: ['Funcional', 'Atletas'],
      status: 'Férias',
      rating: 4.7,
      totalClasses: 850,
      hourlyRate: 80,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    ...Array.from({ length: 10 }, (_, i) => ({
      id: i + 3,
      name: `Instrutor ${i + 3}`,
      email: `instrutor${i + 3}@email.com`,
      phone: `(11) 97777-${String(i).padStart(4, '0')}`,
      specialties: ['Solo', 'Aparelhos'],
      status: ['Ativo', 'Inativo', 'Férias'][i % 3] as 'Ativo' | 'Inativo' | 'Férias',
      rating: 4.0 + Math.random(),
      totalClasses: Math.floor(Math.random() * 500) + 100,
      hourlyRate: 70 + (i * 2),
      avatar: `https://i.pravatar.cc/150?u=${i + 10}`
    }))
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const filteredInstructors = instructors.filter(inst => {
    const matchesSearch = inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inst.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'Todos' || inst.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredInstructors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInstructors = filteredInstructors.slice(startIndex, endIndex);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Ativo': return darkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Inativo': return darkMode ? 'bg-slate-500/10 text-slate-400 border-slate-500/20' : 'bg-slate-100 text-slate-500 border-slate-200';
      case 'Férias': return darkMode ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-amber-50 text-amber-600 border-amber-100';
      default: return '';
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
        <span className={`text-xs font-bold ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>{rating.toFixed(1)}</span>
      </div>
    );
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
                  Equipe Técnica
                </h1>
                <p className={`mt-1 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  Gerencie seus instrutores, horários e performance
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/instructors/new')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full md:w-auto justify-center"
            >
              <Plus className="w-5 h-5" />
              Novo Instrutor
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-6 relative z-10">
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className={`p-5 rounded-2xl border flex items-center justify-between ${darkMode ? 'bg-slate-900/60 border-white/5' : 'bg-white border-gray-100'}`}>
            <div>
              <p className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Total Instrutores</p>
              <h3 className="text-2xl font-bold mt-1">{instructors.length}</h3>
            </div>
            <div className={`p-3 rounded-xl ${darkMode ? 'bg-primary-500/10 text-primary-400' : 'bg-primary-50 text-primary-600'}`}>
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className={`p-5 rounded-2xl border flex items-center justify-between ${darkMode ? 'bg-slate-900/60 border-white/5' : 'bg-white border-gray-100'}`}>
            <div>
              <p className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Ativos</p>
              <h3 className="text-2xl font-bold mt-1 text-emerald-500">{instructors.filter(i => i.status === 'Ativo').length}</h3>
            </div>
            <div className={`p-3 rounded-xl ${darkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
          <div className={`p-5 rounded-2xl border flex items-center justify-between ${darkMode ? 'bg-slate-900/60 border-white/5' : 'bg-white border-gray-100'}`}>
            <div>
              <p className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Avaliação Média</p>
              <h3 className="text-2xl font-bold mt-1 text-yellow-500">4.8</h3>
            </div>
            <div className={`p-3 rounded-xl ${darkMode ? 'bg-yellow-500/10 text-yellow-400' : 'bg-yellow-50 text-yellow-600'}`}>
              <Star className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Filters Bar */}
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
                placeholder="Buscar instrutor..."
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
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
                <option value="Férias">Férias</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
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

        {/* Content Grid */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {currentInstructors.map((instructor) => (
              <div
                key={instructor.id}
                className={`group relative rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                  darkMode 
                    ? 'bg-slate-900/50 border-white/5 hover:border-primary-500/30 hover:bg-slate-800/50' 
                    : 'bg-white border-gray-100 hover:border-primary-200 shadow-sm hover:shadow-xl hover:shadow-primary-500/5'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={instructor.avatar} 
                      alt={instructor.name} 
                      className="w-14 h-14 rounded-2xl object-cover shadow-sm"
                    />
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{instructor.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {renderStars(instructor.rating)}
                        <span className="text-[10px] opacity-50">• {instructor.totalClasses} aulas</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <button 
                      onClick={() => setActiveDropdown(activeDropdown === instructor.id ? null : instructor.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        darkMode ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-50 text-slate-400'
                      }`}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {activeDropdown === instructor.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setActiveDropdown(null)} />
                        <div className={`absolute right-0 mt-2 w-40 rounded-xl border shadow-lg z-20 overflow-hidden ${
                          darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-100'
                        }`}>
                          <button onClick={() => navigate(`/instructors/${instructor.id}`)} className={`w-full px-4 py-2.5 text-left text-xs font-medium flex items-center gap-2 ${darkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                            <Eye className="w-3 h-3" /> Ver Perfil
                          </button>
                          <button 
                            onClick={() => navigate(`/instructors/${instructor.id}/edit`, { state: { instructor } })}
                            className={`w-full px-4 py-2.5 text-left text-xs font-medium flex items-center gap-2 ${darkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}
                          >
                            <Edit2 className="w-3 h-3" /> Editar
                          </button>
                          <div className={`h-[1px] w-full ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`} />
                          <button className="w-full px-4 py-2.5 text-left text-xs font-medium flex items-center gap-2 text-red-500 hover:bg-red-500/10">
                            <Trash2 className="w-3 h-3" /> Excluir
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-xs opacity-70">
                    <Mail className="w-3.5 h-3.5" />
                    <span className="truncate">{instructor.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs opacity-70">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{instructor.phone}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                     {instructor.specialties.slice(0, 2).map((spec, i) => (
                        <span key={i} className={`text-[10px] font-medium px-2 py-1 rounded border ${
                           darkMode ? 'bg-primary-500/10 border-primary-500/20 text-primary-300' : 'bg-primary-50 border-primary-100 text-primary-600'
                        }`}>
                           {spec}
                        </span>
                     ))}
                  </div>
                </div>

                <div className={`pt-4 border-t flex items-center justify-between ${
                   darkMode ? 'border-white/5' : 'border-gray-50'
                }`}>
                   <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${getStatusStyles(instructor.status)}`}>
                     {instructor.status}
                   </span>
                   <span className="text-sm font-bold">R$ {instructor.hourlyRate}/h</span>
                </div>
                
                <button onClick={() => navigate(`/instructors/${instructor.id}`)} className="absolute inset-0 z-0" />
              </div>
            ))}
          </div>
        ) : (
           // Table View Implementation
          <div className={`rounded-2xl border overflow-hidden mb-8 ${
            darkMode ? 'bg-slate-900/40 border-white/5' : 'bg-white border-gray-100 shadow-sm'
          }`}>
            <table className="w-full text-sm text-left">
              <thead className={`text-xs font-bold uppercase tracking-wider border-b ${
                 darkMode ? 'bg-white/5 border-white/5 text-slate-400' : 'bg-slate-50 border-gray-100 text-slate-500'
              }`}>
                <tr>
                  <th className="p-4">Instrutor</th>
                  <th className="p-4">Contato</th>
                  <th className="p-4">Especialidades</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Performance</th>
                  <th className="p-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {currentInstructors.map((inst) => (
                  <tr 
                    key={inst.id} 
                    onClick={() => navigate(`/instructors/${inst.id}`)}
                    className={`cursor-pointer transition-colors ${
                      darkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={inst.avatar} alt={inst.name} className="w-10 h-10 rounded-xl object-cover" />
                        <div>
                          <p className="font-bold">{inst.name}</p>
                          <p className="text-xs opacity-50">R$ {inst.hourlyRate}/h</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-0.5 text-xs opacity-80">
                        <span>{inst.email}</span>
                        <span>{inst.phone}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {inst.specialties.slice(0,2).map(s => (
                          <span key={s} className={`text-[10px] px-1.5 py-0.5 rounded border ${
                            darkMode ? 'border-white/10' : 'border-gray-200 bg-gray-50'
                          }`}>{s}</span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                       <span className={`px-2 py-1 rounded text-[10px] font-bold border ${getStatusStyles(inst.status)}`}>
                          {inst.status}
                        </span>
                    </td>
                    <td className="p-4">
                       {renderStars(inst.rating)}
                    </td>
                    <td className="p-4 text-right">
                       <ChevronRight className="w-4 h-4 opacity-40" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center gap-2 pb-8">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p-1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg ${darkMode ? 'hover:bg-white/10 disabled:opacity-30' : 'hover:bg-gray-100 disabled:opacity-30'}`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="flex items-center px-4 text-sm font-medium opacity-60">
            Página {currentPage} de {totalPages}
          </span>
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg ${darkMode ? 'hover:bg-white/10 disabled:opacity-30' : 'hover:bg-gray-100 disabled:opacity-30'}`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </main>
  );
};

export default Instructors;