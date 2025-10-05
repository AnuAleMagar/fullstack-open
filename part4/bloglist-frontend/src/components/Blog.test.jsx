import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'
test('renders author and title content', () => {
  const blog = {
    title: 'testing content',
    author: 'Test',
    url: 'https://example.com/guide-to-mongodb',
    likes: 6
  }
  render(<Blog blog={blog}/>)
  // screen.debug()
  const element=screen.getByText('testing content Test')
  expect(element).toBeDefined()
  const elem=screen.queryByText('https://example.com/guide-to-mongodb Likes: 6')
  expect(elem).toBeNull()
})

