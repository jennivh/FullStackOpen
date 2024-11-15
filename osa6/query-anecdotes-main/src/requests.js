import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => 
  axios.get(baseUrl).then(res => res.data)


export const createAnecdote = async (newAnecdote) => {
  try {
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
  } catch (error) {
    console.error('Error creating anecdote:', error.response.data)
    throw error
  }
}

export const updateAnecdote = updatedNote =>
  axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote).then(res => res.data)