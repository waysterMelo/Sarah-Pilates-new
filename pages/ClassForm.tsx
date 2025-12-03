import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import api from '../src/services/api';
import {
  ArrowLeft,
  Save,
  Dumbbell,
  Clock,
  DollarSign,
  Users,
  Zap,
  FileText,
  CheckCircle2,
  Palette,
  Plus,
  X
} from 'lucide-react';

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import api from '../src/services/api';
import { useTheme } from '../src/contexts/ThemeContext';
import {
  ArrowLeft,
  Save,
  Dumbbell,
  Clock,
  DollarSign,
  Users,
  Zap,
  FileText,
  CheckCircle2,
  Palette,
  Plus,
  X
} from 'lucide-react';

const ClassForm: React.FC = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: 60,
    price: 0,
    capacity: 1,
    intensity: 'Média',
    color: 'from-blue-500 to-cyan-500',
    equipment: [] as string[]
  });

  const [newEquipment, setNewEquipment] = useState('');

  const colors = [
    { label: 'Azul', value: 'from-blue-500 to-cyan-500', bg: 'bg-blue-500' },
    { label: 'Roxo', value: 'from-purple-500 to-pink-500', bg: 'bg-purple-500' },
    { label: 'Verde', value: 'from-emerald-500 to-green-500', bg: 'bg-emerald-500' },
    { label: 'Laranja', value: 'from-orange-500 to-red-500', bg: 'bg-orange-500' },
    { label: 'Índigo', value: 'from-indigo-500 to-blue-600', bg: 'bg-indigo-500' },
    { label: 'Rosa', value: 'from-pink-500 to-rose-500', bg: 'bg-pink-500' },
  ];

  const commonEquipment = ['Mat', 'Reformer', 'Cadillac', 'Chair', 'Barrel', 'Bola', 'Faixa', 'Pesos'];

  useEffect(() => {
    if (isEdit) {
      if (location.state?.classData) {
        setFormData(location.state.classData);
      } else {
        const fetchClassType = async () => {
          try {
            const { data } = await api.get(`/api/classtypes/${id}`);
            setFormData(data);
          } catch (error) {
            console.error("Failed to fetch class type", error);
            navigate('/classes');
          }
        };
        fetchClassType();
      }
    }
  }, [isEdit, id, location.state, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const intensityMap = {
      'Baixa': 'BAIXA',
      'Média': 'MEDIA',
      'Alta': 'ALTA'
    };

    const payload = {
      ...formData,
      intensity: intensityMap[formData.intensity as keyof typeof intensityMap] || 'MEDIA',
    };

    try {
      if (isEdit) {
        await api.put(`/api/classtypes/${id}`, payload);
      } else {
        await api.post('/api/classtypes', payload);
      }
      navigate('/classes');
    } catch (error) {
      console.error('Failed to save class type', error);
      // Handle and show error to user
    }
  };

  const addEquipment = (item: string) => {
    if (!formData.equipment.includes(item)) {
      setFormData(prev => ({ ...prev, equipment: [...prev.equipment, item] }));
    }
    setNewEquipment('');
  };

  const removeEquipment = (item: string) => {
    setFormData(prev => ({ ...prev, equipment: prev.equipment.filter(e => e !== item) }));
  };

  const inputClass = `w-full px-4 py-3 border rounded-xl outline-none transition-all ${
    darkMode ? 'bg-white/5 border-white/10 text-white focus:border-primary-500 placeholder:text-slate-600' : 'bg-gray-50 border-gray-200 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100 placeholder:text-gray-400'
  }`;

  const labelClass = `block text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-slate-50'} pb-20`}>
      {/* Header */}
      <div className={`sticky top-0 z-20 border-b ${darkMode ? 'bg-slate-900/90 border-white/5' : 'bg-white/90 border-gray-100'} backdrop-blur-lg`}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/classes')} className={`p-2 rounded-xl ${darkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {isEdit ? 'Editar Modalidade' : 'Nova Modalidade'}
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Defina os detalhes do serviço</p>
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

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        
        {/* Identidade Visual & Nome */}
        <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
            <h2 className={`text-lg font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-primary-400' : 'text-primary-600'}`}>
                <Dumbbell className="w-5 h-5" /> Informações Principais
            </h2>
            
            <div className="space-y-6">
                <div>
                    <label className={labelClass}>Nome da Modalidade</label>
                    <input 
                        type="text" 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        className={inputClass}
                        placeholder="Ex: Pilates Solo Avançado"
                    />
                </div>
                <div>
                    <label className={labelClass}>Descrição</label>
                    <textarea 
                        rows={3}
                        value={formData.description} 
                        onChange={(e) => setFormData({...formData, description: e.target.value})} 
                        className={inputClass}
                        placeholder="Breve descrição sobre a aula..."
                    />
                </div>
                
                <div>
                    <label className={labelClass}>Cor de Identificação (Agenda)</label>
                    <div className="flex gap-3 flex-wrap">
                        {colors.map(c => (
                            <button
                                key={c.value}
                                type="button"
                                onClick={() => setFormData({...formData, color: c.value})}
                                className={`w-10 h-10 rounded-full transition-transform hover:scale-110 flex items-center justify-center ${c.bg} ${formData.color === c.value ? 'ring-4 ring-offset-2 ring-primary-500' : ''}`}
                                title={c.label}
                            >
                                {formData.color === c.value && <CheckCircle2 className="w-5 h-5 text-white" />}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Configurações de Negócio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                <h2 className={`text-lg font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-primary-400' : 'text-primary-600'}`}>
                    <Clock className="w-5 h-5" /> Tempo & Custo
                </h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Duração (min)</label>
                            <input 
                                type="number" 
                                value={formData.duration} 
                                onChange={(e) => setFormData({...formData, duration: Number(e.target.value)})} 
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Preço (R$)</label>
                            <input 
                                type="number" 
                                value={formData.price} 
                                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} 
                                className={inputClass}
                            />
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>Capacidade Máxima</label>
                        <div className="flex items-center gap-4">
                            <input 
                                type="range" 
                                min="1" 
                                max="20" 
                                value={formData.capacity} 
                                onChange={(e) => setFormData({...formData, capacity: Number(e.target.value)})} 
                                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                            />
                            <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{formData.capacity}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                <h2 className={`text-lg font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-primary-400' : 'text-primary-600'}`}>
                    <Zap className="w-5 h-5" /> Detalhes Técnicos
                </h2>
                <div className="space-y-6">
                    <div>
                        <label className={labelClass}>Intensidade</label>
                        <div className="flex gap-2">
                            {['Baixa', 'Média', 'Alta'].map(level => (
                                <button
                                    key={level}
                                    type="button"
                                    onClick={() => setFormData({...formData, intensity: level as any})}
                                    className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                                        formData.intensity === level 
                                        ? 'bg-primary-600 text-white shadow-md' 
                                        : (darkMode ? 'bg-slate-800 text-gray-400 hover:bg-slate-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')
                                    }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Equipamentos Necessários</label>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {formData.equipment.map(item => (
                                <span key={item} className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                                    {item}
                                    <button onClick={() => removeEquipment(item)}><X className="w-3 h-3" /></button>
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                value={newEquipment}
                                onChange={(e) => setNewEquipment(e.target.value)}
                                className={`flex-1 px-3 py-2 text-sm border rounded-lg outline-none ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-200'}`}
                                placeholder="Adicionar equipamento..."
                                onKeyPress={(e) => e.key === 'Enter' && addEquipment(newEquipment)}
                            />
                            <button onClick={() => addEquipment(newEquipment)} className="p-2 bg-primary-600 text-white rounded-lg"><Plus className="w-4 h-4" /></button>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {commonEquipment.filter(e => !formData.equipment.includes(e)).slice(0, 4).map(e => (
                                <button key={e} onClick={() => addEquipment(e)} className="text-xs px-2 py-1 border rounded-md opacity-60 hover:opacity-100 transition-opacity">
                                    + {e}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ClassForm;