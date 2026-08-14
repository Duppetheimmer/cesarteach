import React, { useState, useEffect } from 'react';
import { StudentRecord, UserProfile } from '../types';
import { 
  fetchAllStudentsForTeacher, 
  updateStudentTeacherNotes, 
  isSupabaseConfigured, 
  SUPABASE_SQL_SETUP_SCRIPT 
} from '../lib/supabase';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  GraduationCap, 
  Trophy, 
  Search, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Calendar, 
  Sparkles, 
  BookOpen, 
  Flame, 
  ArrowUpDown, 
  Filter, 
  MessageSquare, 
  Save, 
  X, 
  Database, 
  Copy, 
  Check, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  BarChart3,
  Award
} from 'lucide-react';

interface TeacherDashboardViewProps {
  currentUser: UserProfile | null;
  onNavigateToStudentView: () => void;
  totalCourseLessonsCount?: number;
}

export function TeacherDashboardView({
  currentUser,
  onNavigateToStudentView,
  totalCourseLessonsCount = 30
}: TeacherDashboardViewProps) {
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'passed_exam' | 'active_streak' | 'low_progress' | 'high_progress'>('all');
  const [sortBy, setSortBy] = useState<'last_active' | 'progress' | 'xp' | 'exam_score' | 'name'>('last_active');
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [editingNotes, setEditingNotes] = useState<string>('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notesSuccess, setNotesSuccess] = useState(false);
  const [showSqlModal, setShowSqlModal] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load students data
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const list = await fetchAllStudentsForTeacher();
      setStudents(list);
      setIsLoading(false);
    }
    loadData();
  }, []);

  // When a student is selected for detailed inspection, load their notes
  useEffect(() => {
    if (selectedStudent) {
      setEditingNotes(selectedStudent.profile.notesFromTeacher || '');
      setNotesSuccess(false);
    }
  }, [selectedStudent]);

  // Handle saving teacher observation note
  const handleSaveNotes = async () => {
    if (!selectedStudent) return;
    setIsSavingNotes(true);
    await updateStudentTeacherNotes(selectedStudent.profile.id, editingNotes);
    
    // Update local state
    setStudents(prev => prev.map(s => {
      if (s.profile.id === selectedStudent.profile.id) {
        return {
          ...s,
          profile: {
            ...s.profile,
            notesFromTeacher: editingNotes
          }
        };
      }
      return s;
    }));

    if (selectedStudent) {
      setSelectedStudent({
        ...selectedStudent,
        profile: {
          ...selectedStudent.profile,
          notesFromTeacher: editingNotes
        }
      });
    }

    setIsSavingNotes(false);
    setNotesSuccess(true);
    setTimeout(() => setNotesSuccess(false), 2500);
  };

  // Filter and sort students
  const filteredStudents = students.filter(s => {
    const matchesSearch = 
      s.profile.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.profile.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.profile.studentIdNumber && s.profile.studentIdNumber.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    const progressPct = Math.round(((s.progress.completedLessons?.length || 0) / totalCourseLessonsCount) * 100);

    if (filterStatus === 'passed_exam') return s.progress.examPassed;
    if (filterStatus === 'active_streak') return (s.progress.streakDays || 0) >= 3;
    if (filterStatus === 'low_progress') return progressPct < 30;
    if (filterStatus === 'high_progress') return progressPct >= 60;

    return true;
  }).sort((a, b) => {
    if (sortBy === 'last_active') {
      return new Date(b.profile.lastActiveAt).getTime() - new Date(a.profile.lastActiveAt).getTime();
    }
    if (sortBy === 'progress') {
      return (b.progress.completedLessons?.length || 0) - (a.progress.completedLessons?.length || 0);
    }
    if (sortBy === 'xp') {
      return (b.progress.xp || 0) - (a.progress.xp || 0);
    }
    if (sortBy === 'exam_score') {
      return (b.progress.examScore || 0) - (a.progress.examScore || 0);
    }
    if (sortBy === 'name') {
      return a.profile.fullName.localeCompare(b.profile.fullName);
    }
    return 0;
  });

  // Calculate high-level class analytics
  const totalStudentsCount = students.length;
  const examPassedCount = students.filter(s => s.progress.examPassed).length;
  const totalCompletedLessonsAll = students.reduce((acc, s) => acc + (s.progress.completedLessons?.length || 0), 0);
  const avgProgressPct = totalStudentsCount > 0 
    ? Math.round((totalCompletedLessonsAll / (totalStudentsCount * totalCourseLessonsCount)) * 100) 
    : 0;
  const totalGroupXP = students.reduce((acc, s) => acc + (s.progress.xp || 0), 0);
  const avgStreak = totalStudentsCount > 0 
    ? Math.round(students.reduce((acc, s) => acc + (s.progress.streakDays || 0), 0) / totalStudentsCount)
    : 0;

  // Export class report to CSV
  const handleExportCSV = () => {
    const headers = [
      'ID Estudiante',
      'Nombre Completo',
      'Correo Electrónico',
      'Matrícula',
      'Lecciones Completadas',
      '% Avance Curso',
      'Palabras Dominadas',
      'Puntos XP',
      'Racha Días',
      'Examen A1 Aprobado',
      'Calificación Examen (%)',
      'Fecha Examen',
      'Última Actividad',
      'Observaciones Docente'
    ];

    const rows = students.map(s => {
      const pct = Math.round(((s.progress.completedLessons?.length || 0) / totalCourseLessonsCount) * 100);
      return [
        `"${s.profile.id}"`,
        `"${s.profile.fullName}"`,
        `"${s.profile.email}"`,
        `"${s.profile.studentIdNumber || 'N/A'}"`,
        s.progress.completedLessons?.length || 0,
        `${pct}%`,
        s.progress.masteredWords?.length || 0,
        s.progress.xp || 0,
        s.progress.streakDays || 0,
        s.progress.examPassed ? 'SÍ' : 'NO',
        s.progress.examScore !== undefined ? `${s.progress.examScore}%` : 'Pendiente',
        s.progress.examPassedDate || 'N/A',
        s.profile.lastActiveAt,
        `"${(s.profile.notesFromTeacher || '').replace(/"/g, '""')}"`
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Reporte_Estudiantes_CesarTeach_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP_SCRIPT);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const formatRelativeTime = (isoDate: string) => {
    try {
      const date = new Date(isoDate);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffHours / 24);

      if (diffHours < 1) return 'Hace unos minutos';
      if (diffHours < 24) return `Hoy hace ${diffHours}h`;
      if (diffDays === 1) return 'Ayer';
      if (diffDays < 7) return `Hace ${diffDays} días`;
      return date.toLocaleDateString();
    } catch {
      return isoDate;
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Top Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-zinc-900 via-indigo-950 to-zinc-900 text-white shadow-xl border border-zinc-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Panel Exclusivo de Docente / Administrador</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              Supervisión de Estudiantes
            </h1>
            <p className="text-sm text-zinc-300 max-w-2xl font-medium">
              Consulta en tiempo real el progreso de cada alumno, lecciones completadas, calificaciones del examen final y registra observaciones pedagógicas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowSqlModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-bold transition-all flex items-center gap-2"
            >
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Configuración Supabase</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Exportar Calificaciones (CSV)</span>
            </button>

            <button
              onClick={onNavigateToStudentView}
              className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Ver como Alumno</span>
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-xs font-bold uppercase tracking-wider">Alumnos</span>
            <Users className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{totalStudentsCount}</p>
          <p className="text-[11px] font-semibold text-emerald-600">Registrados en plataforma</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-xs font-bold uppercase tracking-wider">Avance Promedio</span>
            <BarChart3 className="w-4 h-4 text-sky-500" />
          </div>
          <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{avgProgressPct}%</p>
          <p className="text-[11px] font-semibold text-zinc-400">Del temario completado</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-xs font-bold uppercase tracking-wider">Examen Aprobado</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{examPassedCount} / {totalStudentsCount}</p>
          <p className="text-[11px] font-semibold text-amber-600">Certificados emitidos</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-xs font-bold uppercase tracking-wider">XP del Grupo</span>
            <Zap className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{totalGroupXP.toLocaleString()}</p>
          <p className="text-[11px] font-semibold text-purple-600">Puntos acumulados</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-1 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-xs font-bold uppercase tracking-wider">Racha Promedio</span>
            <Flame className="w-4 h-4 text-orange-500" />
          </div>
          <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{avgStreak} días</p>
          <p className="text-[11px] font-semibold text-orange-600">Constancia de estudio</p>
        </div>
      </div>

      {/* Control Toolbar: Search, Filters, Sort */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, correo o matrícula..."
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-2xl text-xs font-bold">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filterStatus === 'all' ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm' : 'text-zinc-500'
              }`}
            >
              Todos ({students.length})
            </button>
            <button
              onClick={() => setFilterStatus('passed_exam')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filterStatus === 'passed_exam' ? 'bg-white dark:bg-zinc-700 text-amber-600 dark:text-amber-400 shadow-sm' : 'text-zinc-500'
              }`}
            >
              Aprobados
            </button>
            <button
              onClick={() => setFilterStatus('high_progress')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filterStatus === 'high_progress' ? 'bg-white dark:bg-zinc-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-zinc-500'
              }`}
            >
              Avanzados (+60%)
            </button>
            <button
              onClick={() => setFilterStatus('low_progress')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filterStatus === 'low_progress' ? 'bg-white dark:bg-zinc-700 text-rose-600 dark:text-rose-400 shadow-sm' : 'text-zinc-500'
              }`}
            >
              Bajo Avance
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-zinc-700 dark:text-zinc-300 font-bold focus:outline-none cursor-pointer"
            >
              <option value="last_active">Reciente</option>
              <option value="progress">Mayor Avance</option>
              <option value="exam_score">Nota de Examen</option>
              <option value="xp">Mayor XP</option>
              <option value="name">Alfabético</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student List Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-zinc-900 dark:text-zinc-100">
              Expediente de Alumnos ({filteredStudents.length})
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Haz clic en cualquier estudiante para ver su desglose completo y escribir notas personalizadas.
            </p>
          </div>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <Users className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto" />
            <p className="text-sm font-bold text-zinc-600 dark:text-zinc-400">
              No se encontraron alumnos con los filtros seleccionados.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {filteredStudents.map((st) => {
              const completedCount = st.progress.completedLessons?.length || 0;
              const progressPct = Math.round((completedCount / totalCourseLessonsCount) * 100);
              const vocabCount = st.progress.masteredWords?.length || 0;

              return (
                <div
                  key={st.profile.id}
                  onClick={() => setSelectedStudent(st)}
                  className="p-4 sm:p-5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                >
                  {/* Left: Avatar & Identity */}
                  <div className="flex items-center gap-3.5 min-w-[220px]">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md shrink-0">
                      {st.profile.fullName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 transition-colors">
                          {st.profile.fullName}
                        </h3>
                        {st.profile.studentIdNumber && (
                          <span className="px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold text-zinc-500">
                            {st.profile.studentIdNumber}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-500 font-medium">{st.profile.email}</p>
                    </div>
                  </div>

                  {/* Middle 1: Progress bar */}
                  <div className="flex-1 max-w-xs space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-zinc-600 dark:text-zinc-400">
                        {completedCount} de {totalCourseLessonsCount} lecciones
                      </span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-black">{progressPct}%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(progressPct, 100)}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-zinc-400 font-medium">
                      Vocabulario: <strong>{vocabCount}</strong> palabras dominadas
                    </p>
                  </div>

                  {/* Middle 2: Exam & XP Stats */}
                  <div className="flex items-center gap-4 text-xs">
                    {/* Exam Score */}
                    <div className="text-center min-w-[90px]">
                      <span className="text-[10px] text-zinc-400 font-bold block uppercase">Examen Final</span>
                      {st.progress.examPassed ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-black text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {st.progress.examScore}% Aprobado
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-bold text-xs">
                          Pendiente
                        </span>
                      )}
                    </div>

                    {/* XP & Streak */}
                    <div className="text-center min-w-[70px]">
                      <span className="text-[10px] text-zinc-400 font-bold block uppercase">Puntos</span>
                      <span className="font-black text-purple-600 dark:text-purple-400 text-xs">
                        {st.progress.xp} XP
                      </span>
                    </div>

                    <div className="text-center min-w-[60px]">
                      <span className="text-[10px] text-zinc-400 font-bold block uppercase">Racha</span>
                      <span className="font-black text-orange-500 text-xs inline-flex items-center gap-0.5">
                        <Flame className="w-3.5 h-3.5 fill-orange-500" />
                        {st.progress.streakDays}d
                      </span>
                    </div>
                  </div>

                  {/* Right: Last active & view detail arrow */}
                  <div className="flex items-center justify-between md:justify-end gap-3 text-right">
                    <div className="text-left md:text-right">
                      <span className="text-[10px] text-zinc-400 font-bold block">Última sesión</span>
                      <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-zinc-400" />
                        {formatRelativeTime(st.profile.lastActiveAt)}
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* STUDENT DETAIL MODAL */}
      <AnimatePresence>
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white dark:bg-zinc-900 rounded-3xl max-w-2xl w-full shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-indigo-600 via-sky-600 to-indigo-700 text-white relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md text-white font-black text-xl flex items-center justify-center border border-white/30">
                    {selectedStudent.profile.fullName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-black">{selectedStudent.profile.fullName}</h2>
                      {selectedStudent.profile.studentIdNumber && (
                        <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold">
                          {selectedStudent.profile.studentIdNumber}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/80">{selectedStudent.profile.email}</p>
                    <p className="text-[11px] text-white/60 mt-0.5">
                      Registrado el {new Date(selectedStudent.profile.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedStudent(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6 overflow-y-auto flex-1">
                {/* Academic Metrics Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 text-center">
                    <span className="text-[10px] text-zinc-400 font-black uppercase block">Lecciones Aprobadas</span>
                    <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">
                      {selectedStudent.progress.completedLessons?.length || 0}
                    </span>
                    <span className="text-[11px] text-zinc-400 block font-bold">
                      de {totalCourseLessonsCount} totales
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 text-center">
                    <span className="text-[10px] text-zinc-400 font-black uppercase block">Examen Final A1</span>
                    <span className={`text-xl font-black ${selectedStudent.progress.examPassed ? 'text-emerald-600' : 'text-amber-500'}`}>
                      {selectedStudent.progress.examScore !== undefined ? `${selectedStudent.progress.examScore}%` : 'Pendiente'}
                    </span>
                    <span className="text-[11px] text-zinc-400 block font-bold">
                      {selectedStudent.progress.examPassed ? 'Aprobado con Certificado' : 'Sin presentar'}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 text-center">
                    <span className="text-[10px] text-zinc-400 font-black uppercase block">Vocabulario Dominado</span>
                    <span className="text-xl font-black text-purple-600 dark:text-purple-400">
                      {selectedStudent.progress.masteredWords?.length || 0}
                    </span>
                    <span className="text-[11px] text-zinc-400 block font-bold">Palabras activas</span>
                  </div>
                </div>

                {/* List of completed lessons breakdown */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-indigo-500" />
                      Historial de Lecciones ({selectedStudent.progress.completedLessons?.length || 0})
                    </h4>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-2 max-h-36 overflow-y-auto">
                    {selectedStudent.progress.completedLessons && selectedStudent.progress.completedLessons.length > 0 ? (
                      selectedStudent.progress.completedLessons.map((lid) => (
                        <span
                          key={lid}
                          className="px-2.5 py-1 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 text-xs font-extrabold flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                          Lección {lid.replace('l', '').replace('es_', 'ES-')}
                        </span>
                      ))
                    ) : (
                      <p className="text-xs text-zinc-400 font-medium italic">
                        El estudiante aún no ha completado ninguna lección.
                      </p>
                    )}
                  </div>
                </div>

                {/* Teacher Pedagogical Observation & Notes */}
                <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-amber-500" />
                      Observaciones y Retroalimentación del Docente
                    </h4>
                    {notesSuccess && (
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> ¡Guardado!
                      </span>
                    )}
                  </div>

                  <textarea
                    rows={3}
                    value={editingNotes}
                    onChange={(e) => setEditingNotes(e.target.value)}
                    placeholder="Escribe comentarios sobre la pronunciación, debilidades o fortalezas de este alumno..."
                    className="w-full p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />

                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveNotes}
                      disabled={isSavingNotes}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-zinc-950 font-black text-xs shadow-sm flex items-center gap-1.5 transition-all"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{isSavingNotes ? 'Guardando...' : 'Guardar Observación'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/60 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="px-5 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-xs"
                >
                  Cerrar Expediente
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SQL SETUP MODAL */}
      <AnimatePresence>
        {showSqlModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white dark:bg-zinc-900 rounded-3xl max-w-2xl w-full shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="p-5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Database className="w-6 h-6" />
                  <div>
                    <h3 className="text-base font-black">Configuración de Supabase SQL</h3>
                    <p className="text-xs text-white/80">Tablas automáticas para perfiles y progreso de alumnos</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSqlModal(false)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4 overflow-y-auto flex-1">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Instrucciones rápidas para el profesor:</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-zinc-600 dark:text-zinc-400 font-medium">
                    <li>Copia el script SQL a continuación con el botón verde.</li>
                    <li>Ve al panel de tu proyecto en Supabase → <strong>SQL Editor</strong>.</li>
                    <li>Pega el código y presiona <strong>RUN</strong>. ¡Las tablas quedarán listas al instante!</li>
                  </ol>
                </div>

                <div className="relative">
                  <pre className="p-4 rounded-2xl bg-zinc-950 text-emerald-400 font-mono text-xs overflow-x-auto max-h-60 border border-zinc-800">
                    {SUPABASE_SQL_SETUP_SCRIPT}
                  </pre>
                  <button
                    onClick={handleCopySql}
                    className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? '¡Copiado!' : 'Copiar SQL'}</span>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-zinc-50 dark:bg-zinc-800 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                <button
                  onClick={() => setShowSqlModal(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-xs"
                >
                  Entendido
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
