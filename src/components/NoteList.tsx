'use client';

import { Note } from '@/types';

export default function NoteList({ notes }: { notes: Note[] }) {
  return (
    <div className="space-y-4">
      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        notes.map((note) => (
          <div key={note.id} className="p-4 border rounded">
            <p>{note.content}</p>
            <p className="text-sm text-gray-500">
              Created: {new Date(note.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
