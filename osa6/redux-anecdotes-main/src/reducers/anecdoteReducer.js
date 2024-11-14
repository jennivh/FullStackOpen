import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

/* const anecdoteReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.payload.id
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)
      case 'NEW_ANECDOTE':
        return [...state, action.payload]
      default:
        return state
  }
} */

  const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
      addVote(state, action) {
        const changedA = action.payload
        return state.map(a =>
          a.id !== changedA.id ? a : changedA
        )
      },
      appendAnecdote(state, action) {
        state.push(action.payload)
      },
      setAnecdotes(state, action) {
        return action.payload
      }
    }
  })

/* export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    payload: { id }
  }
} */

  export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

  export const initializeAnecdotes = () => {
    return async dispatch => {
      const anecdotes = await anecdotesService.getAll()
      dispatch(setAnecdotes(anecdotes))
    }
  }

  export const createAnecdote = (content) => {
    return async dispatch => {
      const newAnecdote = await anecdotesService.createNew(content)
      dispatch(appendAnecdote(newAnecdote))
    }
  }

  export const voteAnecdote = (content, id) => {
    return async dispatch => {
      const anecdote = await anecdotesService.updateAnecdote(content, id)
      dispatch(addVote(anecdote))
    }
  }

  export default anecdoteSlice.reducer
