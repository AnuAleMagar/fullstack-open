import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services'
import { useNotification } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [, notificationDispatch] = useNotification()

  const newNoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notificationDispatch({
        type: 'SET',
        payload: `a new anecdote "${newAnecdote.content}" created!`,
      })
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value.trim()
    if (content.length < 5) {
      notificationDispatch({
        type: 'SET',
        payload: 'too short anecdote, must have length 5 or more',
      })
      return
    }
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newNoteMutation.mutate({ content, votes: 0 })
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
