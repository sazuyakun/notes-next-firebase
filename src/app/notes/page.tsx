'use client'

import { NoteForm, NoteList } from "@/components/components"
import { useAuth } from "@/lib/auth-context"
import { createNote, getUserNotes } from "@/lib/firebase/firestore";
import { Note } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotesPage() {
  const { user, loading } = useAuth();
  const router = useRouter()
  const [notes, setNotes] = useState<Note[]>([]);
  const [notesLoading, setNotesLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user ){
      router.push("/auth/login")
    }
    if (user){
      fetchNotes();
    }
  }, [ user, loading, router ])

  const fetchNotes = async () => {
    try {
      const userNotes = await getUserNotes(user!.uid)
      setNotes(userNotes)
    } catch (error) {
      console.error("Error Fetching Notes: ", error)
    } finally {
      setNotesLoading(false)
    }
  }

  const handleAddNote = async (content: string) => {
    // e is of type string (text Area content)
    try {
      await createNote( user!.uid, content )
      fetchNotes();
    } catch (error) {
      console.error("Error Adding Note: ", error)
    }
  }

  if(loading || notesLoading){
    return (
      <p>Loading...</p>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Notes</h1>
      <NoteForm onAddNote={handleAddNote} />
      <NoteList notes={notes} />
    </div>
  )
}

