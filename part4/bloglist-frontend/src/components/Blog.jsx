import { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, setBlogs,onLike, user}) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  function handleClick() {
    setVisible(!visible)
  }
  function handleLikeClick() {
    if(onLike){
      onLike()
      return
    }
    setLikes((prev) => {
      const newLikes = prev + 1
      blogService.updateLikes(blog.id, newLikes)
      return newLikes
    })
  }
  async function handleDelete() {
    try {
      const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
      if (!ok) return
      await blogService.deleteBlog(blog.id)
      alert('Blog deleted successfully!')
      blogService.getAll().then((blogs) => setBlogs(blogs))
    } catch (error) {
      console.error(error)
      alert('Session expired. Please log in again.')
      window.location.reload()
    }
  }
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      {!visible && <button onClick={handleClick}>view</button>}
      {visible && (
        <>
          <button onClick={handleClick}>hide</button>
          <span style={{ display: 'block', margin: 0 }}> {blog.url}</span>
          <span style={{ display: 'block', margin: 0 }}>
            Likes: {likes} <button onClick={handleLikeClick}>like</button>
          </span>
          <span style={{ display: 'block', margin: 0 }}>
            {blog.user?.username}
          </span>
          {(blog.user?.username===user.username) && <button
            style={{ background: 'blue', color: 'white', borderRadius: '5px' }}
            onClick={handleDelete}
          >
            remove
          </button>}
        </>
      )}
    </div>
  )
}

export default Blog
