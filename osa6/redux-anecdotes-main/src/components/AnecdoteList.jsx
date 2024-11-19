import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.filter !== '' 
        ? state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())) 
        : state.anecdotes)
    const dispatch = useDispatch()



    const voteForAnecdote = (anecdote) => {
        const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
        dispatch(addVote(votedAnecdote))
    }

    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
    console.log("anecdotes",anecdotes)
    return (
        <>
            {anecdotes.length > 0 && sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => voteForAnecdote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )

}

export default AnecdoteList;