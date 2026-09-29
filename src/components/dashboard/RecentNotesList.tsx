'use client';

import React, { useState } from 'react';
import {
  FileText,
  User,
  ShieldCheck,
  Paperclip,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

interface NoteItem {
  id: string;
  type: 'TEACHER' | 'STUDENT';
  author: string;
  title: string;
  subject: string;
  subjectBadgeStyle: string;
  snippet: string;
  attachmentsCount: number;
  timeAgo: string;
  tags: string[];
}

const RECENT_NOTES: NoteItem[] = [
  {
    id: 'note-1',
    type: 'TEACHER',
    author: 'Sir Anwar Hossain (Teacher)',
    title: 'Summary Formula Sheet & Contradiction Proof Steps',
    subject: 'Mathematics',
    subjectBadgeStyle: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    snippet: 'Step-by-step contradiction proof template for √2, √3 and recurring decimal fractions conversion table...',
    attachmentsCount: 2,
    timeAgo: '2 hours ago',
    tags: ['Proofs', 'Class 9 Math', 'Formulas'],
  },
  {
    id: 'note-2',
    type: 'STUDENT',
    author: 'Rahim Ahmed (Class 9)',
    title: 'Personal Kinematics & Free Fall Shortcuts',
    subject: 'Physics',
    subjectBadgeStyle: 'bg-sky-50 text-sky-700 border-sky-200',
    snippet: 'Remember: replace acceleration a with -g (-9.8 m/s²). At maximum height, final vertical velocity v=0...',
    attachmentsCount: 1,
    timeAgo: 'Yesterday',
    tags: ['Motion', 'Formulas', 'Quick Recall'],
  },
  {
    id: 'note-3',
    type: 'TEACHER',
    author: 'Sir Anwar Hossain (Teacher)',
    title: 'Narration & Speech Transformation Cheat Rules',
    subject: 'English',
    subjectBadgeStyle: 'bg-purple-50 text-purple-700 border-purple-200',
    snippet: 'Complete tense shift table from Direct to Indirect speech with reporting verb modifications and exception rules...',
    attachmentsCount: 1,
    timeAgo: '2 days ago',
    tags: ['Grammar', 'Class 9 English'],
  },
  {
    id: 'note-4',
    type: 'STUDENT',
    author: 'Fatima Khan (Class 9)',
    title: 'Cell Division Diagram Annotations & Key Phases',
    subject: 'Biology',
    subjectBadgeStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    snippet: 'Hand-drawn prophase, metaphase, anaphase, telophase chromosome alignments with color code markers...',
    attachmentsCount: 3,
    timeAgo: '3 days ago',
    tags: ['Cytology', 'Diagrams'],
  },
];

export function RecentNotesList() {
  const [activeTab, setActiveTab] = useState<'ALL' | 'TEACHER' | 'STUDENT'>('ALL');

  const filteredNotes =
    activeTab === 'ALL' ? RECENT_NOTES : RECENT_NOTES.filter((n) => n.type === activeTab);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-base text-slate-900 tracking-tight">Recent Academic Notes</h3>
          <p className="text-xs text-slate-500">Teacher master references and verified student notebooks</p>
        </div>

        {/* Tab buttons */}
        <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl text-[11px] font-medium text-slate-600 border border-slate-200/50">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-3 py-1 rounded-lg transition ${
              activeTab === 'ALL' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'hover:text-slate-900'
            }`}
          >
            All Notes
          </button>
          <button
            onClick={() => setActiveTab('TEACHER')}
            className={`px-3 py-1 rounded-lg transition ${
              activeTab === 'TEACHER' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'hover:text-slate-900'
            }`}
          >
            Teacher Shared
          </button>
          <button
            onClick={() => setActiveTab('STUDENT')}
            className={`px-3 py-1 rounded-lg transition ${
              activeTab === 'STUDENT' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'hover:text-slate-900'
            }`}
          >
            Student Notes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="p-4 rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 shadow-2xs card-shadow-hover transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${note.subjectBadgeStyle}`}
                  >
                    {note.subject}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      note.type === 'TEACHER'
                        ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}
                  >
                    {note.type === 'TEACHER' ? (
                      <>
                        <ShieldCheck className="w-3 h-3 text-indigo-600" /> Teacher Shared
                      </>
                    ) : (
                      <>
                        <User className="w-3 h-3 text-emerald-600" /> Student Note
                      </>
                    )}
                  </span>
                </div>

                <span className="text-[10px] font-medium text-slate-400">{note.timeAgo}</span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700 transition leading-snug">
                {note.title}
              </h4>

              <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed font-normal">
                {note.snippet}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5 truncate max-w-[180px]">
                <User className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate font-medium text-slate-600">{note.author}</span>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                {note.attachmentsCount > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold text-[10px]">
                    <Paperclip className="w-3 h-3 text-slate-400" /> {note.attachmentsCount} file{note.attachmentsCount > 1 ? 's' : ''}
                  </span>
                )}
                <span className="text-indigo-700 group-hover:translate-x-0.5 transition font-semibold flex items-center text-xs">
                  Read <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
