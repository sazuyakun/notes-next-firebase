'use client'

import { useState } from "react"

export default function NoteForm({ onAddNote }: { onAddNote: (content: string) => void}) {
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(content.trim()){
      onAddNote(content)
      setContent('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note..."
        className="w-full p-2 border rounded"
        rows={4}
      />
      <button
        type="submit"
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Note
      </button>
    </form>
  )
}

