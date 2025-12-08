import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FileText,
    Plus,
    Search,
    Filter,
    Edit,
    Eye,
    Trash2,
    Calendar,
    User,
    TrendingUp,
    ArrowLeft,
    Activity,
    Zap,
    LayoutGrid,
    List,
    Dumbbell
} from 'lucide-react';
import api from '../src/services/api';
import FichaEvolucaoPilates from './FichaEvolucaoPilates';
import FichaEvolucaoDetails from './FichaEvolucaoDetails';

import { useTheme } from '../src/contexts/ThemeContext';

import ConfirmModal from '../src/components/ConfirmModal';

interface FichaEvolucao {
    id: number;
    nomePaciente: string;
    date: string;
    mes: string;
    pacienteChegou: string;
    foiRealizado: string;
    exercicios: {
        [aparelho: string]: {
            [local: string]: {
                alongamento: boolean;
                fortalecimento: boolean;
                coordenacao: boolean;
                equilibrio: boolean;
                core: boolean;
            }
        }
    };
    observacoes: string;
    fisioterapeuta: string;
    crefito: string;
    createdAt: string;
}

const EvolutionRecords: React.FC = () => {
    const { darkMode } = useTheme();
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
    
    const [records, setRecords] = useState<FichaEvolucao[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  // Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<number | null>(null);

  const fetchEvolutionRecords = async () => {
    try {
      setLoading(true);
      console.log('🔄 Buscando lista de Registros de Evolução...');
      
      const response = await api.get('/api/evaluations/evolution');
      
      console.log('✅ Dados recebidos:', response.data);
      setRecords(response.data.content);
    } catch (err: any) {
      console.error('❌ Falha ao buscar lista:', err);
      if (err.response) {
        console.error('Detalhes do erro:', err.response.data);
      }
      setError('Falha ao buscar registros de evolução.');
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
        fetchEvolutionRecords();
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterPatient, setFilterPatient] = useState('Todos');
    const [showForm, setShowForm] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<FichaEvolucao | null>(null);
    const [editMode, setEditMode] = useState(false);

    const allPatients = Array.from(new Set(records.map(record => record.nomePaciente)));

    const filteredRecords = records.filter(record => {
        const matchesSearch = record.nomePaciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.fisioterapeuta.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPatient = filterPatient === 'Todos' || record.nomePaciente === filterPatient;
        return matchesSearch && matchesPatient;
    });

    const handleAddRecord = () => {
        setSelectedRecord(null);
        setEditMode(false);
        setShowForm(true);
    };

    const handleEditRecord = (record: FichaEvolucao) => {
        setSelectedRecord(record);
        setEditMode(true);
        setShowForm(true);
    };

    const handleViewRecord = (record: FichaEvolucao) => {
        setSelectedRecord(record);
        setShowDetails(true);
    };

  const handleDeleteRecord = (id: number) => {
    setRecordToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteRecord = async () => {
    if (!recordToDelete) return;

    console.group(`🚀 Tentativa de Deletar: Registro de Evolução #${recordToDelete}`);
    console.log('ID para deletar:', recordToDelete);

    try {
      await api.delete(`/api/evaluations/evolution/${recordToDelete}`);
      console.log('✅ Sucesso ao deletar!');
      fetchEvolutionRecords(); // Refresh data
      setIsDeleteModalOpen(false);
      setRecordToDelete(null);
    } catch (err: any) {
      console.error('❌ Erro ao deletar:', err);
      if (err.response) {
        console.error('Status:', err.response.status);
        console.error('Dados do Erro (Backend):', err.response.data);
      }
      setError('Falha ao excluir registro de evolução.');
    } finally {
      console.groupEnd();
    }
  };

    const handleSaveRecord = async (recordData: Omit<FichaEvolucao, 'id'>) => {
        try {
            if (editMode && selectedRecord) {
                await api.put(`/api/evaluations/evolution/${selectedRecord.id}`, recordData);
            } else {
                await api.post('/api/evaluations/evolution', recordData);
            }
            setShowForm(false);
            fetchRecords(); // Refresh data
        } catch (err) {
            console.error("Failed to save evolution record", err);
            setError("Não foi possível salvar a ficha.");
        }
    };

    const getActiveExerciseCount = (ficha: FichaEvolucao) => {
        let count = 0;
        if(!ficha.exercicios) return 0;
        Object.values(ficha.exercicios).forEach(aparelho => {
            Object.values(aparelho).forEach(local => {
                Object.values(local).forEach(ativo => { if (ativo) count++; });
            });
        });
        return count;
    };

    if (showForm) {
        return <FichaEvolucaoPilates ficha={selectedRecord} isEdit={editMode} onSave={handleSaveRecord} onCancel={() => setShowForm(false)} />;
    }

    if (showDetails && selectedRecord) {
        return <FichaEvolucaoDetails ficha={selectedRecord} onEdit={() => { setShowDetails(false); handleEditRecord(selectedRecord); }} onClose={() => setShowDetails(false)} />;
    }

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
            {/* Header Stylized */}
            <div className={`shadow-lg mb-8 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <button onClick={() => navigate('/dashboard')} className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
                                    Evolução Pilates
                                </h1>
                                <p className={`mt-1 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                                    Diário de sessões e progresso dos alunos
                                </p>
                            </div>
                        </div>
                        <button onClick={handleAddRecord} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full md:w-auto justify-center">
                            <Plus className="w-5 h-5" />
                            Nova Sessão
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {[
                        { label: 'Sessões este Mês', value: records.length, icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                        { label: 'Exercícios Realizados', value: records.reduce((acc, r) => acc + getActiveExerciseCount(r), 0), icon: Activity, color: 'text-green-500', bg: 'bg-green-500/10' },
                        { label: 'Pacientes Ativos', value: allPatients.length, icon: User, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                    ].map((stat, i) => (
                        <div key={i} className={`p-5 rounded-2xl border transition-all hover:-translate-y-1 ${darkMode ? 'bg-slate-900/60 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
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

                {/* Filters & View Toggle */}
                <div className={`p-4 rounded-2xl border mb-6 flex flex-col md:flex-row justify-between gap-4 ${darkMode ? 'bg-slate-900/60 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                    <div className="flex flex-col sm:flex-row gap-4 flex-1">
                        <div className="relative flex-1 max-w-md">
                            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                            <input 
                                type="text" 
                                placeholder="Buscar por paciente..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder:text-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                            />
                        </div>
                        <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border ${darkMode ? 'border-slate-700 bg-slate-800' : 'border-gray-200 bg-gray-50'}`}>
                            <Filter className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <select 
                                value={filterPatient}
                                onChange={(e) => setFilterPatient(e.target.value)}
                                className={`bg-transparent text-sm font-medium outline-none cursor-pointer ${darkMode ? 'text-white' : 'text-gray-700'}`}
                            >
                                <option value="Todos">Todos os Pacientes</option>
                                {allPatients.map(p => <option key={p} value={p}>{p}</option>)}
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

                {/* Records Grid */}
                {viewMode === 'cards' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredRecords.map(record => (
                            <div key={record.id} className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-xl group relative ${darkMode ? 'bg-slate-900/50 border-white/5 hover:bg-slate-800/50' : 'bg-white border-gray-100 shadow-sm'}`}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                            {record.nomePaciente.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{record.nomePaciente}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Calendar className={`w-3.5 h-3.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                                <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    {new Date(record.date).toLocaleDateString('pt-BR')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleViewRecord(record)} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-white/10 text-blue-400' : 'hover:bg-blue-50 text-blue-600'}`}><Eye className="w-4 h-4" /></button>
                                        <button onClick={() => handleEditRecord(record)} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-white/10 text-green-400' : 'hover:bg-green-50 text-green-600'}`}><Edit className="w-4 h-4" /></button>
                                        <button onClick={() => handleDeleteRecord(record.id)} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-white/10 text-red-400' : 'hover:bg-red-50 text-red-600'}`}><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>

                                <div className={`p-4 rounded-xl mb-4 ${darkMode ? 'bg-slate-800/50' : 'bg-gray-50'}`}>
                                    <p className={`text-sm line-clamp-2 italic ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>"{record.pacienteChegou}"</p>
                                </div>

                                <div className="flex items-center justify-between border-t pt-4 border-dashed border-gray-200 dark:border-white/10">
                                    <div className="flex items-center gap-2">
                                        <User className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{record.fisioterapeuta.split(' ')[0]}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-orange-500" />
                                        <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{getActiveExerciseCount(record)} exercícios</span>
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
                                    <th className="p-4 text-left font-bold">Data</th>
                                    <th className="p-4 text-left font-bold">Paciente</th>
                                    <th className="p-4 text-left font-bold">Profissional</th>
                                    <th className="p-4 text-left font-bold">Exercícios</th>
                                    <th className="p-4 text-right font-bold">Ações</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${darkMode ? 'divide-white/5' : 'divide-gray-100'}`}>
                                {filteredRecords.map(record => (
                                    <tr key={record.id} className={`group ${darkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                                        <td className={`p-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{new Date(record.date).toLocaleDateString('pt-BR')}</td>
                                        <td className={`p-4 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{record.nomePaciente}</td>
                                        <td className={`p-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{record.fisioterapeuta}</td>
                                        <td className={`p-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{getActiveExerciseCount(record)}</td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => handleViewRecord(record)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Eye className="w-4 h-4" /></button>
                                                <button onClick={() => handleEditRecord(record)} className="p-2 text-green-500 hover:bg-green-50 rounded-lg"><Edit className="w-4 h-4" /></button>
                                                <button onClick={() => handleDeleteRecord(record.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDeleteRecord}
                title="Excluir Registro"
                message="Tem certeza que deseja excluir este registro de evolução? Esta ação não pode ser desfeita."
                confirmText="Sim, excluir"
                cancelText="Cancelar"
                type="danger"
            />
        </div>
    );
};

export default EvolutionRecords;