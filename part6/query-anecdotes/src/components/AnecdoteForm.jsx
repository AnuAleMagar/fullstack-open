import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newNoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value.trim()
    if (content.length < 5) {
      alert('Anecdote must be at least 5 characters long')
      return 
    }
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newNoteMutation.mutate({ content, important: true })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
