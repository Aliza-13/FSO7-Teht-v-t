
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button } from './StyledComponents.jsx'



const BlogForm = ({ createBlog }) => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    await createBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')

    navigate('/')
  }

  return (
    <Form onSubmit={handleSubmit}>

      <div>
        <label htmlFor="title">title</label>

        <Input
          id="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div>
        <label htmlFor="author">author</label>

        <Input
          id="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>

      <div>
        <label htmlFor="url">url</label>

        <Input
          id="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>

      <Button type="submit">create</Button>

    </Form>
  )
}

export default BlogForm