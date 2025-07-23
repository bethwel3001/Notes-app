import { motion } from 'framer-motion';

export default function NoteCard({ note, onDelete }) {
  return (
    <motion.div
      layout
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col justify-between transition hover:shadow-lg"
      whileHover={{ scale: 1.02 }}
    >
      <div>
        <h2 className="font-serif text-lg text-primary">{note.title}</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{note.content}</p>
      </div>
      <button
        onClick={() => onDelete(note._id)}
        className="self-end text-red-500 hover:text-red-400 text-sm mt-4"
      >
        Delete
      </button>
    </motion.div>
  );
}
