import { useState } from 'react'
import './App.css'
import NoteView  from './componts/NoteView'
import EditNote from './componts/EditNote'
import NotesAPI, { NoteItem } from './utils/api'
import ImportBox from './componts/ImportBox'

function App() {
  const [notes, setNotes] = useState(NotesAPI.getAllNotes())
  const [activeNote, setActiveNote] = useState({})

  function _refreshNotes() {
    const allNotes = NotesAPI.getAllNotes();
    _setNotes(allNotes);
    // if (notes.length > 0) {
    //   setActiveNote(allNotes[0]);
    // }
  }

  function _setNotes(notes: NoteItem[]) {
    setNotes(notes);
  }

  const onNoteSelect = (note?: NoteItem) => {
    let selectedNote: NoteItem = {
      title: '',
      body: ''
    }
    if(note&&note.id){
      selectedNote = note
    } 
    setActiveNote(selectedNote!);
  }

  const onNoteAdd = (title: string, body: string) => {
    const newNote = {
      title,
      body,
    };

    NotesAPI.saveNote(newNote);
    _refreshNotes();
  }
  
  const onNoteEdit = (title: string, body: string) => {
    NotesAPI.saveNote({
      id: activeNote!.id,
      title,
      body,
    });

    _refreshNotes();
  }

  const onNoteDelete = (noteId: number) => {
    if(activeNote.id === noteId){
      onNoteSelect()
    }
    NotesAPI.deleteNote(noteId);
    _refreshNotes();
  }

  return (
    <div className='note__box'>
      <div className="notes__sidebar">
        <ImportBox notes={notes} _refreshNotes={_refreshNotes} />
          
          <button className="notes__add" type="button" onClick={()=>onNoteSelect()}>添加新的笔记</button>
          <div className="notes__list">
            {
              notes.map((note: NoteItem) => {
                return <div onClick={()=>onNoteSelect(note)} key={note.id}>
                  <NoteView activeNote={activeNote} note={note} onNoteDelete={onNoteDelete}></NoteView>
                </div> 
              })
            }
          </div>
      </div>
      <EditNote activeNote={activeNote} onNoteAdd={onNoteAdd} onNoteEdit={onNoteEdit}/>
    </div>
  )
}

export default App
