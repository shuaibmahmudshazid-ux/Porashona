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
  DailyStudyPlanItem,
  NoteData,
  AssignmentData,
  TopicStatus,
} from '@/types';

const STORAGE_KEY = 'studytrack_manual_store_v1';

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
  private listeners: (() => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadFromStorage();
    }
  }

  private saveToStorage() {
    if (typeof window === 'undefined') return;
    try {
      const data = {
        classes: this.classes,
        subjects: this.subjects,
        chapters: this.chapters,
        topics: this.topics,
        students: this.students,
        progress: this.progress,
        dailyPlans: this.dailyPlans,
        notes: this.notes,
        assignments: this.assignments,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      this.notifyListeners();
    } catch (e) {
      console.error('Failed to save to storage', e);
    }
  }

  private loadFromStorage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        this.classes = data.classes || [];
        this.subjects = data.subjects || [];
        this.chapters = data.chapters || [];
        this.topics = data.topics || [];
        this.students = data.students || [];
        this.progress = data.progress || [];
        this.dailyPlans = data.dailyPlans || {};
        this.notes = data.notes || [];
        this.assignments = data.assignments || [];
      }
    } catch (e) {
      console.error('Failed to load from storage', e);
    }
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((l) => l());
  }

  resetAll() {
    this.classes = [];
    this.subjects = [];
    this.chapters = [];
    this.topics = [];
    this.students = [];
    this.progress = [];
    this.dailyPlans = {};
    this.notes = [];
    this.assignments = [];
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    this.notifyListeners();
  }

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
    this.saveToStorage();
    return created;
  }

  updateClass(id: string, updates: Partial<AcademicClassData>): AcademicClassData | null {
    const idx = this.classes.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    this.classes[idx] = { ...this.classes[idx], ...updates };
    this.saveToStorage();
    return this.classes[idx];
  }

  deleteClass(id: string) {
    this.classes = this.classes.filter((c) => c.id !== id);
    // Cascade delete subjects in that class
    const removedSubjects = this.subjects.filter((s) => s.classId === id).map((s) => s.id);
    this.subjects = this.subjects.filter((s) => s.classId !== id);
    this.topics = this.topics.filter((t) => !removedSubjects.includes(t.subjectId));
    this.saveToStorage();
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
    this.saveToStorage();
    return created;
  }

  updateSubject(id: string, updates: Partial<SubjectData>): SubjectData | null {
    const idx = this.subjects.findIndex((s) => s.id === id);
    if (idx === -1) return null;
    this.subjects[idx] = { ...this.subjects[idx], ...updates };
    this.saveToStorage();
    return this.subjects[idx];
  }

  deleteSubject(id: string) {
    this.subjects = this.subjects.filter((s) => s.id !== id);
    this.chapters = this.chapters.filter((c) => c.subjectId !== id);
    this.topics = this.topics.filter((t) => t.subjectId !== id);
    this.saveToStorage();
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
    this.saveToStorage();
    return created;
  }

  updateChapter(id: string, updates: Partial<ChapterData>): ChapterData | null {
    const idx = this.chapters.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    this.chapters[idx] = { ...this.chapters[idx], ...updates };
    this.saveToStorage();
    return this.chapters[idx];
  }

  deleteChapter(id: string) {
    this.chapters = this.chapters.filter((c) => c.id !== id);
    this.topics = this.topics.filter((t) => t.chapterId !== id);
    this.saveToStorage();
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
    this.saveToStorage();
    return created;
  }

  updateTopic(id: string, updates: Partial<TopicData>): TopicData | null {
    const idx = this.topics.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    this.topics[idx] = { ...this.topics[idx], ...updates };
    this.saveToStorage();
    return this.topics[idx];
  }

  deleteTopic(id: string) {
    this.topics = this.topics.filter((t) => t.id !== id);
    this.progress = this.progress.filter((p) => p.topicId !== id);
    this.saveToStorage();
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
    this.saveToStorage();
    return created;
  }

  updateStudent(id: string, updates: Partial<StudentProfileData>): StudentProfileData | null {
    const idx = this.students.findIndex((s) => s.id === id);
    if (idx === -1) return null;
    this.students[idx] = { ...this.students[idx], ...updates };
    this.saveToStorage();
    return this.students[idx];
  }

  deleteStudent(id: string) {
    this.students = this.students.filter((s) => s.id !== id);
    delete this.dailyPlans[id];
    this.progress = this.progress.filter((p) => p.studentId !== id);
    this.saveToStorage();
  }

  // Progress
  getProgressForStudent(studentId: string): TopicProgressData[] {
    return this.progress.filter((p) => p.studentId === studentId);
  }

  getAllProgress(): TopicProgressData[] {
    return this.progress;
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
      this.saveToStorage();
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
      this.saveToStorage();
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
      this.saveToStorage();
    }
  }

  // Daily Study Plans
  getDailyPlan(studentId: string): DailyStudyPlanData {
    if (!this.dailyPlans[studentId]) {
      this.dailyPlans[studentId] = {
        id: `plan-${Date.now()}`,
        studentId,
        planDate: new Date().toISOString().split('T')[0],
        totalAllocatedMinutes: 0,
        items: [],
        isManuallyOverridden: false,
      };
    }
    return this.dailyPlans[studentId];
  }

  getTodayTasks(): DailyStudyPlanItem[] {
    const allItems: DailyStudyPlanItem[] = [];
    Object.values(this.dailyPlans).forEach((plan) => {
      allItems.push(...plan.items);
    });
    return allItems;
  }

  addStudyPlanItem(studentId: string, item: Omit<DailyStudyPlanItem, 'id'>): DailyStudyPlanItem {
    const plan = this.getDailyPlan(studentId);
    const createdItem: DailyStudyPlanItem = {
      ...item,
      studentId,
      id: `item-${Date.now()}`,
    };
    plan.items.push(createdItem);
    plan.totalAllocatedMinutes += item.targetMinutes;
    this.saveToStorage();
    return createdItem;
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
      this.saveToStorage();
    }
  }

  deleteStudyPlanItem(studentId: string, itemId: string) {
    if (studentId && this.dailyPlans[studentId]) {
      const plan = this.dailyPlans[studentId];
      plan.items = plan.items.filter((i) => i.id !== itemId);
    }
    // Also remove from any plan containing this itemId for clean state
    Object.values(this.dailyPlans).forEach((plan) => {
      plan.items = plan.items.filter((i) => i.id !== itemId);
    });
    this.saveToStorage();
  }

  // Notes
  getNotes(): NoteData[] {
    return this.notes;
  }

  addNote(note: Omit<NoteData, 'id' | 'createdAt' | 'updatedAt'>): NoteData {
    const created: NoteData = {
      ...note,
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.notes.unshift(created);
    this.saveToStorage();
    return created;
  }

  updateNote(id: string, updates: Partial<NoteData>): NoteData | null {
    const idx = this.notes.findIndex((n) => n.id === id);
    if (idx === -1) return null;
    this.notes[idx] = { ...this.notes[idx], ...updates, updatedAt: new Date().toISOString() };
    this.saveToStorage();
    return this.notes[idx];
  }

  deleteNote(id: string) {
    this.notes = this.notes.filter((n) => n.id !== id);
    this.saveToStorage();
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
    this.saveToStorage();
    return created;
  }

  updateAssignment(id: string, updates: Partial<AssignmentData>): AssignmentData | null {
    const idx = this.assignments.findIndex((a) => a.id === id);
    if (idx === -1) return null;
    this.assignments[idx] = { ...this.assignments[idx], ...updates };
    this.saveToStorage();
    return this.assignments[idx];
  }

  deleteAssignment(id: string) {
    this.assignments = this.assignments.filter((a) => a.id !== id);
    this.saveToStorage();
  }

  // Export / Import
  exportAllJson(): string {
    return JSON.stringify({
      classes: this.classes,
      subjects: this.subjects,
      chapters: this.chapters,
      topics: this.topics,
      students: this.students,
      progress: this.progress,
      dailyPlans: this.dailyPlans,
      notes: this.notes,
      assignments: this.assignments,
    }, null, 2);
  }

  importAllJson(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      this.classes = data.classes || [];
      this.subjects = data.subjects || [];
      this.chapters = data.chapters || [];
      this.topics = data.topics || [];
      this.students = data.students || [];
      this.progress = data.progress || [];
      this.dailyPlans = data.dailyPlans || {};
      this.notes = data.notes || [];
      this.assignments = data.assignments || [];
      this.saveToStorage();
      return true;
    } catch {
      return false;
    }
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
