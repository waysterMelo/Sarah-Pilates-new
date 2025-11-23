import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Edit, 
  User, 
  GraduationCap, 
  Calendar, 
  Clock,
  Target,
  Activity,
  Star,
  TrendingUp,
  FileText,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Award,
  Zap,
  BarChart3,
  Heart,
  Brain,
  Eye
} from 'lucide-react';

interface EvolutionRecord {
  id: number;
  studentId: number;
  studentName: string;
  instructorId: number;
  instructorName: string;
  date: string;
  session: number;
  focus: string;
  exercisesPerformed: string[];
  progressNotes: string;
  difficultiesObserved: string;
  improvements: string;
  nextSessionGoals: string;
  overallRating: number;
  painLevel: number;
  mobilityLevel: number;
  strengthLevel: number;
  balanceLevel: number;
  enduranceLevel: number;
  observations: string;
  equipment: string[];
  duration: number;
  createdAt: string;
}

interface EvolutionRecordDetailsProps {
  record: EvolutionRecord;
  onEdit: () => void;
  onClose: () => void;
}

const EvolutionRecordDetails: React.FC<EvolutionRecordDetailsProps> = ({ 
  record, 
  onEdit, 
  onClose 
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Atualizar tempo
  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // TODAS AS FUNÇÕES MANTIDAS EXATAMENTE
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-gray-600">({rating}/5)</span>
      </div>
    );
  };

  const renderLevelBar = (level: number, maxLevel: number = 5, color: string = 'blue') => {
    const percentage = (level / maxLevel) * 100;
    const colorClasses = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-emerald-600',
      yellow: 'from-yellow-500 to-orange-500',
      purple: 'from-purple-500 to-purple-600',
      red: 'from-red-500 to-red-600',
      indigo: 'from-indigo-500 to-indigo-600'
    };

    return (
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
          <div 
            className={`h-full bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} transition-all duration-1000 ease-out shadow-lg`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm font-bold text-gray-800 min-w-[50px] bg-gray-100 px-2 py-1 rounded-full">
          {level}/{maxLevel}
        </span>
      </div>
    );
  };

  const getPainLevelText = (level: number) => {
    if (level === 0) return 'Sem dor';
    if (level <= 3) return 'Dor leve';
    if (level <= 6) return 'Dor moderada';
    if (level <= 8) return 'Dor forte';
    return 'Dor severa';
  };

  const getPainLevelColor = (level: number) => {
    if (level === 0) return 'text-green-600';
    if (level <= 3) return 'text-yellow-600';
    if (level <= 6) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Effects Sutis */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
      <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 p-4 md:p-8 max-w-[1800px] mx-auto">
        {/* Header Avançado */}
        <header className="mb-8 md:mb-12">
          <div className="flex items-center gap-6 mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl transform transition-all duration-700 hover:scale-110 hover:rotate-12">
                <TrendingUp className="w-8 h-8 text-white relative z-10" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl blur-lg opacity-60 animate-pulse"></div>
            </div>
            
            <div className="flex-1 space-y-1">
              <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                Ficha de Evolução
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 bg-green-100 border border-green-300 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-green-700">Sessão #{record.session}</span>
                </div>
                <p className="text-lg font-medium text-gray-600">
                  {formatDate(record.date)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="p-3 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              
              <button 
                onClick={onEdit}
                className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-purple-500/40 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Edit className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Editar Ficha</span>
              </button>
            </div>
          </div>
        </header>

        <div className="space-y-8">
          {/* Card Principal da Sessão */}
          <div className="backdrop-blur-2xl bg-white/90 rounded-2xl md:rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                    <div className="text-center text-white">
                      <div className="text-2xl font-bold">#{record.session}</div>
                      <div className="text-sm opacity-75">{record.duration}min</div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{record.focus}</h2>
                    <p className="text-white/80 text-lg">
                      {record.studentName} • {record.instructorName}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-white text-sm font-medium">
                        <Calendar className="w-4 h-4" />
                        {new Date(record.date).toLocaleDateString('pt-BR')}
                      </span>
                      <span className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-white text-sm font-medium">
                        <Clock className="w-4 h-4" />
                        {record.duration} minutos
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right text-white">
                  <div className="text-sm opacity-75 mb-2">Avaliação Geral</div>
                  <div className="flex items-center gap-2 justify-end">
                    {renderStars(record.overallRating)}
                  </div>
                </div>
              </div>
            </div>

            {/* Métricas de Performance */}
            <div className="p-8 bg-gray-50 border-t">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-blue-500" />
                Níveis de Performance
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        Nível de Dor
                      </span>
                      <span className={`text-sm font-bold px-3 py-1 rounded-full ${getPainLevelColor(record.painLevel)} bg-white shadow-sm`}>
                        {getPainLevelText(record.painLevel)}
                      </span>
                    </div>
                    {renderLevelBar(record.painLevel, 10, 'red')}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-blue-500" />
                        Mobilidade
                      </span>
                    </div>
                    {renderLevelBar(record.mobilityLevel, 5, 'blue')}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-green-500" />
                        Força
                      </span>
                    </div>
                    {renderLevelBar(record.strengthLevel, 5, 'green')}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Target className="w-4 h-4 text-purple-500" />
                        Equilíbrio
                      </span>
                    </div>
                    {renderLevelBar(record.balanceLevel, 5, 'purple')}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-indigo-500" />
                        Resistência
                      </span>
                    </div>
                    {renderLevelBar(record.enduranceLevel, 5, 'indigo')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de Informações */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Informações da Sessão */}
            <div className="backdrop-blur-2xl bg-white/90 rounded-2xl md:rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  Informações da Sessão
                </h3>
              </div>

              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                    <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-blue-600">Aluno</p>
                      <p className="text-lg font-bold text-blue-800">{record.studentName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                    <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-purple-600">Instrutor</p>
                      <p className="text-lg font-bold text-purple-800">{record.instructorName}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                      <Calendar className="w-8 h-8 text-green-500" />
                      <div>
                        <p className="text-sm font-bold text-green-600">Data</p>
                        <p className="text-lg font-bold text-green-800">{new Date(record.date).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                      <Clock className="w-8 h-8 text-orange-500" />
                      <div>
                        <p className="text-sm font-bold text-orange-600">Duração</p>
                        <p className="text-lg font-bold text-orange-800">{record.duration}min</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200">
                    <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-indigo-600">Foco da Sessão</p>
                      <p className="text-lg font-bold text-indigo-800">{record.focus}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Exercícios e Equipamentos */}
            <div className="space-y-6">
              {/* Exercícios Realizados */}
              <div className="backdrop-blur-2xl bg-white/90 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    Exercícios Realizados
                  </h3>
                </div>

                <div className="p-6">
                  {record.exercisesPerformed.length > 0 ? (
                    <div className="grid grid-cols-1 gap-3">
                      {record.exercisesPerformed.map((exercise, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:shadow-md transition-all"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-lg font-bold text-green-800">{exercise}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Activity className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500 text-lg">Nenhum exercício registrado</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Equipamentos */}
              <div className="backdrop-blur-2xl bg-white/90 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    Equipamentos Utilizados
                  </h3>
                </div>

                <div className="p-6">
                  {record.equipment.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                      {record.equipment.map((equipment, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 rounded-2xl border border-purple-300 font-medium shadow-sm hover:shadow-md transition-all"
                        >
                          <Target className="w-4 h-4" />
                          {equipment}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Target className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500 text-lg">Nenhum equipamento registrado</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Notas de Progresso - TODOS OS CAMPOS MANTIDOS */}
          <div className="backdrop-blur-2xl bg-white/90 rounded-2xl md:rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                Evolução e Observações
              </h3>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {record.progressNotes && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-xl text-gray-800">Progresso Observado</h4>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                      <p className="text-gray-700 leading-relaxed text-lg">{record.progressNotes}</p>
                    </div>
                  </div>
                )}

                {record.difficultiesObserved && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-xl text-gray-800">Dificuldades Observadas</h4>
                    </div>
                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200">
                      <p className="text-gray-700 leading-relaxed text-lg">{record.difficultiesObserved}</p>
                    </div>
                  </div>
                )}

                {record.improvements && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-xl text-gray-800">Melhorias Observadas</h4>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                      <p className="text-gray-700 leading-relaxed text-lg">{record.improvements}</p>
                    </div>
                  </div>
                )}

                {record.nextSessionGoals && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-xl text-gray-800">Objetivos Próxima Sessão</h4>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
                      <p className="text-gray-700 leading-relaxed text-lg">{record.nextSessionGoals}</p>
                    </div>
                  </div>
                )}
              </div>

              {record.observations && (
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-xl text-gray-800">Observações Gerais</h4>
                  </div>
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200">
                    <p className="text-gray-700 leading-relaxed text-lg">{record.observations}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Informações de Criação */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">
                  Ficha criada em {formatDate(record.createdAt)} às {formatTime(record.createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span className="font-bold">ID: #{record.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvolutionRecordDetails;