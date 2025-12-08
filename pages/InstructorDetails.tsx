import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../src/services/api';
import {
  Activity,
  ArrowLeft,
  Award,
  Calendar,
  Clock,
  Edit2,
  Mail,
  MapPin,
  Phone,
  User
} from "lucide-react";

import { useTheme } from '../src/contexts/ThemeContext';

const InstructorDetails: React.FC = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'certifications'>('overview');
  const [instructor, setInstructor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstructor = async () => {
      if (!id) return;

      setLoading(true);

      try {
        const response = await api.get(`/api/instructors/${id}`);
        console.log('Dados do instrutor recebidos da API:', response.data);
        setInstructor(response.data);
      } catch (err) {
        console.error("Failed to fetch instructor details", err);
        setError("Não foi possível carregar os detalhes do instrutor.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchInstructor();
  }, [id]);

  if (loading) {
    return (
      <div className={`min-h-screen flex justify-center items-center ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-gray-900'}`}>
        <p>Carregando...</p>
      </div>
    );
  }

  if (error || !instructor) {
    return (
      <div className={`min-h-screen flex justify-center items-center ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-gray-900'}`}>
        <p className="text-red-500">{error || "Instrutor não encontrado."}</p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: Activity },
    { id: 'schedule', label: 'Horários de Trabalho', icon: Clock },
    { id: 'certifications', label: 'Certificações', icon: Award },
  ];

  const daysOfWeekMap: { [key: string]: string } = {
    'MONDAY': 'Segunda-feira',
    'TUESDAY': 'Terça-feira',
    'WEDNESDAY': 'Quarta-feira',
    'THURSDAY': 'Quinta-feira',
    'FRIDAY': 'Sexta-feira',
    'SATURDAY': 'Sábado',
    'SUNDAY': 'Domingo'
  };

  const getAvatarSrc = (instructor: any) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(instructor.name)}&background=random&color=fff`;
  };

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
          <button 
            onClick={() => navigate(`/instructors/${id}/edit`, { state: { instructor } })}
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
          <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3 pointer-events-none ${
            darkMode ? 'bg-primary-500' : 'bg-primary-400'
          }`} />

          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="relative">
              <img 
                src={getAvatarSrc(instructor)} 
                alt={instructor.name} 
                className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-2xl"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{instructor.name}</h1>
                <span className={`px-2 py-1 rounded-full text-xs font-bold border ${
                   instructor.status === 'ATIVO' || instructor.status === 'Ativo'
                   ? (darkMode ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-600')
                   : 'bg-gray-100 text-gray-500'
                }`}>
                   {instructor.status}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm opacity-70 mb-4">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4" /> {instructor.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4" /> {instructor.phone || 'N/A'}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> {instructor.address || 'Endereço não informado'}
                </span>
              </div>

               <div className="flex flex-wrap gap-2 mb-4">
                  {instructor.specialties?.map((spec: string, index: number) => (
                      <span key={index} className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                          darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                      }`}>
                          {spec}
                      </span>
                  ))}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-100'}`}>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" />
                  Bio
                </h3>
                <p className="text-sm leading-relaxed opacity-80">
                  {instructor.bio || "Nenhuma biografia informada."}
                </p>
                <div className="mt-4 pt-4 border-t dark:border-white/10">
                   <p className="text-xs font-bold uppercase opacity-50 mb-1">Experiência</p>
                   <p className="text-sm">{instructor.experience || "Não informada"}</p>
                </div>
              </div>

              <div className="space-y-6">
                 <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-100'}`}>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                       <Activity className="w-5 h-5 text-green-500" />
                       Dados Profissionais
                    </h3>
                    <div className="space-y-4">
                       <div className="flex justify-between items-center">
                          <span className="text-sm opacity-70">Valor Hora</span>
                          <span className="font-bold text-lg text-green-500">R$ {instructor.hourlyRate?.toFixed(2)}</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-sm opacity-70">Data de Contratação</span>
                          <span className="font-bold text-sm">
                             {instructor.hireDate ? new Date(instructor.hireDate).toLocaleDateString('pt-BR') : 'N/A'}
                          </span>
                       </div>
                    </div>
                 </div>

                 <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-100'}`}>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                       <Phone className="w-5 h-5 text-red-500" />
                       Contato de Emergência
                    </h3>
                    <div>
                       <p className="font-bold">{instructor.emergencyContact || 'Não informado'}</p>
                       <p className="text-sm opacity-70">{instructor.emergencyPhone || 'N/A'}</p>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* SCHEDULE TAB */}
          {activeTab === 'schedule' && (
             <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-100'}`}>
                <h3 className="text-lg font-bold mb-6">Horários de Disponibilidade</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                   {instructor.workingHours?.map((wh: any, index: number) => (
                      <div key={index} className={`p-4 rounded-xl border ${
                         darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                      }`}>
                         <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-primary-500" />
                            <span className="font-bold text-sm">{daysOfWeekMap[wh.dayOfWeek] || wh.dayOfWeek}</span>
                         </div>
                         <div className="pl-6">
                            <p className="text-lg font-mono font-medium">
                               {wh.startTime.substring(0, 5)} - {wh.endTime.substring(0, 5)}
                            </p>
                         </div>
                      </div>
                   ))}
                   {(!instructor.workingHours || instructor.workingHours.length === 0) && (
                      <p className="opacity-60 col-span-full">Nenhum horário cadastrado.</p>
                   )}
                </div>
             </div>
          )}

          {/* CERTIFICATIONS TAB */}
          {activeTab === 'certifications' && (
             <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-100'}`}>
                <h3 className="text-lg font-bold mb-6">Certificações e Qualificações</h3>
                <div className="space-y-4">
                   {instructor.certifications?.map((cert: string, index: number) => (
                      <div key={index} className={`flex items-center gap-4 p-4 rounded-xl border ${
                         darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-100'
                      }`}>
                         <div className={`p-2 rounded-lg ${darkMode ? 'bg-primary-500/20 text-primary-400' : 'bg-primary-50 text-primary-600'}`}>
                            <Award className="w-6 h-6" />
                         </div>
                         <span className="font-medium">{cert}</span>
                      </div>
                   ))}
                   {(!instructor.certifications || instructor.certifications.length === 0) && (
                      <p className="opacity-60">Nenhuma certificação cadastrada.</p>
                   )}
                </div>
             </div>
          )}

        </div>
      </div>
    </main>
  );
};

export default InstructorDetails;