import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Save, 
  User, 
  Calendar, 
  Clock, 
  FileText, 
  AlertCircle,
  Activity,
  CheckCircle2,
  Dumbbell,
  ChevronRight,
  ChevronDown,
  ChevronUp
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

interface FichaEvolucaoPilatesProps {
  ficha?: FichaEvolucao | null;
  isEdit: boolean;
  onSave: (ficha: Omit<FichaEvolucao, 'id'>) => void;
  onCancel: () => void;
  darkMode?: boolean;
}

const FichaEvolucaoPilates: React.FC<FichaEvolucaoPilatesProps> = ({ 
  ficha, 
  isEdit, 
  onSave, 
  onCancel,
  darkMode 
}) => {
  const aparelhos = ['CADILLAC', 'REFORMER', 'CHAIR', 'BARREL', 'MAT PILATES'];
  const locais = ['MMSS', 'MMII', 'Coluna Vertebral'];
  const tiposExercicio = ['alongamento', 'fortalecimento', 'coordenacao', 'equilibrio', 'core'];

  const [formData, setFormData] = useState({
    nomePaciente: '',
    data: new Date().toISOString().split('T')[0],
    mes: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
    pacienteChegou: '',
    foiRealizado: '',
    exercicios: {} as any,
    observacoes: '',
    fisioterapeuta: '',
    crefito: '',
    createdAt: new Date().toISOString()
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [expandedApparatus, setExpandedApparatus] = useState<string | null>('MAT PILATES');

  // Inicializar estado dos exercícios
  useEffect(() => {
    const inicializarExercicios = () => {
      const exercicios: any = {};
      aparelhos.forEach(aparelho => {
        exercicios[aparelho] = {};
        locais.forEach(local => {
          exercicios[aparelho][local] = {
            alongamento: false,
            fortalecimento: false,
            coordenacao: false,
            equilibrio: false,
            core: false
          };
        });
      });
      return exercicios;
    };

    if (ficha && isEdit) {
      setFormData({
        nomePaciente: ficha.nomePaciente,
        data: ficha.data,
        mes: ficha.mes,
        pacienteChegou: ficha.pacienteChegou,
        foiRealizado: ficha.foiRealizado,
        exercicios: ficha.exercicios || inicializarExercicios(),
        observacoes: ficha.observacoes,
        fisioterapeuta: ficha.fisioterapeuta,
        crefito: ficha.crefito,
        createdAt: ficha.createdAt
      });
    } else {
      setFormData(prev => ({
        ...prev,
        exercicios: inicializarExercicios()
      }));
    }
  }, [ficha, isEdit]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nomePaciente.trim()) newErrors.nomePaciente = 'Nome obrigatório';
    if (!formData.data) newErrors.data = 'Data obrigatória';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleCheckboxChange = (aparelho: string, local: string, tipo: string) => {
    setFormData(prev => ({
      ...prev,
      exercicios: {
        ...prev.exercicios,
        [aparelho]: {
          ...prev.exercicios[aparelho],
          [local]: {
            ...prev.exercicios[aparelho][local],
            [tipo]: !prev.exercicios[aparelho][local][tipo]
          }
        }
      }
    }));
  };

  const inputClass = `w-full px-4 py-3 border rounded-xl outline-none transition-all ${
    darkMode ? 'bg-white/5 border-white/10 text-white focus:border-primary-500 placeholder:text-slate-600' : 'bg-gray-50 border-gray-200 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100 placeholder:text-gray-400'
  }`;

  const labelClass = `block text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`;

  // Helper for dynamic colors
  const getApparatusColor = (apparatus: string) => {
      const colors: Record<string, string> = {
          'MAT PILATES': 'from-purple-500 to-indigo-600',
          'REFORMER': 'from-blue-500 to-cyan-600',
          'CADILLAC': 'from-emerald-500 to-teal-600',
          'CHAIR': 'from-orange-500 to-amber-600',
          'BARREL': 'from-rose-500 to-pink-600'
      };
      return colors[apparatus] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-slate-50'} pb-20`}>
      {/* Header */}
      <div className={`sticky top-0 z-20 border-b ${darkMode ? 'bg-slate-900/90 border-white/5' : 'bg-white/90 border-gray-100'} backdrop-blur-lg`}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onCancel} className={`p-2 rounded-xl ${darkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {isEdit ? 'Editar Sessão' : 'Nova Sessão'}
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Registro de evolução diária</p>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-500/20 transition-all"
          >
            <Save className="w-5 h-5" /> Salvar
          </button>
        </div>
      </div>

      <form className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        
        {/* Informações Básicas */}
        <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
            <h2 className={`text-lg font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-primary-400' : 'text-primary-600'}`}>
                <User className="w-5 h-5" /> Dados da Sessão
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <label className={labelClass}>Nome do Paciente</label>
                    <input 
                        type="text" 
                        value={formData.nomePaciente} 
                        onChange={(e) => handleInputChange('nomePaciente', e.target.value)} 
                        className={inputClass}
                        placeholder="Digite o nome..."
                    />
                    {errors.nomePaciente && <p className="text-red-500 text-sm mt-1">{errors.nomePaciente}</p>}
                </div>
                <div>
                    <label className={labelClass}>Data</label>
                    <input 
                        type="date" 
                        value={formData.data} 
                        onChange={(e) => handleInputChange('data', e.target.value)} 
                        className={inputClass}
                    />
                </div>
            </div>
        </div>

        {/* Feedback Inicial/Final */}
        <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
            <h2 className={`text-lg font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-primary-400' : 'text-primary-600'}`}>
                <FileText className="w-5 h-5" /> Relatório
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className={labelClass}>Como o paciente chegou?</label>
                    <textarea 
                        rows={3}
                        value={formData.pacienteChegou}
                        onChange={(e) => handleInputChange('pacienteChegou', e.target.value)}
                        className={inputClass}
                        placeholder="Relatos de dor, estado emocional..."
                    />
                </div>
                <div>
                    <label className={labelClass}>O que foi realizado?</label>
                    <textarea 
                        rows={3}
                        value={formData.foiRealizado}
                        onChange={(e) => handleInputChange('foiRealizado', e.target.value)}
                        className={inputClass}
                        placeholder="Resumo das condutas..."
                    />
                </div>
            </div>
        </div>

        {/* Matriz de Exercícios Interativa */}
        <div className="space-y-4">
            <h2 className={`text-xl font-bold px-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Exercícios Realizados</h2>
            
            {aparelhos.map((aparelho) => (
                <div key={aparelho} className={`rounded-2xl overflow-hidden border transition-all ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                    <button 
                        type="button"
                        onClick={() => setExpandedApparatus(expandedApparatus === aparelho ? null : aparelho)}
                        className={`w-full p-4 flex items-center justify-between bg-gradient-to-r ${getApparatusColor(aparelho)} text-white`}
                    >
                        <span className="font-bold flex items-center gap-2">
                            <Dumbbell className="w-5 h-5 opacity-80" /> {aparelho}
                        </span>
                        {expandedApparatus === aparelho ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>

                    {expandedApparatus === aparelho && (
                        <div className="p-6 animate-in fade-in slide-in-from-top-2">
                            {locais.map((local) => (
                                <div key={local} className="mb-6 last:mb-0">
                                    <h4 className={`text-sm font-bold uppercase tracking-wider mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{local}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {tiposExercicio.map((tipo) => {
                                            const isChecked = formData.exercicios[aparelho]?.[local]?.[tipo];
                                            return (
                                                <button
                                                    key={tipo}
                                                    type="button"
                                                    onClick={() => handleCheckboxChange(aparelho, local, tipo)}
                                                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all flex items-center gap-2 ${
                                                        isChecked 
                                                        ? 'bg-green-600 text-white border-green-600 shadow-md'
                                                        : (darkMode ? 'bg-slate-800 border-slate-700 text-gray-400 hover:bg-slate-700' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100')
                                                    }`}
                                                >
                                                    {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                                                    {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>

        {/* Rodapé */}
        <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
            <div className="space-y-6">
                <div>
                    <label className={labelClass}>Observações Gerais</label>
                    <textarea 
                        rows={3}
                        value={formData.observacoes}
                        onChange={(e) => handleInputChange('observacoes', e.target.value)}
                        className={inputClass}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClass}>Fisioterapeuta</label>
                        <input 
                            type="text" 
                            value={formData.fisioterapeuta} 
                            onChange={(e) => handleInputChange('fisioterapeuta', e.target.value)} 
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <label className={labelClass}>CREFITO</label>
                        <input 
                            type="text" 
                            value={formData.crefito} 
                            onChange={(e) => handleInputChange('crefito', e.target.value)} 
                            className={inputClass}
                        />
                    </div>
                </div>
            </div>
        </div>

      </form>
    </div>
  );
};

export default FichaEvolucaoPilates;