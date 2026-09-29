'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { dataStore } from '@/lib/store';
import { AcademicClassData, SubjectData, ChapterData, PriorityLevel, DifficultyLevel } from '@/types';

interface ModalPropsBase {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// 1. Add Class Modal
export function AddClassModal({ isOpen, onClose, onSuccess }: ModalPropsBase) {
  const [name, setName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('9');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    dataStore.addClass({
      name: name.trim(),
      gradeLevel: parseInt(gradeLevel) || 9,
      description: description.trim() || undefined,
    });
    setName('');
    setDescription('');
    onSuccess();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Academic Class" description="Create a new class or grade level">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Class Name"
          placeholder="e.g. Class 9, Grade 10, O-Level"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="Grade Level (Numeric)"
          type="number"
          placeholder="e.g. 9, 10, 11"
          value={gradeLevel}
          onChange={(e) => setGradeLevel(e.target.value)}
          required
        />
        <Input
          label="Description / Curriculum"
          placeholder="e.g. Secondary Education Science Group"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Create Class</Button>
        </div>
      </form>
    </Modal>
  );
}

// 2. Add Subject Modal
export function AddSubjectModal({
  isOpen,
  onClose,
  onSuccess,
  classes,
}: ModalPropsBase & { classes: AcademicClassData[] }) {
  const [name, setName] = useState('');
  const [classId, setClassId] = useState(classes[0]?.id || '');
  const [code, setCode] = useState('');
  const [color, setColor] = useState('#4338ca');

  const presetColors = [
    { name: 'Royal Iris', hex: '#4338ca' },
    { name: 'Forest Jade', hex: '#059669' },
    { name: 'Deep Plum', hex: '#7e22ce' },
    { name: 'Warm Amber', hex: '#d97706' },
    { name: 'Steel Cyan', hex: '#0284c7' },
    { name: 'Crimson Rose', hex: '#e11d48' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    dataStore.addSubject({
      name: name.trim(),
      classId: classId || (classes[0]?.id ?? 'default-class'),
      code: code.trim() || undefined,
      color,
      icon: 'BookOpen',
    });
    setName('');
    setCode('');
    onSuccess();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Subject" description="Define an academic subject for a class">
      <form onSubmit={handleSubmit} className="space-y-4">
        {classes.length > 0 && (
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Select Class / Grade
            </label>
            <select
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-600"
            >
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} (Grade {cls.gradeLevel})
                </option>
              ))}
            </select>
          </div>
        )}

        <Input
          label="Subject Name"
          placeholder="e.g. Mathematics, Physics, English"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          label="Subject Code"
          placeholder="e.g. MATH-101, PHYS-201"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            Harmonic Theme Color
          </label>
          <div className="flex items-center gap-3">
            {presetColors.map((c) => (
              <button
                key={c.hex}
                type="button"
                onClick={() => setColor(c.hex)}
                className={`w-7 h-7 rounded-full border-2 transition ${
                  color === c.hex ? 'border-slate-900 scale-110 shadow-xs' : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Add Subject</Button>
        </div>
      </form>
    </Modal>
  );
}

// 3. Add Chapter & Topic Modal
export function AddTopicModal({
  isOpen,
  onClose,
  onSuccess,
  subjects,
}: ModalPropsBase & { subjects: SubjectData[] }) {
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || '');
  const [chapterTitle, setChapterTitle] = useState('');
  const [topicTitle, setTopicTitle] = useState('');
  const [estimatedMinutes, setEstimatedMinutes] = useState('45');
  const [priority, setPriority] = useState<PriorityLevel>('HIGH');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('MEDIUM');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicTitle.trim()) return;

    const targetSubId = subjectId || subjects[0]?.id || 'sub-1';
    let chapter = dataStore.getChapters(targetSubId)[0];

    if (chapterTitle.trim()) {
      chapter = dataStore.addChapter({
        subjectId: targetSubId,
        title: chapterTitle.trim(),
        order: 1,
      });
    } else if (!chapter) {
      chapter = dataStore.addChapter({
        subjectId: targetSubId,
        title: 'Chapter 1: Foundations',
        order: 1,
      });
    }

    dataStore.addTopic({
      subjectId: targetSubId,
      chapterId: chapter.id,
      title: topicTitle.trim(),
      estimatedMinutes: parseInt(estimatedMinutes) || 45,
      priority,
      difficulty,
      order: 1,
      learningObjectives: [],
    });

    setTopicTitle('');
    setChapterTitle('');
    onSuccess();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Syllabus Topic" description="Add a new chapter and topic to track">
      <form onSubmit={handleSubmit} className="space-y-4">
        {subjects.length > 0 && (
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Select Subject
            </label>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-600"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <Input
          label="Chapter / Unit Title"
          placeholder="e.g. Chapter 1: Real Numbers"
          value={chapterTitle}
          onChange={(e) => setChapterTitle(e.target.value)}
        />

        <Input
          label="Topic Title"
          placeholder="e.g. Quadratic Equations & Discriminant"
          value={topicTitle}
          onChange={(e) => setTopicTitle(e.target.value)}
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Estimated Minutes"
            type="number"
            value={estimatedMinutes}
            onChange={(e) => setEstimatedMinutes(e.target.value)}
            required
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Priority Level
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as PriorityLevel)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-600"
            >
              <option value="URGENT">Urgent</option>
              <option value="HIGH">High Priority</option>
              <option value="MEDIUM">Medium Priority</option>
              <option value="LOW">Low Priority</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Add Topic</Button>
        </div>
      </form>
    </Modal>
  );
}

// 4. Add Student Modal
export function AddStudentModal({
  isOpen,
  onClose,
  onSuccess,
  classes,
}: ModalPropsBase & { classes: AcademicClassData[] }) {
  const [name, setName] = useState('');
  const [studentIdNumber, setStudentIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [classId, setClassId] = useState(classes[0]?.id || '');
  const [schoolCollege, setSchoolCollege] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [weeklyHours, setWeeklyHours] = useState('14');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const selectedClass = classes.find((c) => c.id === classId) || classes[0];

    dataStore.addStudent({
      userId: `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@student.com`,
      studentIdNumber: studentIdNumber.trim() || `STD-${Math.floor(1000 + Math.random() * 9000)}`,
      classId: selectedClass?.id || 'class-default',
      className: selectedClass?.name || 'Class 9',
      academicSession: '2026-2027',
      schoolCollege: schoolCollege.trim() || 'Central Model College',
      guardian: {
        name: guardianName.trim() || 'Guardian',
        relationship: 'Parent',
        phone: '+880 1700-000000',
      },
      weeklySchedule: [
        { dayOfWeek: 'SATURDAY', startTime: '19:00', endTime: '21:00', maxDurationMinutes: 120 },
        { dayOfWeek: 'SUNDAY', startTime: '19:00', endTime: '21:00', maxDurationMinutes: 120 },
        { dayOfWeek: 'MONDAY', startTime: '19:00', endTime: '21:00', maxDurationMinutes: 120 },
      ],
      enrolledSubjectIds: [],
    });

    setName('');
    setStudentIdNumber('');
    setEmail('');
    onSuccess();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Enroll New Student" description="Add student profile and academic details">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          placeholder="e.g. Rahim Ahmed"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Student ID Number"
            placeholder="e.g. STD-2026-001"
            value={studentIdNumber}
            onChange={(e) => setStudentIdNumber(e.target.value)}
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="student@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {classes.length > 0 && (
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Enrolled Class
            </label>
            <select
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-600"
            >
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <Input
          label="School / College"
          placeholder="e.g. Dhaka Residential Model College"
          value={schoolCollege}
          onChange={(e) => setSchoolCollege(e.target.value)}
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Enroll Student</Button>
        </div>
      </form>
    </Modal>
  );
}

// 5. Add Study Task Modal (Today's Plan)
export function AddStudyTaskModal({
  isOpen,
  onClose,
  onSuccess,
  subjects,
}: ModalPropsBase & { subjects: SubjectData[] }) {
  const [subjectName, setSubjectName] = useState(subjects[0]?.name || 'Mathematics');
  const [topicTitle, setTopicTitle] = useState('');
  const [chapterTitle, setChapterTitle] = useState('Chapter 1: Core Units');
  const [durationMinutes, setDurationMinutes] = useState('45');
  const [taskType, setTaskType] = useState<'TOPIC_STUDY' | 'REVISION' | 'ASSIGNMENT'>('TOPIC_STUDY');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicTitle.trim()) return;

    const matchedSub = subjects.find((s) => s.name === subjectName) || subjects[0];

    dataStore.addStudyPlanItem('std-001', {
      topicId: `top-${Date.now()}`,
      topicTitle: topicTitle.trim(),
      subjectName: matchedSub?.name || subjectName,
      subjectColor: matchedSub?.color || '#4338ca',
      chapterTitle: chapterTitle.trim(),
      type: taskType,
      targetMinutes: parseInt(durationMinutes) || 45,
      actualMinutes: 0,
      isCompleted: false,
      priority: 'HIGH',
    });

    setTopicTitle('');
    onSuccess();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Allocate Today's Study Task" description="Assign a topic to today's study plan">
      <form onSubmit={handleSubmit} className="space-y-4">
        {subjects.length > 0 ? (
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Subject
            </label>
            <select
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-600"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <Input
            label="Subject"
            placeholder="e.g. Mathematics"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            required
          />
        )}

        <Input
          label="Chapter / Unit"
          placeholder="e.g. Chapter 2: Dynamics"
          value={chapterTitle}
          onChange={(e) => setChapterTitle(e.target.value)}
        />

        <Input
          label="Topic Title"
          placeholder="e.g. Linear Equations with Two Variables"
          value={topicTitle}
          onChange={(e) => setTopicTitle(e.target.value)}
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Planned Minutes"
            type="number"
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(e.target.value)}
            required
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Task Type
            </label>
            <select
              value={taskType}
              onChange={(e) => setTaskType(e.target.value as any)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-600"
            >
              <option value="TOPIC_STUDY">New Topic Study</option>
              <option value="REVISION">Spaced Revision</option>
              <option value="ASSIGNMENT">Assignment Task</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Schedule Task</Button>
        </div>
      </form>
    </Modal>
  );
}

// 6. Add Note Modal
export function AddNoteModal({
  isOpen,
  onClose,
  onSuccess,
  subjects,
}: ModalPropsBase & { subjects: SubjectData[] }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || '');
  const [noteType, setNoteType] = useState<'TEACHER_NOTE' | 'STUDENT_NOTE'>('TEACHER_NOTE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const matchedSub = subjects.find((s) => s.id === subjectId) || subjects[0];

    dataStore.addNote({
      authorId: 'user-1',
      authorName: noteType === 'TEACHER_NOTE' ? 'Sir Anwar Hossain (Teacher)' : 'Rahim Ahmed (Student)',
      authorRole: noteType === 'TEACHER_NOTE' ? 'TEACHER' : 'STUDENT',
      type: noteType,
      subjectId: matchedSub?.id || 'sub-1',
      subjectName: matchedSub?.name || 'Mathematics',
      title: title.trim(),
      content: content.trim(),
      attachments: [],
      tags: ['Study Guide', matchedSub?.name || 'Academic'],
      isPinned: false,
    });

    setTitle('');
    setContent('');
    onSuccess();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Academic Note" description="Write study notes or share materials">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Note Title"
          placeholder="e.g. Formula Summary & Steps"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Note Category
            </label>
            <select
              value={noteType}
              onChange={(e) => setNoteType(e.target.value as any)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-600"
            >
              <option value="TEACHER_NOTE">Teacher Shared Note</option>
              <option value="STUDENT_NOTE">Student Personal Note</option>
            </select>
          </div>

          {subjects.length > 0 && (
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Subject
              </label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-600"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            Note Content / Summary
          </label>
          <textarea
            rows={4}
            placeholder="Write key equations, explanations, or study tips..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-600"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Publish Note</Button>
        </div>
      </form>
    </Modal>
  );
}

// 7. Add Assignment Modal
export function AddAssignmentModal({
  isOpen,
  onClose,
  onSuccess,
  subjects,
}: ModalPropsBase & { subjects: SubjectData[] }) {
  const [title, setTitle] = useState('');
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || '');
  const [instructions, setInstructions] = useState('');
  const [totalMarks, setTotalMarks] = useState('20');
  const [deadline, setDeadline] = useState('2026-10-05T21:00');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const matchedSub = subjects.find((s) => s.id === subjectId) || subjects[0];

    dataStore.addAssignment({
      teacherId: 'teacher-1',
      classId: 'class-9',
      subjectId: matchedSub?.id || 'sub-1',
      subjectName: matchedSub?.name || 'General',
      title: title.trim(),
      instructions: instructions.trim(),
      attachments: [],
      deadline: new Date(deadline).toISOString(),
      totalMarks: parseInt(totalMarks) || 20,
      status: 'PUBLISHED',
    });

    setTitle('');
    setInstructions('');
    onSuccess();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Assignment" description="Assign homework or numerical problem sets">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Assignment Title"
          placeholder="e.g. Kinematics Problem Set 1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {subjects.length > 0 && (
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Subject
            </label>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-600"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Total Marks"
            type="number"
            value={totalMarks}
            onChange={(e) => setTotalMarks(e.target.value)}
            required
          />

          <Input
            label="Deadline Date & Time"
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            Instructions
          </label>
          <textarea
            rows={3}
            placeholder="State submission guidelines, exercise question numbers..."
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-600"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Create Assignment</Button>
        </div>
      </form>
    </Modal>
  );
}
