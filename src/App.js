import React,{useState, useEffect} from 'react'
import Note from './Components/Note'
import notesServices from './services/notes'
import Notification from './Components/Notification'

const App = (props) => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState("")
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect (() => {
        notesServices
            .getAll()
            .then(response => {
                setNotes(response)
        })
    }, [notes])

    const addNOte =event =>{
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
            id: notes.length + 1
        }
        notesServices
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote("")
            })
    }

    const toggleImportanceOf = (id) => {
        const note = notes.find(n => n.id === id)
        const changedNote = {...note, important: !note.important}

        notesServices
            .update(id, changedNote)
            .then(response => {
                setNotes(notes.map(note => 
                    note.id !== id ? note : response))
            })  
            .catch(error => {
                setErrorMessage( 
                `the note '${note.content}' was already 
                deleted from server`
            )
            setTimeout(() => {
                setErrorMessage(null)
            }, 10000)
            setNotes(notes.filter(n => n.id !== id))
            })
    }
    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const notesToShow = showAll 
        ? notes 
        : notes.filter(note => note.important)

    return (
      <div>
        <h1>Notes</h1>
        <Notification message={errorMessage}/>
        <div className='show'>
            <button onClick={() => setShowAll(!showAll)}>
                show{showAll ? ' important' : ' all'}
            </button>
        </div>
        <table><tbody>
          {notesToShow.map((note, i) => 
            <Note 
                key={i} 
                note={note} 
                toggleImportance={() => toggleImportanceOf(note.id)}
            />
          )}
        </tbody></table>
        <form onSubmit={addNOte}>
            <input 
                value={newNote}
                onChange={handleNoteChange}
            />
            <button type="submit">save</button>
        </form>
      </div>
    )
}

export default App