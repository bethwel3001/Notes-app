import React, { useEffect, useState } from 'react';
import API from './api';
import NoteCard from './components/NoteCard';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [darkMode, setDarkMode] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  // Simple SVG icons as components
  const SunIcon = () => (
    <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
    </svg>
  );

  const MoonIcon = () => (
    <svg className="h-5 w-5 text-gray-800 dark:text-gray-200" fill="currentColor" viewBox="0 0 20 20">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  );

  const PlusIcon = () => (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );

  const SparklesIcon = () => (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );

  const MenuIcon = () => (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );

  const CloseIcon = () => (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside 
        className={`fixed sm:static inset-y-0 left-0 z-50 w-64 sm:w-56 flex flex-col bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
        }`}
        initial={false}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            QuickNote
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 sm:hidden rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Recent Notes */}
        <div className="flex-1 overflow-hidden">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
            Recent Notes
          </h3>
          <nav className="space-y-2 overflow-y-auto max-h-[60vh]">
            {notes.slice(0, 5).map((note) => (
              <div
                key={note._id}
                className="cursor-pointer p-3 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-600 group"
                title={note.title}
              >
                <p className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                  {note.title || '(no title)'}
                </p>
                {note.content && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                    {note.content}
                  </p>
                )}
              </div>
            ))}
            {notes.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic p-3">
                No notes yet
              </p>
            )}
          </nav>
        </div>

        {/* Extras Button */}
        <button
          onClick={handleComingSoon}
          className="mt-4 p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-md"
        >
          <SparklesIcon />
          <span>Extras</span>
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}
        <nav className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors sm:hidden"
            >
              <MenuIcon />
            </button>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200">
              All Notes
            </h2>
            <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-medium">
              {notes.length} notes
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </nav>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 font-medium"
            >
              ✨ Coming soon!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          {/* Note Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Create New Note
            </h3>
            <input
              type="text"
              placeholder="Note title..."
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full mb-4 p-4 rounded-lg border-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors"
            />
            <textarea
              placeholder="Write something..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows="4"
              className="w-full p-4 rounded-lg border-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 resize-none transition-colors"
            />
            <button
              onClick={createNote}
              disabled={!form.title.trim()}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 font-medium"
            >
              <PlusIcon />
              <span>Add Note</span>
            </button>
          </motion.div>

          {/* Notes Grid */}
          {notes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 pb-6">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} onDelete={deleteNote} />
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center">
                  <SparklesIcon />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No notes yet
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  Create your first note to get started!
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;