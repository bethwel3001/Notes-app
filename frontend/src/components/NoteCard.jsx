import { motion } from 'framer-motion';

export default function NoteCard({ note, onDelete }) {
  // Simple SVG Trash Icon
  const TrashIcon = () => (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800"
      whileHover={{ y: -4 }}
    >
      <div className="flex-1">
        {/* Note Header */}
        <div className="flex items-start justify-between mb-3">
          <h2 className="font-serif text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 flex-1 mr-2">
            {note.title || 'Untitled Note'}
          </h2>
          
          {/* Delete Button */}
          <motion.button
            onClick={() => onDelete(note._id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="opacity-0 group-hover:opacity-100 p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200 flex-shrink-0"
            title="Delete note"
          >
            <TrashIcon />
          </motion.button>
        </div>

        {/* Note Content */}
        <div className="mt-3">
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-4">
            {note.content || <span className="italic text-gray-400 dark:text-gray-500">No content</span>}
          </p>
        </div>
      </div>

      {/* Footer - Always visible delete button for mobile */}
      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {note.content ? `${note.content.length} chars` : 'Empty'}
        </span>
        
        {/* Mobile delete button */}
        <button
          onClick={() => onDelete(note._id)}
          className="sm:hidden p-1 text-red-500 hover:text-red-400 transition-colors"
          title="Delete note"
        >
          <TrashIcon />
        </button>
        
        {/* Desktop delete hint */}
        <span className="hidden sm:block text-xs text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Hover to delete
        </span>
      </div>
    </motion.div>
  );
}