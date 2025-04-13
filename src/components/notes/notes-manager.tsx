'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNoteContext } from '@/context/note-context';
import NotesList from './notes-list';
import NoteEditor from './note-editor';
import { Note } from '@/lib/types';

export default function NotesManager() {
  const { notes, addNote, updateNote, deleteNote } = useNoteContext();

  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [isCreatingNote, setIsCreatingNote] = useState(false);

  const selectedNote = selectedNoteId
    ? notes.find((note) => note.id === selectedNoteId)
    : null;

  const handleSelectNote = (noteId: string) => {
    setSelectedNoteId(noteId);
    setIsCreatingNote(false);
  };

  const handleCreateNote = () => {
    setSelectedNoteId(null);
    setIsCreatingNote(true);
  };

  const handleSaveNote = (title: string, content: string) => {
    if (isCreatingNote) {
      addNote(title, content);
      setIsCreatingNote(false);
    } else if (selectedNoteId) {
      updateNote(selectedNoteId, title, content);
    }
  };

  const handleDeleteNote = (noteId: string) => {
    deleteNote(noteId);
    if (selectedNoteId === noteId) {
      setSelectedNoteId(null);
    }
  };

  const handleCancel = () => {
    setSelectedNoteId(null);
    setIsCreatingNote(false);
  };

  return (
    <div className="py-6 w-full">
      <header className="py-6 bg-gradient text-white text-center">
        <h1 className="text-3xl font-bold">Notes</h1>
      </header>

      <div className="container mx-auto p-4">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Your Notes</h2>
                <Button onClick={handleCreateNote} size="sm">
                  Create Note
                </Button>
              </div>

              <NotesList
                notes={notes}
                selectedNoteId={selectedNoteId}
                onSelectNote={handleSelectNote}
                onDeleteNote={handleDeleteNote}
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white p-4 rounded-md shadow-sm h-full">
              {isCreatingNote ? (
                <NoteEditor
                  mode="create"
                  onSave={handleSaveNote}
                  onCancel={handleCancel}
                />
              ) : selectedNote ? (
                <NoteEditor
                  mode="edit"
                  initialTitle={selectedNote.title}
                  initialContent={selectedNote.content}
                  onSave={handleSaveNote}
                  onCancel={handleCancel}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <p className="mb-4">Select a note to view or edit</p>
                  <Button onClick={handleCreateNote} variant="outline">
                    Create a new note
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
