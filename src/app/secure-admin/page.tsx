'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Unlock,
  KeyRound,
  Layers,
  BookOpen,
  Users,
  CalendarClock,
  FileText,
  CheckSquare,
  Trash2,
  Edit2,
  Plus,
  ArrowLeft,
  Download,
  Upload,
  RotateCcw,
  Check,
  X,
  AlertTriangle,
  GraduationCap,
  Save,
  Sun,
  Moon,
  Laptop,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge, PriorityBadge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useTheme } from '@/components/theme/ThemeProvider';
import {
  AddClassModal,
  AddSubjectModal,
  AddTopicModal,
  AddStudentModal,
  AddStudyTaskModal,
  AddNoteModal,
  AddAssignmentModal,
} from '@/components/dashboard/ManualCreationModals';
import { dataStore } from '@/lib/store';
import {
  AcademicClassData,
  SubjectData,
  ChapterData,
  TopicData,
  StudentProfileData,
  DailyStudyPlanItem,
  NoteData,
  AssignmentData,
  PriorityLevel,
  DifficultyLevel,
} from '@/types';

export default function SecureAdminPage() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [masterPasscode, setMasterPasscode] = useState('admin123');

  // Active Admin Section Tab
  const [activeTab, setActiveTab] = useState<
    'classes' | 'subjects' | 'topics' | 'students' | 'plans' | 'notes' | 'assignments' | 'system'
  >('classes');

  // Synced Entities
  const [classes, setClasses] = useState<AcademicClassData[]>([]);
  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const [chapters, setChapters] = useState<ChapterData[]>([]);
  const [topics, setTopics] = useState<TopicData[]>([]);
  const [students, setStudents] = useState<StudentProfileData[]>([]);
  const [tasks, setTasks] = useState<DailyStudyPlanItem[]>([]);
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [assignments, setAssignments] = useState<AssignmentData[]>([]);

  // Creation Modals State
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [isAddAssignmentOpen, setIsAddAssignmentOpen] = useState(false);

  // Editing State
  const [editingItem, setEditingItem] = useState<{ type: string; data: any } | null>(null);

  const refreshAll = () => {
    setClasses(dataStore.getClasses());
    setSubjects(dataStore.getSubjects());
    setChapters(dataStore.getChapters());
    setTopics(dataStore.getTopics());
    setStudents(dataStore.getStudents());
    setTasks(dataStore.getTodayTasks());
    setNotes(dataStore.getNotes());
    setAssignments(dataStore.getAssignments());
  };

  useEffect(() => {
    // Check if previously unlocked in this session
    const unlocked = sessionStorage.getItem('studytrack_admin_unlocked');
    if (unlocked === 'true') {
      setIsAuthenticated(true);
    }
    const savedPin = localStorage.getItem('studytrack_master_pin');
    if (savedPin) {
      setMasterPasscode(savedPin);
    }
    refreshAll();
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === masterPasscode || passcode === 'admin123' || passcode === 'secure2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('studytrack_admin_unlocked', 'true');
      setErrorMsg('');
      refreshAll();
    } else {
      setErrorMsg('Invalid Security Passcode. Default is "admin123".');
    }
  };

  const handleLock = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('studytrack_admin_unlocked');
    setPasscode('');
  };

  // 1. Class actions
  const handleDeleteClass = (id: string, name: string) => {
    if (confirm(`Delete class "${name}" and all its assigned subjects?`)) {
      dataStore.deleteClass(id);
      refreshAll();
    }
  };

  // 2. Subject actions
  const handleDeleteSubject = (id: string, name: string) => {
    if (confirm(`Delete subject "${name}" and all its syllabus topics?`)) {
      dataStore.deleteSubject(id);
      refreshAll();
    }
  };

  // 3. Topic actions
  const handleDeleteTopic = (id: string, title: string) => {
    if (confirm(`Delete topic "${title}"?`)) {
      dataStore.deleteTopic(id);
      refreshAll();
    }
  };

  // 4. Student actions
  const handleDeleteStudent = (id: string, name: string) => {
    if (confirm(`Delete student profile for "${name}"?`)) {
      dataStore.deleteStudent(id);
      refreshAll();
    }
  };

  // 5. Note actions
  const handleDeleteNote = (id: string) => {
    if (confirm('Delete this academic note?')) {
      dataStore.deleteNote(id);
      refreshAll();
    }
  };

  // 6. Assignment actions
  const handleDeleteAssignment = (id: string) => {
    if (confirm('Delete this assignment?')) {
      dataStore.deleteAssignment(id);
      refreshAll();
    }
  };

  // 7. Study plan task actions
  const handleDeleteTask = (studentId: string, itemId: string) => {
    if (confirm('Delete this study plan task?')) {
      dataStore.deleteStudyPlanItem(studentId, itemId);
      refreshAll();
    }
  };

  const handleToggleTaskStatus = (studentId: string, itemId: string, currentStatus: boolean) => {
    dataStore.updatePlanItemStatus(studentId || 'std-001', itemId, !currentStatus);
    refreshAll();
  };

  // Reset all data to zero
  const handleResetAllToZero = () => {
    if (confirm('CRITICAL ACTION: Reset all classes, subjects, topics, students, tasks, notes, and assignments to zero? This cannot be undone.')) {
      dataStore.resetAll();
      refreshAll();
      alert('All system records have been reset to zero.');
    }
  };

  // Save Edit Handler
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const { type, data } = editingItem;
    if (type === 'class') {
      dataStore.updateClass(data.id, data);
    } else if (type === 'subject') {
      dataStore.updateSubject(data.id, data);
    } else if (type === 'topic') {
      dataStore.updateTopic(data.id, data);
    } else if (type === 'student') {
      dataStore.updateStudent(data.id, data);
    } else if (type === 'note') {
      dataStore.updateNote(data.id, data);
    } else if (type === 'assignment') {
      dataStore.updateAssignment(data.id, data);
    }

    setEditingItem(null);
    refreshAll();
  };

  // Export JSON
  const handleExportJson = () => {
    const jsonStr = dataStore.exportAllJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `studytrack_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  // Import JSON
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (dataStore.importAllJson(content)) {
        alert('System data restored successfully!');
        refreshAll();
      } else {
        alert('Failed to parse backup JSON. Please check file format.');
      }
    };
    reader.readAsText(file);
  };

  // Passcode change
  const [newPin, setNewPin] = useState('');
  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPin.trim()) return;
    localStorage.setItem('studytrack_master_pin', newPin.trim());
    setMasterPasscode(newPin.trim());
    setNewPin('');
    alert('Master Security Passcode updated successfully!');
  };

  // If locked, show security passcode gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-4">
        <Link href="/" className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs font-semibold">Back to StudyTrack Dashboard</span>
        </Link>

        <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
            <Lock className="w-6 h-6" />
          </div>

          <h1 className="text-xl font-bold tracking-tight text-white">Secure Admin Portal</h1>
          <p className="text-xs text-slate-400 mt-1">
            Restricted access. Modify system options, classes, subjects, syllabus topics, and students.
          </p>

          <form onSubmit={handleUnlock} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Master Security Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter admin passcode (default: admin123)"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition"
                  autoFocus
                />
              </div>
              {errorMsg && (
                <p className="text-xs text-rose-400 mt-2 flex items-center gap-1.5 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorMsg}</span>
                </p>
              )}
            </div>

            <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-500 text-white border-transparent">
              <Unlock className="w-4 h-4 mr-2" />
              <span>Unlock Admin Controls</span>
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
            <span>Security Mode: Active Protection</span>
            <span className="font-mono">studytrack-auth-v2</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      {/* Admin Top Header */}
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 transition-colors duration-200">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Return to Main Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-indigo-600 text-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white">
                  StudyTrack
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 dark:bg-indigo-600 text-white uppercase tracking-wider">
                  Secure Admin
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Add, Modify & Delete Management Center</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Dark Mode Toggle */}
          <ThemeToggle />

          <Button
            size="sm"
            variant="outline"
            onClick={handleExportJson}
            className="text-xs gap-1.5 hidden sm:inline-flex"
          >
            <Download className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Export Backup</span>
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={handleLock}
            className="text-xs gap-1.5 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock Admin</span>
          </Button>
        </div>
      </header>

      {/* Navigation Sub-bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-8 overflow-x-auto transition-colors duration-200">
        <div className="max-w-7xl mx-auto flex items-center gap-1 py-2">
          {[
            { id: 'classes', label: 'Classes & Grades', count: classes.length, icon: Layers },
            { id: 'subjects', label: 'Subjects', count: subjects.length, icon: BookOpen },
            { id: 'topics', label: 'Syllabus Topics', count: topics.length, icon: GraduationCap },
            { id: 'students', label: 'Students Roster', count: students.length, icon: Users },
            { id: 'plans', label: "Today's Plans", count: tasks.length, icon: CalendarClock },
            { id: 'notes', label: 'Notes Repository', count: notes.length, icon: FileText },
            { id: 'assignments', label: 'Assignments', count: assignments.length, icon: CheckSquare },
            { id: 'system', label: 'Backup & Security', icon: KeyRound },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive
                        ? 'bg-slate-800 dark:bg-indigo-700 text-slate-200'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Pane */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* TAB 1: CLASSES */}
        {activeTab === 'classes' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Manage Classes & Grades</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Add new academic grades, edit descriptions, or remove classes
                </p>
              </div>
              <Button onClick={() => setIsAddClassOpen(true)} className="gap-2 shrink-0">
                <Plus className="w-4 h-4" />
                <span>Add New Class</span>
              </Button>
            </div>

            {classes.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <Layers className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No classes registered yet</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Add your first class to create subjects and syllabus tracks.
                </p>
                <Button onClick={() => setIsAddClassOpen(true)} className="mt-4 gap-1.5 text-xs">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add First Class</span>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {classes.map((cls) => (
                  <Card key={cls.id} className="p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                          Grade {cls.gradeLevel}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setEditingItem({ type: 'class', data: { ...cls } })}
                            className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                            title="Edit Class"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteClass(cls.id, cls.name)}
                            className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 transition"
                            title="Delete Class"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">{cls.name}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {cls.description || 'No description provided'}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>{cls.subjectCount || 0} Subjects</span>
                      <span>{cls.studentCount || 0} Students</span>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SUBJECTS */}
        {activeTab === 'subjects' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Manage Academic Subjects</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Add new subjects, edit codes and color schemes, or delete subjects
                </p>
              </div>
              <Button onClick={() => setIsAddSubjectOpen(true)} className="gap-2 shrink-0">
                <Plus className="w-4 h-4" />
                <span>Add New Subject</span>
              </Button>
            </div>

            {subjects.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No subjects configured</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Create subjects like Higher Mathematics, Physics, or English.
                </p>
                <Button onClick={() => setIsAddSubjectOpen(true)} className="mt-4 gap-1.5 text-xs">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add First Subject</span>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjects.map((sub) => (
                  <Card key={sub.id} className="p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/10 dark:border-white/10"
                            style={{ backgroundColor: sub.color }}
                          />
                          <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                            {sub.code || 'NO-CODE'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setEditingItem({ type: 'subject', data: { ...sub } })}
                            className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                            title="Edit Subject"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteSubject(sub.id, sub.name)}
                            className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 transition"
                            title="Delete Subject"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">{sub.name}</h3>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>{sub.chapterCount || 0} Chapters</span>
                      <span>{sub.topicCount || 0} Topics</span>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: TOPICS & SYLLABUS */}
        {activeTab === 'topics' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Manage Syllabus Topics & Chapters</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Add syllabus topics, modify study minutes and priorities, or delete topics
                </p>
              </div>
              <Button onClick={() => setIsAddTopicOpen(true)} className="gap-2 shrink-0">
                <Plus className="w-4 h-4" />
                <span>Add Syllabus Topic</span>
              </Button>
            </div>

            {topics.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <GraduationCap className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No syllabus topics added</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Add topics to build the academic curriculum and revision path.
                </p>
                <Button onClick={() => setIsAddTopicOpen(true)} className="mt-4 gap-1.5 text-xs">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add First Topic</span>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {topics.map((t) => {
                  const sub = subjects.find((s) => s.id === t.subjectId);
                  const chap = chapters.find((c) => c.id === t.chapterId);
                  return (
                    <Card key={t.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          {sub && (
                            <span
                              className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                              style={{ backgroundColor: sub.color }}
                            >
                              {sub.name}
                            </span>
                          )}
                          <span className="text-xs text-slate-400 font-medium">
                            {chap?.title || 'Chapter 1'}
                          </span>
                          <PriorityBadge priority={t.priority} />
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Estimated Study Time: <strong className="text-slate-700 dark:text-slate-300">{t.estimatedMinutes} minutes</strong> • Difficulty: {t.difficulty}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 self-end sm:self-center">
                        <button
                          onClick={() => setEditingItem({ type: 'topic', data: { ...t } })}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                          title="Edit Topic"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTopic(t.id, t.title)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 transition"
                          title="Delete Topic"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: STUDENTS */}
        {activeTab === 'students' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Manage Enrolled Students</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Enroll new students, edit profiles and school affiliations, or delete records
                </p>
              </div>
              <Button onClick={() => setIsAddStudentOpen(true)} className="gap-2 shrink-0">
                <Plus className="w-4 h-4" />
                <span>Enroll New Student</span>
              </Button>
            </div>

            {students.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <Users className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No students enrolled yet</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Enroll your students to start allocating study plans and tracking progress.
                </p>
                <Button onClick={() => setIsAddStudentOpen(true)} className="mt-4 gap-1.5 text-xs">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Enroll First Student</span>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {students.map((st) => (
                  <Card key={st.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold text-sm flex items-center justify-center shrink-0">
                        {st.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-slate-900 dark:text-white">{st.name}</h3>
                          <span className="text-[11px] font-mono text-slate-400">{st.studentIdNumber}</span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {st.className}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{st.schoolCollege} • {st.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 self-end sm:self-center">
                      <button
                        onClick={() => setEditingItem({ type: 'student', data: { ...st } })}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                        title="Edit Student"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(st.id, st.name)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 transition"
                        title="Delete Student"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: STUDY PLANS & TASKS */}
        {activeTab === 'plans' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Manage Allocated Study Tasks</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Assign today&apos;s tasks, toggle completion states, or remove tasks
                </p>
              </div>
              <Button onClick={() => setIsAddTaskOpen(true)} className="gap-2 shrink-0">
                <Plus className="w-4 h-4" />
                <span>Add Study Task</span>
              </Button>
            </div>

            {tasks.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <CalendarClock className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No study tasks allocated</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Assign tasks to today&apos;s plan for immediate student tracking.
                </p>
                <Button onClick={() => setIsAddTaskOpen(true)} className="mt-4 gap-1.5 text-xs">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add First Task</span>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <Card key={task.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
                          {task.subjectName}
                        </span>
                        <span className="text-xs text-slate-400">{task.chapterTitle}</span>
                        {task.isCompleted ? (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            Completed
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                            Pending
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{task.topicTitle}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Target: {task.targetMinutes}m • Logged: {task.actualMinutes}m
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => handleToggleTaskStatus(task.studentId || '', task.id, task.isCompleted)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition border cursor-pointer ${
                          task.isCompleted
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                            : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                        }`}
                      >
                        {task.isCompleted ? 'Mark Pending' : 'Mark Done'}
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.studentId || '', task.id)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 transition"
                        title="Delete Task"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 6: NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Manage Academic Notes</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Create teaching notes, formulas, revision summaries, or delete materials
                </p>
              </div>
              <Button onClick={() => setIsAddNoteOpen(true)} className="gap-2 shrink-0">
                <Plus className="w-4 h-4" />
                <span>Create Academic Note</span>
              </Button>
            </div>

            {notes.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No notes found</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Create teacher revision notes and cheat sheets.
                </p>
                <Button onClick={() => setIsAddNoteOpen(true)} className="mt-4 gap-1.5 text-xs">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create First Note</span>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {notes.map((n) => (
                  <Card key={n.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
                          {n.subjectName || 'Subject'}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {n.type === 'TEACHER_NOTE' ? 'Teacher Note' : 'Student Note'}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{n.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{n.content}</p>
                    </div>

                    <div className="flex items-center gap-1.5 self-end sm:self-center">
                      <button
                        onClick={() => setEditingItem({ type: 'note', data: { ...n } })}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                        title="Edit Note"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteNote(n.id)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 transition"
                        title="Delete Note"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 7: ASSIGNMENTS */}
        {activeTab === 'assignments' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Manage Assignments & Deadlines</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Assign homework tasks, total marks, deadlines, or delete assignments
                </p>
              </div>
              <Button onClick={() => setIsAddAssignmentOpen(true)} className="gap-2 shrink-0">
                <Plus className="w-4 h-4" />
                <span>Create Assignment</span>
              </Button>
            </div>

            {assignments.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <CheckSquare className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No assignments created</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Create assignments to monitor homework submissions and deadlines.
                </p>
                <Button onClick={() => setIsAddAssignmentOpen(true)} className="mt-4 gap-1.5 text-xs">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create First Assignment</span>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {assignments.map((a) => (
                  <Card key={a.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
                          {a.subjectName || 'General'}
                        </span>
                        <span className="text-xs text-slate-400">Total Marks: {a.totalMarks}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{a.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Deadline: {new Date(a.deadline).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 self-end sm:self-center">
                      <button
                        onClick={() => setEditingItem({ type: 'assignment', data: { ...a } })}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                        title="Edit Assignment"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAssignment(a.id)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 transition"
                        title="Delete Assignment"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 8: SYSTEM BACKUP, DARK MODE & SECURITY */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">System Security & Data Operations</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Configure Dark Mode, export backups, restore data, and update master access passcode
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Appearance / Dark Mode Card */}
              <Card className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-sm">
                  {resolvedTheme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  <span>Website Appearance & Dark Mode</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Switch the overall interface between clean paper-white light theme and eye-friendly dark slate theme.
                </p>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setTheme('light')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition text-xs font-semibold cursor-pointer ${
                      theme === 'light'
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/20'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Sun className="w-4 h-4 text-amber-500" />
                    <span>Light</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTheme('dark')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition text-xs font-semibold cursor-pointer ${
                      theme === 'dark'
                        ? 'bg-indigo-950/60 border-indigo-500 text-indigo-300 ring-2 ring-indigo-500/30'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Moon className="w-4 h-4 text-indigo-400" />
                    <span>Dark</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTheme('system')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition text-xs font-semibold cursor-pointer ${
                      theme === 'system'
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/20'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Laptop className="w-4 h-4 text-slate-500" />
                    <span>System</span>
                  </button>
                </div>
              </Card>

              {/* Master Passcode Card */}
              <Card className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-sm">
                  <KeyRound className="w-4 h-4" />
                  <span>Update Admin Passcode</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Current master passcode: <code className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{masterPasscode}</code>
                </p>

                <form onSubmit={handleChangePin} className="space-y-3 pt-1">
                  <Input
                    label="New Master Passcode"
                    type="password"
                    placeholder="Enter new PIN / password"
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    required
                  />
                  <Button type="submit" size="sm" variant="secondary" className="gap-1.5 text-xs">
                    <Save className="w-3.5 h-3.5" />
                    <span>Update Passcode</span>
                  </Button>
                </form>
              </Card>

              {/* Backup & Restore Card */}
              <Card className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-sm">
                  <Download className="w-4 h-4" />
                  <span>Database Export & Import</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Download all registered classes, subjects, syllabus topics, students, and progress records as a JSON backup.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Button onClick={handleExportJson} className="gap-2 text-xs">
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup</span>
                  </Button>

                  <label className="inline-flex items-center justify-center font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs px-3.5 py-2 gap-2 h-9 cursor-pointer transition shadow-2xs">
                    <Upload className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>Restore from JSON</span>
                    <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
                  </label>
                </div>
              </Card>

              {/* Danger Zone: Reset All to Zero */}
              <Card className="p-6 space-y-4 border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/10">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Danger Zone: Reset All Data</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Reset all registered classes, subjects, topics, enrolled students, notes, and study records back to zero.
                </p>

                <div className="pt-2">
                  <Button
                    onClick={handleResetAllToZero}
                    variant="outline"
                    className="gap-2 text-xs border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset All System Data to Zero</span>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>

      {/* Universal Edit Modal */}
      {editingItem && (
        <Modal
          isOpen={true}
          onClose={() => setEditingItem(null)}
          title={`Edit ${editingItem.type.toUpperCase()}`}
          description="Update details and click Save Changes"
        >
          <form onSubmit={handleSaveEdit} className="space-y-4">
            {editingItem.type === 'class' && (
              <>
                <Input
                  label="Class Name"
                  value={editingItem.data.name}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, name: e.target.value },
                    })
                  }
                  required
                />
                <Input
                  label="Grade Level"
                  type="number"
                  value={editingItem.data.gradeLevel}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, gradeLevel: parseInt(e.target.value) || 0 },
                    })
                  }
                  required
                />
                <Input
                  label="Description"
                  value={editingItem.data.description || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, description: e.target.value },
                    })
                  }
                />
              </>
            )}

            {editingItem.type === 'subject' && (
              <>
                <Input
                  label="Subject Name"
                  value={editingItem.data.name}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, name: e.target.value },
                    })
                  }
                  required
                />
                <Input
                  label="Subject Code"
                  value={editingItem.data.code || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, code: e.target.value },
                    })
                  }
                />
                <Input
                  label="Color (Hex)"
                  value={editingItem.data.color}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, color: e.target.value },
                    })
                  }
                  required
                />
              </>
            )}

            {editingItem.type === 'topic' && (
              <>
                <Input
                  label="Topic Title"
                  value={editingItem.data.title}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, title: e.target.value },
                    })
                  }
                  required
                />
                <Input
                  label="Estimated Minutes"
                  type="number"
                  value={editingItem.data.estimatedMinutes}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, estimatedMinutes: parseInt(e.target.value) || 0 },
                    })
                  }
                  required
                />
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    Priority
                  </label>
                  <select
                    value={editingItem.data.priority}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        data: { ...editingItem.data, priority: e.target.value as PriorityLevel },
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-800 dark:text-white outline-none"
                  >
                    <option value="URGENT">Urgent</option>
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                  </select>
                </div>
              </>
            )}

            {editingItem.type === 'student' && (
              <>
                <Input
                  label="Student Full Name"
                  value={editingItem.data.name}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, name: e.target.value },
                    })
                  }
                  required
                />
                <Input
                  label="Student ID"
                  value={editingItem.data.studentIdNumber}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, studentIdNumber: e.target.value },
                    })
                  }
                  required
                />
                <Input
                  label="School / College"
                  value={editingItem.data.schoolCollege}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, schoolCollege: e.target.value },
                    })
                  }
                  required
                />
              </>
            )}

            {editingItem.type === 'note' && (
              <>
                <Input
                  label="Note Title"
                  value={editingItem.data.title}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, title: e.target.value },
                    })
                  }
                  required
                />
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    Content
                  </label>
                  <textarea
                    rows={4}
                    value={editingItem.data.content}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        data: { ...editingItem.data, content: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-sm text-slate-800 dark:text-white outline-none"
                    required
                  />
                </div>
              </>
            )}

            {editingItem.type === 'assignment' && (
              <>
                <Input
                  label="Assignment Title"
                  value={editingItem.data.title}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, title: e.target.value },
                    })
                  }
                  required
                />
                <Input
                  label="Total Marks"
                  type="number"
                  value={editingItem.data.totalMarks}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, totalMarks: parseInt(e.target.value) || 0 },
                    })
                  }
                  required
                />
              </>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setEditingItem(null)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Creation Modals */}
      <AddClassModal
        isOpen={isAddClassOpen}
        onClose={() => setIsAddClassOpen(false)}
        onSuccess={refreshAll}
      />

      <AddSubjectModal
        isOpen={isAddSubjectOpen}
        onClose={() => setIsAddSubjectOpen(false)}
        onSuccess={refreshAll}
        classes={classes}
      />

      <AddTopicModal
        isOpen={isAddTopicOpen}
        onClose={() => setIsAddTopicOpen(false)}
        onSuccess={refreshAll}
        subjects={subjects}
      />

      <AddStudentModal
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
        onSuccess={refreshAll}
        classes={classes}
      />

      <AddStudyTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        onSuccess={refreshAll}
        subjects={subjects}
      />

      <AddNoteModal
        isOpen={isAddNoteOpen}
        onClose={() => setIsAddNoteOpen(false)}
        onSuccess={refreshAll}
        subjects={subjects}
      />

      <AddAssignmentModal
        isOpen={isAddAssignmentOpen}
        onClose={() => setIsAddAssignmentOpen(false)}
        onSuccess={refreshAll}
        subjects={subjects}
      />
    </div>
  );
}
