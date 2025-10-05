import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'

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

describe('blogs URL and number of likes are shown when the button controlling the shown details has been clicked.', () => {
  const blog = {
    title: 'testing content',
    author: 'Test',
    url: 'https://example.com/guide-to-mongodb',
    likes: 6,
    user: {
      username: 'test_User',
      name: 'test',
      blogs: [],
    },
  }

  beforeEach(() => {
    render(<Blog blog={blog} setBlogs={() => {}} />)
  })

  test('at start blogs URL and number of likes are not displayed', () => {
    expect(screen.queryByText(blog.url)).toBeNull()
    expect(screen.queryByText(/Likes:/)).toBeNull()
  })

  test('after clicking, blogs URL and number of likes are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    expect(screen.getByText(blog.url)).toBeVisible()
    expect(screen.getByText(/Likes: 6/)).toBeVisible()
  })
})