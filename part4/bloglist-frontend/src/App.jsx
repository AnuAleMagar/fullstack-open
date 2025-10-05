import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import AppNotification from './components/Notification'
import Togglable from './components/Togglable'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
const App = () => {
  const noteFormRef = useRef()
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [style, setStyle] = useState({})
  function handleLogout() {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
    if (loggedUser) {
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  return (
    <div>
      <LoginForm
        user={user}
        setUser={setUser}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        style={style}
        setStyle={setStyle}
      />
      {user && (
        <>
          {' '}
          <h2>blogs</h2>
          {errorMessage && (
            <div style={style}>
              <AppNotification message={errorMessage} />
            </div>
          )}
          <p>
            {user.username} logged in{' '}
            <button onClick={handleLogout}>logout</button>
          </p>
          <br />
          <Togglable buttonLabel='create new blog' ref={noteFormRef}>
            <CreateBlog
              setErrorMessage={setErrorMessage}
              setBlogs={setBlogs}
              setStyle={setStyle}
              noteFormRef={noteFormRef}
            />
          </Togglable>
          <br />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user} />
          ))}
        </>
      )}
    </div>
  )
}
export default App
