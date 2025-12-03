import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  User, 
  Ruler, 
  Activity, 
  Target, 
  Zap, 
  Brain, 
  ChevronRight, 
  Eye,
  Move,
  ClipboardList,
  Stethoscope,
  Layers
} from 'lucide-react';
import { useTheme } from '../src/contexts/ThemeContext';
import AnatomicalDiagram, { AnatomicalMarker } from '../components/AnatomicalDiagram';

interface PhysicalEvaluationFormProps {
  evaluation?: any;
  isEdit?: boolean;
  onSave?: (data: any) => void;
  onCancel?: () => void;
}

const PhysicalEvaluationForm: React.FC<PhysicalEvaluationFormProps> = ({ 
  evaluation, 
  isEdit, 
  onSave, 
  onCancel
}) => {
  const { darkMode } = useTheme();
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
    anamnesis: {
      clinicalDiagnosis: '',
      responsibleDoctor: '',
      previousPilatesExperience: '',
      mainComplaint: '',
      historyOfPresentIllness: '', 
      medications: '',
      associatedPathologies: '',
      complementaryExams: '',
      historyOfPastIllness: '', 
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
    fms: { // Functional Movement Screen
      deepSquat: 0,
      hurdleStep: 0,
      inLineLunge: 0,
      shoulderMobility: 0,
      activeStraightLegRaise: 0,
      trunkStabilityPushUp: 0,
      rotaryStability: 0
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
    nextEvaluationDate: new Date(new Date().setDate(new Date().getDate() + 90)).toISOString().split('T')[0], // Default 90 days
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
    { id: 0, title: 'Info. Básicas', icon: User, color: 'from-blue-500 to-blue-600', description: 'Dados do aluno e instrutor' },
    { id: 1, title: 'Anamnese', icon: ClipboardList, color: 'from-rose-500 to-pink-600', description: 'Histórico clínico e queixas' },
    { id: 2, title: 'Antropometria', icon: Ruler, color: 'from-green-500 to-emerald-600', description: 'Composição corporal' },
    { id: 3, title: 'Testes Funcionais (FMS)', icon: Layers, color: 'from-indigo-500 to-violet-600', description: 'Padrões de movimento' },
    { id: 4, title: 'Flexibilidade & Força', icon: Zap, color: 'from-orange-500 to-orange-600', description: 'Amplitude e potência' },
    { id: 5, title: 'Equilíbrio & Postura', icon: Move, color: 'from-cyan-500 to-cyan-600', description: 'Estabilidade e análise visual' },
    { id: 6, title: 'Plano & Conclusão', icon: Brain, color: 'from-gray-500 to-gray-600', description: 'Planejamento terapêutico' },
  ];

  useEffect(() => {
    if (formData.weight > 0 && formData.height > 0) {
      const bmi = formData.weight / (formData.height * formData.height);
      setFormData(prev => ({ ...prev, bmi: parseFloat(bmi.toFixed(1)) }));
    }
  }, [formData.weight, formData.height]);

  useEffect(() => {
    if (isEdit && evaluation) {
      setFormData(prev => ({
        ...prev,
        ...evaluation,
        anamnesis: evaluation.anamnesis || prev.anamnesis,
        fms: evaluation.fms || prev.fms,
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
    if (stepId === 0) {
        if (!formData.studentId) stepErrors.studentId = 'Aluno é obrigatório';
        if (!formData.instructorId) stepErrors.instructorId = 'Instrutor é obrigatório';
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
      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 flex justify-between">
          <span>{label}</span>
          <span className="bg-primary-500 text-white text-xs px-2 py-0.5 rounded-full">{value}/{max}</span>
      </label>
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

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-slate-50'} pb-20`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-slate-900' : 'bg-white'} shadow-sm border-b ${darkMode ? 'border-white/5' : 'border-gray-100'} sticky top-0 z-20`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
                <div>
                  <label className={labelClass}>Aluno</label>
                  <select value={formData.studentId} onChange={(e) => handleInputChange('studentId', Number(e.target.value))} className={inputClass}>
                    <option value={0}>Selecione...</option>
                    {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                  {errors.studentId && <p className="text-red-500 text-sm mt-1">{errors.studentId}</p>}
                </div>
                <div>
                  <label className={labelClass}>Instrutor</label>
                  <select value={formData.instructorId} onChange={(e) => handleInputChange('instructorId', Number(e.target.value))} className={inputClass}>
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
              <div className="space-y-6 animate-in fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClass}>Queixa Principal</label>
                        <textarea rows={3} value={formData.anamnesis.mainComplaint} onChange={(e) => handleNestedInputChange('anamnesis', 'mainComplaint', e.target.value)} className={inputClass} placeholder="Dor, desconforto, objetivo principal..." />
                    </div>
                    <div>
                        <label className={labelClass}>Diagnóstico Clínico</label>
                        <textarea rows={3} value={formData.anamnesis.clinicalDiagnosis} onChange={(e) => handleNestedInputChange('anamnesis', 'clinicalDiagnosis', e.target.value)} className={inputClass} placeholder="Diagnóstico médico se houver..." />
                    </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in">
                <div>
                  <label className={labelClass}>Peso (kg)</label>
                  <input type="number" value={formData.weight || ''} onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Altura (m)</label>
                  <input type="number" value={formData.height || ''} onChange={(e) => handleInputChange('height', parseFloat(e.target.value))} className={inputClass} />
                </div>
                <div className={`p-4 rounded-2xl border flex flex-col justify-center ${darkMode ? 'bg-slate-800 border-white/10' : 'bg-blue-50 border-blue-100'}`}>
                  <span className="text-xs font-bold uppercase opacity-60">IMC Calculado</span>
                  <span className="text-2xl font-black text-primary-600">{formData.bmi || '-'}</span>
                </div>
              </div>
            )}

            {currentStep === 3 && (
                <div className="space-y-8 animate-in fade-in">
                    <div className={`p-4 rounded-xl mb-6 flex items-start gap-3 ${darkMode ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-300' : 'bg-indigo-50 border border-indigo-100 text-indigo-700'}`}>
                        <Layers className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <p className="text-sm">
                            O Functional Movement Screen (FMS) avalia padrões fundamentais de movimento. 
                            Pontuação: 0 (Dor), 1 (Incapaz), 2 (Com compensação), 3 (Padrão perfeito).
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        {renderScaleInput('Agachamento Profundo (Deep Squat)', formData.fms.deepSquat, (v) => handleNestedInputChange('fms', 'deepSquat', v), 3)}
                        {renderScaleInput('Passo sobre Barreira (Hurdle Step)', formData.fms.hurdleStep, (v) => handleNestedInputChange('fms', 'hurdleStep', v), 3)}
                        {renderScaleInput('Avanço em Linha (In-Line Lunge)', formData.fms.inLineLunge, (v) => handleNestedInputChange('fms', 'inLineLunge', v), 3)}
                        {renderScaleInput('Mobilidade de Ombros', formData.fms.shoulderMobility, (v) => handleNestedInputChange('fms', 'shoulderMobility', v), 3)}
                        {renderScaleInput('Elevação da Perna (ASLR)', formData.fms.activeStraightLegRaise, (v) => handleNestedInputChange('fms', 'activeStraightLegRaise', v), 3)}
                        {renderScaleInput('Estabilidade de Tronco (Push Up)', formData.fms.trunkStabilityPushUp, (v) => handleNestedInputChange('fms', 'trunkStabilityPushUp', v), 3)}
                        {renderScaleInput('Estabilidade Rotacional', formData.fms.rotaryStability, (v) => handleNestedInputChange('fms', 'rotaryStability', v), 3)}
                    </div>
                </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-8 animate-in fade-in">
                <div>
                    <h3 className="font-bold text-lg mb-4">Flexibilidade (Graus)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries({shoulderFlexion: 'Ombro', spinalFlexion: 'Coluna', hipFlexion: 'Quadril', ankleFlexion: 'Tornozelo'}).map(([key, label]) => (
                        <div key={key}>
                            <label className={labelClass}>{label}</label>
                            <input type="number" value={(formData.flexibility as any)[key]} onChange={(e) => handleNestedInputChange('flexibility', key, parseFloat(e.target.value))} className={inputClass} />
                        </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-4">Força Muscular (0-5)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {renderScaleInput('Core', formData.strength.core, (v) => handleNestedInputChange('strength', 'core', v))}
                        {renderScaleInput('Membros Superiores', formData.strength.upperBody, (v) => handleNestedInputChange('strength', 'upperBody', v))}
                        {renderScaleInput('Membros Inferiores', formData.strength.lowerBody, (v) => handleNestedInputChange('strength', 'lowerBody', v))}
                        <div>
                            <label className={labelClass}>Preensão Manual (kg)</label>
                            <input type="number" value={formData.strength.grip} onChange={(e) => handleNestedInputChange('strength', 'grip', parseFloat(e.target.value))} className={inputClass} />
                        </div>
                    </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-8 animate-in fade-in">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {renderScaleInput('Equilíbrio Estático', formData.balance.staticBalance, (v) => handleNestedInputChange('balance', 'staticBalance', v))}
                    {renderScaleInput('Equilíbrio Dinâmico', formData.balance.dynamicBalance, (v) => handleNestedInputChange('balance', 'dynamicBalance', v))}
                 </div>
                 
                 <div className="border-t pt-8 border-gray-100 dark:border-white/5">
                    <h3 className="font-bold text-lg mb-4">Análise Postural Visual</h3>
                    <AnatomicalDiagram 
                        markers={formData.anatomicalMarkers}
                        onMarkerAdd={handleMarkerAdd}
                        onMarkerRemove={handleMarkerRemove}
                    />
                 </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <label className={labelClass}>Plano de Tratamento</label>
                  <textarea rows={4} value={formData.treatmentPlan} onChange={(e) => handleInputChange('treatmentPlan', e.target.value)} className={inputClass} placeholder="Conduta sugerida..." />
                </div>
                <div>
                  <label className={labelClass}>Data Sugerida para Reavaliação</label>
                  <input type="date" value={formData.nextEvaluationDate} onChange={(e) => handleInputChange('nextEvaluationDate', e.target.value)} className={inputClass} />
                  <p className="text-xs text-gray-500 mt-1">Calculado automaticamente para 90 dias após hoje.</p>
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