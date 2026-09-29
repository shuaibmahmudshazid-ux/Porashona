export type UserRole = 'TEACHER' | 'STUDENT' | 'GUARDIAN';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  studentId?: string; // If student, links to their student profile
}

export type PriorityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';
export type TopicStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'NEEDS_REVISION';
export type DayOfWeek = 'SATURDAY' | 'SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY';

export interface WeeklyTimeSlot {
  dayOfWeek: DayOfWeek;
  startTime: string; // e.g. "19:00"
  endTime: string;   // e.g. "21:00"
  maxDurationMinutes: number;
}

export interface StudentProfileData {
  id: string;
  userId: string;
  name: string;
  email: string;
  studentIdNumber: string;
  classId: string;
  className: string;
  academicSession: string;
  schoolCollege: string;
  groupSection?: string;
  guardian: {
    name: string;
    relationship: string;
    phone: string;
    email?: string;
  };
  weeklySchedule: WeeklyTimeSlot[];
  enrolledSubjectIds: string[];
  createdAt?: string;
}

export interface AcademicClassData {
  id: string;
  name: string;
  gradeLevel: number;
  description?: string;
  subjectCount?: number;
  studentCount?: number;
}

export interface SubjectData {
  id: string;
  classId: string;
  name: string;
  code?: string;
  color: string;
  icon: string;
  chapterCount?: number;
  topicCount?: number;
}

export interface ChapterData {
  id: string;
  subjectId: string;
  order: number;
  title: string;
  description?: string;
  topicCount?: number;
}

export interface TopicData {
  id: string;
  chapterId: string;
  subjectId: string;
  order: number;
  title: string;
  description?: string;
  estimatedMinutes: number;
  priority: PriorityLevel;
  difficulty: DifficultyLevel;
  learningObjectives: string[];
}

export interface TopicProgressData {
  id: string;
  studentId: string;
  topicId: string;
  subjectId: string;
  chapterId: string;
  status: TopicStatus;
  progressPercentage: number;
  totalStudyMinutes: number;
  lastStudiedAt?: string;
  completedAt?: string;
  teacherFeedback?: string;
}

export interface DailyStudyPlanItem {
  id: string;
  studentId?: string;
  topicId: string;
  topicTitle: string;
  subjectName: string;
  subjectColor: string;
  chapterTitle: string;
  type: 'TOPIC_STUDY' | 'REVISION' | 'ASSIGNMENT';
  targetMinutes: number;
  actualMinutes: number;
  isCompleted: boolean;
  priority: PriorityLevel;
}

export interface DailyStudyPlanData {
  id: string;
  studentId: string;
  planDate: string;
  totalAllocatedMinutes: number;
  items: DailyStudyPlanItem[];
  isManuallyOverridden: boolean;
  teacherNotes?: string;
}

export interface NoteData {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  type: 'TEACHER_NOTE' | 'STUDENT_NOTE';
  studentId?: string;
  subjectId: string;
  subjectName?: string;
  chapterId?: string;
  topicId?: string;
  title: string;
  content: string;
  attachments: {
    name: string;
    url: string;
    fileType: string;
    sizeBytes: number;
  }[];
  tags: string[];
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AssignmentData {
  id: string;
  teacherId: string;
  classId: string;
  subjectId: string;
  subjectName?: string;
  topicId?: string;
  title: string;
  instructions: string;
  attachments: { name: string; url: string; fileType: string }[];
  deadline: string;
  totalMarks: number;
  status: 'PUBLISHED' | 'DRAFT';
}

export interface SubmissionData {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName?: string;
  submittedAt: string;
  textAnswer?: string;
  attachments: { name: string; url: string; fileType: string }[];
  marksAwarded?: number;
  teacherFeedback?: string;
  status: 'PENDING' | 'SUBMITTED' | 'GRADED';
}
