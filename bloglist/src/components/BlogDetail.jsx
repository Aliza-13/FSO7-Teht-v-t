import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import blogService from "../services/blogs";

import {
  BlogCard,
  BlogTitle,
  BlogInfo,
  LikeButton,
  DeleteButton,
} from "./StyledComponents";

const BlogDetail = ({ blog, user, handleLike, handleDelete }) => {
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(blog?.comments || []);

  useEffect(() => {
    setComments(blog?.comments || []);
  }, [blog]);

  if (!blog) {
    return <p>Loading blog...</p>;
  }

  const removeBlog = async () => {
    await handleDelete(blog);

    navigate("/");
  };

  const addComment = async (event) => {
    event.preventDefault();

    if (!comment.trim()) return;

    console.log("ADD COMMENT STARTED:", comment);

    try {
      const updatedBlog = await blogService.addComment(blog.id, comment);

      console.log("BLOG AFTER COMMENT:", updatedBlog);

      setComments(updatedBlog.comments || []);
      setComment("");
    } catch (error) {
      console.error("ADDING COMMENT FAILED:", error);
    }
  };

  return (
    <BlogCard>
      <BlogTitle>{blog.title}</BlogTitle>

      <BlogInfo>by {blog.author}</BlogInfo>

      <BlogInfo>
        <a href={blog.url}>{blog.url}</a>
      </BlogInfo>

      <BlogInfo>{blog.likes} likes</BlogInfo>

      {user && <LikeButton onClick={() => handleLike(blog)}>like</LikeButton>}

      <BlogInfo>added by {blog.user.name}</BlogInfo>

      {user && blog.user?.id === user.id && (
        <DeleteButton onClick={removeBlog}>delete</DeleteButton>
      )}

      <h3>comments</h3>

      <form onSubmit={addComment}>
        <input
          type="text"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Write a comment"
        />
        <button type="submit">add comment</button>
      </form>

      <ul>
        {comments.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>
    </BlogCard>
  );
};

export default BlogDetail;
