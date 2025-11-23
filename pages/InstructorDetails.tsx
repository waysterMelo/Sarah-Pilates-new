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
  Download,
  Share2,
  Edit2,
  Clock,
  Award,
  Star,
  Users,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  XCircle
} from 'lucide-react';

interface InstructorDetailsProps {
  darkMode: boolean;
}

// Mock Data Structure
interface WorkingHours {
  start: string;
  end: string;
  available: boolean;
}

const InstructorDetails: React.FC<InstructorDetailsProps> = ({ darkMode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'financial'>('overview');

  // Mock Data
  const instructor = {
    id: id || '1',
    name: 'Sarah Costa Silva',
    email: 'sarah.costa@email.com',
    phone: '(11) 99999-9999',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    specialties: ['Pilates Solo', 'Reformer', 'Terapêutico'],
    status: 'Ativo' as const, // Type assertion
    hireDate: 'Jan 2020',
    hourlyRate: 85,
    rating: 4.9,
    bio: 'Apaixonada por movimento e reabilitação. Com 8 anos de experiência, foco em ajudar alunos a superarem limites com segurança e técnica precisa.',
    workingHours: {
        monday: { start: '08:00', end: '18:00', available: true },
        tuesday: { start: '08:00', end: '18:00', available: true },
        wednesday: { start: '08:00', end: '18:00', available: true },
        thursday: { start: '08:00', end: '18:00', available: true },
        friday: { start: '08:00', end: '16:00', available: true },
        saturday: { start: '08:00', end: '12:00', available: true },
        sunday: { start: '', end: '', available: false }
    }
  };

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: Activity },
    { id: 'schedule', label: 'Agenda & Horários', icon: Calendar },
    { id: 'financial', label: 'Financeiro', icon: CreditCard },
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

  return (
    <main className={`min-h-screen relative p-6 transition-colors duration-500 ${
      darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-gray-900'
    }`}>
      
      {/* Header Navigation */}
      <div className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
        <button 
          onClick={() => navigate('/instructors')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            darkMode ? 'hover:bg-white/10 text-slate-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <div className="flex items-center gap-2">
          <button className={`p-2 rounded-xl border transition-colors ${
            darkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}>
            <Share2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => navigate(`/instructors/${id}/edit`, { state: { instructor } })}
            className="px-4 py-2 bg-primary-600 text-white text-sm font-bold rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-500/20 flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" />
            Editar
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Hero Profile Card */}
        <div className={`relative overflow-hidden rounded-3xl p-8 mb-8 border ${
          darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-100 shadow-lg'
        }`}>
          <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3 pointer-events-none ${
            darkMode ? 'bg-purple-500' : 'bg-purple-400'
          }`} />

          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="relative">
              <img 
                src={instructor.avatar} 
                alt={instructor.name} 
                className="w-32 h-32 rounded-3xl object-cover shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-slate-900 text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg">
                <Star className="w-3 h-3 fill-black" /> {instructor.rating}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                 <h1 className="text-3xl font-bold">{instructor.name}</h1>
                 <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 uppercase">
                    {instructor.status}
                 </span>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm opacity-70 mb-4">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4" /> {instructor.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4" /> {instructor.phone}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {instructor.specialties.map((spec, i) => (
                    <span key={i} className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                    darkMode ? 'bg-purple-500/10 border-purple-500/20 text-purple-300' : 'bg-purple-50 border-purple-100 text-purple-600'
                    }`}>
                    {spec}
                    </span>
                ))}
              </div>
            </div>
            
            <div className={`grid grid-cols-2 gap-4 p-4 rounded-2xl border min-w-[200px] ${
               darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'
            }`}>
              <div>
                <div className="text-xs opacity-50 uppercase tracking-wider">Valor Hora</div>
                <div className="text-lg font-bold text-emerald-500">R$ {instructor.hourlyRate}</div>
              </div>
              <div>
                <div className="text-xs opacity-50 uppercase tracking-wider">Início</div>
                <div className="text-sm font-bold mt-1">{instructor.hireDate}</div>
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
              <div className={`col-span-2 p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-100'}`}>
                 <h3 className="font-bold text-lg mb-4">Bio Profissional</h3>
                 <p className="opacity-70 leading-relaxed">{instructor.bio}</p>

                 <h3 className="font-bold text-lg mt-8 mb-4">Métricas do Mês</h3>
                 <div className="grid grid-cols-3 gap-4">
                    <div className={`p-4 rounded-2xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-2 mb-2 opacity-60 text-xs font-bold uppercase">
                            <Calendar className="w-4 h-4" /> Aulas
                        </div>
                        <div className="text-2xl font-bold">42</div>
                    </div>
                    <div className={`p-4 rounded-2xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-2 mb-2 opacity-60 text-xs font-bold uppercase">
                            <Users className="w-4 h-4" /> Alunos
                        </div>
                        <div className="text-2xl font-bold">28</div>
                    </div>
                    <div className={`p-4 rounded-2xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-2 mb-2 opacity-60 text-xs font-bold uppercase">
                            <TrendingUp className="w-4 h-4" /> Retenção
                        </div>
                        <div className="text-2xl font-bold text-emerald-500">98%</div>
                    </div>
                 </div>
              </div>

              <div className="space-y-6">
                 <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-100'}`}>
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-yellow-500" /> Certificações
                    </h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-3">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> PMA Certified Pilates Teacher
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Especialização em Patologias
                        </li>
                    </ul>
                 </div>
              </div>
            </div>
          )}

          {/* SCHEDULE TAB */}
          {activeTab === 'schedule' && (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {daysOfWeek.map(({ key, label, short }) => {
                    const dayData = instructor.workingHours[key as keyof typeof instructor.workingHours];
                    return (
                        <div key={key} className={`p-5 rounded-2xl border transition-all ${
                            dayData.available 
                            ? (darkMode ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-emerald-50 border-emerald-100')
                            : (darkMode ? 'bg-white/5 border-white/5 opacity-50' : 'bg-gray-50 border-gray-100 opacity-60')
                        }`}>
                            <div className="flex items-center justify-between mb-3">
                                <span className="font-bold">{label}</span>
                                {dayData.available ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                ) : (
                                    <XCircle className="w-4 h-4 text-slate-400" />
                                )}
                            </div>
                            {dayData.available ? (
                                <div className="text-sm font-mono bg-white/10 px-2 py-1 rounded inline-block">
                                    {dayData.start} - {dayData.end}
                                </div>
                            ) : (
                                <div className="text-xs font-medium italic opacity-60">Indisponível</div>
                            )}
                        </div>
                    )
                })}
             </div>
          )}

          {/* FINANCIAL TAB */}
          {activeTab === 'financial' && (
             <div className={`flex flex-col items-center justify-center py-20 rounded-3xl border border-dashed ${
                darkMode ? 'border-white/10' : 'border-gray-300'
             }`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                   darkMode ? 'bg-white/5' : 'bg-gray-100'
                }`}>
                   <CreditCard className="w-8 h-8 opacity-30" />
                </div>
                <h3 className="text-lg font-bold mb-1">Dados protegidos</h3>
                <p className="text-sm opacity-50">O módulo financeiro requer permissões de administrador.</p>
             </div>
          )}

        </div>
      </div>
    </main>
  );
};

export default InstructorDetails;