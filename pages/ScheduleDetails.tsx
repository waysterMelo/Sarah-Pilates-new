import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  User, 
  GraduationCap, 
  Calendar, 
  Clock, 
  MapPin, 
  FileText,
  DollarSign,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Package,
  Phone,
  Mail,
  Award,
  Target,
  TrendingUp,
  Activity,
  Sparkles,
  Star,
  History,
  Share2,
  Copy,
  MessageSquare,
  Settings
} from 'lucide-react';

import { useTheme } from '../src/contexts/ThemeContext';

interface Schedule {
  id: number;
  studentId: number;
  studentName: string;
  instructorId: number;
  instructorName: string;
  date: string;
  startTime: string;
  endTime: string;
  type: string;
  status: 'Agendado' | 'Confirmado' | 'Concluído' | 'Cancelado' | 'Falta';
  notes: string;
  room: string;
  equipment: string[];
  price: number;
  paymentStatus: 'Pendente' | 'Pago' | 'Isento';
  createdAt: string;
}

interface ScheduleDetailsProps {
  schedule: Schedule;
  onEdit: () => void;
  onClose: () => void;
  onStatusChange: (scheduleId: number, newStatus: Schedule['status']) => void;
}

const ScheduleDetails: React.FC<ScheduleDetailsProps> = ({ schedule, onEdit, onClose, onStatusChange }) => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showActions, setShowActions] = useState(false);

  // Função para calcular duração
  const calculateDuration = (startTime: string, endTime: string): number => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
    
    return endTotalMinutes - startTotalMinutes;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Agendado': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Confirmado': return 'bg-green-100 text-green-700 border-green-200';
      case 'Concluído': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Cancelado': return 'bg-red-100 text-red-700 border-red-200';
      case 'Falta': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusGradient = (status: string) => {
    switch (status) {
      case 'Agendado': return 'from-blue-500 to-blue-600';
      case 'Confirmado': return 'from-green-500 to-green-600';
      case 'Concluído': return 'from-purple-500 to-purple-600';
      case 'Cancelado': return 'from-red-500 to-red-600';
      case 'Falta': return 'from-orange-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Pago': return 'bg-green-100 text-green-700 border-green-200';
      case 'Pendente': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Isento': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleString('pt-BR');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Agendado': return <Clock className="w-5 h-5" />;
      case 'Confirmado': return <CheckCircle2 className="w-5 h-5" />;
      case 'Concluído': return <CheckCircle2 className="w-5 h-5" />;
      case 'Cancelado': return <XCircle className="w-5 h-5" />;
      case 'Falta': return <AlertCircle className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: Activity },
    { id: 'people', label: 'Pessoas', icon: User },
    { id: 'financial', label: 'Financeiro', icon: DollarSign },
    { id: 'history', label: 'Histórico', icon: History }
  ];

  const quickActions = [
    {
      label: 'Confirmar',
      action: () => onStatusChange(schedule.id, 'Confirmado'),
      color: 'from-green-500 to-emerald-600',
      icon: CheckCircle2,
      disabled: schedule.status === 'Confirmado'
    },
    {
      label: 'Concluir',
      action: () => onStatusChange(schedule.id, 'Concluído'),
      color: 'from-purple-500 to-purple-600',
      icon: Award,
      disabled: schedule.status === 'Concluído'
    },
    {
      label: 'Marcar Falta',
      action: () => onStatusChange(schedule.id, 'Falta'),
      color: 'from-orange-500 to-orange-600',
      icon: AlertCircle,
      disabled: schedule.status === 'Falta'
    },
    {
      label: 'Cancelar',
      action: () => onStatusChange(schedule.id, 'Cancelado'),
      color: 'from-red-500 to-red-600',
      icon: XCircle,
      disabled: schedule.status === 'Cancelado'
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-gradient-to-br from-slate-50 to-blue-50'}`}>
      {/* Header Moderno */}
      <div className={`shadow-lg ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Detalhes da Aula
                </h1>
                <p className={`mt-1 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>#{schedule.id} • {schedule.type}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowActions(!showActions)}
                className={`relative px-4 py-3 rounded-xl font-medium transition-all duration-300 ${darkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <Settings className="w-5 h-5" />
              </button>
              
              <button
                onClick={onEdit}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <Edit className="w-5 h-5" />
                Editar Aula
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Card Principal da Aula */}
        <div className={`rounded-2xl shadow-lg border overflow-hidden mb-8 ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100'}`}>
          <div className={`bg-gradient-to-r ${getStatusGradient(schedule.status)} p-8`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center text-white">
                    <div className="text-2xl font-bold">{schedule.startTime}</div>
                    <div className="text-sm opacity-75">{calculateDuration(schedule.startTime, schedule.endTime)}min</div>
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{schedule.type}</h2>
                  <p className="text-white/80 text-lg">
                    {formatDate(schedule.date)} • {schedule.startTime} - {schedule.endTime}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-white text-sm font-medium">
                      {getStatusIcon(schedule.status)}
                      {schedule.status}
                    </span>
                    <span className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-white text-sm font-medium">
                      <MapPin className="w-4 h-4" />
                      {schedule.room}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right text-white">
                <div className="text-4xl font-bold mb-2">R$ {schedule.price}</div>
                <span className={`px-4 py-2 rounded-full text-sm font-medium border bg-white/20 text-white border-white/30`}>
                  {schedule.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Ações Rápidas */}
          <div className={`p-6 border-t ${darkMode ? 'bg-slate-800/50 border-white/5' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex flex-wrap gap-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  disabled={action.disabled}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                    action.disabled 
                      ? (darkMode ? 'bg-slate-800 text-slate-500' : 'bg-gray-100 text-gray-400')
                      : `bg-gradient-to-r ${action.color} text-white shadow-md`
                  }`}
                >
                  <action.icon className="w-4 h-4" />
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navegação por Tabs */}
        <div className={`rounded-2xl shadow-lg border mb-8 ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100'}`}>
          <div className={`border-b ${darkMode ? 'border-white/5' : 'border-gray-100'}`}>
            <div className="flex items-center overflow-x-auto">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300 relative whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-blue-600 bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400'
                        : (darkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50')
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conteúdo das Tabs */}
          <div className="p-8">
            {/* Tab: Visão Geral */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Cards de Informações Principais */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-blue-500/5 border-blue-500/20' : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className={`font-bold ${darkMode ? 'text-blue-400' : 'text-blue-800'}`}>Data & Horário</h3>
                        <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Agendamento confirmado</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-blue-800'}`}>
                        {new Date(schedule.date).toLocaleDateString('pt-BR')}
                      </div>
                      <div className={`flex items-center gap-2 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                        <Clock className="w-4 h-4" />
                        <span>{schedule.startTime} - {schedule.endTime} ({calculateDuration(schedule.startTime, schedule.endTime)}min)</span>
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-green-500/5 border-green-500/20' : 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className={`font-bold ${darkMode ? 'text-green-400' : 'text-green-800'}`}>Local & Tipo</h3>
                        <p className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-600'}`}>Ambiente reservado</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-green-800'}`}>{schedule.room}</div>
                      <div className={`${darkMode ? 'text-green-300' : 'text-green-600'}`}>{schedule.type}</div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-purple-500/5 border-purple-500/20' : 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className={`font-bold ${darkMode ? 'text-purple-400' : 'text-purple-800'}`}>Valor & Status</h3>
                        <p className={`text-sm ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>Informações financeiras</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-purple-800'}`}>R$ {schedule.price}</div>
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getPaymentStatusColor(schedule.paymentStatus)}`}>
                        {schedule.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Equipamentos */}
                {schedule.equipment.length > 0 && (
                  <div className={`rounded-2xl shadow-lg border p-6 ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100'}`}>
                    <h3 className={`text-xl font-bold mb-4 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center">
                        <Package className="w-5 h-5 text-orange-600" />
                      </div>
                      Equipamentos Necessários
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {schedule.equipment.map((equipment, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-2 px-4 py-3 rounded-2xl border hover:shadow-md transition-all ${darkMode ? 'bg-blue-500/10 border-blue-500/20 text-blue-300' : 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200'}`}
                        >
                          <Package className="w-4 h-4" />
                          <span className="font-medium">{equipment}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Observações */}
                {schedule.notes && (
                  <div className={`rounded-2xl shadow-lg border p-6 ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100'}`}>
                    <h3 className={`text-xl font-bold mb-4 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      <div className="w-10 h-10 bg-yellow-100 rounded-2xl flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-yellow-600" />
                      </div>
                      Observações da Aula
                    </h3>
                    <div className={`border rounded-2xl p-6 ${darkMode ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'}`}>
                      <p className={`leading-relaxed text-lg ${darkMode ? 'text-slate-300' : 'text-gray-800'}`}>{schedule.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab: Pessoas */}
            {activeTab === 'people' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Detalhes do Aluno */}
                <div className={`rounded-2xl shadow-lg border p-8 ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100'}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {schedule.studentName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{schedule.studentName}</h3>
                      <div className={`flex items-center gap-2 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                        <User className="w-4 h-4" />
                        <span>Aluno ID: {schedule.studentId}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className={`p-4 rounded-xl ${darkMode ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                      <div className="flex items-center gap-2 text-blue-600 mb-2">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm font-medium">Email</span>
                      </div>
                      <p className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>ana.silva@email.com</p>
                    </div>
                    <div className={`p-4 rounded-xl ${darkMode ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                      <div className="flex items-center gap-2 text-blue-600 mb-2">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm font-medium">Telefone</span>
                      </div>
                      <p className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>(11) 99999-9999</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => navigate(`/students/${schedule.studentId}`)}
                    className="w-full mt-6 p-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Ver Perfil Completo
                  </button>
                </div>

                {/* Detalhes do Instrutor */}
                <div className={`rounded-2xl shadow-lg border p-8 ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100'}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {schedule.instructorName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{schedule.instructorName}</h3>
                      <div className={`flex items-center gap-2 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                        <GraduationCap className="w-4 h-4" />
                        <span>Instrutor ID: {schedule.instructorId}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className={`p-4 rounded-xl ${darkMode ? 'bg-purple-500/10' : 'bg-purple-50'}`}>
                      <div className="flex items-center gap-2 text-purple-600 mb-2">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm font-medium">Email</span>
                      </div>
                      <p className={`font-semibold ${darkMode ? 'text-purple-300' : 'text-purple-800'}`}>sarah.costa@email.com</p>
                    </div>
                    <div className={`p-4 rounded-xl ${darkMode ? 'bg-purple-500/10' : 'bg-purple-50'}`}>
                      <div className="flex items-center gap-2 text-purple-600 mb-2">
                        <Award className="w-4 h-4" />
                        <span className="text-sm font-medium">Especialidade</span>
                      </div>
                      <p className={`font-semibold ${darkMode ? 'text-purple-300' : 'text-purple-800'}`}>Pilates Terapêutico</p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/instructors/${schedule.instructorId}`)}
                    className="w-full mt-6 p-3 bg-purple-500 text-white rounded-xl font-medium hover:bg-purple-600 transition-all flex items-center justify-center gap-2"
                  >
                    <GraduationCap className="w-4 h-4" />
                    Ver Perfil Completo
                  </button>
                </div>
              </div>
            )}

            {/* Tab: Financeiro */}
            {activeTab === 'financial' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-green-500/5 border-green-500/20' : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'}`}>
                    <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-3">
                      <DollarSign className="w-6 h-6 text-green-600" />
                      Informações de Pagamento
                    </h3>
                    
                    <div className="space-y-4">
                      <div className={`flex justify-between items-center p-4 rounded-xl ${darkMode ? 'bg-slate-800/50' : 'bg-white/50'}`}>
                        <span className="text-green-700 font-medium">Valor da Aula</span>
                        <span className="text-2xl font-bold text-green-800">R$ {schedule.price}</span>
                      </div>
                      
                      <div className={`flex justify-between items-center p-4 rounded-xl ${darkMode ? 'bg-slate-800/50' : 'bg-white/50'}`}>
                        <span className="text-green-700 font-medium">Status</span>
                        <span className={`px-3 py-2 rounded-full text-sm font-medium border ${getPaymentStatusColor(schedule.paymentStatus)}`}>
                          {schedule.paymentStatus}
                        </span>
                      </div>
                      
                      <div className={`flex justify-between items-center p-4 rounded-xl ${darkMode ? 'bg-slate-800/50' : 'bg-white/50'}`}>
                        <span className="text-green-700 font-medium">Forma de Pagamento</span>
                        <span className="text-green-800 font-medium">PIX/Cartão</span>
                      </div>
                    </div>
                  </div>

                  <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-blue-500/5 border-blue-500/20' : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'}`}>
                    <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-3">
                      <Activity className="w-6 h-6 text-blue-600" />
                      Estatísticas
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-800">#{schedule.id}</div>
                        <div className="text-blue-600 text-sm">Número da Aula</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-800">{calculateDuration(schedule.startTime, schedule.endTime)}min</div>
                        <div className="text-blue-600 text-sm">Duração</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-800">
                          {new Date(schedule.createdAt).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="text-blue-600 text-sm">Criado em</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Histórico */}
            {activeTab === 'history' && (
              <div className="space-y-6">
                <h3 className={`text-xl font-bold flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  <History className="w-6 h-6 text-gray-600" />
                  Histórico de Alterações
                </h3>
                
                <div className="space-y-4">
                  <div className={`flex items-center gap-4 p-6 rounded-2xl border ${darkMode ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'}`}>
                    <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-bold text-lg ${darkMode ? 'text-blue-400' : 'text-blue-800'}`}>Agendamento Criado</p>
                      <p className={darkMode ? 'text-blue-300' : 'text-blue-600'}>{formatDateTime(schedule.createdAt)}</p>
                    </div>
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  </div>
                  
                  {schedule.status !== 'Agendado' && (
                    <div className={`flex items-center gap-4 p-6 rounded-2xl border ${
                      schedule.status === 'Confirmado' ? (darkMode ? 'bg-green-500/10 border-green-500/20' : 'bg-green-50 border-green-200') :
                      schedule.status === 'Concluído' ? (darkMode ? 'bg-purple-500/10 border-purple-500/20' : 'bg-purple-50 border-purple-200') :
                      schedule.status === 'Cancelado' ? (darkMode ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-200') :
                      (darkMode ? 'bg-orange-500/10 border-orange-500/20' : 'bg-orange-50 border-orange-200')
                    }`}>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        schedule.status === 'Confirmado' ? 'bg-green-500' :
                        schedule.status === 'Concluído' ? 'bg-purple-500' :
                        schedule.status === 'Cancelado' ? 'bg-red-500' :
                        'bg-orange-500'
                      }`}>
                        {getStatusIcon(schedule.status)}
                      </div>
                      <div className="flex-1">
                        <p className={`font-bold text-lg ${
                          schedule.status === 'Confirmado' ? (darkMode ? 'text-green-400' : 'text-green-800') :
                          schedule.status === 'Concluído' ? (darkMode ? 'text-purple-400' : 'text-purple-800') :
                          schedule.status === 'Cancelado' ? (darkMode ? 'text-red-400' : 'text-red-800') :
                          (darkMode ? 'text-orange-400' : 'text-orange-800')
                        }`}>
                          Status alterado para {schedule.status}
                        </p>
                        <p className={`${
                          schedule.status === 'Confirmado' ? (darkMode ? 'text-green-300' : 'text-green-600') :
                          schedule.status === 'Concluído' ? (darkMode ? 'text-purple-300' : 'text-purple-600') :
                          schedule.status === 'Cancelado' ? (darkMode ? 'text-red-300' : 'text-red-600') :
                          (darkMode ? 'text-orange-300' : 'text-orange-600')
                        }`}>
                          Hoje às {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <div className={`w-4 h-4 rounded-full ${
                        schedule.status === 'Confirmado' ? 'bg-green-500' :
                        schedule.status === 'Concluído' ? 'bg-purple-500' :
                        schedule.status === 'Cancelado' ? 'bg-red-500' :
                        'bg-orange-500'
                      }`}></div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetails;