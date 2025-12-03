import React, { useState } from 'react';
import {
  ArrowLeft, Edit, Calendar, Weight, Ruler, Activity, Target, Zap, Eye, Brain, Printer, ClipboardList, Layers, TrendingUp, ArrowRightLeft, FileDown
} from 'lucide-react';
import AnatomicalDiagram from '../components/AnatomicalDiagram';
import { useTheme } from '../src/contexts/ThemeContext';

interface PhysicalEvaluationDetailsProps {
  evaluation: any;
  onEdit: () => void;
  onClose: () => void;
}

// Componente Simples de Gráfico SVG
const SimpleChart = ({ data, color = '#3b82f6', label }: { data: number[], color?: string, label: string }) => {
    const { darkMode } = useTheme();
    const max = Math.max(...data) * 1.2;
    const min = Math.min(...data) * 0.8;
    const height = 100;
    const width = 300;
    
    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((val - min) / (max - min)) * height;
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="w-full">
            <p className={`text-xs font-bold mb-2 uppercase opacity-60 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{label}</p>
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-24 overflow-visible">
                <polyline fill="none" stroke={color} strokeWidth="3" points={points} strokeLinecap="round" strokeLinejoin="round" />
                {data.map((val, i) => {
                    const x = (i / (data.length - 1)) * width;
                    const y = height - ((val - min) / (max - min)) * height;
                    return (
                        <g key={i}>
                            <circle cx={x} cy={y} r="4" fill={color} className="hover:r-6 transition-all" />
                            <text x={x} y={y - 10} textAnchor="middle" fontSize="10" fill="currentColor" className={darkMode ? 'text-slate-300 opacity-70' : 'text-gray-600 opacity-70'}>{val}</text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};

const PhysicalEvaluationDetails: React.FC<PhysicalEvaluationDetailsProps> = ({
  evaluation,
  onEdit,
  onClose
}) => {
  const { darkMode } = useTheme();
  const [currentTab, setCurrentTab] = useState(0);
  const [comparisonMode, setComparisonMode] = useState(false);

  // Mock Data for Comparison/Charts (Simulando histórico)
  const historyData = {
      weight: [68, 67.5, 66.2, evaluation.weight],
      strength: [2, 3, 3, evaluation.strength.core],
      flexibility: [10, 12, 15, evaluation.flexibility.ankleFlexion]
  };

  const nextEvaluationDate = new Date(evaluation.date);
  nextEvaluationDate.setDate(nextEvaluationDate.getDate() + 90);
  const daysToNext = Math.ceil((nextEvaluationDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const tabs = [
    { id: 'overview', name: 'Visão Geral', icon: Activity },
    { id: 'charts', name: 'Evolução', icon: TrendingUp },
    { id: 'fms', name: 'FMS & Funcional', icon: Layers },
    { id: 'anthropometric', name: 'Antropometria', icon: Ruler },
    { id: 'performance', name: 'Performance', icon: Zap },
    { id: 'posture', name: 'Postura', icon: Eye },
  ];

  const renderProgressBar = (value: number, max = 5, color = 'bg-blue-500') => (
    <div className="flex items-center gap-3 w-full">
      <div className="flex-1 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
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

  const printEvaluation = () => {
      window.print();
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-slate-50'} print:bg-white`}>
      {/* Header - Hidden on Print */}
      <div className={`sticky top-0 z-20 ${darkMode ? 'bg-slate-900/80 border-white/5' : 'bg-white/80 border-gray-100'} backdrop-blur-lg border-b print:hidden`}>
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
              <button 
                onClick={() => setComparisonMode(!comparisonMode)} 
                className={`p-3 rounded-xl flex items-center gap-2 font-bold transition-all ${comparisonMode ? 'bg-indigo-500 text-white' : (darkMode ? 'bg-slate-800 text-gray-300' : 'bg-white text-gray-700 border')}`}
              >
                <ArrowRightLeft className="w-5 h-5" /> <span className="hidden sm:inline">Comparar</span>
              </button>
              <button onClick={printEvaluation} className={`p-3 rounded-xl flex items-center gap-2 font-bold transition-all ${darkMode ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-white text-gray-700 hover:bg-gray-50 border'}`}>
                <FileDown className="w-5 h-5" /> <span className="hidden sm:inline">PDF</span>
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
      <div className="max-w-6xl mx-auto px-6 py-8 print:p-0 print:max-w-none">
        
        {/* Re-evaluation Alert */}
        {daysToNext < 15 && daysToNext > 0 && (
            <div className="mb-6 p-4 bg-amber-100 border border-amber-200 text-amber-800 rounded-xl flex items-center gap-3 print:hidden">
                <Calendar className="w-5 h-5" />
                <p className="font-bold">Protocolo de Reavaliação: A próxima avaliação está sugerida para daqui a {daysToNext} dias.</p>
            </div>
        )}

        {/* Overview Tab */}
        {tabs[currentTab].id === 'overview' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            {/* Info Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <InfoCard label="Peso" value={`${evaluation.weight} kg`} icon={Weight} color={{ bg: 'bg-blue-100', text: 'text-blue-600' }} />
              <InfoCard label="IMC" value={evaluation.bmi} icon={Activity} color={{ bg: 'bg-purple-100', text: 'text-purple-600' }} />
              <InfoCard label="FMS Score" value={Object.values(evaluation.fms || {}).reduce((a:any,b:any)=>a+b, 0) + '/21'} icon={Layers} color={{ bg: 'bg-indigo-100', text: 'text-indigo-600' }} />
              <InfoCard label="Massa Muscular" value={`${evaluation.muscleMass} kg`} icon={Zap} color={{ bg: 'bg-red-100', text: 'text-red-600' }} />
            </div>

            {/* Middle Row: Conclusion & Progress (Side by Side) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                    <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        <Brain className="w-5 h-5 text-purple-500" /> Conclusão
                    </h3>
                    <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{evaluation.treatmentPlan || 'Sem plano definido.'}</p>
                </div>
                
                <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                    <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Progresso Recente</h3>
                    <SimpleChart data={historyData.weight} label="Evolução Peso (kg)" color="#10b981" />
                </div>
            </div>

            {/* Bottom Row: Postural Summary (Full Width) */}
            <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    <Eye className="w-5 h-5 text-primary-500" /> Resumo Postural & Registros Anatômicos
                </h3>
                <div className="w-full">
                    <AnatomicalDiagram 
                        markers={evaluation.anatomicalMarkers || []}
                        readOnly={true}
                        darkMode={darkMode}
                    />
                </div>
            </div>
          </div>
        )}

        {/* Charts Tab */}
        {tabs[currentTab].id === 'charts' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
                <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100'}`}>
                    <SimpleChart data={historyData.weight} label="Peso (kg)" color="#3b82f6" />
                </div>
                <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100'}`}>
                    <SimpleChart data={historyData.strength} label="Força Core (0-5)" color="#ef4444" />
                </div>
                <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100'}`}>
                    <SimpleChart data={historyData.flexibility} label="Flexibilidade Tornozelo (°)" color="#f59e0b" />
                </div>
            </div>
        )}

        {/* FMS Tab */}
        {tabs[currentTab].id === 'fms' && (
            <div className="space-y-6 animate-in fade-in">
                <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100'}`}>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold">Functional Movement Screen (FMS)</h3>
                        <span className="text-2xl font-black text-indigo-600">{Object.values(evaluation.fms || {}).reduce((a:any,b:any)=>a+b, 0)}/21</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                        {Object.entries(evaluation.fms || {}).map(([key, val]) => (
                            <div key={key}>
                                <div className="flex justify-between mb-2 text-sm font-medium text-gray-500">
                                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                </div>
                                {renderProgressBar(val as number, 3, 'bg-indigo-500')}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* Comparison Mode Overlay */}
        {comparisonMode && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in">
                <div className={`w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold">Comparativo de Avaliações</h2>
                        <button onClick={() => setComparisonMode(false)} className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-300">Fechar</button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-8">
                        {/* Labels */}
                        <div className="space-y-6 pt-14 text-gray-500 font-medium">
                            <p className="h-8 border-b">Peso</p>
                            <p className="h-8 border-b">IMC</p>
                            <p className="h-8 border-b">Gordura Corporal</p>
                            <p className="h-8 border-b">Força Core</p>
                            <p className="h-8 border-b">Flexibilidade Coluna</p>
                            <p className="h-8 border-b">FMS Score</p>
                        </div>

                        {/* Previous Eval (Mock) */}
                        <div className="space-y-6 text-center opacity-60">
                            <h3 className="font-bold text-lg mb-4">Anterior (20/09/24)</h3>
                            <p className="h-8 border-b font-bold">68.0 kg</p>
                            <p className="h-8 border-b font-bold">24.1</p>
                            <p className="h-8 border-b font-bold">24%</p>
                            <p className="h-8 border-b font-bold">2/5</p>
                            <p className="h-8 border-b font-bold">30°</p>
                            <p className="h-8 border-b font-bold">14/21</p>
                        </div>

                        {/* Current Eval */}
                        <div className="space-y-6 text-center">
                            <h3 className="font-bold text-lg text-primary-600 mb-4">Atual ({new Date(evaluation.date).toLocaleDateString()})</h3>
                            <p className="h-8 border-b font-bold text-xl">{evaluation.weight} kg</p>
                            <p className="h-8 border-b font-bold text-xl">{evaluation.bmi}</p>
                            <p className="h-8 border-b font-bold text-xl">{evaluation.bodyFat}%</p>
                            <p className="h-8 border-b font-bold text-xl">{evaluation.strength.core}/5</p>
                            <p className="h-8 border-b font-bold text-xl">{evaluation.flexibility.spinalFlexion}°</p>
                            <p className="h-8 border-b font-bold text-xl">{Object.values(evaluation.fms || {}).reduce((a:any,b:any)=>a+b, 0)}/21</p>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Other tabs logic remains similar to original but updated UI */}
        {tabs[currentTab].id === 'anthropometric' && (
             <div className={`p-6 rounded-3xl border mt-6 ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100'}`}>
                <h3 className="font-bold mb-6">Medidas Corporais (cm)</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                   {Object.entries(evaluation.measurements).map(([key, val]) => (
                      <div key={key} className={`p-4 rounded-2xl text-center ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                         <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">{key}</p>
                         <p className="text-2xl font-bold">{val as number}</p>
                      </div>
                   ))}
                </div>
             </div>
        )}
      </div>
    </div>
  );
};

export default PhysicalEvaluationDetails;