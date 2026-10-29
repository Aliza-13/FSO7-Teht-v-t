import { useState, useEffect, useRef } from "react";
import { getUser, saveUser, removeUser } from "./services/persistentUser";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import useNotificationStore from "./stores/NotificationStore";
import LoginForm from "./components/Login";
import Togglable from "./components/Togglable";
import NoteForm from "./components/Noteform";
import noteService from "./services/notes";
import BlogForm from "./components/BlogForm";
import NoteList from "./components/NoteList";
import Note from "./components/Note";
import BlogDetail from "./components/BlogDetail";
import ErrorBoundary from "./components/ErrorBoundary";
import useUserStore from "./stores/userStore";
import userService from "./services/users";
import UserList from "./components/UserList";
import User from "./components/User";

import { Routes, Route, useMatch, useNavigate } from "react-router-dom";

import { NavBar, StyledLink, Button } from "./components/StyledComponents";
import useBlogStore from "./stores/BlogStore";

const App = () => {
  const blogs = useBlogStore((state) => state.blogs);
  const setBlogs = useBlogStore((state) => state.setBlogs);
  const addBlog = useBlogStore((state) => state.addBlog);
  const updateBlog = useBlogStore((state) => state.updateBlog);
  const removeBlog = useBlogStore((state) => state.removeBlog);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notes, setNotes] = useState([]);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const noteFormRef = useRef();
  const blogFormRef = useRef();

  useEffect(() => {
    const user = getUser();

    if (user) {
      setUser(user);
      blogService.setToken(user.token);
      noteService.setToken(user.token);
    }

    blogService.getAll().then((data) => {
      setBlogs(data);
    });
  }, []);

  useEffect(() => {
    if (!user) return;

    blogService.setToken(user.token);
    noteService.setToken(user.token);
  }, [user]);

  useEffect(() => {
    if (!user) return;

    blogService.getAll().then((data) => {
      setBlogs(
        data.map((b) => ({
          ...b,
          id: b.id || b._id,
          user: typeof b.user === "object" ? b.user : { id: b.user },
        })),
      );
    });
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const fetchNotes = async () => {
      const notes = await noteService.getAll();
      setNotes(
        notes.map((n) => ({
          ...n,
          id: n.id || n._id,
        })),
      );
    };

    fetchNotes();
  }, [user]);

  useEffect(() => {
    userService
      .getAll()
      .then((users) => {
        console.log("USERS IN APP:", users);
        setUsers(users);
      })
      .catch((error) => {
        console.error("USERS FETCH ERROR:", error);
      });
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      saveUser(user);

      setUser(user);
      setUsername("");
      setPassword("");

      navigate("/");

      showNotification("login successful");
    } catch (error) {
      showNotification("wrong credentials", "error");
    }
  };

  const handleLogout = () => {
    removeUser();

    setUser(null);
    navigate("/");
  };

  const handleCreateBlog = async (blogObject) => {
    try {
      const createdBlog = await blogService.create(blogObject);

      addBlog({
        ...createdBlog,
        id: createdBlog.id || createdBlog._id,
      });

      blogFormRef.current.toggleVisibility();

      showNotification(`a new blog ${createdBlog.title} added`);
    } catch (error) {
      showNotification("blog creation failed", "error");
    }
  };

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user?.id || blog.user,
    };

    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog);

      updateBlog({
        ...returnedBlog,
        id: returnedBlog.id || returnedBlog._id,
      });
    } catch (error) {}
  };

  const handleDelete = async (blog) => {
    const confirmDelete = window.confirm(
      `remove blog ${blog.title} by ${blog.author}`,
    );

    if (!confirmDelete) return;

    try {
      await blogService.remove(blog.id);
      removeBlog(blog.id);
      showNotification(`deleted ${blog.title}`);
    } catch (error) {
      showNotification("deleting blog failed", "error");
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await noteService.remove(id);

      setNotes(notes.filter((note) => note.id !== id));

      showNotification("note deleted");
    } catch (error) {
      showNotification("deleting note failed", "error");
    }
  };

  const addNote = async (noteObject) => {
    try {
      const returnedNote = await noteService.create(noteObject);

      const fixedNote = {
        ...returnedNote,
        id: returnedNote.id || returnedNote._id,
      };

      setNotes((prev) => [...prev, fixedNote]);

      if (noteFormRef.current) {
        noteFormRef.current.toggleVisibility();
      }
    } catch (error) {
      showNotification("note creation failed", "error");
    }
  };

  const setNotification = useNotificationStore(
    (state) => state.setNotification,
  );

  const clearNotification = useNotificationStore(
    (state) => state.clearNotification,
  );

  // =========================
  // NOTIFICATION
  // =========================
  const showNotification = (message, type = "success") => {
    console.log("Näytetään ilmoitus:", message, type);
    setNotification(message, type);

    setTimeout(() => {
      clearNotification();
    }, 5000);
  };

  const match = useMatch("/notes/:id");

  const note = match ? notes.find((n) => n.id === match.params.id) : null;

  const blogMatch = useMatch("/blogs/:id");

  const blog = blogMatch
    ? blogs.find((b) => b.id === blogMatch.params.id)
    : null;

  return (
    <div>
      <Notification />

      <NavBar>
        <StyledLink to="/">blogs</StyledLink>

        <StyledLink to="/notes">notes</StyledLink>

        <StyledLink to="/users">users</StyledLink>

        {!user && <StyledLink to="/login">login</StyledLink>}

        {user && <StyledLink to="/create-blog">new blog</StyledLink>}

        {user && (
          <>
            <span>{user.name} logged in</span>

            <Button onClick={handleLogout}>logout</Button>
          </>
        )}
      </NavBar>
      <ErrorBoundary>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h2>blogs</h2>

                {user && (
                  <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                    <BlogForm createBlog={handleCreateBlog} />
                  </Togglable>
                )}

                {[...blogs]
                  .sort((a, b) => b.likes - a.likes)
                  .map((blog) => (
                    <Blog
                      key={blog.id}
                      blog={blog}
                      user={user}
                      handleLike={handleLike}
                      handleDelete={handleDelete}
                    />
                  ))}
              </>
            }
          />

          <Route path="/notes" element={<NoteList notes={notes} />} />

          <Route
            path="/login"
            element={
              <LoginForm
                handleSubmit={handleLogin}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                username={username}
                password={password}
              />
            }
          />

          <Route
            path="/notes/:id"
            element={<Note note={note} deleteNote={handleDeleteNote} />}
          />

          <Route
            path="/create-blog"
            element={<BlogForm createBlog={handleCreateBlog} />}
          />

          <Route
            path="/create"
            element={
              <Togglable buttonLabel="new note" ref={noteFormRef}>
                <NoteForm createNote={addNote} />
              </Togglable>
            }
          />

          <Route
            path="/blogs/:id"
            element={
              <BlogDetail
                blog={blog}
                user={user}
                handleLike={handleLike}
                handleDelete={handleDelete}
              />
            }
          />

          <Route
            path="/blogs"
            element={
              <>
                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                  <BlogForm createBlog={handleCreateBlog} />
                </Togglable>

                {[...blogs]
                  .sort((a, b) => b.likes - a.likes)
                  .map((blog) => (
                    <Blog
                      key={blog.id}
                      blog={blog}
                      user={user}
                      handleLike={handleLike}
                      handleDelete={handleDelete}
                    />
                  ))}
              </>
            }
          />

          <Route path="/users" element={<UserList users={users} />} />
          <Route path="*" element={<h2>404 - Page not found</h2>} />

          <Route
            path="/users/:id"
            element={
              <User
                user={users.find(
                  (u) => u.id === window.location.pathname.split("/").pop(),
                )}
              />
            }
          />
        </Routes>
      </ErrorBoundary>
    </div>
  );
};

export default App;
