import React, { useState } from 'react';
import {
  ArrowLeft, Edit, User, Calendar, Weight, Ruler, Heart, Activity, Target, Camera, FileText,
  Download, TrendingUp, Award, Zap, Eye, Brain, ChevronLeft, ChevronRight, Printer, ClipboardList
} from 'lucide-react';
import AnatomicalDiagram from '../components/AnatomicalDiagram';

interface PhysicalEvaluationDetailsProps {
  evaluation: any;
  onEdit: () => void;
  onClose: () => void;
  darkMode?: boolean;
}

const PhysicalEvaluationDetails: React.FC<PhysicalEvaluationDetailsProps> = ({
  evaluation,
  onEdit,
  onClose,
  darkMode
}) => {
  const [currentTab, setCurrentTab] = useState(0);

  const tabs = [
    { id: 'overview', name: 'Visão Geral', icon: Activity },
    { id: 'anamnesis', name: 'Anamnese', icon: ClipboardList },
    { id: 'anthropometric', name: 'Antropometria', icon: Ruler },
    { id: 'posture', name: 'Análise Postural', icon: Eye },
    { id: 'performance', name: 'Performance', icon: Zap },
    { id: 'observations', name: 'Plano', icon: FileText },
  ];

  const renderProgressBar = (value: number, max = 5, color = 'bg-blue-500') => (
    <div className="flex items-center gap-3 w-full">
      <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${(value / max) * 100}%` }} />
      </div>
      <span className="text-sm font-bold w-8">{value}/{max}</span>
    </div>
  );

  const InfoCard = ({ label, value, icon: Icon, color }: any) => (
    <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
      <div className="flex items-start justify-between mb-2">
        <p className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
        <div className={`p-2 rounded-lg ${color.bg} ${color.text}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
    </div>
  );

  // Helper to safely access anamnesis data even if it doesn't exist in old records
  const anamnesis = evaluation.anamnesis || {};

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-20 ${darkMode ? 'bg-slate-900/80 border-white/5' : 'bg-white/80 border-gray-100'} backdrop-blur-lg border-b`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button onClick={onClose} className={`p-2 rounded-xl ${darkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}>
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Avaliação Física
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-100 text-primary-700 border border-primary-200">
                    {evaluation.type}
                  </span>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {new Date(evaluation.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => window.print()} className={`p-3 rounded-xl flex items-center gap-2 font-bold transition-all ${darkMode ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-white text-gray-700 hover:bg-gray-50 border'}`}>
                <Printer className="w-5 h-5" /> <span className="hidden sm:inline">Imprimir</span>
              </button>
              <button onClick={onEdit} className="p-3 bg-primary-600 text-white rounded-xl flex items-center gap-2 font-bold hover:bg-primary-700 shadow-lg shadow-primary-500/30">
                <Edit className="w-5 h-5" /> <span className="hidden sm:inline">Editar</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 overflow-x-auto pb-1 hide-scrollbar">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(index)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                  currentTab === index
                    ? 'bg-primary-600 text-white shadow-md'
                    : (darkMode ? 'text-gray-400 hover:bg-white/5' : 'text-gray-500 hover:bg-gray-100')
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Overview Tab */}
        {tabs[currentTab].id === 'overview' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <InfoCard label="Peso" value={`${evaluation.weight} kg`} icon={Weight} color={{ bg: 'bg-blue-100', text: 'text-blue-600' }} />
              <InfoCard label="IMC" value={evaluation.bmi} icon={Activity} color={{ bg: 'bg-purple-100', text: 'text-purple-600' }} />
              <InfoCard label="Gordura" value={`${evaluation.bodyFat}%`} icon={Target} color={{ bg: 'bg-orange-100', text: 'text-orange-600' }} />
              <InfoCard label="Massa Muscular" value={`${evaluation.muscleMass} kg`} icon={Zap} color={{ bg: 'bg-red-100', text: 'text-red-600' }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {anamnesis.mainComplaint && (
                 <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                   <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                     <ClipboardList className="w-5 h-5 text-primary-500" /> Queixa Principal
                   </h3>
                   <p className={`italic ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>"{anamnesis.mainComplaint}"</p>
                 </div>
               )}

               <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                  <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    <Eye className="w-5 h-5 text-primary-500" /> Resumo Postural
                  </h3>
                  <div className="flex justify-center">
                    <AnatomicalDiagram 
                      markers={evaluation.anatomicalMarkers || []}
                      readOnly={true}
                    />
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* Anamnesis Tab */}
        {tabs[currentTab].id === 'anamnesis' && (
           <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100'}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className={`p-4 rounded-2xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">Diagnóstico Clínico</span>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{anamnesis.clinicalDiagnosis || '-'}</p>
                      </div>
                      <div className={`p-4 rounded-2xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">Médico Responsável</span>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{anamnesis.responsibleDoctor || '-'}</p>
                      </div>
                  </div>

                  <div className="space-y-6">
                     {[
                       { label: 'Queixa Principal', value: anamnesis.mainComplaint },
                       { label: 'HMA (História da Moléstia Atual)', value: anamnesis.historyOfPresentIllness },
                       { label: 'Medicamentos em Uso', value: anamnesis.medications },
                       { label: 'Patologias Associadas', value: anamnesis.associatedPathologies },
                       { label: 'Exames Complementares', value: anamnesis.complementaryExams },
                       { label: 'HP (História Pregressa)', value: anamnesis.historyOfPastIllness },
                       { label: 'Exame Físico-Funcional', value: anamnesis.physicalFunctionalExam },
                     ].map((item, idx) => (
                       <div key={idx}>
                         <h4 className={`text-sm font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.label}</h4>
                         <div className={`p-4 rounded-2xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                           <p className={`leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{item.value || 'Não informado.'}</p>
                         </div>
                       </div>
                     ))}
                  </div>
              </div>
           </div>
        )}

        {/* Posture Tab */}
        {tabs[currentTab].id === 'posture' && (
          <div className={`p-6 rounded-3xl border animate-in fade-in slide-in-from-bottom-4 ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Mapeamento Corporal</h3>
              <span className="text-sm text-gray-500">{evaluation.anatomicalMarkers?.length || 0} observações</span>
            </div>
            <div className="flex justify-center">
              <AnatomicalDiagram 
                markers={evaluation.anatomicalMarkers || []}
                readOnly={true}
              />
            </div>
          </div>
        )}

        {/* Performance Tab */}
        {tabs[currentTab].id === 'performance' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
            <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
              <h3 className={`font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Força Muscular</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2 font-medium text-gray-500"><span>Core</span></div>
                  {renderProgressBar(evaluation.strength.core, 5, 'bg-red-500')}
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2 font-medium text-gray-500"><span>Superiores</span></div>
                  {renderProgressBar(evaluation.strength.upperBody, 5, 'bg-red-500')}
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2 font-medium text-gray-500"><span>Inferiores</span></div>
                  {renderProgressBar(evaluation.strength.lowerBody, 5, 'bg-red-500')}
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
              <h3 className={`font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Equilíbrio & Coordenação</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2 font-medium text-gray-500"><span>Equilíbrio Estático</span></div>
                  {renderProgressBar(evaluation.balance?.staticBalance || 0, 5, 'bg-cyan-500')}
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2 font-medium text-gray-500"><span>Equilíbrio Dinâmico</span></div>
                  {renderProgressBar(evaluation.balance?.dynamicBalance || 0, 5, 'bg-cyan-500')}
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2 font-medium text-gray-500"><span>Propriocepção</span></div>
                  {renderProgressBar(evaluation.balance?.proprioception || 0, 5, 'bg-cyan-500')}
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
              <h3 className={`font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Flexibilidade</h3>
              <div className="space-y-4">
                {Object.entries(evaluation.flexibility).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-white/5">
                    <span className="text-sm font-medium capitalize text-gray-600 dark:text-gray-300">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="font-bold text-primary-600">{val as number}°</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Anthropometric Tab */}
        {tabs[currentTab].id === 'anthropometric' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
             <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100'}`}>
                <h3 className={`font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Medidas (cm)</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                   {Object.entries(evaluation.measurements).map(([key, val]) => (
                      <div key={key} className={`p-4 rounded-2xl text-center ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                         <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">{key}</p>
                         <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{val as number}</p>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        )}

        {/* Observations Tab */}
        {tabs[currentTab].id === 'observations' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
             <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100'}`}>
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                   <Brain className="w-5 h-5 text-purple-500" /> Objetivos & Plano
                </h3>
                <div className="space-y-6">
                   <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Objetivos</h4>
                      <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{evaluation.objectives}</p>
                   </div>
                   <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Plano de Tratamento</h4>
                      <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{evaluation.treatmentPlan}</p>
                   </div>
                   {evaluation.medicalObservations && (
                      <div className={`p-4 rounded-xl border-l-4 border-red-400 ${darkMode ? 'bg-red-500/10' : 'bg-red-50'}`}>
                         <h4 className="text-sm font-bold text-red-500 uppercase tracking-wider mb-1">Obs. Médicas</h4>
                         <p className={`text-sm italic ${darkMode ? 'text-red-200' : 'text-red-800'}`}>{evaluation.medicalObservations}</p>
                      </div>
                   )}
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhysicalEvaluationDetails;