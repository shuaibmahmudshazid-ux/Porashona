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

// Reset to zero for full manual entry
export const INITIAL_CLASSES: AcademicClassData[] = [];
export const INITIAL_SUBJECTS: SubjectData[] = [];
export const INITIAL_CHAPTERS: ChapterData[] = [];
export const INITIAL_TOPICS: TopicData[] = [];
export const INITIAL_STUDENTS: StudentProfileData[] = [];
export const INITIAL_PROGRESS: TopicProgressData[] = [];
export const INITIAL_DAILY_PLANS: Record<string, DailyStudyPlanData> = {};
export const INITIAL_NOTES: NoteData[] = [];
export const INITIAL_ASSIGNMENTS: AssignmentData[] = [];
