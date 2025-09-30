import { useState } from 'react'
import loginService from '../services/loginService'
import blogService from '../services/blogs'

function LoginForm({ style,setErrorMessage,setStyle,user,setUser,errorMessage }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setStyle({
        border: '4px solid green',
        paddingLeft: '5px',
        borderRadius: '10px',
        color: 'green',
      })
      setErrorMessage('User logged in!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
    } catch {
      setStyle({
        border: '4px solid red',
        paddingLeft: '5px',
        borderRadius: '10px',
        color: 'Red',
      })
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h3>log in to application</h3>
        {errorMessage && (
          <div style={style}>
            <Notification message={errorMessage} />
          </div>
        )}
        <label>
          username
          <input
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type='submit'>login</button>
    </form>
  )
  return <>  {!user && loginForm()}</>
}

export default LoginForm
