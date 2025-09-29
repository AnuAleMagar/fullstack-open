import { useState } from "react";

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  function handleClick(){
    setVisible(!visible)
  }
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} {!visible &&  <button onClick={handleClick}>view</button>}
      {visible && (
        <>
          <button onClick={handleClick}>hide</button>
          <span style={{ display: "block", margin: 0 }}> {blog.url}</span>
          <span style={{ display: "block", margin: 0 }}>
            Likes: {blog.likes} <button>like</button>
          </span>
          <span style={{ display: "block", margin: 0 }}>{user.username}</span>
        </>
      )}
    </div>
  );
};

export default Blog;
