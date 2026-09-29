'use client';

import React, { useState } from 'react';
import {
  FileText,
  User,
  ShieldCheck,
  Paperclip,
  ChevronRight,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { NoteData } from '@/types';

interface RecentNotesListProps {
  notes: NoteData[];
  onAddNote?: () => void;
}

export function RecentNotesList({ notes = [], onAddNote }: RecentNotesListProps) {
  const [activeTab, setActiveTab] = useState<'ALL' | 'TEACHER' | 'STUDENT'>('ALL');

  const filteredNotes =
    activeTab === 'ALL'
      ? notes
      : activeTab === 'TEACHER'
      ? notes.filter((n) => n.type === 'TEACHER_NOTE')
      : notes.filter((n) => n.type === 'STUDENT_NOTE');

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white tracking-tight">Recent Academic Notes</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {notes.length} Note{notes.length !== 1 ? 's' : ''} in Repository
          </p>
        </div>

        <div className="flex items-center gap-2">
          {notes.length > 0 && (
            <div className="flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/90 p-1 rounded-xl text-[11px] font-medium text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700">
              <button
                onClick={() => setActiveTab('ALL')}
                className={`px-3 py-1 rounded-lg transition ${
                  activeTab === 'ALL' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-2xs' : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('TEACHER')}
                className={`px-3 py-1 rounded-lg transition ${
                  activeTab === 'TEACHER' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-2xs' : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Teacher Notes
              </button>
              <button
                onClick={() => setActiveTab('STUDENT')}
                className={`px-3 py-1 rounded-lg transition ${
                  activeTab === 'STUDENT' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-2xs' : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Student Notes
              </button>
            </div>
          )}

          {onAddNote && (
            <Button size="sm" variant="outline" onClick={onAddNote} className="text-xs gap-1.5 h-8">
              <Plus className="w-3.5 h-3.5" />
              <span>Create Note</span>
            </Button>
          )}
        </div>
      </div>

      {notes.length === 0 ? (
        <div className="py-12 px-4 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3 shadow-2xs">
            <FileText className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">No Academic Notes Added</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1 mb-4 leading-relaxed">
            Create teacher lecture notes, formulas, or allow students to log personal study guides.
          </p>
          {onAddNote && (
            <Button size="sm" onClick={onAddNote} className="gap-1.5 text-xs">
              <Plus className="w-3.5 h-3.5" />
              <span>Write First Note</span>
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs card-shadow-hover transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
                      {note.subjectName || 'Subject'}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                        note.type === 'TEACHER_NOTE'
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
                          : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                      }`}
                    >
                      {note.type === 'TEACHER_NOTE' ? (
                        <>
                          <ShieldCheck className="w-3 h-3 text-indigo-600 dark:text-indigo-400" /> Teacher Note
                        </>
                      ) : (
                        <>
                          <User className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Student Note
                        </>
                      )}
                    </span>
                  </div>

                  <span className="text-[10px] font-medium text-slate-400">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition leading-snug">
                  {note.title}
                </h4>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed font-normal">
                  {note.content}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5 truncate max-w-[180px]">
                  <User className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate font-medium text-slate-600 dark:text-slate-300">{note.authorName}</span>
                </div>

                <span className="text-indigo-700 dark:text-indigo-400 group-hover:translate-x-0.5 transition font-semibold flex items-center text-xs">
                  Read <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
