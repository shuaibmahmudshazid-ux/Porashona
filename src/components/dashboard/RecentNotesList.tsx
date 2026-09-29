'use client';

import React, { useState } from 'react';
import {
  FileText,
  User,
  Shield,
  Paperclip,
  Tag,
  ChevronRight,
  Download,
} from 'lucide-react';

interface NoteItem {
  id: string;
  type: 'TEACHER' | 'STUDENT';
  author: string;
  title: string;
  subject: string;
  subjectColor: string;
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
    subjectColor: '#4f46e5',
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
    subjectColor: '#8b5cf6',
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
    subjectColor: '#0ea5e9',
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
    subjectColor: '#10b981',
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-base text-slate-900 tracking-tight">Recent Academic Notes</h3>
          <p className="text-xs text-slate-500">Teacher study materials and personal student notebooks</p>
        </div>

        {/* Tab buttons */}
        <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl text-[11px] font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-2.5 py-1 rounded-lg transition ${
              activeTab === 'ALL' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            All Notes
          </button>
          <button
            onClick={() => setActiveTab('TEACHER')}
            className={`px-2.5 py-1 rounded-lg transition ${
              activeTab === 'TEACHER' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Teacher Notes
          </button>
          <button
            onClick={() => setActiveTab('STUDENT')}
            className={`px-2.5 py-1 rounded-lg transition ${
              activeTab === 'STUDENT' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Student Notes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="p-4 rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-xs transition flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: note.subjectColor }}
                  >
                    {note.subject}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      note.type === 'TEACHER'
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        : 'bg-sky-50 text-sky-700 border border-sky-200'
                    }`}
                  >
                    {note.type === 'TEACHER' ? (
                      <>
                        <Shield className="w-2.5 h-2.5" /> Teacher Shared
                      </>
                    ) : (
                      <>
                        <User className="w-2.5 h-2.5" /> Student Note
                      </>
                    )}
                  </span>
                </div>

                <span className="text-[10px] text-slate-400">{note.timeAgo}</span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition leading-snug">
                {note.title}
              </h4>

              <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                {note.snippet}
              </p>
            </div>

            <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-1 truncate max-w-[180px]">
                <User className="w-3 h-3 text-slate-400" />
                <span className="truncate">{note.author}</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {note.attachmentsCount > 0 && (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                    <Paperclip className="w-3 h-3" /> {note.attachmentsCount} file{note.attachmentsCount > 1 ? 's' : ''}
                  </span>
                )}
                <span className="text-indigo-600 group-hover:translate-x-0.5 transition font-semibold flex items-center">
                  Read <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
