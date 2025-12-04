import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Plus, Search, Filter, Edit, Eye, Trash2, User, Calendar, Activity,
  TrendingUp, FileText, Target, MoreVertical, HeartPulse
} from 'lucide-react';
import { useTheme } from '../src/contexts/ThemeContext';
import PhysicalEvaluationForm from './PhysicalEvaluationForm';
import PhysicalEvaluationDetails from './PhysicalEvaluationDetails';
import api from '../src/services/api'; // Import the API service

const PhysicalEvaluation: React.FC = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [evaluations, setEvaluations] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const fetchEvaluations = async () => {
    try {
      setLoading(true);
      console.log('🔄 Buscando lista de Avaliações Físicas...');
      const response = await api.get('/api/evaluations/physical');
      console.log('✅ Dados recebidos:', response.data);
      setEvaluations(response.data.content); // Assuming the API returns a Page object
    } catch (err: any) {
      console.error('❌ Falha ao buscar lista:', err);
      if (err.response) {
        console.error('Detalhes do erro:', err.response.data);
      }
      setError('Erro ao carregar avaliações físicas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvaluations();
  }, []); // Empty dependency array means this effect runs once on mount

  const handleAddEvaluation = () => {
    setSelectedEvaluation(null);
    setEditMode(false);
    setShowForm(true);
  };

  const handleViewEvaluation = (evaluation: any) => {
    setSelectedEvaluation(evaluation);
    setShowDetails(true);
    setActiveDropdown(null);
  };

  const handleEditEvaluation = (evaluation: any) => {
    setSelectedEvaluation(evaluation);
    setEditMode(true);
    setShowForm(true);
    setActiveDropdown(null);
  };

  const handleSaveEvaluation = async (data: any) => {
    console.group('🚀 Tentativa de Salvar: Avaliação Física');
    console.log('Payload enviado:', data);

    try {
      if (editMode && selectedEvaluation) {
        await api.put(`/api/evaluations/physical/${selectedEvaluation.id}`, data);
        console.log('✅ Sucesso ao editar!');
      } else {
        await api.post('/api/evaluations/physical', data);
        console.log('✅ Sucesso ao criar!');
      }
      setShowForm(false);
      fetchEvaluations(); // Refresh data
    } catch (err: any) {
      console.error('❌ Erro ao salvar:', err);
      if (err.response) {
        console.error('Status:', err.response.status);
        console.error('Dados do Erro (Backend):', err.response.data);
      }
      setError('Erro ao salvar avaliação.');
    } finally {
      console.groupEnd();
    }
  };

  const handleDeleteEvaluation = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta avaliação?')) {
      console.group(`🚀 Tentativa de Deletar: Avaliação Física #${id}`);
      console.log('ID para deletar:', id);

      try {
        await api.delete(`/api/evaluations/physical/${id}`);
        console.log('✅ Sucesso ao deletar!');
        fetchEvaluations(); // Refresh data
        setActiveDropdown(null);
      } catch (err: any) {
        console.error('❌ Erro ao deletar:', err);
        if (err.response) {
          console.error('Status:', err.response.status);
          console.error('Dados do Erro (Backend):', err.response.data);
        }
        setError('Erro ao excluir avaliação.');
      } finally {
        console.groupEnd();
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p>Carregando...</p></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen"><p className="text-red-500">{error}</p></div>;
  }

  const filteredEvaluations = evaluations.filter(e => 
    e.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showForm) {
    return <PhysicalEvaluationForm evaluation={selectedEvaluation} isEdit={editMode} onSave={handleSaveEvaluation} onCancel={() => setShowForm(false)} />;
  }

  if (showDetails && selectedEvaluation) {
    return <PhysicalEvaluationDetails evaluation={selectedEvaluation} onEdit={() => { setShowDetails(false); handleEditEvaluation(selectedEvaluation); }} onClose={() => setShowDetails(false)} />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      {/* Header Estilo Agenda Refatorado para Avaliação Física */}
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
                  Avaliação Física
                </h1>
                <p className={`mt-1 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  Avaliações, testes físicos e evolução
                </p>
              </div>
            </div>
            
            <button 
              onClick={handleAddEvaluation}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full md:w-auto justify-center"
            >
              <Plus className="w-5 h-5" />
              Nova Avaliação
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-6">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Avaliações', value: evaluations.length, icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { label: 'Média IMC', value: '22.4', icon: Activity, color: 'text-green-500', bg: 'bg-green-500/10' },
            { label: 'Este Mês', value: '12', icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-500/10' },
            { label: 'Evolução', value: '+15%', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-500/10' },
          ].map((stat, i) => (
            <div key={i} className={`p-5 rounded-2xl border transition-all ${darkMode ? 'bg-slate-900/60 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{stat.label}</p>
                  <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className={`p-4 rounded-2xl border mb-6 flex flex-col md:flex-row justify-between gap-4 ${darkMode ? 'bg-slate-900/60 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
          <div className="relative flex-1 max-w-md">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            <input 
              type="text" 
              placeholder="Buscar por aluno..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder:text-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
            />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setViewMode('cards')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'cards' ? (darkMode ? 'bg-slate-800 text-white shadow-sm' : 'bg-white text-blue-600 shadow-sm') : (darkMode ? 'text-gray-500' : 'text-gray-400')}`}>
              <div className="grid grid-cols-2 gap-0.5 w-5 h-5"><div className="bg-current rounded-[1px]" /><div className="bg-current rounded-[1px]" /><div className="bg-current rounded-[1px]" /><div className="bg-current rounded-[1px]" /></div>
            </button>
            <button onClick={() => setViewMode('table')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'table' ? (darkMode ? 'bg-slate-800 text-white shadow-sm' : 'bg-white text-blue-600 shadow-sm') : (darkMode ? 'text-gray-500' : 'text-gray-400')}`}>
              <div className="flex flex-col gap-0.5 w-5 h-5"><div className="bg-current h-1 rounded-[1px]" /><div className="bg-current h-1 rounded-[1px]" /><div className="bg-current h-1 rounded-[1px]" /></div>
            </button>
          </div>
        </div>

        {/* List */}
        {filteredEvaluations.length === 0 ? (
          <div className={`text-center py-20 rounded-3xl border border-dashed ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
            <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${darkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
              <HeartPulse className={`w-10 h-10 ${darkMode ? 'text-slate-600' : 'text-gray-400'}`} />
            </div>
            <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Nenhuma avaliação encontrada</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Comece adicionando uma nova avaliação física.</p>
          </div>
        ) : viewMode === 'cards' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEvaluations.map(evaluation => (
              <div key={evaluation.id} className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-lg group relative ${darkMode ? 'bg-slate-900/50 border-white/5 hover:bg-slate-800/50' : 'bg-white border-gray-100 shadow-sm hover:shadow-xl'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {evaluation.studentName.charAt(0)}
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{evaluation.studentName}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold border ${darkMode ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-600'}`}>
                          {evaluation.type}
                        </span>
                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>#{evaluation.id}</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <button onClick={() => setActiveDropdown(activeDropdown === evaluation.id ? null : evaluation.id)} className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-400'}`}>
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    {activeDropdown === evaluation.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setActiveDropdown(null)} />
                        <div className={`absolute right-0 mt-2 w-48 rounded-xl border shadow-xl z-20 overflow-hidden ${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-100'}`}>
                          <button onClick={() => handleViewEvaluation(evaluation)} className={`w-full px-4 py-3 text-left text-sm font-medium flex items-center gap-2 ${darkMode ? 'hover:bg-white/5 text-gray-200' : 'hover:bg-gray-50 text-gray-700'}`}>
                            <Eye className="w-4 h-4" /> Visualizar
                          </button>
                          <button onClick={() => handleEditEvaluation(evaluation)} className={`w-full px-4 py-3 text-left text-sm font-medium flex items-center gap-2 ${darkMode ? 'hover:bg-white/5 text-gray-200' : 'hover:bg-gray-50 text-gray-700'}`}>
                            <Edit className="w-4 h-4" /> Editar
                          </button>
                          <button onClick={() => handleDeleteEvaluation(evaluation.id)} className="w-full px-4 py-3 text-left text-sm font-medium flex items-center gap-2 text-red-500 hover:bg-red-500/10">
                            <Trash2 className="w-4 h-4" /> Excluir
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 py-4 border-t border-b mb-4 border-dashed border-gray-200 dark:border-white/10">
                  <div className="text-center">
                    <p className="text-xs uppercase text-gray-400 font-bold mb-1">Peso</p>
                    <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{evaluation.weight}kg</p>
                  </div>
                  <div className="text-center border-l border-r border-dashed border-gray-200 dark:border-white/10">
                    <p className="text-xs uppercase text-gray-400 font-bold mb-1">IMC</p>
                    <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{evaluation.bmi}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs uppercase text-gray-400 font-bold mb-1">Gordura</p>
                    <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{evaluation.bodyFat}%</p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Calendar className="w-4 h-4" />
                    {new Date(evaluation.date).toLocaleDateString()}
                  </div>
                  <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <User className="w-4 h-4" />
                    {evaluation.instructorName.split(' ')[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-slate-900/40 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
            <table className="w-full text-sm">
              <thead className={`border-b ${darkMode ? 'bg-white/5 border-white/5 text-slate-400' : 'bg-slate-50 border-gray-100 text-gray-500'}`}>
                <tr>
                  <th className="p-4 text-left font-bold">Aluno</th>
                  <th className="p-4 text-left font-bold">Data</th>
                  <th className="p-4 text-left font-bold">Tipo</th>
                  <th className="p-4 text-left font-bold">Peso</th>
                  <th className="p-4 text-left font-bold">IMC</th>
                  <th className="p-4 text-right font-bold">Ações</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-white/5' : 'divide-gray-100'}`}>
                {filteredEvaluations.map(ev => (
                  <tr key={ev.id} className={`group ${darkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                    <td className={`p-4 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{ev.studentName}</td>
                    <td className={`p-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{new Date(ev.date).toLocaleDateString()}</td>
                    <td className="p-4"><span className="px-2 py-1 rounded text-xs font-bold bg-blue-100 text-blue-600">{ev.type}</span></td>
                    <td className={`p-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{ev.weight}kg</td>
                    <td className={`p-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{ev.bmi}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleViewEvaluation(ev)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Eye className="w-4 h-4" /></button>
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

export default PhysicalEvaluation;