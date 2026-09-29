import {
  AcademicClassData,
  SubjectData,
  ChapterData,
  TopicData,
  StudentProfileData,
  TopicProgressData,
  DailyStudyPlanData,
  NoteData,
  AssignmentData,
} from '@/types';

// Class 7 Academic Configuration
export const CLASS_7_DATA: AcademicClassData = {
  id: 'class-7',
  name: 'Class 7',
  gradeLevel: 7,
  description: 'National Curriculum Class 7 (Junior Secondary)',
  subjectCount: 10,
  studentCount: 0,
};

// 10 Compulsory & Applied Subjects for Class 7
export const CLASS_7_SUBJECTS: SubjectData[] = [
  {
    id: 'sub-7-bangla',
    classId: 'class-7',
    name: 'Bangla',
    code: 'BAN-7',
    color: '#e11d48',
    icon: 'BookOpen',
    chapterCount: 0,
    topicCount: 0,
  },
  {
    id: 'sub-7-english',
    classId: 'class-7',
    name: 'English',
    code: 'ENG-7',
    color: '#4338ca',
    icon: 'BookOpen',
    chapterCount: 0,
    topicCount: 0,
  },
  {
    id: 'sub-7-math',
    classId: 'class-7',
    name: 'Mathematics',
    code: 'MATH-7',
    color: '#0284c7',
    icon: 'Calculator',
    chapterCount: 0,
    topicCount: 0,
  },
  {
    id: 'sub-7-science',
    classId: 'class-7',
    name: 'Science',
    code: 'SCI-7',
    color: '#059669',
    icon: 'Atom',
    chapterCount: 0,
    topicCount: 0,
  },
  {
    id: 'sub-7-bgs',
    classId: 'class-7',
    name: 'Bangladesh and Global Studies (BGS)',
    code: 'BGS-7',
    color: '#d97706',
    icon: 'Globe',
    chapterCount: 0,
    topicCount: 0,
  },
  {
    id: 'sub-7-ict',
    classId: 'class-7',
    name: 'Information and Communication Technology (ICT)',
    code: 'ICT-7',
    color: '#7c3aed',
    icon: 'Laptop',
    chapterCount: 0,
    topicCount: 0,
  },
  {
    id: 'sub-7-peh',
    classId: 'class-7',
    name: 'Physical Education and Health',
    code: 'PEH-7',
    color: '#0d9488',
    icon: 'Activity',
    chapterCount: 0,
    topicCount: 0,
  },
  {
    id: 'sub-7-wle',
    classId: 'class-7',
    name: 'Work and Life Oriented Education',
    code: 'WLE-7',
    color: '#ca8a04',
    icon: 'Briefcase',
    chapterCount: 0,
    topicCount: 0,
  },
  {
    id: 'sub-7-agr',
    classId: 'class-7',
    name: 'Agriculture Studies / Home Science',
    code: 'AGR-7',
    color: '#16a34a',
    icon: 'Leaf',
    chapterCount: 0,
    topicCount: 0,
  },
  {
    id: 'sub-7-rel',
    classId: 'class-7',
    name: 'Religion and Moral Education',
    code: 'REL-7',
    color: '#6366f1',
    icon: 'Compass',
    chapterCount: 0,
    topicCount: 0,
  },
];

export const INITIAL_CLASSES: AcademicClassData[] = [CLASS_7_DATA];
export const INITIAL_SUBJECTS: SubjectData[] = [...CLASS_7_SUBJECTS];
export const INITIAL_CHAPTERS: ChapterData[] = [];
export const INITIAL_TOPICS: TopicData[] = [];
export const INITIAL_STUDENTS: StudentProfileData[] = [];
export const INITIAL_PROGRESS: TopicProgressData[] = [];
export const INITIAL_DAILY_PLANS: Record<string, DailyStudyPlanData> = {};
export const INITIAL_NOTES: NoteData[] = [];
export const INITIAL_ASSIGNMENTS: AssignmentData[] = [];
