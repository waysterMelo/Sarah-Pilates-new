import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  User, 
  GraduationCap, 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign,
  AlertCircle,
  Plus,
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Award,
  Target
} from 'lucide-react';

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

interface ScheduleFormProps {
  schedule?: Schedule | null;
  isEdit: boolean;
  onSave: (schedule: Omit<Schedule, 'id'>) => void;
  onCancel: () => void;
  darkMode?: boolean;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({ schedule, isEdit, onSave, onCancel, darkMode }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    studentId: 0,
    studentName: '',
    instructorId: 0,
    instructorName: '',
    date: '',
    startTime: '',
    endTime: '',
    type: 'Pilates Solo',
    status: 'Agendado' as 'Agendado' | 'Confirmado' | 'Concluído' | 'Cancelado' | 'Falta',
    notes: '',
    room: 'Sala 1',
    equipment: [] as string[],
    price: 80,
    paymentStatus: 'Pendente' as 'Pendente' | 'Pago' | 'Isento',
    createdAt: new Date().toISOString()
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newEquipment, setNewEquipment] = useState('');

  // Mock data
  const students = [
    { id: 1, name: 'Ana Silva Santos', phone: '(11) 99999-1111' },
    { id: 2, name: 'Maria Santos Oliveira', phone: '(11) 99999-2222' },
    { id: 3, name: 'João Pedro Costa', phone: '(11) 99999-3333' },
    { id: 4, name: 'Carlos Lima', phone: '(11) 99999-4444' },
    { id: 5, name: 'Laura Ferreira', phone: '(11) 99999-5555' },
  ];

  const instructors = [
    { id: 1, name: 'Sarah Costa Silva', specialty: 'Pilates Clássico' },
    { id: 2, name: 'Carla Mendes Santos', specialty: 'Pilates Terapêutico' },
    { id: 3, name: 'Roberto Lima Oliveira', specialty: 'Pilates Contemporâneo' },
  ];

  const classTypes = [
    { name: 'Pilates Solo', price: 80, duration: 60 },
    { name: 'Pilates Aparelhos', price: 100, duration: 60 },
    { name: 'Pilates Terapêutico', price: 90, duration: 60 },
    { name: 'Personal Training', price: 120, duration: 50 },
    { name: 'Pilates para Idosos', price: 70, duration: 50 },
    { name: 'Pilates na Gravidez', price: 85, duration: 50 }
  ];

  const rooms = [
    'Sala 1 - Mat',
    'Sala 2 - Aparelhos',
    'Sala 3 - Terapêutica',
    'Sala 4 - Personal'
  ];

  const commonEquipment = [
    'Mat', 'Bola', 'Magic Circle', 'Theraband', 
    'Reformer', 'Cadillac', 'Chair', 'Barrel', 'Bosu', 'Rolo'
  ];

  // Etapas do wizard
  const steps = [
    {
      id: 0,
      title: 'Selecionar Pessoas',
      description: 'Escolha o aluno e instrutor',
      icon: User,
      color: 'blue'
    },
    {
      id: 1,
      title: 'Data e Horário',
      description: 'Defina quando será a aula',
      icon: Calendar,
      color: 'green'
    },
    {
      id: 2,
      title: 'Tipo e Local',
      description: 'Configure os detalhes da aula',
      icon: Target,
      color: 'purple'
    },
    {
      id: 3,
      title: 'Equipamentos',
      description: 'Selecione os equipamentos necessários',
      icon: Award,
      color: 'orange'
    },
    {
      id: 4,
      title: 'Finalizar',
      description: 'Revisar e confirmar agendamento',
      icon: CheckCircle2,
      color: 'pink'
    }
  ];

  useEffect(() => {
    if (schedule) {
      setFormData(prevData => ({
        ...prevData,
        studentId: schedule.studentId,
        studentName: schedule.studentName,
        instructorId: schedule.instructorId,
        instructorName: schedule.instructorName,
        date: schedule.date || prevData.date,
        startTime: schedule.startTime || prevData.startTime,
        endTime: schedule.endTime || prevData.endTime,
        type: schedule.type,
        status: schedule.status,
        notes: schedule.notes,
        room: schedule.room,
        equipment: schedule.equipment,
        price: schedule.price,
        paymentStatus: schedule.paymentStatus,
        createdAt: isEdit ? schedule.createdAt : new Date().toISOString()
      }));
    }
  }, [schedule, isEdit]);

  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 0:
        if (!formData.studentId) newErrors.studentId = 'Aluno é obrigatório';
        if (!formData.instructorId) newErrors.instructorId = 'Instrutor é obrigatório';
        break;
      case 1:
        if (!formData.date) newErrors.date = 'Data é obrigatória';
        if (!formData.startTime) newErrors.startTime = 'Horário de início é obrigatório';
        if (!formData.endTime) newErrors.endTime = 'Horário de fim é obrigatório';
        if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
          newErrors.endTime = 'Horário de fim deve ser posterior ao início';
        }
        break;
      case 2:
        if (formData.price <= 0) newErrors.price = 'Valor deve ser maior que zero';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
    setErrors({});
  };

  const handleSubmit = () => {
    if (validateCurrentStep()) {
      onSave(formData);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleStudentChange = (studentId: number) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      handleInputChange('studentId', studentId);
      handleInputChange('studentName', student.name);
    }
  };

  const handleInstructorChange = (instructorId: number) => {
    const instructor = instructors.find(i => i.id === instructorId);
    if (instructor) {
      handleInputChange('instructorId', instructorId);
      handleInputChange('instructorName', instructor.name);
    }
  };

  const handleTypeChange = (type: string) => {
    const typeInfo = classTypes.find(t => t.name === type);
    if (typeInfo) {
      handleInputChange('type', type);
      handleInputChange('price', typeInfo.price);
      
      // Auto-calcular horário de fim
      if (formData.startTime) {
        const startTime = new Date(`2000-01-01T${formData.startTime}`);
        const endTime = new Date(startTime.getTime() + typeInfo.duration * 60000);
        handleInputChange('endTime', endTime.toTimeString().slice(0, 5));
      }
    }
  };

  const addEquipment = (equipment: string) => {
    if (!formData.equipment.includes(equipment)) {
      handleInputChange('equipment', [...formData.equipment, equipment]);
    }
  };

  const removeEquipment = (equipment: string) => {
    handleInputChange('equipment', formData.equipment.filter(e => e !== equipment));
  };

  const addCustomEquipment = () => {
    if (newEquipment.trim() && !formData.equipment.includes(newEquipment.trim())) {
      handleInputChange('equipment', [...formData.equipment, newEquipment.trim()]);
      setNewEquipment('');
    }
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-500 text-white border-blue-500',
      green: 'bg-green-500 text-white border-green-500',
      purple: 'bg-purple-500 text-white border-purple-500',
      orange: 'bg-orange-500 text-white border-orange-500',
      pink: 'bg-pink-500 text-white border-pink-500',
      gray: 'bg-gray-300 text-gray-600 border-gray-300'
    };
    return colorMap[color] || colorMap.gray;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Selecionar Pessoas
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Escolha o Aluno *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {students.map((student) => (
                  <button
                    key={student.id}
                    type="button"
                    onClick={() => handleStudentChange(student.id)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      formData.studentId === student.id
                        ? 'bg-blue-500 text-white border-blue-500 shadow-lg'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        formData.studentId === student.id ? 'bg-white/20' : 'bg-blue-100'
                      }`}>
                        <User className={`w-7 h-7 ${
                          formData.studentId === student.id ? 'text-white' : 'text-blue-600'
                        }`} />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-lg">{student.name}</div>
                        <div className={`text-sm ${
                          formData.studentId === student.id ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {student.phone}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              {errors.studentId && (
                <p className="mt-3 text-sm text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors.studentId}
                </p>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Escolha o Instrutor *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {instructors.map((instructor) => (
                  <button
                    key={instructor.id}
                    type="button"
                    onClick={() => handleInstructorChange(instructor.id)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      formData.instructorId === instructor.id
                        ? 'bg-green-500 text-white border-green-500 shadow-lg'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        formData.instructorId === instructor.id ? 'bg-white/20' : 'bg-green-100'
                      }`}>
                        <GraduationCap className={`w-7 h-7 ${
                          formData.instructorId === instructor.id ? 'text-white' : 'text-green-600'
                        }`} />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-lg">{instructor.name}</div>
                        <div className={`text-sm ${
                          formData.instructorId === instructor.id ? 'text-green-100' : 'text-gray-500'
                        }`}>
                          {instructor.specialty}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              {errors.instructorId && (
                <p className="mt-3 text-sm text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors.instructorId}
                </p>
              )}
            </div>
          </div>
        );

      case 1: // Data e Horário
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Selecione a Data *
              </label>
              <div className="relative max-w-md">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className={`w-full pl-14 pr-4 py-4 border-2 rounded-2xl text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                    errors.date ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-400'
                  }`}
                />
              </div>
              {errors.date && (
                <p className="mt-3 text-sm text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors.date}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-4">
                  Horário de Início *
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => handleInputChange('startTime', e.target.value)}
                    className={`w-full pl-14 pr-4 py-4 border-2 rounded-2xl text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                      errors.startTime ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-400'
                    }`}
                  />
                </div>
                {errors.startTime && (
                  <p className="mt-3 text-sm text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.startTime}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-4">
                  Horário de Fim *
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleInputChange('endTime', e.target.value)}
                    className={`w-full pl-14 pr-4 py-4 border-2 rounded-2xl text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                      errors.endTime ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-400'
                    }`}
                  />
                </div>
                {errors.endTime && (
                  <p className="mt-3 text-sm text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.endTime}
                  </p>
                )}
              </div>
            </div>

            {/* Sugestões de horário */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-3">
                Horários Sugeridos
              </label>
              <div className="flex flex-wrap gap-3">
                {['08:00', '09:00', '10:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(time => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => {
                      handleInputChange('startTime', time);
                      const endHour = parseInt(time.split(':')[0]) + 1;
                      handleInputChange('endTime', `${endHour.toString().padStart(2, '0')}:00`);
                    }}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors text-sm font-medium"
                  >
                    {time} - {parseInt(time.split(':')[0]) + 1}:00
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2: // Tipo e Local
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Tipo de Aula
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {classTypes.map((classType) => (
                  <button
                    key={classType.name}
                    type="button"
                    onClick={() => handleTypeChange(classType.name)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      formData.type === classType.name
                        ? 'bg-purple-500 text-white border-purple-500 shadow-lg'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-bold text-lg mb-2">{classType.name}</div>
                      <div className={`text-sm ${
                        formData.type === classType.name ? 'text-purple-100' : 'text-gray-500'
                      }`}>
                        R$ {classType.price} • {classType.duration}min
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-4">
                  Sala
                </label>
                <div className="space-y-3">
                  {rooms.map((room) => (
                    <button
                      key={room}
                      type="button"
                      onClick={() => handleInputChange('room', room)}
                      className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 text-left ${
                        formData.room === room
                          ? 'bg-orange-500 text-white border-orange-500 shadow-lg'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className={`w-5 h-5 ${
                          formData.room === room ? 'text-white' : 'text-orange-500'
                        }`} />
                        <span className="font-medium">{room}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-4">
                  Configurações
                </label>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Valor da Aula
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                          errors.price ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-400'
                        }`}
                        placeholder="0.00"
                      />
                    </div>
                    {errors.price && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.price}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                      >
                        <option value="Agendado">Agendado</option>
                        <option value="Confirmado">Confirmado</option>
                        <option value="Concluído">Concluído</option>
                        <option value="Cancelado">Cancelado</option>
                        <option value="Falta">Falta</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Pagamento
                      </label>
                      <select
                        value={formData.paymentStatus}
                        onChange={(e) => handleInputChange('paymentStatus', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                      >
                        <option value="Pendente">Pendente</option>
                        <option value="Pago">Pago</option>
                        <option value="Isento">Isento</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3: // Equipamentos
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Equipamentos Disponíveis
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {commonEquipment.map((equipment) => (
                  <button
                    key={equipment}
                    type="button"
                    onClick={() => addEquipment(equipment)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 ${
                      formData.equipment.includes(equipment)
                        ? 'bg-green-500 text-white border-green-500 shadow-lg'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-medium">{equipment}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Equipamento Personalizado
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newEquipment}
                  onChange={(e) => setNewEquipment(e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  placeholder="Nome do equipamento"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomEquipment())}
                />
                <button
                  type="button"
                  onClick={addCustomEquipment}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Equipamentos Selecionados ({formData.equipment.length})
              </label>
              <div className="flex flex-wrap gap-3">
                {formData.equipment.map((equipment) => (
                  <span
                    key={equipment}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium"
                  >
                    {equipment}
                    <button
                      type="button"
                      onClick={() => removeEquipment(equipment)}
                      className="text-blue-500 hover:text-blue-700 ml-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
                {formData.equipment.length === 0 && (
                  <p className="text-gray-500 italic">Nenhum equipamento selecionado</p>
                )}
              </div>
            </div>
          </div>
        );

      case 4: // Finalizar
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
                Resumo do Agendamento
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Aluno</label>
                    <p className="text-lg font-bold text-gray-800">{formData.studentName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Instrutor</label>
                    <p className="text-lg font-bold text-gray-800">{formData.instructorName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Data e Horário</label>
                    <p className="text-lg font-bold text-gray-800">
                      {new Date(formData.date).toLocaleDateString('pt-BR')} • {formData.startTime} - {formData.endTime}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Tipo de Aula</label>
                    <p className="text-lg font-bold text-gray-800">{formData.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Local</label>
                    <p className="text-lg font-bold text-gray-800">{formData.room}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Valor</label>
                    <p className="text-lg font-bold text-green-600">R$ {formData.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {formData.equipment.length > 0 && (
                <div className="mt-6">
                  <label className="text-sm font-medium text-gray-500">Equipamentos</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.equipment.map((equipment) => (
                      <span key={equipment} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {equipment}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Observações (Opcional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={4}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 resize-none"
                placeholder="Observações sobre a aula, objetivos específicos, restrições médicas..."
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-gradient-to-br from-slate-50 to-blue-50'}`}>
      {/* Header */}
      <div className={`shadow-lg ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onCancel}
              className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {isEdit ? 'Editar Agendamento' : 'Novo Agendamento'}
              </h1>
              <p className={`mt-1 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                {isEdit ? 'Atualize as informações' : 'Sem limite de capacidade - agende quantos alunos desejar'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Steps */}
        <div className={`rounded-2xl shadow-lg border p-6 mb-8 ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100'}`}>
          <div className="flex items-center justify-between relative">
            {/* Linha de progresso */}
            <div className={`absolute top-1/2 left-0 right-0 h-1 rounded-full -translate-y-1/2 -z-10 ${darkMode ? 'bg-white/5' : 'bg-gray-200'}`} />
            <div 
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full -translate-y-1/2 -z-10 transition-all duration-500"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
            
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div key={step.id} className="flex flex-col items-center relative">
                  <button
                    onClick={() => setCurrentStep(index)}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? `${getColorClasses(step.color)} shadow-lg scale-110` 
                        : isCompleted 
                        ? 'bg-green-500 text-white border-green-500' 
                        : (darkMode ? 'bg-slate-800 text-slate-500 border-slate-700 border-2' : 'bg-white text-gray-400 border-gray-300 border-2')
                    }`}
                  >
                    <Icon className="w-7 h-7" />
                  </button>
                  <div className="mt-3 text-center hidden sm:block">
                    <div className={`text-sm font-bold ${
                      isActive ? (darkMode ? 'text-white' : 'text-gray-800') : isCompleted ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Conteúdo da Etapa */}
        <div className={`rounded-2xl shadow-lg border p-8 mb-8 min-h-[500px] ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100'}`}>
          {renderStepContent()}
        </div>

        {/* Botões de Navegação */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              currentStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : (darkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:-translate-y-1')
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Anterior
          </button>

          <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            Etapa {currentStep + 1} de {steps.length}
          </div>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Próximo
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <Save className="w-5 h-5" />
              {isEdit ? 'Atualizar Agendamento' : 'Confirmar Agendamento'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleForm;