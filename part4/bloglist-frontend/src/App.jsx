import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/loginService";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [title,setTitle]=useState('')
  const [url,setUrl]=useState('')
  const [author,setAuthor]=useState('')
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      blogService.setToken(user.token)
      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
    } catch {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const handleBlogPost = async (event) => {
     event.preventDefault()
     try{
      await blogService.create({title,author,url});
      setTitle('')
      setUrl('')
      setAuthor('')
    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs)
     }catch{
        setErrorMessage("Failed to add new blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }
  

  function handleLogout() {
    window.localStorage.removeItem("loggedUser");
    setUser(null)
  }
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h3>log in to application</h3>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  );
   const blogForm = () => (
    <form onSubmit={handleBlogPost}>
      <div>
        <label>
          title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          url:
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  );

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
    setUser(loggedUser);
    blogService.setToken(loggedUser.token)
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      {errorMessage}
      {!user && loginForm()}
      {user && (
        <>
          {" "}
          <h2>blogs</h2>
          <p>
            {user.username} logged in{" "}
            <button onClick={handleLogout}>logout</button>
          </p>
          <br />
          <br />
          {blogForm()}
          <br />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
