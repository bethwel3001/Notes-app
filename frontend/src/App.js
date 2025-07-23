import React, { useEffect, useState } from 'react';
import API from './api';
import NoteCard from './components/NoteCard';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon, PlusIcon, SparklesIcon } from '@heroicons/react/solid';

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [darkMode, setDarkMode] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    fetchNotes();
  }, [darkMode]);

  const fetchNotes = async () => {
    try {
      const res = await API.get('/notes');
      setNotes(res.data.reverse());
    } catch (e) {
      console.error('Error fetching notes:', e);
    }
  };

  const createNote = async () => {
    if (!form.title) return;
    await API.post('/notes', form);
    setForm({ title: '', content: '' });
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await API.delete(`/notes/${id}`);
    fetchNotes();
  };

  const handleComingSoon = () => {
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-56 sm:flex hidden flex-col bg-gray-100 dark:bg-gray-800 p-4">
        <h1 className="text-xl font-bold mb-4">QuickNote</h1>

        <nav className="space-y-2 text-sm">
          {notes.slice(0, 5).map((note) => (
            <div
              key={note._id}
              className="cursor-pointer hover:text-secondary truncate"
              title={note.title}
            >
              {note.title || '(no title)'}
            </div>
          ))}
        </nav>

        <button
          onClick={handleComingSoon}
          className="mt-6 text-left text-sm text-blue-500 hover:underline flex items-center space-x-1"
        >
          <SparklesIcon className="h-4 w-4" />
          <span>Extras</span>
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col p-4 sm:p-6 overflow-auto">
        {/* Navbar */}
        <nav className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold">All Notes</h2>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5 text-yellow-400" />
            ) : (
              <MoonIcon className="h-5 w-5 text-gray-800" />
            )}
          </button>
        </nav>

        {/* Tooltip */}
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-secondary text-white px-4 py-2 rounded shadow z-50"
          >
            Coming soon!
          </motion.div>
        )}

        {/* Note Form */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <input
            type="text"
            placeholder="Note title..."
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full mb-2 p-3 rounded border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-secondary"
          />
          <textarea
            placeholder="Write something..."
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows="4"
            className="w-full p-3 rounded border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-secondary"
          />
          <button
            onClick={createNote}
            className="mt-2 px-5 py-2 bg-secondary hover:bg-green-600 text-white rounded shadow transition flex items-center space-x-2"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Add Note</span>
          </button>
        </motion.div>

        {/* Notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 flex-1 overflow-y-auto pb-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} onDelete={deleteNote} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
