import React, { useState } from 'react';
import { useTheme } from '../src/contexts/ThemeContext';
import { 
  ArrowLeft, 
  Edit, 
  User, 
  Calendar, 
  Clock,
  FileText,
  CheckCircle2,
  Activity,
  Printer
} from 'lucide-react';

interface FichaEvolucao {
  id: number;
  nomePaciente: string;
  data: string;
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

interface FichaEvolucaoDetailsProps {
  ficha: FichaEvolucao;
  onEdit: () => void;
  onClose: () => void;
}

const FichaEvolucaoDetails: React.FC<FichaEvolucaoDetailsProps> = ({ 
  ficha, 
  onEdit, 
  onClose
}) => {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'resumo' | 'exercicios'>('resumo');
  const aparelhos = ['CADILLAC', 'REFORMER', 'CHAIR', 'BARREL', 'MAT PILATES'];
  const locais = ['MMSS', 'MMII', 'Coluna Vertebral'];
  const tiposExercicio = ['alongamento', 'fortalecimento', 'coordenacao', 'equilibrio', 'core'];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Helper function to check if an apparatus has any activity
  const hasActivity = (aparelho: string) => {
      if (!ficha.exercicios || !ficha.exercicios[aparelho]) return false;
      return locais.some(local => 
          tiposExercicio.some(tipo => ficha.exercicios[aparelho][local]?.[tipo])
      );
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      {/* Header with Blur */}
      <div className={`sticky top-0 z-20 border-b ${darkMode ? 'bg-slate-900/90 border-white/5' : 'bg-white/90 border-gray-100'} backdrop-blur-lg`}>
        <div className="max-w-5xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <button onClick={onClose} className={`p-2 rounded-xl ${darkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}>
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Detalhes da Evolução
                        </h1>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {formatDate(ficha.data)}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => window.print()} className={`p-2.5 rounded-xl flex items-center gap-2 font-bold transition-all ${darkMode ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-white text-gray-700 hover:bg-gray-50 border'}`}>
                        <Printer className="w-5 h-5" />
                    </button>
                    <button onClick={onEdit} className="p-2.5 bg-primary-600 text-white rounded-xl flex items-center gap-2 font-bold hover:bg-primary-700 shadow-lg shadow-primary-500/30">
                        <Edit className="w-5 h-5" /> <span className="hidden sm:inline">Editar</span>
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-transparent">
                <button 
                    onClick={() => setActiveTab('resumo')}
                    className={`pb-3 text-sm font-bold border-b-2 transition-all ${activeTab === 'resumo' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    Resumo Clínico
                </button>
                <button 
                    onClick={() => setActiveTab('exercicios')}
                    className={`pb-3 text-sm font-bold border-b-2 transition-all ${activeTab === 'exercicios' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    Exercícios Realizados
                </button>
            </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        
        {activeTab === 'resumo' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                {/* Info Card */}
                <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                <User className="w-7 h-7" />
                            </div>
                            <div>
                                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Paciente</p>
                                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{ficha.nomePaciente}</h3>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                                <User className="w-7 h-7" />
                            </div>
                            <div>
                                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Fisioterapeuta</p>
                                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{ficha.fisioterapeuta}</h3>
                                <p className="text-xs text-gray-500">{ficha.crefito}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                        <h3 className={`font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Estado Inicial</h3>
                        <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{ficha.pacienteChegou || 'Sem observações.'}</p>
                    </div>
                    <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                        <h3 className={`font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>Conduta Realizada</h3>
                        <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{ficha.foiRealizado || 'Sem observações.'}</p>
                    </div>
                </div>

                {ficha.observacoes && (
                    <div className={`p-6 rounded-3xl border-l-4 border-yellow-400 ${darkMode ? 'bg-slate-900 border-y border-r border-white/5' : 'bg-white border-y border-r border-gray-100 shadow-sm'}`}>
                        <h3 className="font-bold mb-2 text-yellow-500">Observações Gerais</h3>
                        <p className={`leading-relaxed italic ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{ficha.observacoes}</p>
                    </div>
                )}
            </div>
        )}

        {activeTab === 'exercicios' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                {aparelhos.filter(hasActivity).length === 0 ? (
                    <div className="text-center py-12 opacity-50">
                        <Activity className="w-12 h-12 mx-auto mb-2" />
                        <p>Nenhum exercício registrado nesta sessão.</p>
                    </div>
                ) : (
                    aparelhos.filter(hasActivity).map(aparelho => (
                        <div key={aparelho} className={`rounded-3xl border overflow-hidden ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                            <div className={`px-6 py-4 font-bold text-white bg-gradient-to-r ${
                                aparelho === 'MAT PILATES' ? 'from-purple-500 to-indigo-600' :
                                aparelho === 'REFORMER' ? 'from-blue-500 to-cyan-600' :
                                'from-gray-600 to-gray-700'
                            }`}>
                                {aparelho}
                            </div>
                            <div className="p-6 grid gap-6">
                                {locais.map(local => {
                                    const activeTypes = tiposExercicio.filter(t => ficha.exercicios?.[aparelho]?.[local]?.[t]);
                                    if (activeTypes.length === 0) return null;
                                    
                                    return (
                                        <div key={local} className="border-b last:border-0 pb-4 last:pb-0 border-gray-100 dark:border-white/5">
                                            <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{local}</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {activeTypes.map(tipo => (
                                                    <span key={tipo} className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 ${darkMode ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-green-50 text-green-700 border border-green-100'}`}>
                                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                                        {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))
                )}
            </div>
        )}

      </div>
    </div>
  );
};

export default FichaEvolucaoDetails;