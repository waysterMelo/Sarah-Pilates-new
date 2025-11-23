import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  User,
  Phone,
  FileText,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Mail,
  MapPin
} from 'lucide-react';

interface StudentFormProps {
  darkMode: boolean;
}

interface StudentData {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  medicalHistory: string;
  objectives: string;
  plan: string;
  status: 'Ativo' | 'Inativo' | 'Suspenso';
  registrationDate: string;
  lastClass: string;
  totalClasses: number;
}

const StudentForm: React.FC<StudentFormProps> = ({ darkMode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isEdit = Boolean(id);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<StudentData>({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    medicalHistory: '',
    objectives: '',
    plan: 'Mensal - 8 aulas',
    status: 'Ativo',
    registrationDate: new Date().toISOString().split('T')[0],
    lastClass: '',
    totalClasses: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { id: 1, title: 'Dados Básicos', icon: User },
    { id: 2, title: 'Contato & Plano', icon: Phone },
    { id: 3, title: 'Informações Extras', icon: FileText }
  ];

  useEffect(() => {
    if (isEdit) {
      if (location.state?.student) {
        const s = location.state.student;
        setFormData(prev => ({
          ...prev,
          name: s.name,
          email: s.email,
          phone: s.phone,
          plan: s.plan || 'Mensal - 8 aulas',
          status: s.status,
          // Fill other fields with mock data or defaults since they aren't in the list view
          birthDate: prev.birthDate || '1990-01-01',
          address: prev.address || 'Endereço não informado',
          emergencyContact: prev.emergencyContact || 'Contato Emergência',
          emergencyPhone: prev.emergencyPhone || '(00) 00000-0000',
        }));
      } else {
        // Fallback mock data if navigated directly via URL
        setFormData({
          name: 'Ana Silva Santos',
          email: 'ana.silva@email.com',
          phone: '(11) 99999-9999',
          birthDate: '1995-05-20',
          address: 'Rua das Flores, 123',
          emergencyContact: 'Maria Silva',
          emergencyPhone: '(11) 98888-8888',
          medicalHistory: 'Nenhuma restrição',
          objectives: 'Melhorar postura',
          plan: 'Mensal - 8 aulas',
          status: 'Ativo',
          registrationDate: '2023-01-15',
          lastClass: '2023-10-10',
          totalClasses: 45
        });
      }
    }
  }, [isEdit, location.state]);

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
      if (!formData.email.trim()) newErrors.email = 'Email é obrigatório';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
      if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
      if (!formData.birthDate) newErrors.birthDate = 'Data de nascimento é obrigatória';
    }

    if (step === 2) {
      if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Contato de emergência é obrigatório';
      if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = 'Telefone de emergência é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      console.log('Saving student:', formData);
      navigate('/students');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const planOptions = [
    'Platinum',
    'Gold',
    'Silver',
    'Mensal - 4 aulas',
    'Mensal - 8 aulas',
    'Mensal - 12 aulas',
    'Trimestral - 24 aulas',
    'Trimestral - 36 aulas',
    'Semestral - 48 aulas',
    'Anual - 96 aulas',
    'Aulas Avulsas'
  ];

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
              onClick={() => navigate('/students')}
              className={`p-2 rounded-xl border transition-all ${
                darkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {isEdit ? 'Editar Aluno' : 'Novo Aluno'}
              </h1>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {isEdit ? 'Atualize as informações' : 'Cadastre um novo aluno'}
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
                    {step.id < 3 && <div className={`w-8 h-0.5 ${darkMode ? 'bg-white/10' : 'bg-gray-200'}`} />}
                 </div>
               );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Sidebar Navigation */}
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
              
              {/* STEP 1: Basic Data */}
              {currentStep === 1 && (
                 <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className={labelClass}>Nome Completo *</label>
                        <div className="relative">
                          <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className={`${inputClass} pl-10 ${errors.name ? 'border-red-500' : ''}`}
                            placeholder="Digite o nome completo"
                          />
                        </div>
                        {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.name}</p>}
                      </div>

                      <div>
                        <label className={labelClass}>Email *</label>
                        <div className="relative">
                          <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={`${inputClass} pl-10 ${errors.email ? 'border-red-500' : ''}`}
                            placeholder="email@exemplo.com"
                          />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className={labelClass}>Telefone *</label>
                        <div className="relative">
                          <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className={`${inputClass} pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                            placeholder="(11) 99999-9999"
                          />
                        </div>
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>

                      <div>
                        <label className={labelClass}>Data de Nascimento *</label>
                        <input
                            type="date"
                            value={formData.birthDate}
                            onChange={(e) => handleInputChange('birthDate', e.target.value)}
                            className={`${inputClass} ${errors.birthDate ? 'border-red-500' : ''}`}
                        />
                        {errors.birthDate && <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>}
                      </div>
                    </div>
                 </div>
              )}

              {/* STEP 2: Contact & Plan */}
              {currentStep === 2 && (
                 <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClass}>Contato de Emergência *</label>
                        <input
                            type="text"
                            value={formData.emergencyContact}
                            onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                            className={`${inputClass} ${errors.emergencyContact ? 'border-red-500' : ''}`}
                            placeholder="Nome do contato"
                        />
                        {errors.emergencyContact && <p className="text-red-500 text-xs mt-1">{errors.emergencyContact}</p>}
                      </div>

                      <div>
                        <label className={labelClass}>Telefone de Emergência *</label>
                        <input
                            type="tel"
                            value={formData.emergencyPhone}
                            onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                            className={`${inputClass} ${errors.emergencyPhone ? 'border-red-500' : ''}`}
                            placeholder="(11) 99999-9999"
                        />
                        {errors.emergencyPhone && <p className="text-red-500 text-xs mt-1">{errors.emergencyPhone}</p>}
                      </div>

                      <div className="md:col-span-2">
                        <label className={labelClass}>Endereço</label>
                        <div className="relative">
                          <MapPin className={`absolute left-4 top-3 w-4 h-4 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                          <textarea
                              value={formData.address}
                              onChange={(e) => handleInputChange('address', e.target.value)}
                              rows={2}
                              className={`${inputClass} pl-10`}
                              placeholder="Endereço completo (opcional)"
                          />
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>Plano Escolhido</label>
                        <select
                            value={formData.plan}
                            onChange={(e) => handleInputChange('plan', e.target.value)}
                            className={inputClass}
                        >
                          {planOptions.map((plan) => (
                              <option key={plan} value={plan}>{plan}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className={labelClass}>Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => handleInputChange('status', e.target.value as any)}
                            className={inputClass}
                        >
                          <option value="Ativo">Ativo</option>
                          <option value="Inativo">Inativo</option>
                          <option value="Suspenso">Suspenso</option>
                        </select>
                      </div>
                    </div>
                 </div>
              )}

              {/* STEP 3: Extra Info */}
              {currentStep === 3 && (
                 <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div>
                      <label className={labelClass}>Histórico Médico</label>
                      <textarea
                          value={formData.medicalHistory}
                          onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                          rows={4}
                          className={inputClass}
                          placeholder="Condições médicas, lesões, cirurgias, medicamentos, restrições... (opcional)"
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Objetivos com o Pilates</label>
                      <textarea
                          value={formData.objectives}
                          onChange={(e) => handleInputChange('objectives', e.target.value)}
                          rows={4}
                          className={inputClass}
                          placeholder="Fortalecimento, flexibilidade, reabilitação, condicionamento físico... (opcional)"
                      />
                    </div>
                 </div>
              )}

              {/* Footer Actions */}
              <div className={`mt-8 pt-6 border-t flex justify-between items-center ${
                 darkMode ? 'border-white/10' : 'border-gray-100'
              }`}>
                 <button
                    onClick={currentStep === 1 ? () => navigate('/students') : handlePrev}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                       darkMode ? 'text-slate-400 hover:bg-white/10 hover:text-white' : 'text-slate-500 hover:bg-gray-100 hover:text-slate-800'
                    }`}
                 >
                    {currentStep === 1 ? 'Cancelar' : 'Voltar'}
                 </button>

                 {currentStep < 3 ? (
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
                       <Save className="w-4 h-4" /> {isEdit ? 'Atualizar' : 'Salvar Aluno'}
                    </button>
                 )}
              </div>

           </div>
        </div>
      </div>
    </main>
  );
};

export default StudentForm;