import React,{useState, useEffect} from 'react'
import Note from './Components/Note'
import notesServices from './services/notes'
import Notification from './Components/Notification'
import loginService from './services/login'

const App = (props) => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState("")
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
        })
        window.localStorage.setItem(
            'loggedNoteappUser', JSON.stringify(user)
        )
        
        notesServices.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    useEffect (() => {
        notesServices
            .getAll()
            .then(response => {
                setNotes(response)
        })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            notesServices.setToken(user.token)
        }
    }, [])

    const addNote =event =>{
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

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                Username
                    <input
                    type = 'text'
                    value = {username}
                    name = "Username"
                    onChange={({ target }) => setUsername(target.value)}
                    />
            </div>
            <div>
                password
                    <input
                    type = 'password'
                    value = {password}
                    name = 'password'
                    onChange={({ target }) => setPassword(target.value)}
                    />
            </div>
            <button type='submit'>login</button>
        </form>
    )

    const noteForm = () => (
        <form onSubmit={addNote}>
            <input
            value={newNote}
            onChange={handleNoteChange}
            />
        <button type='type'>save</button>
        </form>
    )

    return (
      <div>
        <h1>Notes</h1>

        <Notification message={errorMessage}/>
        
        {user === null ?
            loginForm():
            <div>
                <p>{user.name} logged in</p>
                {noteForm()}
            </div>
        }

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
      </div>
    )
}

export default App