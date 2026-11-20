import {
  UserProfile,
  UserProgress,
  StudentRecord,
  UserRole,
  CEFRLevel,
  EnrollmentStatus
} from '../types';
import {
  db,
  auth,
  googleProvider,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
  getDocFromServer,
  signInWithPopup,
  firebaseSignOut,
  handleFirestoreError,
  OperationType
} from './firebase';
import { MASTER_TEACHER_EMAIL, isMasterTeacherEmail } from './security';
import firebaseConfig from '../../firebase-applet-config.json';

export const isSupabaseConfigured = Boolean(firebaseConfig.projectId && firebaseConfig.firestoreDatabaseId);

export function getSupabaseCredentials(): { url: string; anonKey: string; isCustom: boolean } {
  return {
    url: `firestore://${firebaseConfig.projectId}/${firebaseConfig.firestoreDatabaseId}`,
    anonKey: firebaseConfig.apiKey,
    isCustom: false
  };
}

export function saveCustomSupabaseCredentials(_url: string, _anonKey: string) {}

export function getSupabaseClient(): null {
  return null;
}

export const supabase = null;

export async function testSupabaseConnection(): Promise<{
  connected: boolean;
  status: 'connected' | 'not_configured' | 'error';
  message: string;
  url?: string;
  latencyMs?: number;
}> {
  const start = performance.now();
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    const latencyMs = Math.round(performance.now() - start);
    return {
      connected: true,
      status: 'connected',
      message: `¡Conexión a Firebase Firestore activa y verificada! (${latencyMs}ms)`,
      url: `${firebaseConfig.projectId} (${firebaseConfig.firestoreDatabaseId})`,
      latencyMs
    };
  } catch (err: any) {
    const latencyMs = Math.round(performance.now() - start);
    return {
      connected: false,
      status: 'error',
      message: `Error al conectar con Firebase Firestore: ${err.message || err}`,
      url: firebaseConfig.projectId,
      latencyMs
    };
  }
}

const LOCAL_STORAGE_STUDENTS_KEY = 'lingostep_students_records_v2';
const LOCAL_STORAGE_CURRENT_USER_KEY = 'lingostep_current_user_v2';

export function getLocalStudents(): StudentRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_STUDENTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function saveLocalStudents(students: StudentRecord[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_STUDENTS_KEY, JSON.stringify(students));
  } catch (e) {
    console.error('Error saving local students:', e);
  }
}

export function getStoredCurrentUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_CURRENT_USER_KEY);
    if (!raw) return null;
    const parsed: UserProfile = JSON.parse(raw);
    // Security check: Nobody can hold role === 'teacher' unless they are spacio.n.blnco@gmail.com OR explicitly authorizedTeacherByMaster === true
    if (
      parsed.role === 'teacher' &&
      !isMasterTeacherEmail(parsed.email) &&
      !parsed.authorizedTeacherByMaster
    ) {
      localStorage.removeItem(LOCAL_STORAGE_CURRENT_USER_KEY);
      return null;
    }
    return parsed;
  } catch (e) {
    return null;
  }
}

export function setStoredCurrentUser(user: UserProfile | null) {
  try {
    if (user) {
      const isAllowedTeacher =
        isMasterTeacherEmail(user.email) ||
        (user.role === 'teacher' && user.authorizedTeacherByMaster === true);
      const sanitizedRole: UserRole = isAllowedTeacher ? 'teacher' : 'student';
      const sanitizedUser: UserProfile = {
        ...user,
        role: sanitizedRole,
        authorizedTeacherByMaster: isAllowedTeacher
      };
      localStorage.setItem(LOCAL_STORAGE_CURRENT_USER_KEY, JSON.stringify(sanitizedUser));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_CURRENT_USER_KEY);
      firebaseSignOut(auth).catch(() => {});
    }
  } catch (e) {
    console.error('Error updating current stored user:', e);
  }
}

function buildAcademicTelemetry(progress: UserProgress) {
  const completed = Array.isArray(progress.completedLessons) ? progress.completedLessons : [];
  const badges = Array.isArray(progress.unlockedBadges) ? progress.unlockedBadges : [];
  const srs = progress.wordSRSStatus || {};

  const certifiedLevels: CEFRLevel[] = [];
  if (progress.examPassed || badges.includes('b_cert_a1')) certifiedLevels.push('A1');
  if (badges.includes('b_cert_a2')) certifiedLevels.push('A2');
  if (badges.includes('b_cert_b1')) certifiedLevels.push('B1');
  if (badges.includes('b_cert_b2')) certifiedLevels.push('B2');

  const lessonsByLevel = {
    A1: completed.filter(id => !id.includes('a2_') && !id.includes('b1_') && !id.includes('b2_')).length,
    A2: completed.filter(id => id.includes('a2_')).length,
    B1: completed.filter(id => id.includes('b1_')).length,
    B2: completed.filter(id => id.includes('b2_')).length
  };

  const srsValues = Object.values(srs);
  const srsBreakdown = {
    easy: srsValues.filter(v => v === 'easy').length,
    good: srsValues.filter(v => v === 'good').length,
    hard: srsValues.filter(v => v === 'hard').length
  };

  return {
    certifiedLevels,
    lessonsByLevel,
    srsBreakdown
  };
}

function mapDocToUserProfile(d: Record<string, any>): UserProfile {
  const email = (d.email || '').toLowerCase();
  const isAuthorizedTeacher =
    isMasterTeacherEmail(email) ||
    (d.role === 'teacher' && d.authorizedTeacherByMaster === true);
  const role: UserRole = isAuthorizedTeacher ? 'teacher' : 'student';
  const enrollmentStatus: EnrollmentStatus =
    d.enrollmentStatus === 'pending' || d.enrollmentStatus === 'revoked'
      ? d.enrollmentStatus
      : 'approved';

  return {
    id: d.id,
    email,
    fullName: d.fullName || email.split('@')[0] || 'Estudiante',
    role,
    requestedRole: d.requestedRole || undefined,
    authorizedTeacherByMaster: isAuthorizedTeacher,
    targetLanguage: d.targetLanguage || 'en',
    avatarUrl:
      d.avatarUrl ||
      `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
    studentIdNumber: d.studentIdNumber || undefined,
    notesFromTeacher: d.notesFromTeacher || undefined,
    enrollmentStatus,
    approvedByTeacher: enrollmentStatus === 'approved',
    accessPin: d.accessPin || undefined,
    createdAt: d.createdAt || new Date().toISOString(),
    lastActiveAt: d.lastActiveAt || new Date().toISOString()
  };
}

export async function fetchStudentProgressFromDatabase(userId: string): Promise<UserProgress | null> {
  if (!userId) return null;
  const path = `student_progress/${userId}`;
  try {
    const snap = await getDoc(doc(db, 'student_progress', userId));
    if (snap.exists()) {
      const data = snap.data();
      return {
        completedLessons: Array.isArray(data.completedLessons) ? data.completedLessons : [],
        masteredWords: Array.isArray(data.masteredWords) ? data.masteredWords : [],
        examScore: typeof data.examScore === 'number' ? data.examScore : undefined,
        examPassed: Boolean(data.examPassed),
        examPassedDate: data.examPassedDate || undefined,
        levelScores: typeof data.levelScores === 'object' && data.levelScores ? data.levelScores : {},
        xp: Number(data.xp || 0),
        streakDays: Number(data.streakDays || 1),
        lastStudyDate: data.lastStudyDate || new Date().toISOString().split('T')[0],
        unlockedBadges: Array.isArray(data.unlockedBadges) ? data.unlockedBadges : [],
        wordSRSStatus: typeof data.wordSRSStatus === 'object' && data.wordSRSStatus ? data.wordSRSStatus : {},
        lessonDates: typeof data.lessonDates === 'object' && data.lessonDates ? data.lessonDates : {},
        examHistory: Array.isArray(data.examHistory) ? data.examHistory : [],
        totalExercisesDone: Number(data.totalExercisesDone || 0),
        timeSpentMinutes: Number(data.timeSpentMinutes || 0)
      };
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, path);
  }
  return null;
}

export async function fetchStudentProfileFromDatabase(identifier: string): Promise<UserProfile | null> {
  if (!identifier) return null;
  const clean = identifier.trim().toLowerCase();

  try {
    // 1. Direct lookup by document ID
    const directSnap = await getDoc(doc(db, 'users', identifier.trim()));
    if (directSnap.exists()) {
      return mapDocToUserProfile(directSnap.data());
    }

    // 2. Lookup by email
    const emailQuery = query(collection(db, 'users'), where('email', '==', clean));
    const emailSnap = await getDocs(emailQuery);
    if (!emailSnap.empty) {
      return mapDocToUserProfile(emailSnap.docs[0].data());
    }

    // 3. Lookup by studentIdNumber
    const idQuery = query(
      collection(db, 'users'),
      where('studentIdNumber', '==', identifier.trim().toUpperCase())
    );
    const idSnap = await getDocs(idQuery);
    if (!idSnap.empty) {
      return mapDocToUserProfile(idSnap.docs[0].data());
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'users');
  }
  return null;
}

export async function syncStudentProgressToDatabase(
  user: UserProfile,
  progress: UserProgress,
  courseLanguage: 'en' | 'es'
): Promise<{ success: boolean; message?: string }> {
  if (!user || !user.id) {
    return { success: false, message: 'Usuario no identificado' };
  }

  const nowIso = new Date().toISOString();
  const isAuthorizedTeacher =
    isMasterTeacherEmail(user.email) ||
    (user.role === 'teacher' && user.authorizedTeacherByMaster === true);
  const enforcedRole: UserRole = isAuthorizedTeacher ? 'teacher' : 'student';

  const updatedProfile: UserProfile = {
    ...user,
    email: user.email.toLowerCase(),
    role: enforcedRole,
    authorizedTeacherByMaster: isAuthorizedTeacher,
    enrollmentStatus: user.enrollmentStatus || 'approved',
    approvedByTeacher: (user.enrollmentStatus || 'approved') === 'approved',
    targetLanguage: courseLanguage,
    lastActiveAt: nowIso
  };

  // 1. Update local cache immediately
  const students = getLocalStudents();
  const index = students.findIndex(
    s => s.profile.id === user.id || s.profile.email.toLowerCase() === user.email.toLowerCase()
  );

  const studentRecord: StudentRecord = {
    profile: updatedProfile,
    progress,
    courseLanguage
  };

  if (index >= 0) {
    students[index] = {
      ...students[index],
      profile: {
        ...updatedProfile,
        notesFromTeacher: updatedProfile.notesFromTeacher ?? students[index].profile.notesFromTeacher,
        accessPin: updatedProfile.accessPin ?? students[index].profile.accessPin
      },
      progress,
      courseLanguage
    };
  } else {
    students.unshift(studentRecord);
  }

  saveLocalStudents(students);
  try {
    localStorage.setItem(`lingostep_progress_${user.id}`, JSON.stringify(progress));
  } catch (e) {}

  // 2. Sync to Firebase Firestore
  try {
    const profileDoc: Record<string, any> = {
      id: user.id,
      email: user.email.toLowerCase(),
      fullName: user.fullName,
      role: enforcedRole,
      requestedRole: user.requestedRole || '',
      authorizedTeacherByMaster: isAuthorizedTeacher,
      enrollmentStatus: user.enrollmentStatus || 'approved',
      approvedByTeacher: (user.enrollmentStatus || 'approved') === 'approved',
      accessPin: user.accessPin || '',
      targetLanguage: courseLanguage,
      avatarUrl:
        user.avatarUrl ||
        `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.email)}`,
      studentIdNumber: user.studentIdNumber || '',
      notesFromTeacher: user.notesFromTeacher || '',
      createdAt: user.createdAt || nowIso,
      lastActiveAt: nowIso
    };

    await setDoc(doc(db, 'users', user.id), profileDoc, { merge: true });

    const telemetry = buildAcademicTelemetry(progress);
    const progressDoc: Record<string, any> = {
      userId: user.id,
      completedLessons: Array.isArray(progress.completedLessons) ? progress.completedLessons : [],
      masteredWords: Array.isArray(progress.masteredWords) ? progress.masteredWords : [],
      examScore: typeof progress.examScore === 'number' ? progress.examScore : 0,
      examPassed: Boolean(progress.examPassed),
      examPassedDate: progress.examPassedDate || '',
      levelScores: progress.levelScores || {},
      certifiedLevels: telemetry.certifiedLevels,
      lessonsByLevel: telemetry.lessonsByLevel,
      srsBreakdown: telemetry.srsBreakdown,
      xp: Number(progress.xp || 0),
      streakDays: Number(progress.streakDays || 1),
      lastStudyDate: progress.lastStudyDate || nowIso.split('T')[0],
      unlockedBadges: Array.isArray(progress.unlockedBadges) ? progress.unlockedBadges : [],
      wordSRSStatus: progress.wordSRSStatus || {},
      lessonDates: progress.lessonDates || {},
      examHistory: Array.isArray(progress.examHistory) ? progress.examHistory : [],
      courseLanguage,
      totalExercisesDone: Number(progress.totalExercisesDone || 0),
      timeSpentMinutes: Number(progress.timeSpentMinutes || 0),
      updatedAt: nowIso
    };

    await setDoc(doc(db, 'student_progress', user.id), progressDoc, { merge: true });

    return { success: true, message: 'Progreso sincronizado en Firebase Firestore.' };
  } catch (err: any) {
    handleFirestoreError(err, OperationType.WRITE, `student_progress/${user.id}`);
    return { success: false, message: 'Guardado localmente. Sincronización con Firebase pendiente.' };
  }
}

// Submit a Teacher Registration Request (Blocked until spacio.n.blnco@gmail.com approves it!)
export async function requestTeacherRegistration(params: {
  fullName: string;
  email: string;
  accessPin: string;
}): Promise<UserProfile> {
  const nowIso = new Date().toISOString();
  const cleanEmail = params.email.trim().toLowerCase();
  const cleanName = params.fullName.trim();

  if (isMasterTeacherEmail(cleanEmail)) {
    throw new Error(
      'Esta cuenta ya corresponde al Profesor Titular. Inicia sesión directamente con tu clave maestra o Google.'
    );
  }

  const existing = await fetchStudentProfileFromDatabase(cleanEmail);
  if (existing && existing.role === 'teacher' && existing.authorizedTeacherByMaster) {
    throw new Error('Este correo ya está autorizado como Profesor. Inicia sesión directamente.');
  }

  const userId =
    existing?.id || `tch_req_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;

  const pendingTeacherProfile: UserProfile = {
    id: userId,
    email: cleanEmail,
    fullName: cleanName,
    role: 'student', // Remains 'student' until Master Teacher approves!
    requestedRole: 'teacher',
    authorizedTeacherByMaster: false,
    enrollmentStatus: 'pending',
    approvedByTeacher: false,
    accessPin: params.accessPin.trim(),
    targetLanguage: 'en',
    avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(cleanName)}`,
    createdAt: existing?.createdAt || nowIso,
    lastActiveAt: nowIso
  };

  const emptyProgress: UserProgress = {
    completedLessons: [],
    masteredWords: [],
    examScore: undefined,
    examPassed: false,
    levelScores: {},
    xp: 0,
    streakDays: 1,
    lastStudyDate: nowIso.split('T')[0],
    unlockedBadges: [],
    wordSRSStatus: {},
    lessonDates: {},
    examHistory: [],
    totalExercisesDone: 0,
    timeSpentMinutes: 0
  };

  await syncStudentProgressToDatabase(pendingTeacherProfile, emptyProgress, 'en');
  return pendingTeacherProfile;
}

// Master Teacher (spacio.n.blnco@gmail.com) directly creates or authorizes a Teacher account
export async function authorizeTeacherByMaster(params: {
  fullName: string;
  email: string;
  accessPin: string;
}): Promise<UserProfile> {
  const nowIso = new Date().toISOString();
  const cleanEmail = params.email.trim().toLowerCase();
  const cleanName = params.fullName.trim();

  const existing = await fetchStudentProfileFromDatabase(cleanEmail);
  const teacherId =
    existing?.id || `tch_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;

  const profile: UserProfile = {
    id: teacherId,
    email: cleanEmail,
    fullName: cleanName,
    role: 'teacher',
    requestedRole: 'teacher',
    authorizedTeacherByMaster: true,
    enrollmentStatus: 'approved',
    approvedByTeacher: true,
    accessPin: params.accessPin.trim(),
    targetLanguage: existing?.targetLanguage || 'en',
    avatarUrl:
      existing?.avatarUrl ||
      `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(cleanName)}`,
    createdAt: existing?.createdAt || nowIso,
    lastActiveAt: nowIso
  };

  const existingProgress = existing ? await fetchStudentProgressFromDatabase(teacherId) : null;
  const initialProgress: UserProgress = existingProgress || {
    completedLessons: [],
    masteredWords: [],
    examScore: undefined,
    examPassed: false,
    levelScores: {},
    xp: 0,
    streakDays: 1,
    lastStudyDate: nowIso.split('T')[0],
    unlockedBadges: ['b_first_step'],
    wordSRSStatus: {},
    lessonDates: {},
    examHistory: [],
    totalExercisesDone: 0,
    timeSpentMinutes: 0
  };

  await syncStudentProgressToDatabase(profile, initialProgress, 'en');
  return profile;
}

// Master Teacher approves or revokes a Teacher's authorization
export async function setTeacherAuthorizationStatus(
  userId: string,
  authorizeAsTeacher: boolean
): Promise<boolean> {
  try {
    await updateDoc(doc(db, 'users', userId), {
      role: authorizeAsTeacher ? 'teacher' : 'student',
      requestedRole: authorizeAsTeacher ? 'teacher' : '',
      authorizedTeacherByMaster: authorizeAsTeacher,
      enrollmentStatus: 'approved',
      approvedByTeacher: true,
      lastActiveAt: new Date().toISOString()
    });
    return true;
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `users/${userId}`);
    return false;
  }
}

export async function deleteUserRecordFromDatabase(userId: string): Promise<boolean> {
  const students = getLocalStudents().filter(s => s.profile.id !== userId);
  saveLocalStudents(students);
  try {
    localStorage.removeItem(`lingostep_progress_${userId}`);
  } catch {}

  try {
    await deleteDoc(doc(db, 'users', userId));
    await deleteDoc(doc(db, 'student_progress', userId));
    return true;
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `users/${userId}`);
    return false;
  }
}

// Sign in with Google via Firebase Authentication:
// - Students register and sign in freely!
// - Teachers: Only spacio.n.blnco@gmail.com or users with authorizedTeacherByMaster === true get role === 'teacher'!
export async function signInWithGoogleFirebase(
  preferredLanguage: 'en' | 'es' = 'en',
  attemptingTeacherLogin: boolean = false
): Promise<{ profile: UserProfile; courseLanguage: 'en' | 'es' }> {
  const credential = await signInWithPopup(auth, googleProvider);
  const fbUser = credential.user;
  const nowIso = new Date().toISOString();
  const cleanEmail = (fbUser.email || '').trim().toLowerCase();

  // Check if profile already exists by UID or email
  let existingProfile = await fetchStudentProfileFromDatabase(fbUser.uid);
  if (!existingProfile && cleanEmail) {
    existingProfile = await fetchStudentProfileFromDatabase(cleanEmail);
  }

  const isMaster = isMasterTeacherEmail(cleanEmail);
  const isPreAuthorizedTeacher =
    isMaster || Boolean(existingProfile?.role === 'teacher' && existingProfile?.authorizedTeacherByMaster);

  // If the user clicked "Entrar como Profesor con Google" and is NOT authorized by spacio.n.blnco@gmail.com:
  if (attemptingTeacherLogin && !isPreAuthorizedTeacher) {
    // Record their pending teacher request so spacio.n.blnco@gmail.com can see and approve/reject it
    await requestTeacherRegistration({
      fullName: fbUser.displayName || cleanEmail.split('@')[0] || 'Solicitante Profesor',
      email: cleanEmail || `${fbUser.uid}@cesarteach.edu`,
      accessPin: 'GOOGLE-AUTH'
    });
    throw new Error(
      'Ningún profesor puede registrarse sin autorización del Profesor Titular. Hemos enviado tu solicitud al titular para que la apruebe en su Panel de Control.'
    );
  }

  const resolvedLanguage = existingProfile?.targetLanguage || preferredLanguage;
  const existingProgress = existingProfile
    ? await fetchStudentProgressFromDatabase(existingProfile.id)
    : null;

  const profile: UserProfile = {
    id: existingProfile?.id || fbUser.uid,
    email: cleanEmail || `${fbUser.uid}@cesarteach.edu`,
    fullName:
      existingProfile?.fullName ||
      fbUser.displayName ||
      cleanEmail.split('@')[0] ||
      'Estudiante',
    role: isPreAuthorizedTeacher ? 'teacher' : 'student',
    authorizedTeacherByMaster: isPreAuthorizedTeacher,
    enrollmentStatus: 'approved',
    approvedByTeacher: true,
    targetLanguage: resolvedLanguage,
    studentIdNumber:
      existingProfile?.studentIdNumber || `EST-${Math.floor(1000 + Math.random() * 9000)}`,
    notesFromTeacher: existingProfile?.notesFromTeacher || '',
    avatarUrl:
      fbUser.photoURL ||
      existingProfile?.avatarUrl ||
      `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(fbUser.uid)}`,
    createdAt: existingProfile?.createdAt || nowIso,
    lastActiveAt: nowIso
  };

  const initialOrMergedProgress: UserProgress = existingProgress || {
    completedLessons: [],
    masteredWords: [],
    examScore: undefined,
    examPassed: false,
    levelScores: {},
    xp: 0,
    streakDays: 1,
    lastStudyDate: nowIso.split('T')[0],
    unlockedBadges: ['b_first_step'],
    wordSRSStatus: {},
    lessonDates: {},
    examHistory: [],
    totalExercisesDone: 0,
    timeSpentMinutes: 0
  };

  await syncStudentProgressToDatabase(profile, initialOrMergedProgress, resolvedLanguage);
  setStoredCurrentUser(profile);
  return { profile, courseLanguage: resolvedLanguage };
}

// Fetch all students AND teacher requests/authorized teachers for the Teacher Dashboard
export async function fetchAllUsersForTeacherDashboard(): Promise<{
  students: StudentRecord[];
  teachersAndRequests: UserProfile[];
}> {
  const localList = getLocalStudents();

  try {
    const usersSnap = await getDocs(collection(db, 'users'));
    const progressSnap = await getDocs(collection(db, 'student_progress'));

    const progressMap = new Map<string, any>();
    progressSnap.forEach(docSnap => {
      progressMap.set(docSnap.id, docSnap.data());
    });

    const remoteStudents: StudentRecord[] = [];
    const teachersAndRequests: UserProfile[] = [];

    usersSnap.forEach(userSnap => {
      const p = userSnap.data();
      const profile = mapDocToUserProfile(p);

      // Separate Teacher accounts & Pending Teacher Requests from normal students
      if (
        profile.role === 'teacher' ||
        p.requestedRole === 'teacher'
      ) {
        if (!isMasterTeacherEmail(profile.email)) {
          teachersAndRequests.push({
            ...profile,
            requestedRole: p.requestedRole || profile.role
          });
        }
        return;
      }

      const prog = progressMap.get(p.id);
      remoteStudents.push({
        profile,
        progress: {
          completedLessons: Array.isArray(prog?.completedLessons) ? prog.completedLessons : [],
          masteredWords: Array.isArray(prog?.masteredWords) ? prog.masteredWords : [],
          examScore:
            typeof prog?.examScore === 'number' && prog.examScore > 0
              ? prog.examScore
              : undefined,
          examPassed: Boolean(prog?.examPassed),
          examPassedDate: prog?.examPassedDate || undefined,
          levelScores: prog?.levelScores || {},
          xp: Number(prog?.xp || 0),
          streakDays: Number(prog?.streakDays || 1),
          lastStudyDate: prog?.lastStudyDate,
          unlockedBadges: Array.isArray(prog?.unlockedBadges) ? prog.unlockedBadges : [],
          wordSRSStatus: prog?.wordSRSStatus || {},
          lessonDates: prog?.lessonDates || {},
          examHistory: Array.isArray(prog?.examHistory) ? prog.examHistory : [],
          totalExercisesDone: Number(prog?.totalExercisesDone || 0),
          timeSpentMinutes: Number(prog?.timeSpentMinutes || 0)
        },
        courseLanguage: prog?.courseLanguage || p.targetLanguage || 'en'
      });
    });

    const mergedMap = new Map<string, StudentRecord>();
    localList.forEach(s => {
      if (
        s.profile.role !== 'teacher' &&
        s.profile.requestedRole !== 'teacher' &&
        !isMasterTeacherEmail(s.profile.email)
      ) {
        mergedMap.set(s.profile.id, s);
      }
    });
    remoteStudents.forEach(s => {
      mergedMap.set(s.profile.id, s);
    });

    saveLocalStudents(Array.from(mergedMap.values()));
    return {
      students: Array.from(mergedMap.values()),
      teachersAndRequests
    };
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'users');
    return {
      students: localList.filter(
        s => s.profile.role !== 'teacher' && !isMasterTeacherEmail(s.profile.email)
      ),
      teachersAndRequests: []
    };
  }
}

export async function fetchAllStudentsForTeacher(): Promise<StudentRecord[]> {
  const res = await fetchAllUsersForTeacherDashboard();
  return res.students;
}

export async function updateStudentTeacherNotes(
  studentId: string,
  notes: string
): Promise<boolean> {
  const students = getLocalStudents();
  const target = students.find(s => s.profile.id === studentId);
  if (target) {
    target.profile.notesFromTeacher = notes;
    saveLocalStudents(students);
  }

  try {
    await updateDoc(doc(db, 'users', studentId), {
      notesFromTeacher: notes,
      lastActiveAt: new Date().toISOString()
    });
    return true;
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `users/${studentId}`);
    return false;
  }
}

export const SUPABASE_SQL_SETUP_SCRIPT = `// ============================================================================
// ARQUITECTURA DE BASE DE DATOS EN FIREBASE CLOUD FIRESTORE
// Proyecto: ${firebaseConfig.projectId}
// Base de Datos: ${firebaseConfig.firestoreDatabaseId}
// Administración: Profesor Titular Exclusivo
// ============================================================================

// 1. REGISTRO DE ALUMNOS (ABIERTO E INMEDIATO):
// Cualquier estudiante puede crear su cuenta o entrar con Google con role: "student".

// 2. REGISTRO DE PROFESORES (PROTEGIDO CON AUTORIZACIÓN DEL TITULAR):
// Ningún profesor puede registrarse por su cuenta.
// Solo el Profesor Titular o cuentas con authorizedTeacherByMaster: true
// aprobadas por el Profesor Titular en el Panel de Control obtienen role: "teacher".
`;
