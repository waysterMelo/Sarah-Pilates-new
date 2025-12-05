import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import api from '../src/services/api';
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
  MapPin,
  HeartPulse,
  UploadCloud,
  File,
  X
} from 'lucide-react';

import { useTheme } from '../src/contexts/ThemeContext';

interface StudentData {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  sex: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  // Medical History Expanded
  medical: {
    allergies: string;
    surgeries: string;
    medications: string;
    restrictions: string;
    heartCondition: boolean;
    dizziness: boolean;
    boneJointProblem: boolean;
    diabetes: boolean;
    hypertension: boolean;
  };
  objectives: string;
  plan: string;
  status: 'Ativo' | 'Inativo' | 'Suspenso';
  documents: Array<{ name: string; size: string; type: string }>;
}

const StudentForm: React.FC = () => {
  const { darkMode } = useTheme();
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
    sex: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    medical: {
      allergies: '',
      surgeries: '',
      medications: '',
      restrictions: '',
      heartCondition: false,
      dizziness: false,
      boneJointProblem: false,
      diabetes: false,
      hypertension: false
    },
    objectives: '',
    plan: 'Mensal - 8 aulas',
    status: 'Ativo',
    documents: []
  });

  const [documentFiles, setDocumentFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { id: 1, title: 'Dados Pessoais', icon: User },
    { id: 2, title: 'Anamnese & Saúde', icon: HeartPulse },
    { id: 3, title: 'Documentos & Plano', icon: FileText }
  ];

  useEffect(() => {
    if (isEdit) {
      const fetchStudent = async () => {
        console.log(`🔄 Buscando dados do Aluno #${id}...`);
        try {
          const { data } = await api.get(`/api/students/${id}`);
          console.log('✅ Dados recebidos:', data);
          setFormData(prev => ({
            ...prev,
            name: data.name,
            email: data.email,
            phone: data.phone,
            birthDate: data.birthDate,
            sex: data.sex,
            address: data.address,
            emergencyContact: data.emergencyContact,
            emergencyPhone: data.emergencyPhone,
            plan: data.plan,
            status: data.status,
            objectives: data.anamnesis?.objectives || '',
            documents: data.documents || [],
            medical: {
              ...prev.medical,
              ...data.anamnesis // Spread the anamnesis data into the medical object
            },
          }));
        } catch (error: any) {
          console.error("❌ Falha ao buscar aluno:", error);
          if (error.response) {
            console.error('Detalhes do erro:', error.response.data);
          }
          navigate('/students');
        }
      };
      fetchStudent();
    }
  }, [isEdit, id, navigate]);

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
      if (!formData.email.trim()) newErrors.email = 'Email é obrigatório';
      if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
      if (!formData.birthDate) newErrors.birthDate = 'Data de nascimento é obrigatória';
      if (!formData.sex) newErrors.sex = 'Sexo é obrigatório';
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

  const handleSubmit = async () => {
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      console.log("Validação falhou. Erros:", errors);
      return;
    }

    // Lógica para quando estiver editando (envia JSON)
    if (isEdit) {
      const studentDataPayload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        birthDate: formData.birthDate,
        sex: formData.sex,
        address: formData.address,
        emergencyContact: formData.emergencyContact,
        emergencyPhone: formData.emergencyPhone,
        status: formData.status.toUpperCase(),
        plan: formData.plan,
        anamnesis: {
          allergies: formData.medical.allergies,
          surgeries: formData.medical.surgeries,
          medications: formData.medical.medications,
          restrictions: formData.medical.restrictions,
          heartCondition: formData.medical.heartCondition,
          dizziness: formData.medical.dizziness,
          boneJointProblem: formData.medical.boneJointProblem,
          diabetes: formData.medical.diabetes,
          hypertension: formData.medical.hypertension,
          objectives: formData.objectives,
        }
      };

      console.group('🚀 Tentativa de Editar: Aluno (JSON)');
      console.log('Payload enviado:', studentDataPayload);

      try {
        await api.put(`/api/students/${id}`, studentDataPayload);
        console.log('✅ Sucesso ao editar!');
        // Idealmente, aqui teria uma lógica para enviar novos arquivos para outro endpoint
        navigate('/students');
      } catch (error: any) {
        console.error('❌ Erro ao editar:', error);
        if (error.response) {
          console.error('Status:', error.response.status);
          console.error('Dados do Erro (Backend):', error.response.data);
        }
      } finally {
        console.groupEnd();
      }
    } 
    // Lógica para quando estiver criando (envia FormData)
    else {
      const studentDataPayload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        birthDate: formData.birthDate,
        sex: formData.sex,
        address: formData.address,
        emergencyContact: formData.emergencyContact,
        emergencyPhone: formData.emergencyPhone,
        status: formData.status.toUpperCase(),
        plan: formData.plan,
        anamnesis: {
          allergies: formData.medical.allergies,
          surgeries: formData.medical.surgeries,
          medications: formData.medical.medications,
          restrictions: formData.medical.restrictions,
          heartCondition: formData.medical.heartCondition,
          dizziness: formData.medical.dizziness,
          boneJointProblem: formData.medical.boneJointProblem,
          diabetes: formData.medical.diabetes,
          hypertension: formData.medical.hypertension,
          objectives: formData.objectives,
        }
      };

      const data = new FormData();
      data.append('student', new Blob([JSON.stringify(studentDataPayload)], { type: 'application/json' }));
      documentFiles.forEach(file => {
        data.append('files', file);
      });

      console.group('🚀 Tentativa de Criar: Aluno com Documentos (FormData)');
      console.log('Payload enviado:', studentDataPayload);
      console.log('Arquivos:', documentFiles.map(f => f.name));

      try {
        const config = {
          headers: { 'Content-Type': 'multipart/form-data' },
        };
        await api.post('/api/students', data, config);
        console.log('✅ Sucesso ao criar!');
        navigate('/students');
      } catch (error: any) {
        console.error('❌ Erro ao criar:', error);
        if (error.response) {
          console.error('Status:', error.response.status);
          console.error('Dados do Erro (Backend):', error.response.data);
        }
      } finally {
        console.groupEnd();
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleMedicalChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      medical: { ...prev.medical, [field]: value }
    }));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    setDocumentFiles(prev => [...prev, ...files]);

    const newDocsForDisplay = files.map(file => ({
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      type: file.type || 'Desconhecido'
    }));

    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...newDocsForDisplay]
    }));
  };

  const handleRemoveDocument = (index: number) => {
    const docToRemove = formData.documents[index];
    setDocumentFiles(prev => prev.filter(file => file.name !== docToRemove.name));
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  // Styles
  const inputClass = `w-full px-4 py-3 rounded-xl outline-none border transition-all ${
    darkMode 
      ? 'bg-white/5 border-white/10 text-white focus:border-primary-500 focus:bg-white/10 placeholder:text-slate-600' 
      : 'bg-white border-gray-200 text-gray-900 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 placeholder:text-gray-400'
  }`;
  
  const labelClass = `block text-xs font-bold uppercase tracking-wider mb-2 ${
    darkMode ? 'text-slate-400' : 'text-slate-500'
  }`;

  const checkboxClass = `w-5 h-5 rounded border flex items-center justify-center transition-all cursor-pointer ${
     darkMode ? 'border-white/20' : 'border-gray-300'
  }`;

  return (
    <main className={`min-h-screen relative p-6 transition-colors duration-500 ${
      darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-gray-900'
    }`}>
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
                Passo {currentStep} de 3
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {steps.map((step) => {
               const isActive = currentStep === step.id;
               const isCompleted = currentStep > step.id;
               return (
                 <div key={step.id} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                       isActive 
                        ? 'bg-primary-500 text-white shadow-lg' 
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

        <div className={`rounded-3xl border p-6 md:p-8 transition-all ${
           darkMode ? 'bg-slate-900/50 border-white/5' : 'bg-white border-gray-100 shadow-xl shadow-slate-200/50'
        }`}>
              
          {/* STEP 1: Basic Data */}
          {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-lg font-bold mb-4">Informações Pessoais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className={labelClass}>Nome Completo *</label>
                    <input type="text" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} className={`${inputClass} ${errors.name ? 'border-red-500' : ''}`} placeholder="Digite o nome completo" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Email *</label>
                    <input type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className={inputClass} placeholder="email@exemplo.com" />
                  </div>
                  <div>
                    <label className={labelClass}>Telefone *</label>
                    <input type="tel" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className={inputClass} placeholder="(11) 99999-9999" />
                  </div>
                  <div>
                    <label className={labelClass}>Data de Nascimento *</label>
                    <input type="date" value={formData.birthDate} onChange={(e) => handleInputChange('birthDate', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Sexo *</label>
                    <select value={formData.sex} onChange={(e) => handleInputChange('sex', e.target.value)} className={`${inputClass} ${errors.sex ? 'border-red-500' : ''}`}>
                      <option value="">Selecione...</option>
                      <option value="FEMININO">Feminino</option>
                      <option value="MASCULINO">Masculino</option>
                    </select>
                    {errors.sex && <p className="text-red-500 text-xs mt-1">{errors.sex}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Endereço</label>
                    <input type="text" value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} className={inputClass} placeholder="Endereço completo" />
                  </div>
                  <div>
                    <label className={labelClass}>Contato de Emergência</label>
                    <input type="text" value={formData.emergencyContact} onChange={(e) => handleInputChange('emergencyContact', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Telefone Emergência</label>
                    <input type="tel" value={formData.emergencyPhone} onChange={(e) => handleInputChange('emergencyPhone', e.target.value)} className={inputClass} />
                  </div>
                </div>
              </div>
          )}

          {/* STEP 2: Anamnese & Medical */}
          {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <HeartPulse className="w-5 h-5 text-red-500" /> Histórico Médico
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className={labelClass}>Questionário de Saúde (PAR-Q)</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                      {[
                        { key: 'heartCondition', label: 'Problema Cardíaco' },
                        { key: 'hypertension', label: 'Hipertensão Arterial' },
                        { key: 'diabetes', label: 'Diabetes' },
                        { key: 'boneJointProblem', label: 'Problema Ósseo/Articular' },
                        { key: 'dizziness', label: 'Tonturas ou Desmaios' }
                      ].map((item) => (
                        <label key={item.key} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          formData.medical[item.key as keyof typeof formData.medical] 
                            ? (darkMode ? 'bg-red-500/10 border-red-500/50' : 'bg-red-50 border-red-200') 
                            : (darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200')
                        }`}>
                          <input 
                            type="checkbox" 
                            checked={formData.medical[item.key as keyof typeof formData.medical] as boolean}
                            onChange={(e) => handleMedicalChange(item.key, e.target.checked)}
                            className="w-5 h-5 accent-red-500"
                          />
                          <span className="text-sm font-medium">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Alergias</label>
                    <textarea rows={2} value={formData.medical.allergies} onChange={(e) => handleMedicalChange('allergies', e.target.value)} className={inputClass} placeholder="Lista de alergias..." />
                  </div>
                  <div>
                    <label className={labelClass}>Cirurgias Prévias</label>
                    <textarea rows={2} value={formData.medical.surgeries} onChange={(e) => handleMedicalChange('surgeries', e.target.value)} className={inputClass} placeholder="Procedimentos cirúrgicos..." />
                  </div>
                  <div>
                    <label className={labelClass}>Medicamentos em Uso</label>
                    <textarea rows={2} value={formData.medical.medications} onChange={(e) => handleMedicalChange('medications', e.target.value)} className={inputClass} placeholder="Medicamentos contínuos..." />
                  </div>
                  <div>
                    <label className={labelClass}>Restrições Médicas</label>
                    <textarea rows={2} value={formData.medical.restrictions} onChange={(e) => handleMedicalChange('restrictions', e.target.value)} className={inputClass} placeholder="Limitações de movimento..." />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Objetivos com o Pilates</label>
                    <textarea rows={3} value={formData.objectives} onChange={(e) => handleInputChange('objectives', e.target.value)} className={inputClass} placeholder="Ex: Melhora da postura, alívio de dores..." />
                  </div>
                </div>
              </div>
          )}

          {/* STEP 3: Documents & Plan */}
          {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-lg font-bold mb-4">Plano & Documentação</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Plano Contratado</label>
                    <select value={formData.plan} onChange={(e) => handleInputChange('plan', e.target.value)} className={inputClass}>
                      <option>Mensal - 4 aulas</option>
                      <option>Mensal - 8 aulas</option>
                      <option>Mensal - 12 aulas</option>
                      <option>Trimestral</option>
                      <option>Semestral</option>
                      <option>Anual</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Status da Matrícula</label>
                    <select value={formData.status} onChange={(e) => handleInputChange('status', e.target.value as any)} className={inputClass}>
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                      <option value="Suspenso">Suspenso</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Documentos do Aluno</label>
                  <div 
                    className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
                      darkMode ? 'border-white/10 bg-white/5 hover:bg-white/10' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <input type="file" id="file-upload" multiple onChange={handleFileSelect} className="hidden" />
                    <div className="flex flex-col items-center gap-3">
                      <div className={`p-3 rounded-full ${darkMode ? 'bg-primary-500/20 text-primary-400' : 'bg-primary-50 text-primary-600'}`}>
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">Clique para adicionar documentos</p>
                        <p className="text-xs opacity-60">PDF, PNG, JPG (MAX. 5MB)</p>
                      </div>
                      <span className="mt-2 px-4 py-2 bg-primary-600 text-white text-sm font-bold rounded-lg">
                        Selecionar Arquivos
                      </span>
                    </div>
                  </div>

                  {formData.documents.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.documents.map((doc, index) => (
                        <div key={index} className={`flex items-center justify-between p-3 rounded-xl border ${darkMode ? 'bg-slate-800 border-white/10' : 'bg-white border-gray-200'}`}>
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-blue-500" />
                            <div>
                              <p className="text-sm font-bold">{doc.name}</p>
                              <p className="text-xs opacity-60">{doc.size} • {doc.type}</p>
                            </div>
                          </div>
                          <button 
                            type="button"
                            onClick={() => handleRemoveDocument(index)} 
                            className="p-2 hover:bg-red-500/10 rounded-lg text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
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
                    <Save className="w-4 h-4" /> Salvar Cadastro
                </button>
              )}
          </div>

        </div>
      </div>
    </main>
  );
};

export default StudentForm;