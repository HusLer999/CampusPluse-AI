'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
  dueDate: string;
  courseCode?: string;
  courseName?: string;
  courseId?: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Implement Red-Black Tree in C++',
      description: 'Complete insert and delete rotations with unit test coverage.',
      priority: 'HIGH',
      status: 'IN_PROGRESS',
      dueDate: '2026-10-04',
      courseCode: 'CS 201',
      courseName: 'Data Structures & Algorithms',
    },
    {
      id: '2',
      title: 'Neural Network Forward Propagation Paper',
      description: 'Write a 3-page summary on backpropagation mathematics.',
      priority: 'MEDIUM',
      status: 'TODO',
      dueDate: '2026-10-11',
      courseCode: 'CS 480',
      courseName: 'Introduction to Artificial Intelligence',
    },
  ]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isParseModalOpen, setIsParseModalOpen] = useState(false);
  const [syllabusInput, setSyllabusInput] = useState('');
  const [courseCodeInput, setCourseCodeInput] = useState('');
  const [courseNameInput, setCourseNameInput] = useState('');
  const [dueDateInput, setDueDateInput] = useState('');
  const [isParsing, setIsParsing] = useState(false);

  // Status toggle handler
  const handleStatusChange = async (taskId: string, currentStatus: Task['status']) => {
    const statusOrder: Task['status'][] = ['TODO', 'IN_PROGRESS', 'COMPLETED'];
    const nextStatus = statusOrder[(statusOrder.indexOf(currentStatus) + 1) % statusOrder.length];

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: nextStatus } : t))
    );
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask({ ...selectedTask, status: nextStatus });
    }

    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
    } catch (err) {
      console.error('Failed to update task status backend', err);
    }
  };

  // Delete task handler
  const handleDeleteTask = async (taskId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (!confirm('Are you sure you want to delete this task?')) return;

    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    if (selectedTask?.id === taskId) setSelectedTask(null);

    try {
      await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to delete task backend', err);
    }
  };

  // Submit syllabus text for AI parsing
  const handleParseSyllabus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!syllabusInput.trim()) return;

    setIsParsing(true);

    const code = courseCodeInput.trim() || 'CS 301';
    const name = courseNameInput.trim() || 'Operating Systems';
    const chosenDueDate = dueDateInput || new Date().toISOString().split('T')[0];

    // Extract title from syllabus text
    const lines = syllabusInput.split('\n').filter((l) => l.trim().length > 0);
    const rawTitle = lines[0] || 'Parsed Syllabus Task';
    const derivedTitle = rawTitle.length > 55 ? rawTitle.slice(0, 52) + '...' : rawTitle;

    const newTaskObj: Task = {
      id: 'task-' + Date.now(),
      title: derivedTitle,
      description: syllabusInput.length > 180 ? syllabusInput.slice(0, 175) + '...' : syllabusInput,
      priority: 'HIGH',
      status: 'TODO',
      dueDate: chosenDueDate,
      courseCode: code,
      courseName: name,
    };

    // Optimistically prepend new task to list
    setTasks((prev) => [newTaskObj, ...prev]);

    setIsParsing(false);
    setIsParseModalOpen(false);
    setSyllabusInput('');
    setCourseCodeInput('');
    setCourseNameInput('');
    setDueDateInput('');

    try {
      const res = await fetch('/api/syllabus/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          syllabusText: syllabusInput,
          courseCode: code,
          courseName: name,
          dueDate: chosenDueDate,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.task?.id) {
          setTasks((prev) =>
            prev.map((t) => (t.id === newTaskObj.id ? { ...t, id: data.task.id } : t))
          );
        }
      }
    } catch (error) {
      console.error('Backend sync error:', error);
    }
  };

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto space-y-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <Link href="/" className="text-xs text-indigo-400 hover:underline mb-2 block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            📚 Academic Task & Syllabus Planner
          </h1>
        </div>
        <button
          onClick={() => setIsParseModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg transition-all"
        >
          + Parse New Syllabus
        </button>
      </div>

      {/* Task List */}
      <div className="bg-[#1E1F22] border border-white/5 rounded-2xl p-6 shadow-2xl">
        <h2 className="text-lg font-semibold text-white mb-6">Active Assignments & Milestones</h2>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => setSelectedTask(task)}
              className="bg-[#131314] hover:bg-[#25262A] border border-white/5 rounded-xl p-5 cursor-pointer transition-all flex flex-col sm:flex-row justify-between items-start gap-4 group"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
                    {task.courseCode || 'CS TASK'}
                  </span>
                  {task.courseName && (
                    <span className="text-xs font-medium text-slate-300">
                      • {task.courseName}
                    </span>
                  )}
                  <span className="text-xs text-slate-400 ml-auto sm:ml-2">
                    Priority: <strong>{task.priority}</strong>
                  </span>
                </div>
                <h3 className="text-base font-medium text-white">{task.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{task.description}</p>
              </div>

              <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto gap-3">
                <div className="flex items-center gap-2">
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusChange(task.id, task.status);
                    }}
                    className={`text-xs font-semibold px-3 py-1 rounded-full cursor-pointer border transition-colors ${
                      task.status === 'IN_PROGRESS'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                        : task.status === 'COMPLETED'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {task.status}
                  </span>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => handleDeleteTask(task.id, e)}
                    title="Delete Task"
                    className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    🗑️
                  </button>
                </div>
                <span className="text-xs text-slate-400">Due: {task.dueDate}</span>
              </div>
            </div>
          ))}
          {tasks.length === 0 && (
            <p className="text-slate-400 text-sm text-center py-8">
              No active tasks found. Click "+ Parse New Syllabus" to create one.
            </p>
          )}
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E1F22] border border-white/10 rounded-2xl p-6 max-w-lg w-full space-y-6 shadow-2xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded">
                  {selectedTask.courseCode}
                </span>
                {selectedTask.courseName && (
                  <span className="text-xs text-slate-300 font-medium">
                    {selectedTask.courseName}
                  </span>
                )}
              </div>
              <button onClick={() => setSelectedTask(null)} className="text-slate-400 hover:text-white text-lg">
                ✕
              </button>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-2">{selectedTask.title}</h2>
              <p className="text-sm text-slate-300 leading-relaxed">{selectedTask.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-slate-400 border-t border-b border-white/5 py-4">
              <div>Priority: <strong className="text-white">{selectedTask.priority}</strong></div>
              <div>Due Date: <strong className="text-white">{selectedTask.dueDate}</strong></div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => handleDeleteTask(selectedTask.id)}
                className="bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 text-xs font-semibold px-4 py-2 rounded-xl transition-all"
              >
                Delete Assignment
              </button>

              <button
                onClick={() => handleStatusChange(selectedTask.id, selectedTask.status)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all"
              >
                Set Status: {selectedTask.status}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Parse Modal */}
      {isParseModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E1F22] border border-white/10 rounded-2xl p-6 max-w-lg w-full space-y-6 shadow-2xl">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-white">✨ Parse New Syllabus with Gemini AI</h2>
              <button onClick={() => setIsParseModalOpen(false)} className="text-slate-400 hover:text-white text-lg">
                ✕
              </button>
            </div>

            <form onSubmit={handleParseSyllabus} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Course Code</label>
                  <input
                    type="text"
                    placeholder="e.g. CS 301"
                    value={courseCodeInput}
                    onChange={(e) => setCourseCodeInput(e.target.value)}
                    className="w-full bg-[#131314] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Course Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Operating Systems"
                    value={courseNameInput}
                    onChange={(e) => setCourseNameInput(e.target.value)}
                    className="w-full bg-[#131314] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Due Date</label>
                <input
                  type="date"
                  value={dueDateInput}
                  onChange={(e) => setDueDateInput(e.target.value)}
                  className="w-full bg-[#131314] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 [color-scheme:dark]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Paste Syllabus Text or Assignment Outline</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Paste homework policies, assignment names, or milestone dates here..."
                  value={syllabusInput}
                  onChange={(e) => setSyllabusInput(e.target.value)}
                  className="w-full bg-[#131314] border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsParseModalOpen(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isParsing}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50"
                >
                  {isParsing ? 'Parsing with AI...' : 'Parse & Generate Tasks'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}