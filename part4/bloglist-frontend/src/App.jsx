import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import loginService from "./services/loginService";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import CreateBlog from "./components/CreateBlog";
import blogService from "./services/blogs";
const App = () => {
  const noteFormRef = useRef();
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [style, setStyle] = useState({});
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
      setStyle({
        border: "4px solid green",
        paddingLeft: "5px",
        borderRadius: "10px",
        color: "green",
      });
      setErrorMessage("User logged in!");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
    } catch {
      setStyle({
        border: "4px solid red",
        paddingLeft: "5px",
        borderRadius: "10px",
        color: "Red",
      });
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  function handleLogout() {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
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
 
  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
    if (loggedUser) {
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      {!user && loginForm()}
      {user && (
        <>
          {" "}
          <h2>blogs</h2>
          {errorMessage && (
            <div style={style}>
              <Notification message={errorMessage} />
            </div>
          )}
          <p>
            {user.username} logged in{" "}
            <button onClick={handleLogout}>logout</button>
          </p>
          <br />
          <Togglable buttonLabel="create new blog" ref={noteFormRef}>
            <CreateBlog  setErrorMessage={setErrorMessage} setBlogs={setBlogs} setStyle={setStyle} noteFormRef={noteFormRef} />
          </Togglable>
          <br />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} />
          ))}
        </>
      )}
    </div>
  );
};
export default App;
