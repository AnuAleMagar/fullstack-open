import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'
import { expect, vi } from 'vitest'

test('calls onCreateBlog with correct details when form is submitted', async () => {
  const onCreateBlog = vi.fn()
  const user = userEvent.setup()

  render(<CreateBlog onCreateBlog={onCreateBlog} />)

  await user.type(screen.getByLabelText(/title/i), 'Test Title')
  await user.type(screen.getByLabelText(/author/i), 'Test Author')
  await user.type(screen.getByLabelText(/url/i), 'http://test.com')
  await user.click(screen.getByText('create'))

  expect(onCreateBlog).toHaveBeenCalledTimes(1)
  expect(onCreateBlog).toHaveBeenCalledWith({
    title: 'Test Title',
    author: 'Test Author',
    url: 'http://test.com'
  })
})