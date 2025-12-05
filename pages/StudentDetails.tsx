import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../src/services/api';
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  Cake,
  Camera,
  Clock,
  Download,
  Edit2,
  File as FileIcon,
  FileText,
  Mail,
  MapPin,
  Phone, Shield, Trash2
} from "lucide-react";

import { useTheme } from '../src/contexts/ThemeContext';

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const weekday = date.toLocaleDateString('pt-BR', { weekday: 'short', timeZone: 'UTC' }).slice(0, 3);
    return { day, weekday: weekday.charAt(0).toUpperCase() + weekday.slice(1) };
};

const StudentDetails: React.FC = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'medical' | 'photos' | 'documents'>('overview');
  const [student, setStudent] = useState<any>(null);
  const [nextClass, setNextClass] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingNextClass, setLoadingNextClass] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentAndNextClass = async () => {
      if (!id) return;

      setLoading(true);
      setLoadingNextClass(true);

      try {
        // Fetch student details
        const studentResponse = await api.get(`/api/students/${id}`);
        console.log('Dados do aluno recebidos da API:', studentResponse.data);
        setStudent(studentResponse.data);

        // Fetch next class
        try {
          const nextClassResponse = await api.get(`/api/students/${id}/next-class`);
          if (nextClassResponse.status === 204) {
            setNextClass(null);
          } else {
            setNextClass(nextClassResponse.data);
          }
        } catch (classErr) {
          console.log('Erro ao buscar próxima aula:', classErr);
          setNextClass(null);
        }

      } catch (err) {
        console.error("Failed to fetch student details", err);
        setError("Não foi possível carregar os detalhes do aluno.");
      } finally {
        setLoading(false);
        setLoadingNextClass(false);
      }
    };
    
    fetchStudentAndNextClass();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p>Carregando...</p></div>;
  }

  if (error || !student) {
    return <div className="flex justify-center items-center h-screen"><p className="text-red-500">{error || "Aluno não encontrado."}</p></div>;
  }
  
  const isBirthdayMonth = new Date().getMonth() === new Date(student.birthDate).getMonth();

  const parqConditions = Object.entries({
    'Problema Cardíaco': student.anamnesis?.heartCondition,
    'Hipertensão Arterial': student.anamnesis?.hypertension,
    'Diabetes': student.anamnesis?.diabetes,
    'Problema Ósseo/Articular': student.anamnesis?.boneJointProblem,
    'Tonturas ou Desmaios': student.anamnesis?.dizziness,
  }).filter(([, value]) => value).map(([key]) => key);
  
  const getAvatarSrc = (student: any) => {
    const femaleAvatar = `https://avatar.iran.liara.run/public/girl?username=${student.name}`;
    const maleAvatar = `https://avatar.iran.liara.run/public/boy?username=${student.name}`;
    const defaultAvatar = 'https://avatar.iran.liara.run/public';

    if (student.sex === 'FEMININO') return femaleAvatar;
    if (student.sex === 'MASCULINO') return maleAvatar;

    // Fallback: Adivinhar pelo nome se o sexo não estiver definido
    const firstName = student.name.split(' ')[0].toLowerCase();
    if (firstName.endsWith('a') || firstName.endsWith('e') || firstName.endsWith('z')) {
      return femaleAvatar;
    }

    return maleAvatar; // Padrão masculino se a adivinhação falhar
  }

  const avatarSrc = getAvatarSrc(student);

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: Activity },
    { id: 'medical', label: 'Ficha Médica', icon: FileText },
    { id: 'photos', label: 'Fotos Progresso', icon: Camera },
    { id: 'documents', label: 'Documentos', icon: FileIcon },
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
          Voltar
        </button>

        <div className="flex items-center gap-2">
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
          <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3 pointer-events-none ${
            darkMode ? 'bg-primary-500' : 'bg-primary-400'
          }`} />

          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="relative">
              <img 
                src={avatarSrc} 
                alt={student.name} 
                className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-2xl"
              />
              {isBirthdayMonth && (
                  <div className="absolute -top-2 -right-2 bg-pink-500 text-white p-2 rounded-full shadow-lg animate-bounce" title="Aniversariante do Mês">
                      <Cake className="w-5 h-5" />
                  </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{student.name}</h1>
                {isBirthdayMonth && (
                    <span className="text-xs font-bold bg-pink-500/10 text-pink-500 border border-pink-500/20 px-2 py-1 rounded-lg">
                        🎉 Aniversariante
                    </span>
                )}
              </div>
              
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
                  ID: #{student.id.toString().padStart(4, '0')}
                </span>
                <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                  darkMode ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 'bg-purple-50 border-purple-100 text-purple-600'
                }`}>
                  {student.plan}
                </span>
                <span className={`px-3 py-1 rounded-lg text-xs font-medium border flex items-center gap-1 ${
                  student.status === 'Ativo' 
                    ? (darkMode ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-600')
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${student.status === 'Ativo' ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                  {student.status}
                </span>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Next Class Card */}
              <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-100'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    Próxima Aula
                  </h3>
                  {nextClass && (
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                        nextClass.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300' : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-300'
                    }`}>
                      {nextClass.status === 'CONFIRMED' ? 'Confirmado' : 'Pendente'}
                    </span>
                  )}
                </div>
                {loadingNextClass ? (
                    <div className="flex items-center justify-center h-24">
                        <p className="text-sm opacity-60">Carregando...</p>
                    </div>
                ) : nextClass ? (
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                       <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 font-bold">
                          <span className="text-xs uppercase">{formatDate(nextClass.date).weekday}</span>
                          <span className="text-lg">{formatDate(nextClass.date).day}</span>
                       </div>
                       <div>
                          <p className="font-bold text-lg">{nextClass.classType.name}</p>
                          <p className="text-sm opacity-60">
                            {nextClass.startTime.substring(0,5)} - {nextClass.endTime.substring(0,5)} • {nextClass.instructor.name}
                          </p>
                       </div>
                    </div>
                  </div>
                ) : (
                    <div className="flex items-center justify-center h-24">
                        <p className="text-sm opacity-60">Nenhuma aula futura agendada.</p>
                    </div>
                )}
              </div>
              
              {/* Emergency Contact Card */}
              <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-100'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold flex items-center gap-2">
                    <Shield className="w-5 h-5 text-amber-500" />
                    Contato de Emergência
                  </h3>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-bold">{student.emergencyContact || 'Não informado'}</p>
                    <p className="text-sm opacity-60">{student.emergencyPhone || 'Não informado'}</p>
                  </div>
                </div>
              </div>

              {/* Medical Alert Card */}
              <div className={`lg:col-span-1 md:col-span-2 p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-100'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    Pontos de Atenção
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <div className={`p-4 rounded-xl border-l-4 border-red-400 ${darkMode ? 'bg-red-500/5' : 'bg-red-50'}`}>
                        <p className="text-xs font-bold text-red-500 uppercase mb-1">Restrições</p>
                        <p className="text-sm">{student.anamnesis?.restrictions || 'Nenhuma'}</p>
                    </div>
                    <div className={`p-4 rounded-xl border-l-4 border-orange-400 ${darkMode ? 'bg-orange-500/5' : 'bg-orange-50'}`}>
                        <p className="text-xs font-bold text-orange-500 uppercase mb-1">Cirurgias</p>
                        <p className="text-sm">{student.anamnesis?.surgeries || 'Nenhuma'}</p>
                    </div>
                </div>
              </div>
            </div>
          )}

          {/* MEDICAL TAB */}
          {activeTab === 'medical' && (
              <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-100'}`}>
                  <h3 className="text-lg font-bold mb-6">Ficha Médica Completa</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <div>
                          <span className="text-xs font-bold uppercase opacity-50 block mb-1">Alergias</span>
                          <p className="text-base font-medium">{student.anamnesis?.allergies || 'Nenhuma'}</p>
                      </div>
                      <div>
                          <span className="text-xs font-bold uppercase opacity-50 block mb-1">Medicamentos em Uso</span>
                          <p className="text-base font-medium">{student.anamnesis?.medications || 'Nenhuma'}</p>
                      </div>
                      <div>
                          <span className="text-xs font-bold uppercase opacity-50 block mb-1">Histórico Cirúrgico</span>
                          <p className="text-base font-medium">{student.anamnesis?.surgeries || 'Nenhuma'}</p>
                      </div>
                      <div className="md:col-span-2">
                          <span className="text-xs font-bold uppercase opacity-50 block mb-1">Objetivos com o Pilates</span>
                          <p className="text-base font-medium">{student.anamnesis?.objectives || 'Não informado'}</p>
                      </div>
                      <div>
                          <span className="text-xs font-bold uppercase opacity-50 block mb-1">Patologias / Condições (PAR-Q)</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                              {parqConditions.length > 0 ? (
                                parqConditions.map(cond => (
                                  <span key={cond} className={`px-3 py-1 rounded-full text-sm font-medium border ${darkMode ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-red-50 border-red-100 text-red-600'}`}>
                                      {cond}
                                  </span>
                                ))
                              ) : (
                                <p className="text-sm opacity-70">Nenhuma condição pré-existente informada.</p>
                              )}
                          </div>
                      </div>
                  </div>
              </div>
          )}

          {/* PHOTOS TAB */}
          {activeTab === 'photos' && (
              <div className="space-y-8">
                  {student.progressPhotos.map((photo, index) => (
                      <div key={index} className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-100'}`}>
                          <div className="flex justify-between items-center mb-6">
                              <h3 className="text-lg font-bold">Comparativo: {photo.date}</h3>
                              <button className="text-sm text-primary-500 font-medium hover:underline">Ver tela cheia</button>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                              <div className="relative group">
                                  <span className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm font-bold backdrop-blur-sm">Antes</span>
                                  <img src={photo.urlBefore} alt="Antes" className="w-full h-64 object-cover rounded-2xl shadow-md transition-transform group-hover:scale-[1.02]" />
                              </div>
                              <div className="relative group">
                                  <span className="absolute top-4 left-4 bg-primary-600/80 text-white px-3 py-1 rounded-lg text-sm font-bold backdrop-blur-sm">Depois</span>
                                  <img src={photo.urlAfter} alt="Depois" className="w-full h-64 object-cover rounded-2xl shadow-md transition-transform group-hover:scale-[1.02]" />
                              </div>
                          </div>
                      </div>
                  ))}
                  <button className={`w-full py-4 border-2 border-dashed rounded-2xl flex items-center justify-center gap-2 font-bold transition-all ${
                      darkMode ? 'border-white/10 hover:bg-white/5 text-slate-400' : 'border-gray-300 hover:bg-gray-50 text-gray-500'
                  }`}>
                      <Camera className="w-5 h-5" /> Adicionar Nova Comparação
                  </button>
              </div>
          )}

          {/* DOCUMENTS TAB */}
          {activeTab === 'documents' && (
              <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-100'}`}>
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold">Arquivos e Contratos</h3>
                      <button className="px-4 py-2 bg-primary-600 text-white text-sm font-bold rounded-xl hover:bg-primary-700 flex items-center gap-2">
                          <Download className="w-4 h-4" /> Upload
                      </button>
                  </div>
                  <div className="space-y-3">
                      {student.documents.map((doc, i) => (
                          <div key={i} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                              darkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-gray-50 border-gray-100 hover:bg-gray-100'
                          }`}>
                              <div className="flex items-center gap-4">
                                  <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                                      <FileText className="w-6 h-6" />
                                  </div>
                                  <div>
                                      <p className="font-bold text-sm">{doc.name}</p>
                                      <p className="text-xs opacity-60">Adicionado em {doc.date}</p>
                                  </div>
                              </div>
                              <div className="flex gap-2">
                                  <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-200'}`} title="Baixar">
                                      <Download className="w-4 h-4" />
                                  </button>
                                  <button className={`p-2 rounded-lg text-red-500 ${darkMode ? 'hover:bg-red-500/10' : 'hover:bg-red-50'}`} title="Excluir">
                                      <Trash2 className="w-4 h-4" />
                                  </button>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          )}

        </div>
      </div>
    </main>
  );
};

export default StudentDetails;