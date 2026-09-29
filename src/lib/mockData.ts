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

export const INITIAL_CLASSES: AcademicClassData[] = [
  { id: 'class-9', name: 'Class 9', gradeLevel: 9, description: 'Secondary Education - Foundation Year' },
  { id: 'class-10', name: 'Class 10', gradeLevel: 10, description: 'Secondary School Certificate (SSC) Candidate Year' },
];

export const INITIAL_SUBJECTS: SubjectData[] = [
  { id: 'sub-math-9', classId: 'class-9', name: 'Mathematics', code: 'MATH-901', color: '#4f46e5', icon: 'Calculator' },
  { id: 'sub-phys-9', classId: 'class-9', name: 'Physics', code: 'PHYS-901', color: '#0ea5e9', icon: 'Atom' },
  { id: 'sub-eng-9', classId: 'class-9', name: 'English', code: 'ENG-901', color: '#10b981', icon: 'BookOpen' },
  { id: 'sub-chem-9', classId: 'class-9', name: 'Chemistry', code: 'CHEM-901', color: '#f59e0b', icon: 'FlaskConical' },
];

export const INITIAL_CHAPTERS: ChapterData[] = [
  // Math Class 9
  { id: 'chap-math-1', subjectId: 'sub-math-9', order: 1, title: 'Chapter 1: Real Numbers' },
  { id: 'chap-math-2', subjectId: 'sub-math-9', order: 2, title: 'Chapter 2: Sets and Functions' },
  { id: 'chap-math-3', subjectId: 'sub-math-9', order: 3, title: 'Chapter 3: Algebraic Expressions' },
  // Physics Class 9
  { id: 'chap-phys-1', subjectId: 'sub-phys-9', order: 1, title: 'Chapter 1: Physical Quantities & Measurement' },
  { id: 'chap-phys-2', subjectId: 'sub-phys-9', order: 2, title: 'Chapter 2: Motion and Kinematics' },
  // English Class 9
  { id: 'chap-eng-1', subjectId: 'sub-eng-9', order: 1, title: 'Unit 1: Grammar - Tenses & Structures' },
  { id: 'chap-eng-2', subjectId: 'sub-eng-9', order: 2, title: 'Unit 2: Narration & Direct Speech' },
];

export const INITIAL_TOPICS: TopicData[] = [
  // Math Chapter 1
  {
    id: 'top-math-101',
    chapterId: 'chap-math-1',
    subjectId: 'sub-math-9',
    order: 1,
    title: 'Classification of Real Numbers & Rational Forms',
    description: 'Understanding integers, fractions, terminating, and repeating decimals.',
    estimatedMinutes: 60,
    priority: 'HIGH',
    difficulty: 'EASY',
    learningObjectives: ['Classify fractions and decimals', 'Convert repeating decimals to rational form'],
  },
  {
    id: 'top-math-102',
    chapterId: 'chap-math-1',
    subjectId: 'sub-math-9',
    order: 2,
    title: 'Irrational Numbers and Proofs',
    description: 'Proving square root of 2, 3, 5 are irrational numbers.',
    estimatedMinutes: 75,
    priority: 'URGENT',
    difficulty: 'HARD',
    learningObjectives: ['Understand proof by contradiction', 'Represent roots on a number line'],
  },
  {
    id: 'top-math-103',
    chapterId: 'chap-math-1',
    subjectId: 'sub-math-9',
    order: 3,
    title: 'Properties of Real Operations & Scientific Notation',
    description: 'Commutative, associative, and distributive laws in real sets.',
    estimatedMinutes: 45,
    priority: 'MEDIUM',
    difficulty: 'MEDIUM',
    learningObjectives: ['Apply scientific exponent notations', 'Simplify complex root expressions'],
  },
  // Math Chapter 2
  {
    id: 'top-math-201',
    chapterId: 'chap-math-2',
    subjectId: 'sub-math-9',
    order: 1,
    title: 'Set Notations and Venn Diagrams',
    description: 'Subsets, power sets, universal sets, and graphical representation.',
    estimatedMinutes: 60,
    priority: 'HIGH',
    difficulty: 'MEDIUM',
    learningObjectives: ['Solve union, intersection, and set difference word problems'],
  },
  // Physics Chapter 2
  {
    id: 'top-phys-201',
    chapterId: 'chap-phys-2',
    subjectId: 'sub-phys-9',
    order: 1,
    title: 'Equations of Linear Motion',
    description: 'Deriving v = u + at, s = ut + 0.5at², and v² = u² + 2as.',
    estimatedMinutes: 90,
    priority: 'URGENT',
    difficulty: 'HARD',
    learningObjectives: ['Derive graphical velocity-time curves', 'Solve uniform acceleration problems'],
  },
  // English Unit 2
  {
    id: 'top-eng-201',
    chapterId: 'chap-eng-2',
    subjectId: 'sub-eng-9',
    order: 1,
    title: 'Direct to Indirect Speech Rules',
    description: 'Mastering tense shift, pronoun change, and reporting verbs.',
    estimatedMinutes: 45,
    priority: 'HIGH',
    difficulty: 'MEDIUM',
    learningObjectives: ['Change assertive and interrogative sentences correctly'],
  },
];

export const INITIAL_STUDENTS: StudentProfileData[] = [
  {
    id: 'std-001',
    userId: 'user-std-1',
    name: 'Rahim Ahmed',
    email: 'rahim@student.com',
    studentIdNumber: 'STD-2026-0901',
    classId: 'class-9',
    className: 'Class 9',
    academicSession: '2026-2027',
    schoolCollege: 'Dhaka Residential Model College',
    groupSection: 'Science - Section A',
    guardian: {
      name: 'Mohammad Kamal Ahmed',
      relationship: 'Father',
      phone: '+880 1711-234567',
      email: 'kamal.ahmed@example.com',
    },
    weeklySchedule: [
      { dayOfWeek: 'SATURDAY', startTime: '19:00', endTime: '21:00', maxDurationMinutes: 120 },
      { dayOfWeek: 'SUNDAY', startTime: '18:00', endTime: '20:00', maxDurationMinutes: 120 },
      { dayOfWeek: 'MONDAY', startTime: '19:30', endTime: '21:30', maxDurationMinutes: 120 },
      { dayOfWeek: 'TUESDAY', startTime: '19:00', endTime: '21:00', maxDurationMinutes: 120 },
      { dayOfWeek: 'WEDNESDAY', startTime: '18:30', endTime: '20:30', maxDurationMinutes: 120 },
      { dayOfWeek: 'THURSDAY', startTime: '19:00', endTime: '21:00', maxDurationMinutes: 120 },
      { dayOfWeek: 'FRIDAY', startTime: '16:00', endTime: '18:00', maxDurationMinutes: 120 },
    ],
    enrolledSubjectIds: ['sub-math-9', 'sub-phys-9', 'sub-eng-9'],
    createdAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'std-002',
    userId: 'user-std-2',
    name: 'Fatima Khan',
    email: 'fatima@student.com',
    studentIdNumber: 'STD-2026-0902',
    classId: 'class-9',
    className: 'Class 9',
    academicSession: '2026-2027',
    schoolCollege: 'Viqarunnisa Noon School & College',
    groupSection: 'Science - Section B',
    guardian: {
      name: 'Dr. Shahana Khan',
      relationship: 'Mother',
      phone: '+880 1819-987654',
      email: 'dr.shahana@example.com',
    },
    weeklySchedule: [
      { dayOfWeek: 'SATURDAY', startTime: '18:00', endTime: '20:30', maxDurationMinutes: 150 },
      { dayOfWeek: 'SUNDAY', startTime: '19:00', endTime: '21:00', maxDurationMinutes: 120 },
      { dayOfWeek: 'TUESDAY', startTime: '18:00', endTime: '20:00', maxDurationMinutes: 120 },
      { dayOfWeek: 'THURSDAY', startTime: '17:30', endTime: '19:30', maxDurationMinutes: 120 },
    ],
    enrolledSubjectIds: ['sub-math-9', 'sub-phys-9', 'sub-chem-9'],
    createdAt: '2026-01-15T12:00:00Z',
  },
];

export const INITIAL_PROGRESS: TopicProgressData[] = [
  {
    id: 'prog-1',
    studentId: 'std-001',
    topicId: 'top-math-101',
    subjectId: 'sub-math-9',
    chapterId: 'chap-math-1',
    status: 'COMPLETED',
    progressPercentage: 100,
    totalStudyMinutes: 70,
    lastStudiedAt: '2026-09-28T19:30:00Z',
    completedAt: '2026-09-28T20:40:00Z',
    teacherFeedback: 'Very strong foundation in decimal conversion. Ready for irrational proofs.',
  },
  {
    id: 'prog-2',
    studentId: 'std-001',
    topicId: 'top-math-102',
    subjectId: 'sub-math-9',
    chapterId: 'chap-math-1',
    status: 'IN_PROGRESS',
    progressPercentage: 50,
    totalStudyMinutes: 45,
    lastStudiedAt: '2026-09-29T20:00:00Z',
  },
  {
    id: 'prog-3',
    studentId: 'std-001',
    topicId: 'top-phys-201',
    subjectId: 'sub-phys-9',
    chapterId: 'chap-phys-2',
    status: 'NEEDS_REVISION',
    progressPercentage: 75,
    totalStudyMinutes: 95,
    lastStudiedAt: '2026-09-25T18:00:00Z',
    teacherFeedback: 'Practice equation 3 (v^2 = u^2 + 2as) with negative gravitational acceleration.',
  },
  {
    id: 'prog-4',
    studentId: 'std-001',
    topicId: 'top-eng-201',
    subjectId: 'sub-eng-9',
    chapterId: 'chap-eng-2',
    status: 'NOT_STARTED',
    progressPercentage: 0,
    totalStudyMinutes: 0,
  },
];

export const INITIAL_DAILY_PLANS: Record<string, DailyStudyPlanData> = {
  'std-001': {
    id: 'plan-today-001',
    studentId: 'std-001',
    planDate: new Date().toISOString().split('T')[0],
    totalAllocatedMinutes: 120,
    isManuallyOverridden: false,
    teacherNotes: 'Focus on completing the irrational numbers proof before moving to new physics problems.',
    items: [
      {
        id: 'item-1',
        topicId: 'top-math-102',
        topicTitle: 'Irrational Numbers and Proofs',
        subjectName: 'Mathematics',
        subjectColor: '#4f46e5',
        chapterTitle: 'Chapter 1: Real Numbers',
        type: 'TOPIC_STUDY',
        targetMinutes: 60,
        actualMinutes: 45,
        isCompleted: false,
        priority: 'URGENT',
      },
      {
        id: 'item-2',
        topicId: 'top-phys-201',
        topicTitle: 'Equations of Linear Motion',
        subjectName: 'Physics',
        subjectColor: '#0ea5e9',
        chapterTitle: 'Chapter 2: Motion and Kinematics',
        type: 'REVISION',
        targetMinutes: 35,
        actualMinutes: 35,
        isCompleted: true,
        priority: 'HIGH',
      },
      {
        id: 'item-3',
        topicId: 'top-eng-201',
        topicTitle: 'Direct to Indirect Speech Rules',
        subjectName: 'English',
        subjectColor: '#10b981',
        chapterTitle: 'Unit 2: Narration & Direct Speech',
        type: 'TOPIC_STUDY',
        targetMinutes: 25,
        actualMinutes: 0,
        isCompleted: false,
        priority: 'MEDIUM',
      },
    ],
  },
};

export const INITIAL_NOTES: NoteData[] = [
  {
    id: 'note-1',
    authorId: 'teacher-1',
    authorName: 'Sir Anwar Hossain',
    authorRole: 'TEACHER',
    type: 'TEACHER_NOTE',
    subjectId: 'sub-math-9',
    subjectName: 'Mathematics',
    chapterId: 'chap-math-1',
    topicId: 'top-math-102',
    title: 'Summary Formula Sheet & Contradiction Proof Steps',
    content: `### Steps for Proving √2 is Irrational
1. Assume the opposite: that √2 is rational.
2. Hence, √2 = a / b, where a and b are co-prime integers (gcd(a,b) = 1) and b ≠ 0.
3. Squaring both sides: 2 = a² / b²  =>  a² = 2b².
4. Therefore, 2 divides a², which implies 2 divides a (Lemma).
5. Let a = 2k. Then (2k)² = 2b² => 4k² = 2b² => b² = 2k².
6. Hence 2 also divides b, contradicting that gcd(a,b) = 1.
7. Conclusion: √2 cannot be rational; it is irrational!`,
    attachments: [
      {
        name: 'Math_Class9_Real_Numbers_Cheatsheet.pdf',
        url: '#',
        fileType: 'pdf',
        sizeBytes: 1048576,
      },
    ],
    tags: ['Formulas', 'Proofs', 'Class 9 Math'],
    isPinned: true,
    createdAt: '2026-09-20T14:30:00Z',
    updatedAt: '2026-09-20T14:30:00Z',
  },
  {
    id: 'note-2',
    authorId: 'user-std-1',
    authorName: 'Rahim Ahmed',
    authorRole: 'STUDENT',
    type: 'STUDENT_NOTE',
    studentId: 'std-001',
    subjectId: 'sub-phys-9',
    subjectName: 'Physics',
    chapterId: 'chap-phys-2',
    topicId: 'top-phys-201',
    title: 'My personal shortcuts for Free Fall Kinematics',
    content: `When calculating vertical motion under gravity:
- Replace acceleration 'a' with '-g' (-9.8 m/s²).
- At maximum height, final vertical velocity v = 0.
- Time of flight = 2 * (u / g).
- Maximum height reached = u² / (2g).`,
    attachments: [],
    tags: ['Physics', 'Kinematics', 'Quick Recall'],
    isPinned: false,
    createdAt: '2026-09-26T21:10:00Z',
    updatedAt: '2026-09-26T21:10:00Z',
  },
];

export const INITIAL_ASSIGNMENTS: AssignmentData[] = [
  {
    id: 'assign-1',
    teacherId: 'teacher-1',
    classId: 'class-9',
    subjectId: 'sub-math-9',
    subjectName: 'Mathematics',
    topicId: 'top-math-102',
    title: 'Class 9 Homework: Proof of Irrationality for √3 and √5',
    instructions: 'Write the complete contradiction proofs step-by-step on paper, scan or take a clear photo, and submit before Saturday 9 PM.',
    attachments: [
      { name: 'Assignment_1_Instructions.pdf', url: '#', fileType: 'pdf' },
    ],
    deadline: '2026-10-03T21:00:00Z',
    totalMarks: 20,
    status: 'PUBLISHED',
  },
  {
    id: 'assign-2',
    teacherId: 'teacher-1',
    classId: 'class-9',
    subjectId: 'sub-phys-9',
    subjectName: 'Physics',
    topicId: 'top-phys-201',
    title: 'Kinematics Numerical Problem Set (Questions 1 to 8)',
    instructions: 'Calculate stopping distances for cars with uniform deceleration. Show all unit conversions.',
    attachments: [],
    deadline: '2026-10-06T18:00:00Z',
    totalMarks: 25,
    status: 'PUBLISHED',
  },
];
