import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useTheme } from '../src/contexts/ThemeContext';
import {
    ArrowLeft,
    Save,
    User,
    Award,
    Clock,
    FileText,
    CheckCircle2,
    ChevronRight,
    DollarSign,
    Plus
} from 'lucide-react';
import api from '../src/services/api';

interface WorkingHours {
  start: string;
  end: string;
  available: boolean;
}

interface InstructorData {
  name: string;
  email: string;
  phone: string;
  sex: string;
  birthDate: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  specialties: string[];
  certifications: string[];
  experience: string;
  bio: string;
  status: 'Ativo' | 'Inativo' | 'Férias';
  hireDate: string;
  hourlyRate: number;
  workingHours: {
    [key:string]: WorkingHours;
  };
}

const InstructorForm: React.FC = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isEdit = Boolean(id);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<InstructorData>({
    name: '',
    email: '',
    phone: '',
    sex: '',
    birthDate: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    specialties: [],
    certifications: [],
    experience: '',
    bio: '',
    status: 'Ativo',
    hireDate: new Date().toISOString().split('T')[0],
    hourlyRate: 0,
    workingHours: {
      monday: { start: '08:00', end: '18:00', available: true },
      tuesday: { start: '08:00', end: '18:00', available: true },
      wednesday: { start: '08:00', end: '18:00', available: true },
      thursday: { start: '08:00', end: '18:00', available: true },
      friday: { start: '08:00', end: '18:00', available: true },
      saturday: { start: '08:00', end: '12:00', available: false },
      sunday: { start: '08:00', end: '12:00', available: false }
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newSpecialty, setNewSpecialty] = useState('');
  const [newCertification, setNewCertification] = useState('');

  const steps = [
    { id: 1, title: 'Dados Pessoais', icon: User },
    { id: 2, title: 'Profissional', icon: Award },
    { id: 3, title: 'Horários', icon: Clock },
    { id: 4, title: 'Perfil', icon: FileText }
  ];

  const commonSpecialties = [
    'Pilates Solo', 'Pilates Aparelhos', 'Pilates Terapêutico',
    'Pilates para Idosos', 'Pilates na Gravidez', 'Pilates para Atletas',
    'Pilates Funcional', 'Pilates Clínico'
  ];

  const daysOfWeek = [
    { key: 'monday', label: 'Segunda', short: 'Seg' },
    { key: 'tuesday', label: 'Terça', short: 'Ter' },
    { key: 'wednesday', label: 'Quarta', short: 'Qua' },
    { key: 'thursday', label: 'Quinta', short: 'Qui' },
    { key: 'friday', label: 'Sexta', short: 'Sex' },
    { key: 'saturday', label: 'Sábado', short: 'Sáb' },
    { key: 'sunday', label: 'Domingo', short: 'Dom' }
  ];

  useEffect(() => {
    if (isEdit && id) {
      const fetchInstructor = async () => {
        console.log(`🔄 Buscando dados do Instrutor #${id}...`);
        try {
          const { data } = await api.get(`/api/instructors/${id}`);
          console.log('✅ Dados recebidos:', data);
          setFormData(prev => ({
            ...prev,
            name: data.name,
            email: data.email,
            phone: data.phone || '',
            sex: data.sex || '',
            status: data.status ? data.status.charAt(0).toUpperCase() + data.status.slice(1).toLowerCase().replace('FERIAS', 'Férias') : 'Inativo',
            specialties: data.specialties || [],
            certifications: data.certifications || [],
            experience: data.experience || '',
            emergencyContact: data.emergencyContact || '',
            emergencyPhone: data.emergencyPhone || '',
            hourlyRate: data.hourlyRate || 0,
            birthDate: data.birthDate || '',
            address: data.address || '',
            bio: data.bio || '',
            hireDate: data.hireDate || new Date().toISOString().split('T')[0],
            workingHours: data.workingHours ? adaptWorkingHoursToForm(data.workingHours) : prev.workingHours,
          }));
        } catch (error: any) {
          console.error("❌ Falha ao buscar instrutor:", error);
          if (error.response) {
            console.error('Detalhes do erro:', error.response.data);
          }
          navigate('/instructors');
        }
      };
      fetchInstructor();
    }
  }, [isEdit, id, navigate]);

  const convertStatus = (status: 'Ativo' | 'Inativo' | 'Férias'): 'ATIVO' | 'INATIVO' | 'FERIAS' => {
    switch (status) {
      case 'Ativo': return 'ATIVO';
      case 'Inativo': return 'INATIVO';
      case 'Férias': return 'FERIAS';
      default: return 'ATIVO';
    }
  };

  const adaptWorkingHoursToForm = (hoursFromBackend: any[]) => {
    const defaultHours = {
      monday: { start: '08:00', end: '18:00', available: false },
      tuesday: { start: '08:00', end: '18:00', available: false },
      wednesday: { start: '08:00', end: '18:00', available: false },
      thursday: { start: '08:00', end: '18:00', available: false },
      friday: { start: '08:00', end: '18:00', available: false },
      saturday: { start: '08:00', end: '12:00', available: false },
      sunday: { start: '08:00', end: '12:00', available: false }
    };

    hoursFromBackend.forEach(h => {
      const dayKey = h.dayOfWeek.toLowerCase();
      if (defaultHours[dayKey]) {
        defaultHours[dayKey] = {
          start: h.startTime.substring(0, 5), // Remove seconds
          end: h.endTime.substring(0, 5),     // Remove seconds
          available: true
        };
      }
    });
    return defaultHours;
  };


  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
      if (!formData.email.trim()) newErrors.email = 'Email é obrigatório';
      if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
      if (!formData.sex) newErrors.sex = 'Sexo é obrigatório';
      if (formData.emergencyContact && !formData.emergencyPhone) {
        newErrors.emergencyPhone = 'Telefone de emergência é obrigatório.';
      }
    }
    if (step === 2) {
      if (formData.hourlyRate <= 0) newErrors.hourlyRate = 'Valor inválido';
      if (formData.specialties.length === 0) newErrors.specialties = 'Selecione uma especialidade';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const convertWorkingHoursToDTO = (hoursFromForm: { [key: string]: WorkingHours }) => {
    return Object.entries(hoursFromForm)
      .filter(([, times]) => times.available)
      .map(([day, times]) => ({
        dayOfWeek: day.toUpperCase(),
        startTime: `${times.start}:00`,
        endTime: `${times.end}:00`,
      }));
  };

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      const payload = {
        ...formData,
        status: convertStatus(formData.status),
        workingHours: convertWorkingHoursToDTO(formData.workingHours),
      };

      console.group('🚀 Tentativa de Salvar: Instrutor');
      console.log('Payload enviado:', payload);

      try {
        if (isEdit) {
          await api.put(`/api/instructors/${id}`, payload);
          console.log('✅ Sucesso ao editar!');
        } else {
          await api.post('/api/instructors', payload);
          console.log('✅ Sucesso ao criar!');
        }
        navigate('/instructors');
      } catch (error: any) {
        console.error('❌ Erro ao salvar:', error);
        if (error.response) {
          console.error('Status:', error.response.status);
          console.error('Dados do Erro (Backend):', error.response.data);
        }
      } finally {
        console.groupEnd();
      }
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleWorkingHoursChange = (day: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day],
          [field]: value
        }
      }
    }));
  };

  // Shared Styles
  const inputClass = `w-full px-4 py-3 rounded-xl outline-none border transition-all ${
    darkMode 
      ? 'bg-white/5 border-white/10 text-white focus:border-primary-500 focus:bg-white/10 placeholder:text-slate-600' 
      : 'bg-white border-gray-200 text-gray-900 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 placeholder:text-gray-400'
  }`;
  
  const labelClass = `block text-xs font-bold uppercase tracking-wider mb-2 ${
    darkMode ? 'text-slate-400' : 'text-slate-500'
  }`;

  return (
    <main className={`min-h-screen relative p-6 transition-colors duration-500 ${
      darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-gray-900'
    }`}>
      {/* Background */}
      <div className={`fixed top-0 right-0 w-1/2 h-full rounded-full blur-[120px] pointer-events-none opacity-20 ${
        darkMode ? 'bg-primary-900/20' : 'bg-primary-200/40'
      }`} />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/instructors')}
              className={`p-2 rounded-xl border transition-all ${
                darkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {isEdit ? 'Editar Instrutor' : 'Novo Instrutor'}
              </h1>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {isEdit ? 'Atualize as informações do cadastro' : 'Preencha os dados para cadastrar'}
              </p>
            </div>
          </div>
          
          {/* Step Indicator */}
          <div className="hidden md:flex items-center gap-2">
            {steps.map((step) => {
               const isActive = currentStep === step.id;
               const isCompleted = currentStep > step.id;
               return (
                 <div key={step.id} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                       isActive 
                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' 
                        : (isCompleted ? 'bg-emerald-500 text-white' : (darkMode ? 'bg-white/10 text-slate-500' : 'bg-gray-200 text-gray-500'))
                    }`}>
                       {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : step.id}
                    </div>
                    {step.id < 4 && <div className={`w-8 h-0.5 ${darkMode ? 'bg-white/10' : 'bg-gray-200'}`} />}
                 </div>
               );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Sidebar Navigation (Mobile/Desktop) */}
           <div className="lg:col-span-3 flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
              {steps.map((step) => {
                 const Icon = step.icon;
                 const isActive = currentStep === step.id;
                 return (
                    <button
                       key={step.id}
                       onClick={() => setCurrentStep(step.id)}
                       className={`flex items-center gap-3 p-4 rounded-xl border text-sm font-medium transition-all min-w-[160px] lg:min-w-0 ${
                          isActive
                          ? (darkMode ? 'bg-white/10 border-primary-500/50 text-primary-400' : 'bg-white border-primary-200 text-primary-600 shadow-sm')
                          : (darkMode ? 'bg-white/5 border-transparent text-slate-500 hover:bg-white/10' : 'bg-transparent border-transparent text-slate-500 hover:bg-gray-50')
                       }`}
                    >
                       <Icon className={`w-5 h-5 ${isActive ? 'text-primary-500' : 'opacity-50'}`} />
                       <span>{step.title}</span>
                    </button>
                 )
              })}
           </div>

           {/* Form Area */}
           <div className={`lg:col-span-9 rounded-3xl border p-6 md:p-8 transition-all ${
              darkMode ? 'bg-slate-900/50 border-white/5' : 'bg-white border-gray-100 shadow-xl shadow-slate-200/50'
           }`}>
              
              {/* STEP 1: Personal Data */}
              {currentStep === 1 && (
                 <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="md:col-span-2">
                          <label className={labelClass}>Nome Completo *</label>
                          <input
                             type="text"
                             value={formData.name}
                             onChange={(e) => handleInputChange('name', e.target.value)}
                             className={`${inputClass} ${errors.name ? 'border-red-500' : ''}`}
                             placeholder="Ex: Sarah Costa"
                          />
                          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                       </div>
                       <div>
                          <label className={labelClass}>Email *</label>
                          <input
                             type="email"
                             value={formData.email}
                             onChange={(e) => handleInputChange('email', e.target.value)}
                             className={`${inputClass} ${errors.email ? 'border-red-500' : ''}`}
                             placeholder="email@exemplo.com"
                          />
                       </div>
                       <div>
                          <label className={labelClass}>Telefone *</label>
                          <input
                             type="tel"
                             value={formData.phone}
                             onChange={(e) => handleInputChange('phone', e.target.value)}
                             className={`${inputClass} ${errors.phone ? 'border-red-500' : ''}`}
                             placeholder="(00) 00000-0000"
                          />
                       </div>
                       <div>
                          <label className={labelClass}>Sexo *</label>
                          <select
                             value={formData.sex}
                             onChange={(e) => handleInputChange('sex', e.target.value)}
                             className={`${inputClass} ${errors.sex ? 'border-red-500' : ''}`}
                          >
                             <option value="">Selecione...</option>
                             <option value="FEMININO">Feminino</option>
                             <option value="MASCULINO">Masculino</option>
                          </select>
                          {errors.sex && <p className="text-red-500 text-xs mt-1">{errors.sex}</p>}
                       </div>
                       <div>
                          <label className={labelClass}>Data Nascimento</label>
                          <input
                             type="date"
                             value={formData.birthDate}
                             onChange={(e) => handleInputChange('birthDate', e.target.value)}
                             className={inputClass}
                          />
                       </div>
                       <div className="md:col-span-2">
                          <label className={labelClass}>Endereço</label>
                          <textarea
                             rows={2}
                             value={formData.address}
                             onChange={(e) => handleInputChange('address', e.target.value)}
                             className={inputClass}
                             placeholder="Rua, Número, Bairro..."
                          />
                       </div>
                       <div>
                          <label className={labelClass}>Contato de Emergência</label>
                          <input
                             type="text"
                             value={formData.emergencyContact}
                             onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                             className={inputClass}
                             placeholder="Nome do contato"
                          />
                       </div>
                       <div>
                          <label className={labelClass}>Telefone de Emergência</label>
                          <input
                             type="tel"
                             value={formData.emergencyPhone}
                             onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                             className={`${inputClass} ${errors.emergencyPhone ? 'border-red-500' : ''}`}
                             placeholder="(00) 00000-0000"
                          />
                          {errors.emergencyPhone && <p className="text-red-500 text-xs mt-1">{errors.emergencyPhone}</p>}
                       </div>
                    </div>
                 </div>
              )}

              {/* STEP 2: Professional */}
              {currentStep === 2 && (
                 <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                          <label className={labelClass}>Valor Hora (R$) *</label>
                          <div className="relative">
                             <DollarSign className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                             <input
                                type="number"
                                value={formData.hourlyRate}
                                onChange={(e) => handleInputChange('hourlyRate', parseFloat(e.target.value))}
                                className={`${inputClass} pl-10`}
                                placeholder="0.00"
                             />
                          </div>
                       </div>
                       <div>
                          <label className={labelClass}>Status</label>
                          <select
                             value={formData.status}
                             onChange={(e) => handleInputChange('status', e.target.value)}
                             className={inputClass}
                          >
                             <option value="Ativo">Ativo</option>
                             <option value="Inativo">Inativo</option>
                             <option value="Férias">Férias</option>
                          </select>
                       </div>
                       <div className="md:col-span-2">
                          <label className={labelClass}>Especialidades</label>
                          <div className="flex flex-wrap gap-2 mb-4">
                             {commonSpecialties.map(spec => (
                                <button
                                   key={spec}
                                   onClick={() => {
                                      const newSpecs = formData.specialties.includes(spec)
                                         ? formData.specialties.filter(s => s !== spec)
                                         : [...formData.specialties, spec];
                                      handleInputChange('specialties', newSpecs);
                                   }}
                                   className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                                      formData.specialties.includes(spec)
                                      ? 'bg-primary-500 text-white border-primary-500'
                                      : (darkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-gray-50 border-gray-200 hover:bg-gray-100')
                                   }`}
                                >
                                   {spec}
                                </button>
                             ))}
                          </div>
                          <div className="flex gap-2">
                             <input 
                                type="text" 
                                value={newSpecialty}
                                onChange={(e) => setNewSpecialty(e.target.value)}
                                className={inputClass} 
                                placeholder="Outra especialidade..." 
                             />
                             <button 
                                onClick={() => {
                                   if(newSpecialty) {
                                      handleInputChange('specialties', [...formData.specialties, newSpecialty]);
                                      setNewSpecialty('');
                                   }
                                }}
                                className="px-4 rounded-xl bg-primary-600 text-white hover:bg-primary-700"
                             >
                                <Plus className="w-5 h-5" />
                             </button>
                          </div>
                       </div>
                       <div className="md:col-span-2">
                          <label className={labelClass}>Certificações</label>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {formData.certifications.map((cert, index) => (
                                <div key={index} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border ${darkMode ? 'bg-white/10 border-white/20' : 'bg-gray-100 border-gray-200'}`}>
                                    <span>{cert}</span>
                                    <button onClick={() => handleInputChange('certifications', formData.certifications.filter((_, i) => i !== index))} className="text-red-500 hover:text-red-400">
                                        &times;
                                    </button>
                                </div>
                            ))}
                          </div>
                          <div className="flex gap-2">
                             <input 
                                type="text" 
                                value={newCertification}
                                onChange={(e) => setNewCertification(e.target.value)}
                                className={inputClass} 
                                placeholder="Nova certificação..." 
                             />
                             <button 
                                onClick={() => {
                                   if(newCertification) {
                                      handleInputChange('certifications', [...formData.certifications, newCertification]);
                                      setNewCertification('');
                                   }
                                }}
                                className="px-4 rounded-xl bg-primary-600 text-white hover:bg-primary-700"
                             >
                                <Plus className="w-5 h-5" />
                             </button>
                          </div>
                       </div>
                    </div>
                 </div>
              )}

              {/* STEP 3: Schedule */}
              {currentStep === 3 && (
                 <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                       {daysOfWeek.map(({ key, label }) => (
                          <div key={key} className={`p-4 rounded-xl border transition-all ${
                             formData.workingHours[key].available
                             ? (darkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-100')
                             : (darkMode ? 'bg-white/5 border-white/5 opacity-50' : 'bg-gray-50 border-gray-100')
                          }`}>
                             <div className="flex items-center justify-between mb-3">
                                <span className="font-bold text-sm">{label}</span>
                                <div className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${
                                   formData.workingHours[key].available ? 'bg-emerald-500' : 'bg-slate-400'
                                }`} onClick={() => handleWorkingHoursChange(key, 'available', !formData.workingHours[key].available)}>
                                   <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                                      formData.workingHours[key].available ? 'translate-x-4' : 'translate-x-0'
                                   }`} />
                                </div>
                             </div>
                             {formData.workingHours[key].available && (
                                <div className="grid grid-cols-2 gap-2">
                                   <div>
                                      <label className="text-[10px] opacity-60 uppercase font-bold">Início</label>
                                      <input 
                                         type="time" 
                                         value={formData.workingHours[key].start}
                                         onChange={(e) => handleWorkingHoursChange(key, 'start', e.target.value)}
                                         className={`w-full bg-transparent border-b text-sm font-mono outline-none ${darkMode ? 'border-white/20' : 'border-gray-300'}`}
                                      />
                                   </div>
                                   <div>
                                      <label className="text-[10px] opacity-60 uppercase font-bold">Fim</label>
                                      <input 
                                         type="time" 
                                         value={formData.workingHours[key].end}
                                         onChange={(e) => handleWorkingHoursChange(key, 'end', e.target.value)}
                                         className={`w-full bg-transparent border-b text-sm font-mono outline-none ${darkMode ? 'border-white/20' : 'border-gray-300'}`}
                                      />
                                   </div>
                                </div>
                             )}
                          </div>
                       ))}
                    </div>
                 </div>
              )}

              {/* STEP 4: Profile */}
              {currentStep === 4 && (
                 <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div>
                       <label className={labelClass}>Biografia</label>
                       <textarea
                          rows={6}
                          value={formData.bio}
                          onChange={(e) => handleInputChange('bio', e.target.value)}
                          className={inputClass}
                          placeholder="Conte um pouco sobre a experiência e abordagem do instrutor..."
                       />
                    </div>
                    <div>
                       <label className={labelClass}>Experiência Profissional</label>
                       <textarea
                          rows={4}
                          value={formData.experience}
                          onChange={(e) => handleInputChange('experience', e.target.value)}
                          className={inputClass}
                          placeholder="Locais onde trabalhou, anos de experiência..."
                       />
                    </div>
                 </div>
              )}

              {/* Footer Actions */}
              <div className={`mt-8 pt-6 border-t flex justify-between items-center ${
                 darkMode ? 'border-white/10' : 'border-gray-100'
              }`}>
                 <button
                    onClick={currentStep === 1 ? () => navigate('/instructors') : handlePrev}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                       darkMode ? 'text-slate-400 hover:bg-white/10 hover:text-white' : 'text-slate-500 hover:bg-gray-100 hover:text-slate-800'
                    }`}
                 >
                    {currentStep === 1 ? 'Cancelar' : 'Voltar'}
                 </button>

                 {currentStep < 4 ? (
                    <button
                       onClick={handleNext}
                       className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-primary-500/20 flex items-center gap-2"
                    >
                       Próximo <ChevronRight className="w-4 h-4" />
                    </button>
                 ) : (
                    <button
                       onClick={handleSubmit}
                       className="px-8 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                    >
                       <Save className="w-4 h-4" /> Salvar Cadastro
                    </button>
                 )}
              </div>

           </div>
        </div>
      </div>
    </main>
  );
};

export default InstructorForm;