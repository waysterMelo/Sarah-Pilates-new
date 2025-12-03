import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Edit,
  Eye,
  GraduationCap,
  MapPin,
  Plus,
  Search,
  Target,
  Trash2,
  User,
  XCircle
} from 'lucide-react';
import api from '../src/services/api';
import ScheduleForm from './ScheduleForm';
import ScheduleDetails from './ScheduleDetails';

import {useTheme} from '../src/contexts/ThemeContext';

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

interface CalendarDay {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  scheduleCount: number;
  revenue: number;
}

const ScheduleManagement: React.FC = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'timeline' | 'instructor'>('calendar');
  const [searchTerm, setSearchTerm] = useState('');
  const [showQuickActions, setShowQuickActions] = useState(false);
  
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedules = async (startDate: Date, endDate: Date) => {
    try {
      setLoading(true);
      const params = {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        // The backend seems to expect pagination, but for the calendar view, 
        // fetching all events for the month is often simpler.
        // Adjust if performance becomes an issue.
        size: 1000 // Fetch up to 1000 schedules for the given range
      };
      const response = await api.get('/api/schedules', { params });
      setSchedules(response.data.content);
    } catch (err) {
      console.error("Failed to fetch schedules", err);
      setError("Não foi possível carregar os agendamentos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    fetchSchedules(firstDayOfMonth, lastDayOfMonth);
  }, [currentMonth]);


  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [preselectedDate, setPreselectedDate] = useState<string>('');

  // FUNÇÃO CORRIGIDA para calcular duração
  const calculateDuration = (startTime: string, endTime: string): number => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
    
    return endTotalMinutes - startTotalMinutes;
  };

  // Funções de calendário
  const generateCalendarDays = (month: Date): CalendarDay[] => {
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days: CalendarDay[] = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const daySchedules = schedules.filter(s => s.date === dateStr);
      
      days.push({
        date: new Date(currentDate),
        day: currentDate.getDate(),
        isCurrentMonth: currentDate.getMonth() === month.getMonth(),
        isToday: isToday(currentDate),
        isSelected: isSameDay(currentDate, selectedDate),
        scheduleCount: daySchedules.length,
        revenue: daySchedules.filter(s => s.paymentStatus === 'Pago').reduce((acc, s) => acc + s.price, 0)
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.toDateString() === date2.toDateString();
  };

  const getSchedulesForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return schedules.filter(s => s.date === dateStr).sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatDateShort = (date: Date) => {
    return date.toLocaleDateString('pt-BR');
  };

  // Gerar horários para timeline
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 7; hour <= 20; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const getSchedulesForTimeSlot = (schedules: Schedule[], timeSlot: string) => {
    return schedules.filter(schedule => {
      const scheduleStart = schedule.startTime;
      const [slotHour, slotMinute] = timeSlot.split(':').map(Number);
      const [scheduleHour, scheduleMinute] = scheduleStart.split(':').map(Number);
      
      // Verifica se a aula começa dentro do slot de 30 minutos
      const slotStartMinutes = slotHour * 60 + slotMinute;
      const slotEndMinutes = slotStartMinutes + 30;
      const scheduleStartMinutes = scheduleHour * 60 + scheduleMinute;
      
      return scheduleStartMinutes >= slotStartMinutes && scheduleStartMinutes < slotEndMinutes;
    });
  };

  // Handlers CORRIGIDOS
  const handleAddSchedule = () => {
    setSelectedSchedule(null);
    setEditMode(false);
    setPreselectedDate('');
    setShowForm(true);
  };

  const handleAddScheduleForDate = (date: Date) => {
    setSelectedSchedule(null);
    setEditMode(false);
    setPreselectedDate(date.toISOString().split('T')[0]);
    setShowForm(true);
  };

  const handleAddScheduleForDateTime = (date: Date, time: string) => {
    setSelectedSchedule(null);
    setEditMode(false);
    setPreselectedDate(date.toISOString().split('T')[0]);
    // Criar um objeto temporário com data e hora pré-preenchidas
    setSelectedSchedule({
      id: 0,
      studentId: 0,
      studentName: '',
      instructorId: 0,
      instructorName: '',
      date: date.toISOString().split('T')[0],
      startTime: time,
      endTime: '',
      type: 'Pilates Solo',
      status: 'Agendado',
      notes: '',
      room: 'Sala 1',
      equipment: [],
      price: 80,
      paymentStatus: 'Pendente',
      createdAt: new Date().toISOString()
    });
    setShowForm(true);
  };

  const handleEditSchedule = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setEditMode(true);
    setShowForm(true);
    setActiveDropdown(null);
  };

  const handleViewSchedule = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setShowDetails(true);
    setActiveDropdown(null);
  };

  const handleDeleteSchedule = async (scheduleId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este agendamento?')) {
      try {
        await api.delete(`/api/schedules/${scheduleId}`);
        // Refetch schedules for the current month
        const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        fetchSchedules(firstDayOfMonth, lastDayOfMonth);
      } catch (err) {
        console.error("Failed to delete schedule", err);
        setError("Não foi possível excluir o agendamento.");
      }
    }
    setActiveDropdown(null);
  };

  const handleSaveSchedule = async (scheduleData: any) => {
    try {
      const payload = {
        ...scheduleData,
        // The form should provide these IDs. Assuming they are in scheduleData.
      };

      if (editMode && selectedSchedule) {
        await api.put(`/api/schedules/${selectedSchedule.id}`, payload);
      } else {
        await api.post('/api/schedules', payload);
      }
      setShowForm(false);
      setSelectedSchedule(null);
      // Refetch schedules for the current month
      const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
      const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
      fetchSchedules(firstDayOfMonth, lastDayOfMonth);
    } catch (err) {
      console.error("Failed to save schedule", err);
      setError("Não foi possível salvar o agendamento.");
      // Optionally, leave the form open and show an error message
    }
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Agendado': return <Clock className="w-4 h-4" />;
      case 'Confirmado': return <CheckCircle2 className="w-4 h-4" />;
      case 'Concluído': return <CheckCircle2 className="w-4 h-4" />;
      case 'Cancelado': return <XCircle className="w-4 h-4" />;
      case 'Falta': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Pago': return 'bg-green-100 text-green-700';
      case 'Pendente': return 'bg-yellow-100 text-yellow-700';
      case 'Isento': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getTodaySchedules = () => {
    const today = new Date().toISOString().split('T')[0];
    return schedules.filter(s => s.date === today);
  };

  // Filtrar agendamentos por busca
  const filteredSchedules = schedules.filter(schedule => {
    if (!searchTerm.trim()) return true;
    const search = searchTerm.toLowerCase();
    return (
      schedule.studentName.toLowerCase().includes(search) ||
      schedule.instructorName.toLowerCase().includes(search) ||
      schedule.type.toLowerCase().includes(search) ||
      schedule.room.toLowerCase().includes(search)
    );
  });

  if (showForm) {
    return (
      <ScheduleForm
        schedule={selectedSchedule}
        isEdit={editMode}
        onSave={handleSaveSchedule}
        onCancel={() => {
          setShowForm(false);
          setSelectedSchedule(null);
          setPreselectedDate('');
        }}
      />
    );
  }

  if (showDetails && selectedSchedule) {
    return (
      <ScheduleDetails
        schedule={selectedSchedule}
        onEdit={() => {
          setShowDetails(false);
          handleEditSchedule(selectedSchedule);
        }}
        onClose={() => setShowDetails(false)}
        onStatusChange={(scheduleId, newStatus) => {
          setSchedules(schedules.map(s => 
            s.id === scheduleId ? { ...s, status: newStatus } : s
          ));
        }}
      />
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-gradient-to-br from-slate-50 to-blue-50'}`}>

      {/* Header */}
      <div className={`shadow-lg ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Agenda Inteligente
                </h1>
                <p className={`mt-1 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Clique nas datas do calendário para ver os agendamentos</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Seletor de Visualização */}
              <div className={`flex items-center rounded-xl p-1 ${darkMode ? 'bg-slate-800' : 'bg-gray-100'}`}>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${viewMode === 'calendar' ? (darkMode ? 'bg-slate-700 text-white shadow' : 'bg-white text-blue-600 shadow') : (darkMode ? 'text-slate-400 hover:text-white' : 'text-gray-400 hover:text-gray-600')}`}
                  title="Calendário interativo"
                >
                  <Calendar className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm">Calendário</span>
                </button>
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${viewMode === 'timeline' ? (darkMode ? 'bg-slate-700 text-white shadow' : 'bg-white text-blue-600 shadow') : (darkMode ? 'text-slate-400 hover:text-white' : 'text-gray-400 hover:text-gray-600')}`}
                  title="Visualização por horários"
                >
                  <Clock className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm">Timeline</span>
                </button>
                <button
                  onClick={() => setViewMode('instructor')}
                  className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${viewMode === 'instructor' ? (darkMode ? 'bg-slate-700 text-white shadow' : 'bg-white text-blue-600 shadow') : (darkMode ? 'text-slate-400 hover:text-white' : 'text-gray-400 hover:text-gray-600')}`}
                  title="Agrupado por instrutor"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm">Instrutores</span>
                </button>
              </div>

              <button 
                onClick={handleAddSchedule}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <Plus className="w-5 h-5" />
                Nova Aula
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Busca Global */}
        <div className={`rounded-2xl shadow-lg border p-6 mb-6 ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100'}`}>
          <div className="relative">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-slate-500' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Buscar por aluno, instrutor, tipo de aula ou sala..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 border rounded-xl transition-all focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 ${darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500' : 'border-gray-200 bg-gray-50 focus:bg-white'}`}
            />
          </div>
        </div>

        {/* Visualização por Calendário */}
        {viewMode === 'calendar' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Mini Calendário Clicável */}
            <div className={`rounded-2xl shadow-lg border p-6 ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100'}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                </h3>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-gray-100 text-gray-600'}`}
                    title="Mês anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setCurrentMonth(new Date());
                      setSelectedDate(new Date());
                    }}
                    className={`px-3 py-1 text-xs rounded-lg transition-colors ${darkMode ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}
                    title="Hoje"
                  >
                    Hoje
                  </button>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-gray-100 text-gray-600'}`}
                    title="Próximo mês"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Cabeçalho dos dias da semana */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                  <div key={day} className={`p-2 text-center text-xs font-semibold ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Grid do calendário */}
              <div className="grid grid-cols-7 gap-1">
                {generateCalendarDays(currentMonth).map((day, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(day.date)}
                    className={`relative p-2 text-sm rounded-lg transition-all hover:scale-105 group ${
                      day.isToday 
                        ? 'bg-blue-500 text-white font-bold shadow-lg' :
                      day.isSelected 
                        ? 'bg-blue-100 text-blue-700 font-semibold ring-2 ring-blue-400 dark:bg-blue-900 dark:text-blue-300 dark:ring-blue-700' :
                      day.isCurrentMonth 
                        ? (darkMode ? 'text-slate-300 hover:bg-white/10' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600') :
                      (darkMode ? 'text-slate-700' : 'text-gray-300 hover:bg-gray-50')
                    }`}
                    title={`${day.scheduleCount} aula${day.scheduleCount !== 1 ? 's' : ''} • R$ ${day.revenue}`}
                  >
                    {day.day}
                  </button>
                ))}
              </div>

              {/* Informações da Data Selecionada */}
              <div className={`mt-6 pt-6 border-t ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Data selecionada:</span>
                    <span className={`text-sm font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {formatDateShort(selectedDate)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Aulas:</span>
                    <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {getSchedulesForDate(selectedDate).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Receita:</span>
                    <span className={`text-sm font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      R$ {getSchedulesForDate(selectedDate)
                        .filter(s => s.paymentStatus === 'Pago')
                        .reduce((acc, s) => acc + s.price, 0)}
                    </span>
                  </div>
                </div>

                {/* Botão rápido para nova aula na data */}
                <button
                  onClick={() => handleAddScheduleForDate(selectedDate)}
                  className={`w-full mt-4 p-3 border-2 border-dashed rounded-xl transition-all flex items-center justify-center gap-2 ${darkMode ? 'border-blue-500/30 text-blue-400 hover:bg-blue-500/10' : 'border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400'}`}
                >
                  <Plus className="w-4 h-4" />
                  Nova aula para esta data
                </button>
              </div>
            </div>

            {/* Agendamentos da Data Selecionada */}
            <div className="lg:col-span-3">
              <div className={`rounded-2xl shadow-lg border overflow-hidden ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100'}`}>
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Calendar className="w-7 h-7" />
                    {formatDate(selectedDate)}
                  </h3>
                  <div className="flex items-center gap-4 text-blue-100 text-sm mt-2">
                    <span>{getSchedulesForDate(selectedDate).length} aula{getSchedulesForDate(selectedDate).length !== 1 ? 's' : ''}</span>
                    <span>•</span>
                    <span>Receita: R$ {getSchedulesForDate(selectedDate).filter(s => s.paymentStatus === 'Pago').reduce((acc, s) => acc + s.price, 0)}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  {getSchedulesForDate(selectedDate).length === 0 ? (
                    <div className="text-center py-12">
                      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 ${darkMode ? 'bg-slate-800' : 'bg-gray-100'}`}>
                        <Calendar className={`w-10 h-10 ${darkMode ? 'text-slate-600' : 'text-gray-400'}`} />
                      </div>
                      <h4 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                        Nenhuma aula nesta data
                      </h4>
                      <p className={`mb-6 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                        Este dia está disponível para novos agendamentos
                      </p>
                      <button
                        onClick={() => handleAddScheduleForDate(selectedDate)}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <Plus className="w-5 h-5" />
                        Agendar Primeira Aula
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {getSchedulesForDate(selectedDate).map((schedule, index) => (
                        <div
                          key={schedule.id}
                          className={`group relative flex items-center gap-6 p-6 border rounded-xl transition-all duration-300 hover:-translate-y-1 ${darkMode ? 'border-white/5 hover:bg-white/5' : 'border-gray-100 hover:shadow-md hover:border-blue-200'}`}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          {/* Timeline vertical */}
                          <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                              <div className="text-center">
                                <div className="text-lg font-bold">{schedule.startTime}</div>
                                <div className="text-xs opacity-75">
                                  {calculateDuration(schedule.startTime, schedule.endTime)}min
                                </div>
                              </div>
                            </div>
                            {index < getSchedulesForDate(selectedDate).length - 1 && (
                              <div className={`w-0.5 h-8 mt-2 ${darkMode ? 'bg-white/10' : 'bg-gray-200'}`}></div>
                            )}
                          </div>

                          {/* Conteúdo da aula */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className={`text-xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{schedule.type}</h4>
                                <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm mb-2 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                                  <div className="flex items-center gap-1">
                                    <User className="w-4 h-4 text-blue-500" />
                                    <span className="font-medium truncate">{schedule.studentName}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <GraduationCap className="w-4 h-4 text-green-500" />
                                    <span className="truncate">{schedule.instructorName}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4 text-purple-500" />
                                    <span>{schedule.room}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex flex-col items-end gap-2">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-1 ${getStatusColor(schedule.status)}`}>
                                  {getStatusIcon(schedule.status)}
                                  {schedule.status}
                                </span>
                                <span className="text-lg font-bold text-green-600">R$ {schedule.price}</span>
                              </div>
                            </div>

                            {/* Equipamentos e notas */}
                            <div className="flex items-center justify-between">
                              {schedule.equipment.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {schedule.equipment.slice(0, 3).map(equipment => (
                                    <span key={equipment} className={`px-2 py-1 rounded-lg text-xs ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-600'}`}>
                                      {equipment}
                                    </span>
                                  ))}
                                  {schedule.equipment.length > 3 && (
                                    <span className={`px-2 py-1 rounded-lg text-xs ${darkMode ? 'bg-slate-700 text-slate-400' : 'bg-gray-200 text-gray-500'}`}>
                                      +{schedule.equipment.length - 3}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>

                            {schedule.notes && (
                              <div className={`mt-3 p-3 rounded-lg ${darkMode ? 'bg-slate-800/50' : 'bg-gray-50'}`}>
                                <p className={`text-sm italic ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{schedule.notes}</p>
                              </div>
                            )}
                          </div>

                          {/* Ações rápidas */}
                          <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleViewSchedule(schedule)}
                              className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}
                              title="Ver detalhes"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEditSchedule(schedule)}
                              className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}
                              title="Editar"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteSchedule(schedule.id)}
                              className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30' : 'bg-red-100 text-red-600 hover:bg-red-200'}`}
                              title="Cancelar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Visualização Timeline */}
        {viewMode === 'timeline' && (
          <div className={`rounded-2xl shadow-lg border overflow-hidden ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white'}`}>
            <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Clock className="w-7 h-7" />
                    Timeline - {formatDate(selectedDate)}
                  </h3>
                  <p className="text-green-100 text-sm mt-1">
                    Visualização por horários do dia • Clique nos horários livres para agendar
                  </p>
                </div>
                
                {/* Seletor de data rápido */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000))}
                    className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                    title="Dia anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedDate(new Date())}
                    className="px-3 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-sm font-medium"
                  >
                    Hoje
                  </button>
                  <button
                    onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000))}
                    className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                    title="Próximo dia"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6 max-h-[600px] overflow-y-auto">
              <div className="space-y-1">
                {generateTimeSlots().map(timeSlot => {
                  const slotSchedules = getSchedulesForTimeSlot(getSchedulesForDate(selectedDate), timeSlot);
                  
                  return (
                    <div key={timeSlot} className={`flex items-center min-h-[50px] border-b last:border-0 transition-colors ${darkMode ? 'border-white/5 hover:bg-white/5' : 'border-gray-50 hover:bg-gray-25'}`}>
                      <div className={`w-20 text-sm font-bold text-center flex-shrink-0 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                        {timeSlot}
                      </div>
                      <div className="flex-1 pl-6">
                        {slotSchedules.length > 0 ? (
                          <div className="space-y-2">
                            {slotSchedules.map(schedule => (
                              <button
                                key={schedule.id}
                                onClick={() => handleViewSchedule(schedule)}
                                className={`w-full p-3 rounded-xl hover:shadow-md transition-all hover:-translate-y-1 group text-left border ${darkMode ? 'bg-slate-800 border-white/10' : 'bg-gradient-to-r from-blue-100 to-purple-100 border-blue-200'}`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                    {schedule.type} ({calculateDuration(schedule.startTime, schedule.endTime)}min)
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}>
                                      {schedule.status}
                                    </span>
                                    <span className="text-sm font-bold text-green-600">R$ {schedule.price}</span>
                                  </div>
                                </div>
                                <div className={`text-xs flex items-center gap-4 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                                  <span className="flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    {schedule.studentName}
                                  </span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <GraduationCap className="w-3 h-3" />
                                    {schedule.instructorName}
                                  </span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {schedule.room}
                                  </span>
                                </div>
                                {schedule.notes && (
                                  <div className={`text-xs mt-1 italic ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                                    {schedule.notes.length > 60 ? schedule.notes.substring(0, 60) + '...' : schedule.notes}
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAddScheduleForDateTime(selectedDate, timeSlot)}
                            className={`w-full p-4 border-2 border-dashed rounded-xl transition-all flex items-center justify-center gap-2 ${darkMode ? 'border-white/10 text-slate-500 hover:border-blue-500 hover:text-blue-400 hover:bg-white/5' : 'border-gray-200 text-gray-400 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50'}`}
                          >
                            <Plus className="w-4 h-4" />
                            <span className="text-sm">Horário disponível - Clique para agendar</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Visualização por Instrutor */}
        {viewMode === 'instructor' && (
          <div className="space-y-6">
            {Array.from(new Set(filteredSchedules.map(s => s.instructorName))).map(instructorName => {
              const instructorSchedules = filteredSchedules.filter(s => s.instructorName === instructorName);
              const totalRevenue = instructorSchedules.filter(s => s.paymentStatus === 'Pago').reduce((acc, s) => acc + s.price, 0);
              const confirmedSchedules = instructorSchedules.filter(s => s.status === 'Confirmado').length;
              const totalHours = instructorSchedules.reduce((acc, s) => acc + calculateDuration(s.startTime, s.endTime), 0);
              
              return (
                <div key={instructorName} className={`rounded-2xl shadow-lg border overflow-hidden ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100'}`}>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                          <GraduationCap className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{instructorName}</h3>
                          <p className="text-purple-100 text-sm">
                            {instructorSchedules.length} aula{instructorSchedules.length !== 1 ? 's' : ''} • 
                            {confirmedSchedules} confirmada{confirmedSchedules !== 1 ? 's' : ''} • 
                            {Math.round(totalHours / 60)}h {totalHours % 60}min
                          </p>
                        </div>
                      </div>
                      <div className="text-right text-white">
                        <div className="text-2xl font-bold">R$ {totalRevenue}</div>
                        <div className="text-purple-100 text-sm">Receita total</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {instructorSchedules
                        .sort((a, b) => new Date(a.date + ' ' + a.startTime).getTime() - new Date(b.date + ' ' + b.startTime).getTime())
                        .map(schedule => (
                          <div
                            key={schedule.id}
                            onClick={() => handleViewSchedule(schedule)}
                            className={`p-4 border rounded-xl hover:shadow-md hover:border-purple-300 cursor-pointer transition-all group ${darkMode ? 'border-white/10 bg-white/5' : 'border-gray-200'}`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                {new Date(schedule.date).toLocaleDateString('pt-BR')}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}>
                                {schedule.status}
                              </span>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className={`text-lg font-bold ${darkMode ? 'text-slate-200' : 'text-gray-800'}`}>
                                  {schedule.startTime} - {schedule.endTime}
                                </span>
                                <span className={`text-xs ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                                  {calculateDuration(schedule.startTime, schedule.endTime)}min
                                </span>
                              </div>
                              
                              <div className="font-semibold text-purple-600 group-hover:text-purple-700 transition-colors">
                                {schedule.type}
                              </div>
                              
                              <div className={`text-sm space-y-1 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                                <div className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  <span className="truncate">{schedule.studentName}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>{schedule.room}</span>
                                </div>
                                {schedule.equipment.length > 0 && (
                                  <div className={`text-xs ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                                    {schedule.equipment.slice(0, 2).join(', ')}
                                    {schedule.equipment.length > 2 && ` +${schedule.equipment.length - 2}`}
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex items-center justify-between pt-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(schedule.paymentStatus)}`}>
                                  {schedule.paymentStatus}
                                </span>
                                <span className="font-bold text-green-600">R$ {schedule.price}</span>
                              </div>
                              
                              {schedule.notes && (
                                <div className={`mt-2 text-xs italic ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                                  {schedule.notes.length > 50 ? schedule.notes.substring(0, 50) + '...' : schedule.notes}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      
                      {/* Card para adicionar nova aula para o instrutor */}
                      <div
                        onClick={() => handleAddSchedule()}
                        className={`p-4 border-2 border-dashed rounded-xl transition-all cursor-pointer group flex items-center justify-center min-h-[200px] ${darkMode ? 'border-purple-500/30 hover:border-purple-500 hover:bg-purple-500/10' : 'border-purple-200 hover:border-purple-400 hover:bg-purple-50'}`}
                      >
                        <div className="text-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                            <Plus className="w-6 h-6 text-white" />
                          </div>
                          <p className={`font-semibold text-sm transition-colors ${darkMode ? 'text-slate-400 group-hover:text-purple-400' : 'text-gray-600 group-hover:text-purple-600'}`}>
                            Nova Aula
                          </p>
                          <p className={`text-xs mt-1 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                            para {instructorName}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Estatísticas do instrutor */}
                    <div className={`mt-6 pt-6 border-t grid grid-cols-3 gap-4 ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{instructorSchedules.length}</div>
                        <div className={`text-sm ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Aulas Total</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">R$ {totalRevenue}</div>
                        <div className={`text-sm ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Receita</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{Math.round(totalHours / 60)}h</div>
                        <div className={`text-sm ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Horas Trabalhadas</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Estado vazio para visualização por instrutor */}
            {Array.from(new Set(filteredSchedules.map(s => s.instructorName))).length === 0 && (
              <div className={`rounded-2xl shadow-lg border p-12 text-center ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100'}`}>
                <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                  Nenhum instrutor com aulas
                </h3>
                <p className={`mb-8 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                  Comece agendando aulas para seus instrutores
                </p>
                <button
                  onClick={handleAddSchedule}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-xl font-medium flex items-center gap-3 mx-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <Plus className="w-6 h-6" />
                  Primeira Aula
                </button>
              </div>
            )}
          </div>
        )}

        {/* Insights e Sugestões */}
        <div className="mt-8 grid grid-cols-1 gap-6">
            <div className="space-y-3">
              {getSchedulesForDate(selectedDate).length === 0 ? (
                <div className={`rounded-xl p-4 ${darkMode ? 'bg-slate-800/80' : 'bg-white/80'}`}>
                  <p className={`text-sm mb-2 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                    🎯 Dia livre - ideal para aulas especiais ou workshops
                  </p>
                  <button 
                    onClick={() => handleAddScheduleForDate(selectedDate)}
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                  >
                    Agendar primeira aula
                  </button>
                </div>
              ) : getSchedulesForDate(selectedDate).length < 5 ? (
                <div className={`rounded-xl p-4 ${darkMode ? 'bg-slate-800/80' : 'bg-white/80'}`}>
                  <p className={`text-sm mb-2 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                    📈 Ainda há {8 - getSchedulesForDate(selectedDate).length} horários disponíveis neste dia
                  </p>
                  <button 
                    onClick={() => handleAddScheduleForDate(selectedDate)}
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                  >
                    Adicionar mais aulas
                  </button>
                </div>
              ) : (
                <div className={`rounded-xl p-4 ${darkMode ? 'bg-slate-800/80' : 'bg-white/80'}`}>
                  <p className={`text-sm mb-2 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                    🎉 Dia com boa ocupação! {getSchedulesForDate(selectedDate).length} aulas agendadas
                  </p>
                  <button 
                    onClick={() => handleAddScheduleForDate(selectedDate)}
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                  >
                    Ver horários livres
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Estatísticas da Data */}
          <div className={`rounded-2xl shadow-lg border p-6 ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100'}`}>
            <h4 className={`font-bold flex items-center gap-2 mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Target className="w-5 h-5 text-blue-500" />
              Resumo de {formatDateShort(selectedDate)}
            </h4>
            
            <div className="space-y-4">
              <div className={`flex items-center justify-between p-3 rounded-xl ${darkMode ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Total de aulas</span>
                </div>
                <span className="text-lg font-bold text-blue-600">
                  {getSchedulesForDate(selectedDate).length}
                </span>
              </div>
              
              <div className={`flex items-center justify-between p-3 rounded-xl ${darkMode ? 'bg-green-500/10' : 'bg-green-50'}`}>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Receita do dia</span>
                </div>
                <span className="text-lg font-bold text-green-600">
                  R$ {getSchedulesForDate(selectedDate)
                        .filter(s => s.paymentStatus === 'Pago')
                        .reduce((acc, s) => acc + s.price, 0)}
                </span>
              </div>
              
              <div className={`flex items-center justify-between p-3 rounded-xl ${darkMode ? 'bg-purple-500/10' : 'bg-purple-50'}`}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium">Taxa confirmação</span>
                </div>
                <span className="text-lg font-bold text-purple-600">
                  {getSchedulesForDate(selectedDate).length > 0 
                    ? Math.round((getSchedulesForDate(selectedDate).filter(s => s.status === 'Confirmado').length / getSchedulesForDate(selectedDate).length) * 100)
                    : 0}%
                </span>
              </div>
              
              <div className={`flex items-center justify-between p-3 rounded-xl ${darkMode ? 'bg-orange-500/10' : 'bg-orange-50'}`}>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium">Horas do dia</span>
                </div>
                <span className="text-lg font-bold text-orange-600">
                  {Math.round(getSchedulesForDate(selectedDate).reduce((acc, s) => acc + calculateDuration(s.startTime, s.endTime), 0) / 60)}h
                </span>
              </div>
            </div>

            {/* Botão para nova aula na data */}
            <button
              onClick={() => handleAddScheduleForDate(selectedDate)}
              className={`w-full mt-4 p-4 border-2 border-dashed rounded-xl transition-all flex items-center justify-center gap-2 ${darkMode ? 'border-blue-500/30 text-blue-400 hover:bg-blue-500/10' : 'border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400'}`}
            >
              <Plus className="w-5 h-5" />
              Agendar aula para {formatDateShort(selectedDate)}
            </button>
          </div>
        </div>

      {/* Botão Flutuante */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setShowQuickActions(!showQuickActions)}
          className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 relative"
        >
          <Plus className={`w-8 h-8 text-white transition-transform duration-300 ${showQuickActions ? 'rotate-45' : ''}`} />
        </button>

        {/* Ações rápidas expandidas */}
        {showQuickActions && (
          <div className="absolute bottom-20 right-0 space-y-3">

            <button
              onClick={() => {
                handleAddScheduleForDate(selectedDate);
                setShowQuickActions(false);
              }}
              className={`flex items-center gap-3 rounded-xl shadow-lg border px-4 py-3 hover:shadow-xl transition-all hover:-translate-y-1 group ${darkMode ? 'bg-slate-800 border-white/10 text-white' : 'bg-white text-gray-700'}`}
            >
              <Calendar className="w-5 h-5 text-blue-500 group-hover:text-blue-600" />
              <span className="text-sm font-medium whitespace-nowrap">
                Aula para {formatDateShort(selectedDate)}
              </span>
            </button>
            <button
              onClick={() => {
                handleAddSchedule();
                setShowQuickActions(false);
              }}
              className={`flex items-center gap-3 rounded-xl shadow-lg border px-4 py-3 hover:shadow-xl transition-all hover:-translate-y-1 group ${darkMode ? 'bg-slate-800 border-white/10 text-white' : 'bg-white text-gray-700'}`}
            >
              <Plus className="w-5 h-5 text-green-500 group-hover:text-green-600" />
              <span className="text-sm font-medium whitespace-nowrap">
                Nova aula geral
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Click outside para fechar quick actions */}
      {showQuickActions && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowQuickActions(false)}
        />
      )}
    </div>
  );
};

export default ScheduleManagement;