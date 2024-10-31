import { useDispatch, useSelector } from 'react-redux'
import { vote } from './reducers/anecdoteReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()


    const voteForAnexdote = (id) => {
        dispatch(vote(id))
    }
    return (
        <>
            {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => voteForAnexdote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )

}

export default AnecdoteList;