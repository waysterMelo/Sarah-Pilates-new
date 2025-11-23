import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  User, 
  GraduationCap, 
  Calendar, 
  Weight, 
  Ruler, 
  Heart, 
  Activity, 
  Target, 
  Camera, 
  Upload, 
  AlertCircle, 
  Plus, 
  X, 
  Sparkles, 
  Zap, 
  Brain, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Eye,
  Move,
  ClipboardList,
  Stethoscope
} from 'lucide-react';
import AnatomicalDiagram, { AnatomicalMarker } from '../components/AnatomicalDiagram';

interface PhysicalEvaluation {
  id: number;
  studentId: number;
  instructorId: number;
  date: string;
  type: string;
  // ... other fields
  anatomicalMarkers: AnatomicalMarker[];
}

interface PhysicalEvaluationFormProps {
  evaluation?: any;
  isEdit?: boolean;
  onSave?: (data: any) => void;
  onCancel?: () => void;
  darkMode?: boolean;
}

const PhysicalEvaluationForm: React.FC<PhysicalEvaluationFormProps> = ({ 
  evaluation, 
  isEdit, 
  onSave, 
  onCancel,
  darkMode 
}) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const [formData, setFormData] = useState({
    studentId: 0,
    studentName: '',
    instructorId: 0,
    instructorName: '',
    date: new Date().toISOString().split('T')[0],
    type: 'Inicial',
    // Anamnese Data
    anamnesis: {
      clinicalDiagnosis: '',
      responsibleDoctor: '',
      previousPilatesExperience: '',
      mainComplaint: '',
      historyOfPresentIllness: '', // HMA
      medications: '',
      associatedPathologies: '',
      complementaryExams: '',
      historyOfPastIllness: '', // HP
      physicalFunctionalExam: ''
    },
    weight: 0,
    height: 0,
    bmi: 0,
    bloodPressure: '',
    heartRate: 0,
    bodyFat: 0,
    muscleMass: 0,
    measurements: {
      chest: 0, waist: 0, hip: 0, thigh: 0, arm: 0
    },
    flexibility: {
      shoulderFlexion: 0, spinalFlexion: 0, hipFlexion: 0, ankleFlexion: 0
    },
    strength: {
      core: 0, upperBody: 0, lowerBody: 0, grip: 0
    },
    balance: {
      staticBalance: 0, dynamicBalance: 0, proprioception: 0
    },
    anatomicalMarkers: [] as AnatomicalMarker[],
    medicalObservations: '',
    objectives: '',
    treatmentPlan: '',
    recommendations: '',
    nextEvaluationDate: '',
    photos: [] as string[],
    attachments: [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock data
  const students = [
    { id: 1, name: 'Ana Silva Santos' },
    { id: 2, name: 'Maria Santos Oliveira' },
    { id: 3, name: 'João Pedro Costa' },
  ];

  const instructors = [
    { id: 1, name: 'Sarah Costa Silva' },
    { id: 2, name: 'Carla Mendes Santos' },
    { id: 3, name: 'Roberto Lima Oliveira' },
  ];

  const steps = [
    { id: 0, title: 'Informações Básicas', icon: User, color: 'from-blue-500 to-blue-600', description: 'Dados do aluno e instrutor' },
    { id: 1, title: 'Anamnese', icon: ClipboardList, color: 'from-rose-500 to-pink-600', description: 'Histórico clínico e queixas' },
    { id: 2, title: 'Dados Antropométricos', icon: Ruler, color: 'from-green-500 to-emerald-600', description: 'Peso, altura, IMC e composição' },
    { id: 3, title: 'Medidas Corporais', icon: Target, color: 'from-purple-500 to-purple-600', description: 'Perímetros corporais' },
    { id: 4, title: 'Flexibilidade', icon: Activity, color: 'from-orange-500 to-orange-600', description: 'Testes de amplitude' },
    { id: 5, title: 'Força Muscular', icon: Zap, color: 'from-red-500 to-red-600', description: 'Avaliação de força' },
    { id: 6, title: 'Equilíbrio', icon: Move, color: 'from-cyan-500 to-cyan-600', description: 'Estabilidade e propriocepção' },
    { id: 7, title: 'Análise Postural', icon: Eye, color: 'from-yellow-500 to-yellow-600', description: 'Avaliação visual e dores' },
    { id: 8, title: 'Plano e Observações', icon: Brain, color: 'from-gray-500 to-gray-600', description: 'Conclusão e planejamento' },
  ];

  useEffect(() => {
    if (formData.weight > 0 && formData.height > 0) {
      const bmi = formData.weight / (formData.height * formData.height);
      setFormData(prev => ({ ...prev, bmi: parseFloat(bmi.toFixed(1)) }));
    }
  }, [formData.weight, formData.height]);

  // Load data if editing
  useEffect(() => {
    if (isEdit && evaluation) {
      setFormData(prev => ({
        ...prev,
        ...evaluation,
        // Ensure nested objects exist even if evaluation data is partial
        anamnesis: evaluation.anamnesis || { clinicalDiagnosis: '', responsibleDoctor: '', previousPilatesExperience: '', mainComplaint: '', historyOfPresentIllness: '', medications: '', associatedPathologies: '', complementaryExams: '', historyOfPastIllness: '', physicalFunctionalExam: '' },
        balance: evaluation.balance || { staticBalance: 0, dynamicBalance: 0, proprioception: 0 },
        measurements: evaluation.measurements || prev.measurements,
        flexibility: evaluation.flexibility || prev.flexibility,
        strength: evaluation.strength || prev.strength,
      }));
    }
  }, [isEdit, evaluation]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleNestedInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev] as any,
        [field]: value
      }
    }));
  };

  const handleMarkerAdd = (marker: Omit<AnatomicalMarker, 'id'>) => {
    const newMarker = { ...marker, id: Date.now().toString() };
    setFormData(prev => ({
      ...prev,
      anatomicalMarkers: [...prev.anatomicalMarkers, newMarker]
    }));
  };

  const handleMarkerRemove = (id: string) => {
    setFormData(prev => ({
      ...prev,
      anatomicalMarkers: prev.anatomicalMarkers.filter(m => m.id !== id)
    }));
  };

  const validateStep = (stepId: number) => {
    const stepErrors: Record<string, string> = {};
    switch (stepId) {
      case 0: 
        if (!formData.studentId) stepErrors.studentId = 'Aluno é obrigatório';
        if (!formData.instructorId) stepErrors.instructorId = 'Instrutor é obrigatório';
        break;
      case 2: // Antropometria (previously 1)
        if (formData.weight < 0) stepErrors.weight = 'Peso inválido';
        if (formData.height < 0) stepErrors.height = 'Altura inválida';
        break;
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCompletedSteps(prev => [...new Set([...prev, currentStep])]);
      if (currentStep < steps.length - 1) setCurrentStep(p => p + 1);
    }
  };

  const handleSave = () => {
    if (validateStep(currentStep)) {
      if (onSave) onSave(formData);
      else navigate('/physical');
    }
  };

  const renderScaleInput = (label: string, value: number, onChange: (val: number) => void, max = 5) => (
    <div className="space-y-3">
      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">{label}: {value}/{max}</label>
      <input
        type="range"
        min="0"
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer slider accent-primary-600"
      />
      <div className="flex justify-between text-xs font-medium text-gray-500"><span>0</span><span>{max}</span></div>
    </div>
  );

  const inputClass = `w-full px-4 py-3 border rounded-2xl outline-none transition-all ${
    darkMode ? 'bg-white/5 border-white/10 text-white focus:border-primary-500 placeholder:text-slate-600' : 'bg-gray-50 border-gray-200 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100 placeholder:text-gray-400'
  }`;

  const labelClass = `block text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`;
  
  const sectionHeaderClass = `flex items-center gap-2 text-lg font-bold mb-4 mt-6 ${darkMode ? 'text-primary-400' : 'text-primary-600'}`;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-slate-50'} pb-20`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-slate-900' : 'bg-white'} shadow-sm border-b ${darkMode ? 'border-white/5' : 'border-gray-100'} sticky top-0 z-20`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onCancel || (() => navigate('/physical'))} className={`p-2 rounded-xl ${darkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {isEdit ? 'Editar Avaliação' : 'Nova Avaliação'}
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Passo {currentStep + 1} de {steps.length}: {steps[currentStep].title}
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${currentStep === i ? 'bg-primary-600 scale-125' : completedSteps.includes(i) ? 'bg-green-500' : 'bg-gray-200'}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className={`rounded-3xl shadow-xl overflow-hidden ${darkMode ? 'bg-slate-900 border border-white/5' : 'bg-white border border-gray-100'}`}>
          {/* Step Header */}
          <div className={`bg-gradient-to-r ${steps[currentStep].color} p-8 text-white`}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                {React.createElement(steps[currentStep].icon, { className: "w-6 h-6 text-white" })}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
                <p className="text-white/80">{steps[currentStep].description}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {currentStep === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Aluno</label>
                  <select 
                    value={formData.studentId} 
                    onChange={(e) => handleInputChange('studentId', Number(e.target.value))}
                    className={inputClass}
                  >
                    <option value={0}>Selecione...</option>
                    {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                  {errors.studentId && <p className="text-red-500 text-sm mt-1">{errors.studentId}</p>}
                </div>
                <div>
                  <label className={labelClass}>Instrutor</label>
                  <select 
                    value={formData.instructorId} 
                    onChange={(e) => handleInputChange('instructorId', Number(e.target.value))}
                    className={inputClass}
                  >
                    <option value={0}>Selecione...</option>
                    {instructors.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Data</label>
                  <input type="date" value={formData.date} onChange={(e) => handleInputChange('date', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Tipo</label>
                  <select value={formData.type} onChange={(e) => handleInputChange('type', e.target.value)} className={inputClass}>
                    <option value="Inicial">Inicial</option>
                    <option value="Progresso">Progresso</option>
                    <option value="Final">Final</option>
                  </select>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-rose-500/5 border-rose-500/20' : 'bg-rose-50 border-rose-100'}`}>
                   <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-rose-400' : 'text-rose-600'}`}>
                     <Stethoscope className="w-5 h-5" /> Informações Clínicas
                   </h3>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className={labelClass}>Diagnóstico Clínico</label>
                        <input 
                          type="text" 
                          value={formData.anamnesis.clinicalDiagnosis}
                          onChange={(e) => handleNestedInputChange('anamnesis', 'clinicalDiagnosis', e.target.value)}
                          className={inputClass} 
                          placeholder="Diagnóstico médico..." 
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Médico Responsável</label>
                        <input 
                          type="text" 
                          value={formData.anamnesis.responsibleDoctor}
                          onChange={(e) => handleNestedInputChange('anamnesis', 'responsibleDoctor', e.target.value)}
                          className={inputClass} 
                          placeholder="Nome do médico..." 
                        />
                      </div>
                   </div>

                   <div className="space-y-6">
                      <div>
                        <label className={labelClass}>Já praticou pilates?</label>
                        <input 
                          type="text" 
                          value={formData.anamnesis.previousPilatesExperience}
                          onChange={(e) => handleNestedInputChange('anamnesis', 'previousPilatesExperience', e.target.value)}
                          className={inputClass} 
                          placeholder="Experiência anterior com pilates..." 
                        />
                      </div>
                      
                      <div>
                        <label className={labelClass}>Queixa Principal</label>
                        <textarea 
                          rows={2}
                          value={formData.anamnesis.mainComplaint}
                          onChange={(e) => handleNestedInputChange('anamnesis', 'mainComplaint', e.target.value)}
                          className={inputClass} 
                          placeholder="Principal motivo da consulta..." 
                        />
                      </div>
                      
                      <div>
                        <label className={labelClass}>HMA (História da Moléstia Atual)</label>
                        <textarea 
                          rows={3}
                          value={formData.anamnesis.historyOfPresentIllness}
                          onChange={(e) => handleNestedInputChange('anamnesis', 'historyOfPresentIllness', e.target.value)}
                          className={inputClass} 
                          placeholder="História detalhada da condição atual..." 
                        />
                      </div>
                      
                      <div>
                        <label className={labelClass}>Medicamentos em Uso</label>
                        <textarea 
                          rows={2}
                          value={formData.anamnesis.medications}
                          onChange={(e) => handleNestedInputChange('anamnesis', 'medications', e.target.value)}
                          className={inputClass} 
                          placeholder="Lista de medicamentos atuais..." 
                        />
                      </div>
                      
                      <div>
                        <label className={labelClass}>Patologias Associadas</label>
                        <textarea 
                          rows={2}
                          value={formData.anamnesis.associatedPathologies}
                          onChange={(e) => handleNestedInputChange('anamnesis', 'associatedPathologies', e.target.value)}
                          className={inputClass} 
                          placeholder="Outras condições médicas..." 
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Exames Complementares</label>
                        <textarea 
                          rows={2}
                          value={formData.anamnesis.complementaryExams}
                          onChange={(e) => handleNestedInputChange('anamnesis', 'complementaryExams', e.target.value)}
                          className={inputClass} 
                          placeholder="Exames realizados (raio-x, ressonância, etc.)..." 
                        />
                      </div>

                      <div>
                        <label className={labelClass}>HP (História Pregressa)</label>
                        <textarea 
                          rows={2}
                          value={formData.anamnesis.historyOfPastIllness}
                          onChange={(e) => handleNestedInputChange('anamnesis', 'historyOfPastIllness', e.target.value)}
                          className={inputClass} 
                          placeholder="Histórico médico pregresso..." 
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Exame Físico-Funcional</label>
                        <textarea 
                          rows={3}
                          value={formData.anamnesis.physicalFunctionalExam}
                          onChange={(e) => handleNestedInputChange('anamnesis', 'physicalFunctionalExam', e.target.value)}
                          className={inputClass} 
                          placeholder="Avaliação física e funcional detalhada..." 
                        />
                      </div>
                   </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className={labelClass}>Peso (kg)</label>
                  <input type="number" value={formData.weight || ''} onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))} className={inputClass} placeholder="0.0" />
                </div>
                <div>
                  <label className={labelClass}>Altura (m)</label>
                  <input type="number" value={formData.height || ''} onChange={(e) => handleInputChange('height', parseFloat(e.target.value))} className={inputClass} placeholder="0.00" />
                </div>
                <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800 border-white/10' : 'bg-blue-50 border-blue-100'}`}>
                  <label className="text-xs font-bold uppercase opacity-60 mb-1 block">IMC (Calculado)</label>
                  <div className="text-3xl font-black text-primary-600">{formData.bmi}</div>
                </div>
                <div>
                  <label className={labelClass}>% Gordura</label>
                  <input type="number" value={formData.bodyFat || ''} onChange={(e) => handleInputChange('bodyFat', parseFloat(e.target.value))} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Massa Muscular (kg)</label>
                  <input type="number" value={formData.muscleMass || ''} onChange={(e) => handleInputChange('muscleMass', parseFloat(e.target.value))} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>FC Repouso (bpm)</label>
                  <input type="number" value={formData.heartRate || ''} onChange={(e) => handleInputChange('heartRate', parseInt(e.target.value))} className={inputClass} />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries({chest: 'Tórax', waist: 'Cintura', hip: 'Quadril', thigh: 'Coxa', arm: 'Braço'}).map(([key, label]) => (
                  <div key={key}>
                    <label className={labelClass}>{label} (cm)</label>
                    <input 
                      type="number" 
                      value={(formData.measurements as any)[key]} 
                      onChange={(e) => handleNestedInputChange('measurements', key, parseFloat(e.target.value))}
                      className={inputClass}
                    />
                  </div>
                ))}
              </div>
            )}

            {currentStep === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries({shoulderFlexion: 'Flexão Ombro', spinalFlexion: 'Flexão Coluna', hipFlexion: 'Flexão Quadril', ankleFlexion: 'Flexão Tornozelo'}).map(([key, label]) => (
                  <div key={key}>
                    <label className={labelClass}>{label} (graus)</label>
                    <input 
                      type="number" 
                      value={(formData.flexibility as any)[key]} 
                      onChange={(e) => handleNestedInputChange('flexibility', key, parseFloat(e.target.value))}
                      className={inputClass}
                    />
                  </div>
                ))}
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {renderScaleInput('Core', formData.strength.core, (v) => handleNestedInputChange('strength', 'core', v))}
                  {renderScaleInput('Membros Superiores', formData.strength.upperBody, (v) => handleNestedInputChange('strength', 'upperBody', v))}
                  {renderScaleInput('Membros Inferiores', formData.strength.lowerBody, (v) => handleNestedInputChange('strength', 'lowerBody', v))}
                  <div>
                    <label className={labelClass}>Força de Preensão (kg)</label>
                    <input 
                      type="number" 
                      value={formData.strength.grip}
                      onChange={(e) => handleNestedInputChange('strength', 'grip', parseFloat(e.target.value))}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {renderScaleInput('Equilíbrio Estático', formData.balance.staticBalance, (v) => handleNestedInputChange('balance', 'staticBalance', v))}
                  {renderScaleInput('Equilíbrio Dinâmico', formData.balance.dynamicBalance, (v) => handleNestedInputChange('balance', 'dynamicBalance', v))}
                  {renderScaleInput('Propriocepção', formData.balance.proprioception, (v) => handleNestedInputChange('balance', 'proprioception', v))}
                  
                  <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-blue-50 border-blue-100'}`}>
                    <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-500" /> Dica de Avaliação
                    </h4>
                    <p className="text-xs opacity-80">
                      Teste o equilíbrio unipodal com olhos abertos e fechados. Avalie a estabilidade do tronco durante movimentos dinâmicos.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 7 && (
              <div className="space-y-6">
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Utilize o diagrama abaixo para marcar pontos de dor, lesão ou observações posturais.
                </p>
                <AnatomicalDiagram 
                  markers={formData.anatomicalMarkers}
                  onMarkerAdd={handleMarkerAdd}
                  onMarkerRemove={handleMarkerRemove}
                />
              </div>
            )}

            {currentStep === 8 && (
              <div className="space-y-6">
                <div>
                  <label className={labelClass}>Observações Médicas</label>
                  <textarea rows={3} value={formData.medicalObservations} onChange={(e) => handleInputChange('medicalObservations', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Objetivos</label>
                  <textarea rows={3} value={formData.objectives} onChange={(e) => handleInputChange('objectives', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Plano de Tratamento</label>
                  <textarea rows={3} value={formData.treatmentPlan} onChange={(e) => handleInputChange('treatmentPlan', e.target.value)} className={inputClass} />
                </div>
              </div>
            )}
          </div>

          {/* Footer Navigation */}
          <div className={`p-6 border-t flex justify-between items-center ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
            <button
              onClick={currentStep === 0 ? (onCancel || (() => navigate('/physical'))) : () => setCurrentStep(p => p - 1)}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${darkMode ? 'text-gray-400 hover:bg-white/10' : 'text-gray-500 hover:bg-gray-200'}`}
            >
              {currentStep === 0 ? 'Cancelar' : 'Voltar'}
            </button>
            
            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 shadow-lg shadow-primary-500/30 transition-all"
              >
                Próximo <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-500/30 transition-all"
              >
                <Save className="w-5 h-5" /> Salvar Avaliação
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicalEvaluationForm;