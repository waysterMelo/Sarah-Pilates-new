import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  FileText,
  Activity,
  MapPin,
  Mail,
  Phone,
  MoreHorizontal,
  Download,
  Share2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Clock
} from 'lucide-react';

interface StudentDetailsProps {
  darkMode: boolean;
}

const StudentDetails: React.FC<StudentDetailsProps> = ({ darkMode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'financial' | 'medical'>('overview');

  // Mock fetch based on ID (Hardcoded for demo)
  const student = {
    id: id || '1',
    name: 'Isabella Costa',
    email: 'isa.costa@email.com',
    phone: '(11) 99876-5432',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    plan: 'Platinum Membership',
    status: 'Active' as const, // Type assertion for strict typing if needed
    joinDate: '12 Jan, 2023',
    age: 28,
    height: '1.68m',
    weight: '62kg',
    objective: 'Fortalecimento Core & Flexibilidade',
    address: 'Rua Oscar Freire, 1234 - Jardins, SP',
    notes: 'Aluno prefere aulas pela manhã. Sensibilidade no joelho esquerdo.',
  };

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: Activity },
    { id: 'history', label: 'Histórico de Aulas', icon: Calendar },
    { id: 'financial', label: 'Financeiro', icon: CreditCard },
    { id: 'medical', label: 'Ficha Médica', icon: FileText },
  ];

  return (
    <main className={`min-h-screen relative p-6 transition-colors duration-500 ${
      darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-gray-900'
    }`}>
      
      {/* Header Navigation */}
      <div className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
        <button 
          onClick={() => navigate('/students')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            darkMode ? 'hover:bg-white/10 text-slate-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para lista
        </button>

        <div className="flex items-center gap-2">
          <button className={`p-2 rounded-xl border transition-colors ${
            darkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}>
            <Share2 className="w-4 h-4" />
          </button>
          <button className={`p-2 rounded-xl border transition-colors ${
            darkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}>
            <Download className="w-4 h-4" />
          </button>
          <button 
            onClick={() => navigate(`/students/${id}/edit`, { state: { student } })}
            className="px-4 py-2 bg-primary-600 text-white text-sm font-bold rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-500/20 flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" />
            Editar Perfil
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Hero Profile Card */}
        <div className={`relative overflow-hidden rounded-3xl p-8 mb-8 border ${
          darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-100 shadow-lg'
        }`}>
          {/* Background Blur Effect */}
          <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3 pointer-events-none ${
            darkMode ? 'bg-primary-500' : 'bg-primary-400'
          }`} />

          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="relative">
              <img 
                src={student.avatar} 
                alt={student.name} 
                className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-2xl"
              />
              <div className="absolute bottom-0 right-0 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-lg border-2 border-white dark:border-slate-800">
                {student.status}
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{student.name}</h1>
              <div className="flex flex-wrap gap-4 text-sm opacity-70 mb-4">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4" /> {student.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4" /> {student.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> {student.address}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                  darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                }`}>
                  ID: #{student.id.padStart(4, '0')}
                </span>
                <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                  darkMode ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 'bg-purple-50 border-purple-100 text-purple-600'
                }`}>
                  {student.plan}
                </span>
                <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                  darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                }`}>
                  Desde {student.joinDate}
                </span>
              </div>
            </div>
            
            {/* Quick Bio Stats */}
            <div className={`grid grid-cols-2 gap-4 p-4 rounded-2xl border min-w-[200px] ${
               darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'
            }`}>
              <div>
                <div className="text-xs opacity-50 uppercase tracking-wider">Idade</div>
                <div className="text-lg font-bold">{student.age} anos</div>
              </div>
              <div>
                <div className="text-xs opacity-50 uppercase tracking-wider">Objetivo</div>
                <div className="text-xs font-bold truncate w-24">{student.objective}</div>
              </div>
              <div>
                <div className="text-xs opacity-50 uppercase tracking-wider">Altura</div>
                <div className="text-lg font-bold">{student.height}</div>
              </div>
              <div>
                <div className="text-xs opacity-50 uppercase tracking-wider">Peso</div>
                <div className="text-lg font-bold">{student.weight}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 hide-scrollbar border-b dark:border-white/10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-xl text-sm font-medium transition-all relative top-[1px] ${
                  isActive 
                    ? (darkMode ? 'text-primary-400 border-b-2 border-primary-400 bg-white/5' : 'text-primary-600 border-b-2 border-primary-600 bg-primary-50/50')
                    : 'opacity-60 hover:opacity-100 hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Next Class Card */}
              <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-100'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    Próxima Aula
                  </h3>
                  <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-600 rounded dark:bg-blue-500/20 dark:text-blue-300">Confirmado</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                     <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 font-bold">
                        <span className="text-xs uppercase">Sex</span>
                        <span className="text-lg">14</span>
                     </div>
                     <div>
                        <p className="font-bold text-lg">Reformer Pilates</p>
                        <p className="text-sm opacity-60">08:00 - 09:00 • Instrutora Ana</p>
                     </div>
                  </div>
                  <button className={`w-full py-2 rounded-xl font-medium text-sm border ${
                     darkMode ? 'border-white/10 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50'
                  }`}>
                    Gerenciar Agendamento
                  </button>
                </div>
              </div>

              {/* Notes Card */}
              <div className={`md:col-span-2 p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-100'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-orange-500" />
                    Observações Importantes
                  </h3>
                  <button className="text-xs text-primary-500 font-medium hover:underline">Adicionar nota</button>
                </div>
                <div className={`p-4 rounded-xl border-l-4 border-orange-400 ${darkMode ? 'bg-orange-500/5' : 'bg-orange-50'}`}>
                   <p className="text-sm italic">"{student.notes}"</p>
                   <div className="mt-2 text-xs opacity-60 text-right">- Atualizado por Dr. Marcos em 10/01/2024</div>
                </div>
              </div>

              {/* Stats Graph (Mock Visual) */}
              <div className={`col-span-1 md:col-span-3 p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-100'}`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg">Evolução de Frequência</h3>
                  <select className={`text-sm rounded-lg p-2 border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
                    <option>Últimos 6 meses</option>
                    <option>2023</option>
                  </select>
                </div>
                <div className="h-48 flex items-end justify-between gap-2 px-4">
                   {[65, 40, 75, 50, 85, 90, 70, 80, 95, 60, 85, 92].map((h, i) => (
                      <div key={i} className="w-full flex flex-col items-center gap-2 group">
                         <div 
                          className={`w-full rounded-t-lg transition-all duration-500 group-hover:opacity-80 ${
                             darkMode ? 'bg-primary-600' : 'bg-primary-400'
                          }`} 
                          style={{ height: `${h}%` }} 
                         />
                         <span className="text-xs opacity-50">M{i+1}</span>
                      </div>
                   ))}
                </div>
              </div>
            </div>
          )}

          {/* OTHER TABS PLACEHOLDERS */}
          {activeTab !== 'overview' && (
            <div className={`flex flex-col items-center justify-center py-20 rounded-3xl border border-dashed ${
               darkMode ? 'border-white/10' : 'border-gray-300'
            }`}>
               <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  darkMode ? 'bg-white/5' : 'bg-gray-100'
               }`}>
                  <MoreHorizontal className="w-8 h-8 opacity-30" />
               </div>
               <h3 className="text-lg font-bold mb-1">Conteúdo em desenvolvimento</h3>
               <p className="text-sm opacity-50">O módulo {tabs.find(t => t.id === activeTab)?.label} será implementado em breve.</p>
            </div>
          )}

        </div>
      </div>
    </main>
  );
};

export default StudentDetails;