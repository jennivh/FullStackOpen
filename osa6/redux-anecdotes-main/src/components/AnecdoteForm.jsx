import { appendAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch} from 'react-redux'
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = {
            content,
            votes: 0
        }
        dispatch(appendAnecdote(newAnecdote))
        dispatch(setNotification(`you created '${content}'`, 5))
    }
    
    
    return (
        <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div><input name="anecdote" /></div>
            <button>create</button>
        </form>
        </div>
    )
}

export default AnecdoteForm;