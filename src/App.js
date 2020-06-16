import React,{useState, useEffect} from 'react'
import Note from './Components/Note'
import notesServices from './services/notes'
import Notification from './Components/Notification'
import loginService from './services/login'
import LoginForm from './Components/login'
import Togglable from './Components/Togglable'
import NoteForm from './Components/NoteForm'

const App = (props) => {
    const [notes, setNotes] = useState([])
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
                setErrorMessage(`the note '${note.content}' was already 
                deleted from server`)
            setTimeout(() => {
                setErrorMessage(null)
            }, 10000)
            })
    }

    const notesToShow = showAll 
        ? notes 
        : notes.filter(note => note.important)


    const addNote =(noteObject) => {
        noteFormRef.current.toggleVisibiliity()
        notesServices
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
            })
    }

    const noteFormRef = React.createRef()

    const noteForm = () => (
        <Togglable buttonLabel='New Note' ref={noteFormRef}>
            <NoteForm createNote = {addNote}/>
        </Togglable>
    )

    const loginForm = () => (
        <Togglable buttonLabel='login'>
            <LoginForm
                username = {username}
                password = {password}
                handleUsernameChange = {({ target }) => setUsername(target.value)}
                handlePasswordChange = {({ target }) => setPassword(target.value)}
                handleSubmit = {handleLogin}
            />
        </Togglable>
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