import React, { useState, useEffect } from 'react';
import { StudentRecord, UserProfile } from '../types';
import {
  fetchAllUsersForTeacherDashboard,
  updateStudentTeacherNotes,
  authorizeTeacherByMaster,
  setTeacherAuthorizationStatus,
  deleteUserRecordFromDatabase,
  SUPABASE_SQL_SETUP_SCRIPT
} from '../lib/supabase';
import { MASTER_TEACHER_EMAIL, isMasterTeacherEmail } from '../lib/security';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  GraduationCap,
  Trophy,
  Search,
  Download,
  CheckCircle2,
  BookOpen,
  ArrowUpDown,
  MessageSquare,
  Save,
  X,
  Database,
  Copy,
  Check,
  ChevronRight,
  ShieldCheck,
  Zap,
  BarChart3,
  UserPlus,
  Lock,
  Trash2,
  Ban,
  Flame
} from 'lucide-react';

interface TeacherDashboardViewProps {
  currentUser: UserProfile | null;
  onNavigateToStudentView: () => void;
  totalCourseLessonsCount?: number;
}

export function TeacherDashboardView({
  currentUser,
  onNavigateToStudentView,
  totalCourseLessonsCount = 71
}: TeacherDashboardViewProps) {
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [teachersAndRequests, setTeachersAndRequests] = useState<UserProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'passed_exam' | 'high_progress' | 'low_progress'
  >('all');
  const [sortBy, setSortBy] = useState<
    'last_active' | 'progress' | 'xp' | 'exam_score' | 'name'
  >('last_active');
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [editingNotes, setEditingNotes] = useState<string>('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notesSuccess, setNotesSuccess] = useState(false);
  const [showSqlModal, setShowSqlModal] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Authorize New Teacher Modal (Only available to Master Teacher spacio.n.blnco@gmail.com)
  const [showAuthorizeTeacherModal, setShowAuthorizeTeacherModal] = useState(false);
  const [newTeacherName, setNewTeacherName] = useState('');
  const [newTeacherEmail, setNewTeacherEmail] = useState('');
  const [newTeacherPin, setNewTeacherPin] = useState('DOCENTE2026');
  const [isCreatingTeacher, setIsCreatingTeacher] = useState(false);
  const [teacherCreatedToast, setTeacherCreatedToast] = useState<string | null>(null);

  const isMaster = isMasterTeacherEmail(currentUser?.email);
  const isAuthorizedTeacher =
    currentUser?.role === 'teacher' &&
    (isMaster || currentUser?.authorizedTeacherByMaster === true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const res = await fetchAllUsersForTeacherDashboard();
      setStudents(res.students);
      setTeachersAndRequests(res.teachersAndRequests);
      setIsLoading(false);
    }
    if (isAuthorizedTeacher) {
      loadData();
    }
  }, [isAuthorizedTeacher]);

  useEffect(() => {
    if (selectedStudent) {
      setEditingNotes(selectedStudent.profile.notesFromTeacher || '');
      setNotesSuccess(false);
    }
  }, [selectedStudent]);

  if (!isAuthorizedTeacher) {
    return (
      <div className="max-w-2xl mx-auto my-16 p-8 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-slate-900 shadow-[6px_6px_0px_0px_#0f172a] text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-rose-200 border-2 border-slate-900 flex items-center justify-center mx-auto">
          <Lock className="w-7 h-7 text-slate-950" />
        </div>
        <h2 className="text-2xl font-black text-slate-950 dark:text-white">
          Acceso Reservado a Profesores Autorizados
        </h2>
        <p className="text-sm font-semibold text-slate-600 dark:text-zinc-400">
          Ningún profesor puede registrarse o acceder al Panel Docente sin la autorización directa
          del Profesor Titular (<strong>{MASTER_TEACHER_EMAIL}</strong>).
        </p>
        <button
          type="button"
          onClick={onNavigateToStudentView}
          className="px-6 py-3 rounded-xl bg-yellow-300 text-slate-950 border-2 border-slate-900 font-black text-xs shadow-[3px_3px_0px_0px_#0f172a]"
        >
          Volver a Mi Ruta de Estudio
        </button>
      </div>
    );
  }

  const handleAuthorizeNewTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacherName.trim() || !newTeacherEmail.trim() || !newTeacherPin.trim()) return;
    setIsCreatingTeacher(true);
    try {
      const created = await authorizeTeacherByMaster({
        fullName: newTeacherName,
        email: newTeacherEmail,
        accessPin: newTeacherPin
      });

      setTeachersAndRequests(prev => {
        const filtered = prev.filter(t => t.id !== created.id && t.email !== created.email);
        return [created, ...filtered];
      });

      setTeacherCreatedToast(
        `Profesor autorizado: ${created.fullName} | Correo: ${created.email} | Clave: ${created.accessPin}`
      );
      setNewTeacherName('');
      setNewTeacherEmail('');
    } finally {
      setIsCreatingTeacher(false);
    }
  };

  const handleToggleTeacherApproval = async (
    teacherUser: UserProfile,
    approve: boolean
  ) => {
    await setTeacherAuthorizationStatus(teacherUser.id, approve);
    setTeachersAndRequests(prev =>
      prev.map(t =>
        t.id === teacherUser.id
          ? {
              ...t,
              role: approve ? 'teacher' : 'student',
              authorizedTeacherByMaster: approve,
              enrollmentStatus: 'approved'
            }
          : t
      )
    );
  };

  const handleDeleteTeacherRequest = async (userId: string) => {
    await deleteUserRecordFromDatabase(userId);
    setTeachersAndRequests(prev => prev.filter(t => t.id !== userId));
  };

  const handleSaveNotes = async () => {
    if (!selectedStudent) return;
    setIsSavingNotes(true);
    await updateStudentTeacherNotes(selectedStudent.profile.id, editingNotes);

    setStudents(prev =>
      prev.map(s => {
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
      })
    );

    setSelectedStudent({
      ...selectedStudent,
      profile: {
        ...selectedStudent.profile,
        notesFromTeacher: editingNotes
      }
    });

    setIsSavingNotes(false);
    setNotesSuccess(true);
    setTimeout(() => setNotesSuccess(false), 2500);
  };

  const pendingTeacherRequests = teachersAndRequests.filter(
    t => !t.authorizedTeacherByMaster
  );
  const activeAuthorizedTeachers = teachersAndRequests.filter(
    t => t.authorizedTeacherByMaster
  );

  const filteredStudents = students
    .filter(s => {
      const matchesSearch =
        s.profile.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.profile.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.profile.studentIdNumber &&
          s.profile.studentIdNumber.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      const progressPct = Math.round(
        ((s.progress.completedLessons?.length || 0) / totalCourseLessonsCount) * 100
      );

      if (filterStatus === 'passed_exam') return s.progress.examPassed;
      if (filterStatus === 'low_progress') return progressPct < 30;
      if (filterStatus === 'high_progress') return progressPct >= 60;

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'last_active') {
        return (
          new Date(b.profile.lastActiveAt).getTime() -
          new Date(a.profile.lastActiveAt).getTime()
        );
      }
      if (sortBy === 'progress') {
        return (
          (b.progress.completedLessons?.length || 0) -
          (a.progress.completedLessons?.length || 0)
        );
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

  const totalStudentsCount = students.length;
  const examPassedCount = students.filter(s => s.progress.examPassed).length;
  const totalCompletedLessonsAll = students.reduce(
    (acc, s) => acc + (s.progress.completedLessons?.length || 0),
    0
  );
  const avgProgressPct =
    totalStudentsCount > 0
      ? Math.round(
          (totalCompletedLessonsAll / (totalStudentsCount * totalCourseLessonsCount)) * 100
        )
      : 0;
  const totalGroupXP = students.reduce((acc, s) => acc + (s.progress.xp || 0), 0);

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
      'Examen A1 Aprobado',
      'Calificación Examen (%)',
      'Observaciones Docente'
    ];

    const rows = students.map(s => {
      const pct = Math.round(
        ((s.progress.completedLessons?.length || 0) / totalCourseLessonsCount) * 100
      );
      return [
        `"${s.profile.id}"`,
        `"${s.profile.fullName}"`,
        `"${s.profile.email}"`,
        `"${s.profile.studentIdNumber || 'N/A'}"`,
        s.progress.completedLessons?.length || 0,
        `${pct}%`,
        s.progress.masteredWords?.length || 0,
        s.progress.xp || 0,
        s.progress.examPassed ? 'SÍ' : 'NO',
        s.progress.examScore !== undefined ? `${s.progress.examScore}%` : 'Pendiente',
        `"${(s.profile.notesFromTeacher || '').replace(/"/g, '""')}"`
      ];
    });

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Reporte_Estudiantes_CesarTeach_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP_SCRIPT);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-indigo-950 text-white border-2 border-slate-900 shadow-[6px_6px_0px_0px_#0f172a]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-yellow-300 text-slate-950 border-2 border-slate-900 text-xs font-black">
              <ShieldCheck className="w-4 h-4" />
              <span>
                {isMaster
                  ? `Profesor Titular Administrador (${MASTER_TEACHER_EMAIL})`
                  : `Profesor Autorizado por ${MASTER_TEACHER_EMAIL}`}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white font-display">
              Panel de Supervisión de Alumnos y Permisos de Profesores
            </h1>
            <p className="text-sm text-indigo-100 max-w-2xl font-medium">
              Los alumnos pueden registrarse libremente para estudiar. Ningún profesor puede
              registrarse sin tu autorización directa.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {isMaster && (
              <button
                type="button"
                onClick={() => {
                  setTeacherCreatedToast(null);
                  setShowAuthorizeTeacherModal(true);
                }}
                className="px-4 py-3 rounded-xl bg-yellow-300 hover:bg-yellow-400 text-slate-950 border-2 border-slate-900 font-black text-xs shadow-[3px_3px_0px_0px_#0f172a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>+ Autorizar Nuevo Profesor</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleExportCSV}
              className="px-4 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-500 text-slate-950 border-2 border-slate-900 font-black text-xs shadow-[3px_3px_0px_0px_#0f172a] transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Exportar Calificaciones (CSV)</span>
            </button>

            <button
              type="button"
              onClick={() => setShowSqlModal(true)}
              className="px-3.5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border-2 border-slate-900 text-xs font-bold transition-all flex items-center gap-2"
            >
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Reglas Firebase</span>
            </button>

            <button
              type="button"
              onClick={onNavigateToStudentView}
              className="px-4 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 border-2 border-slate-900 font-black text-xs shadow-[3px_3px_0px_0px_#0f172a] transition-all flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Ver Vista Alumno</span>
            </button>
          </div>
        </div>
      </div>

      {/* MASTER TEACHER ONLY: Teacher Authorization & Pending Teacher Requests Strip */}
      {isMaster && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left (6 cols): Pending Teacher Requests */}
          <div className="lg:col-span-6 p-5 rounded-3xl bg-amber-100 dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-900 dark:text-amber-400" />
                <span className="text-xs font-black text-amber-950 dark:text-amber-300 uppercase">
                  Solicitudes para ser Profesor (Requieren tu Permiso)
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-lg bg-white text-slate-950 border-2 border-slate-900 font-black text-xs">
                {pendingTeacherRequests.length} pendientes
              </span>
            </div>

            {pendingTeacherRequests.length === 0 ? (
              <p className="text-xs font-semibold text-slate-700 dark:text-zinc-400 py-3">
                Nadie ha solicitado permiso de profesor recientemente. Cualquier persona que
                intente registrarse como profesor quedará bloqueada aquí hasta que la autorices.
              </p>
            ) : (
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1 mt-2">
                {pendingTeacherRequests.map(req => (
                  <div
                    key={req.id}
                    className="p-3 rounded-xl bg-white dark:bg-zinc-800 border-2 border-slate-900 flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-black text-slate-950 dark:text-white truncate">
                        {req.fullName}
                      </p>
                      <p className="text-[11px] font-semibold text-slate-600 dark:text-zinc-400 truncate">
                        {req.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleToggleTeacherApproval(req, true)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-500 text-slate-950 border border-slate-900 font-black text-[11px]"
                      >
                        ✓ Autorizar Profesor
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteTeacherRequest(req.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-200 hover:bg-rose-300 text-slate-950 border border-slate-900 font-black text-[11px]"
                        title="Rechazar solicitud"
                      >
                        ✕ Rechazar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right (6 cols): Active Authorized Co-Teachers */}
          <div className="lg:col-span-6 p-5 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-black text-slate-900 dark:text-white uppercase">
                  Profesores Autorizados por Ti
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-lg bg-indigo-100 text-slate-950 border border-slate-900 font-black text-xs">
                1 Titular + {activeAuthorizedTeachers.length} invitados
              </span>
            </div>

            {activeAuthorizedTeachers.length === 0 ? (
              <p className="text-xs font-semibold text-slate-600 dark:text-zinc-400 py-3">
                Actualmente <strong>solo tú ({MASTER_TEACHER_EMAIL})</strong> tienes acceso de
                Profesor. Si deseas autorizar a otro docente, usa el botón «+ Autorizar Nuevo
                Profesor».
              </p>
            ) : (
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1 mt-2">
                {activeAuthorizedTeachers.map(tch => (
                  <div
                    key={tch.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border-2 border-slate-900 flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-black text-slate-950 dark:text-white truncate">
                        {tch.fullName}
                      </p>
                      <p className="text-[11px] font-semibold text-slate-600 dark:text-zinc-400 truncate">
                        {tch.email} {tch.accessPin ? `· Clave: ${tch.accessPin}` : ''}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleTeacherApproval(tch, false)}
                      className="px-3 py-1.5 rounded-lg bg-rose-200 hover:bg-rose-300 text-slate-950 border border-slate-900 font-black text-[11px] flex items-center gap-1 shrink-0"
                    >
                      <Ban className="w-3 h-3" />
                      <span>Quitar Permiso</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Analytics Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a]">
          <div className="flex items-center justify-between text-slate-600 dark:text-zinc-400 mb-1">
            <span className="text-xs font-black uppercase">Alumnos Registrados</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-black text-slate-950 dark:text-zinc-100 tabular-nums">
            {totalStudentsCount}
          </p>
          <p className="text-[11px] font-bold text-emerald-700">Sincronizados en Firebase</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a]">
          <div className="flex items-center justify-between text-slate-600 dark:text-zinc-400 mb-1">
            <span className="text-xs font-black uppercase">Avance Promedio</span>
            <BarChart3 className="w-4 h-4 text-sky-600" />
          </div>
          <p className="text-2xl font-black text-slate-950 dark:text-zinc-100 tabular-nums">
            {avgProgressPct}%
          </p>
          <p className="text-[11px] font-bold text-slate-500">Del currículo MCER A1–B2</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a]">
          <div className="flex items-center justify-between text-slate-600 dark:text-zinc-400 mb-1">
            <span className="text-xs font-black uppercase">Alumnos Certificados</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-slate-950 dark:text-zinc-100 tabular-nums">
            {examPassedCount} / {totalStudentsCount}
          </p>
          <p className="text-[11px] font-bold text-amber-700">Exámenes ≥80%</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a]">
          <div className="flex items-center justify-between text-slate-600 dark:text-zinc-400 mb-1">
            <span className="text-xs font-black uppercase">XP del Grupo</span>
            <Zap className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-black text-slate-950 dark:text-zinc-100 tabular-nums">
            {totalGroupXP.toLocaleString()}
          </p>
          <p className="text-[11px] font-bold text-purple-700">Puntos acumulados</p>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a] flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar alumno por nombre, correo o matrícula..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border-2 border-slate-900 dark:border-zinc-700 text-sm font-bold text-slate-900 dark:text-zinc-100"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-800 p-1 rounded-xl border-2 border-slate-900 text-xs font-black">
            <button
              type="button"
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterStatus === 'all' ? 'bg-yellow-300 text-slate-950' : 'text-slate-600'
              }`}
            >
              Todos ({students.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus('passed_exam')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterStatus === 'passed_exam'
                  ? 'bg-emerald-300 text-slate-950'
                  : 'text-slate-600'
              }`}
            >
              Certificados
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus('high_progress')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterStatus === 'high_progress'
                  ? 'bg-sky-300 text-slate-950'
                  : 'text-slate-600'
              }`}
            >
              Avanzados (+60%)
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus('low_progress')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterStatus === 'low_progress'
                  ? 'bg-rose-300 text-slate-950'
                  : 'text-slate-600'
              }`}
            >
              Bajo Avance
            </button>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800 border-2 border-slate-900 text-xs font-black">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-transparent text-slate-900 dark:text-zinc-200 font-black focus:outline-none cursor-pointer"
            >
              <option value="last_active">Reciente</option>
              <option value="progress">Mayor Avance</option>
              <option value="exam_score">Nota Examen</option>
              <option value="xp">Mayor XP</option>
              <option value="name">Alfabético</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student List Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border-2 border-slate-900 dark:border-zinc-700 shadow-[6px_6px_0px_0px_#0f172a] overflow-hidden">
        <div className="p-5 border-b-2 border-slate-900 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-slate-950 dark:text-zinc-100">
              Expediente Académico de Alumnos ({filteredStudents.length})
            </h2>
            <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400">
              Haz clic en cualquier alumno para ver su desglose por nivel MCER (A1–B2) y dejarle
              indicaciones de prioridad.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="py-16 text-center text-sm font-black text-slate-500">
            Cargando expedientes desde Firebase Cloud Firestore...
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <Users className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-sm font-black text-slate-600 dark:text-zinc-400">
              No se encontraron alumnos con los filtros seleccionados.
            </p>
          </div>
        ) : (
          <div className="divide-y-2 divide-slate-900/10 dark:divide-zinc-800">
            {filteredStudents.map(st => {
              const completedCount = st.progress.completedLessons?.length || 0;
              const progressPct = Math.round((completedCount / totalCourseLessonsCount) * 100);
              const badges = st.progress.unlockedBadges || [];
              const certs = [
                st.progress.examPassed || badges.includes('b_cert_a1') ? 'A1' : null,
                badges.includes('b_cert_a2') ? 'A2' : null,
                badges.includes('b_cert_b1') ? 'B1' : null,
                badges.includes('b_cert_b2') ? 'B2' : null
              ].filter(Boolean);

              return (
                <div
                  key={st.profile.id}
                  onClick={() => setSelectedStudent(st)}
                  className="p-4 sm:p-5 hover:bg-yellow-50/60 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-[230px]">
                    <div className="w-11 h-11 rounded-2xl bg-yellow-300 text-slate-950 border-2 border-slate-900 font-black text-sm flex items-center justify-center shrink-0">
                      {st.profile.fullName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-black text-slate-950 dark:text-zinc-100">
                          {st.profile.fullName}
                        </h3>
                        {st.profile.studentIdNumber && (
                          <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-zinc-800 text-[10px] font-black text-slate-600">
                            {st.profile.studentIdNumber}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-zinc-400 font-bold">
                        {st.profile.email}
                      </p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="flex-1 max-w-xs space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-black">
                      <span className="text-slate-700 dark:text-zinc-300">
                        {completedCount} de {totalCourseLessonsCount} lecciones
                      </span>
                      <span className="text-indigo-600 dark:text-indigo-400">{progressPct}%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden border border-slate-900/20">
                      <div
                        className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(progressPct, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Exam & XP Stats */}
                  <div className="flex items-center gap-4 text-xs">
                    <div className="text-center min-w-[100px]">
                      <span className="text-[10px] text-slate-400 font-black block uppercase">
                        Certificados
                      </span>
                      {certs.length > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-300 text-slate-950 border border-slate-900 font-black text-xs">
                          {certs.join(' · ')}
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-slate-500">En curso</span>
                      )}
                    </div>

                    <div className="text-center min-w-[70px]">
                      <span className="text-[10px] text-slate-400 font-black block uppercase">
                        Puntos
                      </span>
                      <span className="font-black text-purple-600 dark:text-purple-400 text-xs">
                        {st.progress.xp} XP
                      </span>
                    </div>

                    <div className="text-center min-w-[60px]">
                      <span className="text-[10px] text-slate-400 font-black block uppercase">
                        Racha
                      </span>
                      <span className="font-black text-orange-500 text-xs inline-flex items-center gap-0.5">
                        <Flame className="w-3.5 h-3.5 fill-orange-500" />
                        {st.progress.streakDays}d
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white border-2 border-slate-900">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL: AUTHORIZE NEW TEACHER (ONLY FOR MASTER TEACHER spacio.n.blnco@gmail.com) */}
      <AnimatePresence>
        {showAuthorizeTeacherModal && isMaster && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white dark:bg-zinc-900 rounded-3xl max-w-lg w-full border-2 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a] overflow-hidden"
            >
              <div className="p-6 bg-yellow-300 text-slate-950 border-b-2 border-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white border-2 border-slate-900">
                    <ShieldCheck className="w-5 h-5 text-slate-950" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black">Autorizar Nuevo Profesor</h3>
                    <p className="text-xs font-bold text-slate-800">
                      Ningún profesor puede registrarse sin tu autorización
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAuthorizeTeacherModal(false)}
                  className="p-1.5 rounded-xl bg-white border-2 border-slate-900 text-slate-950"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAuthorizeNewTeacher} className="p-6 space-y-4">
                {teacherCreatedToast && (
                  <div className="p-3.5 rounded-2xl bg-emerald-200 border-2 border-slate-900 text-slate-950 text-xs font-bold space-y-2">
                    <div className="flex items-center gap-1.5 font-black">
                      <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                      <span>¡Profesor Autorizado en Firebase!</span>
                    </div>
                    <p className="font-mono text-[11px] bg-white p-2 rounded-lg border border-slate-900">
                      {teacherCreatedToast}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-black text-slate-900 dark:text-zinc-200 mb-1">
                    Nombre Completo del Profesor *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTeacherName}
                    onChange={e => setNewTeacherName(e.target.value)}
                    placeholder="Ej. Prof. Ana Martínez"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border-2 border-slate-900 text-xs font-bold text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-900 dark:text-zinc-200 mb-1">
                    Correo Electrónico del Profesor *
                  </label>
                  <input
                    type="email"
                    required
                    value={newTeacherEmail}
                    onChange={e => setNewTeacherEmail(e.target.value)}
                    placeholder="profesor@correo.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border-2 border-slate-900 text-xs font-bold text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-900 dark:text-zinc-200 mb-1">
                    Clave de Acceso Asignada *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTeacherPin}
                    onChange={e => setNewTeacherPin(e.target.value)}
                    placeholder="Ej. DOCENTE2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border-2 border-slate-900 text-xs font-bold text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAuthorizeTeacherModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-800 border-2 border-slate-900 font-black text-xs"
                  >
                    Cerrar
                  </button>
                  <button
                    type="submit"
                    disabled={isCreatingTeacher}
                    className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-500 text-slate-950 border-2 border-slate-900 font-black text-xs shadow-[3px_3px_0px_0px_#0f172a]"
                  >
                    {isCreatingTeacher ? 'Autorizando...' : '✓ Autorizar Profesor'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* STUDENT DETAIL MODAL */}
      <AnimatePresence>
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white dark:bg-zinc-900 rounded-3xl max-w-2xl w-full shadow-2xl border-2 border-slate-900 dark:border-zinc-700 overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="p-6 bg-indigo-600 text-white border-b-2 border-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-yellow-300 text-slate-950 border-2 border-slate-900 font-black text-xl flex items-center justify-center">
                    {selectedStudent.profile.fullName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-black">{selectedStudent.profile.fullName}</h2>
                      {selectedStudent.profile.studentIdNumber && (
                        <span className="px-2.5 py-0.5 rounded-lg bg-white/20 text-xs font-bold">
                          {selectedStudent.profile.studentIdNumber}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-indigo-100 font-semibold">
                      {selectedStudent.profile.email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedStudent(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto flex-1">
                {/* Multi-level CEFR Exam Breakdown */}
                <div className="grid grid-cols-4 gap-2">
                  {(['A1', 'A2', 'B1', 'B2'] as const).map(lvl => {
                    const score =
                      selectedStudent.progress.levelScores?.[lvl] ??
                      (lvl === 'A1' ? selectedStudent.progress.examScore : undefined);
                    const isCert =
                      (lvl === 'A1' && selectedStudent.progress.examPassed) ||
                      (selectedStudent.progress.unlockedBadges || []).includes(
                        `b_cert_${lvl.toLowerCase()}`
                      );
                    return (
                      <div
                        key={lvl}
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-800/40 border-2 border-slate-900 text-center"
                      >
                        <span className="text-[10px] font-black text-slate-500 uppercase block">
                          Examen {lvl}
                        </span>
                        <span
                          className={`text-sm font-black ${
                            isCert ? 'text-emerald-600' : 'text-slate-600'
                          }`}
                        >
                          {score !== undefined ? `${score}%` : '—'}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 block">
                          {isCert ? 'Certificado' : 'Pendiente'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Completed Lessons */}
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    Lecciones Completadas ({selectedStudent.progress.completedLessons?.length || 0})
                  </h4>
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-800/40 border-2 border-slate-900 flex flex-wrap gap-2 max-h-36 overflow-y-auto">
                    {selectedStudent.progress.completedLessons &&
                    selectedStudent.progress.completedLessons.length > 0 ? (
                      selectedStudent.progress.completedLessons.map(lid => (
                        <span
                          key={lid}
                          className="px-2.5 py-1 rounded-xl bg-indigo-100 text-slate-950 border border-slate-900 text-xs font-black flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                          {lid.toUpperCase()}
                        </span>
                      ))
                    ) : (
                      <p className="text-xs text-slate-500 font-semibold">
                        Aún no ha completado lecciones.
                      </p>
                    )}
                  </div>
                </div>

                {/* Teacher Notes */}
                <div className="space-y-2 pt-2 border-t-2 border-slate-900/10">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-amber-500" />
                      Indicaciones de Prioridad y Retroalimentación del Profesor
                    </h4>
                    {notesSuccess && (
                      <span className="text-xs font-black text-emerald-600 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> ¡Guardado!
                      </span>
                    )}
                  </div>

                  <textarea
                    rows={3}
                    value={editingNotes}
                    onChange={e => setEditingNotes(e.target.value)}
                    placeholder="Escribe qué prioridad debe seguir este alumno (aparecerá arriba en su pantalla de inicio)..."
                    className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-800 border-2 border-slate-900 text-xs font-bold text-slate-900 dark:text-zinc-100"
                  />

                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveNotes}
                      disabled={isSavingNotes}
                      className="px-4 py-2 rounded-xl bg-yellow-300 hover:bg-yellow-400 text-slate-950 border-2 border-slate-900 font-black text-xs flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{isSavingNotes ? 'Guardando...' : 'Guardar Indicación'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FIREBASE SCHEMA MODAL */}
      <AnimatePresence>
        {showSqlModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white dark:bg-zinc-900 rounded-3xl max-w-2xl w-full border-2 border-slate-900 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="p-5 bg-emerald-600 text-white flex items-center justify-between border-b-2 border-slate-900">
                <div className="flex items-center gap-3">
                  <Database className="w-6 h-6" />
                  <div>
                    <h3 className="text-base font-black">
                      Arquitectura y Reglas de Permiso en Firebase Firestore
                    </h3>
                    <p className="text-xs text-white/90">
                      Profesor Titular: {MASTER_TEACHER_EMAIL}
                    </p>
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
                <div className="relative">
                  <pre className="p-4 rounded-2xl bg-zinc-950 text-emerald-400 font-mono text-xs overflow-x-auto max-h-72 border-2 border-slate-900">
                    {SUPABASE_SQL_SETUP_SCRIPT}
                  </pre>
                  <button
                    onClick={handleCopySql}
                    className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs flex items-center gap-1.5"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? '¡Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
