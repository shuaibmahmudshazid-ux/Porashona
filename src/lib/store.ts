import {
  INITIAL_CLASSES,
  INITIAL_SUBJECTS,
  INITIAL_CHAPTERS,
  INITIAL_TOPICS,
  INITIAL_STUDENTS,
  INITIAL_PROGRESS,
  INITIAL_DAILY_PLANS,
  INITIAL_NOTES,
  INITIAL_ASSIGNMENTS,
} from './mockData';
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
  TopicStatus,
} from '@/types';

// Global singleton in memory for client/server execution
class AcademicDataStore {
  private classes: AcademicClassData[] = [...INITIAL_CLASSES];
  private subjects: SubjectData[] = [...INITIAL_SUBJECTS];
  private chapters: ChapterData[] = [...INITIAL_CHAPTERS];
  private topics: TopicData[] = [...INITIAL_TOPICS];
  private students: StudentProfileData[] = [...INITIAL_STUDENTS];
  private progress: TopicProgressData[] = [...INITIAL_PROGRESS];
  private dailyPlans: Record<string, DailyStudyPlanData> = { ...INITIAL_DAILY_PLANS };
  private notes: NoteData[] = [...INITIAL_NOTES];
  private assignments: AssignmentData[] = [...INITIAL_ASSIGNMENTS];

  // Classes
  getClasses(): AcademicClassData[] {
    return this.classes.map((cls) => ({
      ...cls,
      subjectCount: this.subjects.filter((s) => s.classId === cls.id).length,
      studentCount: this.students.filter((st) => st.classId === cls.id).length,
    }));
  }

  addClass(newClass: Omit<AcademicClassData, 'id'>): AcademicClassData {
    const created: AcademicClassData = {
      ...newClass,
      id: `class-${Date.now()}`,
    };
    this.classes.push(created);
    return created;
  }

  // Subjects
  getSubjects(classId?: string): SubjectData[] {
    const list = classId ? this.subjects.filter((s) => s.classId === classId) : this.subjects;
    return list.map((sub) => ({
      ...sub,
      chapterCount: this.chapters.filter((c) => c.subjectId === sub.id).length,
      topicCount: this.topics.filter((t) => t.subjectId === sub.id).length,
    }));
  }

  addSubject(newSub: Omit<SubjectData, 'id'>): SubjectData {
    const created: SubjectData = {
      ...newSub,
      id: `sub-${Date.now()}`,
    };
    this.subjects.push(created);
    return created;
  }

  // Chapters
  getChapters(subjectId?: string): ChapterData[] {
    const list = subjectId ? this.chapters.filter((c) => c.subjectId === subjectId) : this.chapters;
    return list.map((ch) => ({
      ...ch,
      topicCount: this.topics.filter((t) => t.chapterId === ch.id).length,
    }));
  }

  addChapter(newCh: Omit<ChapterData, 'id'>): ChapterData {
    const created: ChapterData = {
      ...newCh,
      id: `chap-${Date.now()}`,
    };
    this.chapters.push(created);
    return created;
  }

  // Topics
  getTopics(params?: { chapterId?: string; subjectId?: string }): TopicData[] {
    let list = this.topics;
    if (params?.chapterId) {
      list = list.filter((t) => t.chapterId === params.chapterId);
    }
    if (params?.subjectId) {
      list = list.filter((t) => t.subjectId === params.subjectId);
    }
    return list;
  }

  addTopic(newTopic: Omit<TopicData, 'id'>): TopicData {
    const created: TopicData = {
      ...newTopic,
      id: `top-${Date.now()}`,
    };
    this.topics.push(created);
    return created;
  }

  // Students
  getStudents(): StudentProfileData[] {
    return this.students;
  }

  getStudentById(id: string): StudentProfileData | undefined {
    return this.students.find((s) => s.id === id || s.userId === id);
  }

  addStudent(student: Omit<StudentProfileData, 'id'>): StudentProfileData {
    const created: StudentProfileData = {
      ...student,
      id: `std-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.students.push(created);
    return created;
  }

  updateStudent(id: string, updates: Partial<StudentProfileData>): StudentProfileData | null {
    const index = this.students.findIndex((s) => s.id === id);
    if (index === -1) return null;
    this.students[index] = { ...this.students[index], ...updates };
    return this.students[index];
  }

  // Progress
  getProgressForStudent(studentId: string): TopicProgressData[] {
    return this.progress.filter((p) => p.studentId === studentId);
  }

  updateTopicProgress(
    studentId: string,
    topicId: string,
    progressPercentage: number,
    feedback?: string
  ): TopicProgressData {
    const existingIndex = this.progress.findIndex(
      (p) => p.studentId === studentId && p.topicId === topicId
    );

    let status: TopicStatus = 'NOT_STARTED';
    if (progressPercentage === 100) {
      status = 'COMPLETED';
    } else if (progressPercentage > 0) {
      status = 'IN_PROGRESS';
    }

    const topic = this.topics.find((t) => t.id === topicId);

    if (existingIndex >= 0) {
      const prev = this.progress[existingIndex];
      const updated: TopicProgressData = {
        ...prev,
        status,
        progressPercentage,
        lastStudiedAt: new Date().toISOString(),
        completedAt: status === 'COMPLETED' ? new Date().toISOString() : prev.completedAt,
        teacherFeedback: feedback !== undefined ? feedback : prev.teacherFeedback,
      };
      this.progress[existingIndex] = updated;
      return updated;
    } else {
      const created: TopicProgressData = {
        id: `prog-${Date.now()}`,
        studentId,
        topicId,
        subjectId: topic?.subjectId || '',
        chapterId: topic?.chapterId || '',
        status,
        progressPercentage,
        totalStudyMinutes: 0,
        lastStudiedAt: new Date().toISOString(),
        completedAt: status === 'COMPLETED' ? new Date().toISOString() : undefined,
        teacherFeedback: feedback,
      };
      this.progress.push(created);
      return created;
    }
  }

  recordStudyTime(studentId: string, topicId: string, durationMinutes: number) {
    const existingIndex = this.progress.findIndex(
      (p) => p.studentId === studentId && p.topicId === topicId
    );
    if (existingIndex >= 0) {
      this.progress[existingIndex].totalStudyMinutes += durationMinutes;
      this.progress[existingIndex].lastStudiedAt = new Date().toISOString();
    }
  }

  // Daily Study Plans
  getDailyPlan(studentId: string): DailyStudyPlanData {
    if (!this.dailyPlans[studentId]) {
      // Auto-generate a default plan for today
      this.dailyPlans[studentId] = {
        id: `plan-${Date.now()}`,
        studentId,
        planDate: new Date().toISOString().split('T')[0],
        totalAllocatedMinutes: 120,
        items: [],
        isManuallyOverridden: false,
      };
    }
    return this.dailyPlans[studentId];
  }

  updatePlanItemStatus(
    studentId: string,
    itemId: string,
    isCompleted: boolean,
    actualMinutesToAdd?: number
  ) {
    const plan = this.getDailyPlan(studentId);
    const item = plan.items.find((i) => i.id === itemId);
    if (item) {
      item.isCompleted = isCompleted;
      if (actualMinutesToAdd) {
        item.actualMinutes += actualMinutesToAdd;
        this.recordStudyTime(studentId, item.topicId, actualMinutesToAdd);
      }
    }
  }

  // Notes
  getNotes(filter?: { subjectId?: string; studentId?: string; type?: string }): NoteData[] {
    let list = this.notes;
    if (filter?.subjectId) {
      list = list.filter((n) => n.subjectId === filter.subjectId);
    }
    if (filter?.type) {
      list = list.filter((n) => n.type === filter.type);
    }
    return list;
  }

  addNote(note: Omit<NoteData, 'id' | 'createdAt' | 'updatedAt'>): NoteData {
    const created: NoteData = {
      ...note,
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.notes.unshift(created);
    return created;
  }

  // Assignments
  getAssignments(): AssignmentData[] {
    return this.assignments;
  }

  addAssignment(assignment: Omit<AssignmentData, 'id'>): AssignmentData {
    const created: AssignmentData = {
      ...assignment,
      id: `assign-${Date.now()}`,
    };
    this.assignments.unshift(created);
    return created;
  }
}

// Global declaration for hot reload singleton persistence
declare global {
  // eslint-disable-next-line no-var
  var __academicDataStore: AcademicDataStore | undefined;
}

export const dataStore = global.__academicDataStore ?? new AcademicDataStore();
if (process.env.NODE_ENV !== 'production') {
  global.__academicDataStore = dataStore;
}
