import React ,{ useState } from "react";
import blogService from "../services/blogs";

function CreateBlog({setErrorMessage,setBlogs,setStyle,noteFormRef}) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
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
  const handleBlogPost = async (event) => {
    event.preventDefault();
    try {
      await blogService.create({ title, author, url });
      setTitle("");
      setUrl("");
      setAuthor("");
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs);
      setStyle({
        border: "4px solid green",
        paddingLeft: "5px",
        borderRadius: "10px",
        color: "green",
      });
      noteFormRef.current.toggleVisibility();
      setErrorMessage(`A new Blog ${title} by ${author} added`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch {
      setErrorMessage("Failed to add new blog");
      setStyle({
        border: "4px solid red",
        paddingLeft: "5px",
        borderRadius: "10px",
        color: "Red",
      });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return <div>
  {
    blogForm()
  }</div>;
}

export default CreateBlog;
