
import { useNavigate } from "react-router-dom"
import { useField } from '../hooks'
import { useAnecdotes } from '../hooks/useAnecdotes'


const CreateNew = () => {
  const { addAnecdote } = useAnecdotes()

  const { reset: resetContent, ...content } = useField('text')
  const { reset: resetAuthor, ...author} = useField('text')
  const { reset: resetInfo, ...info} = useField('text')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    addAnecdote({ 
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0 })
    navigate("/")
  }

  const handleReset = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            {...content}
          />
        </div>
        <div>
          author
          <input
            {...author}
          />
        </div>
        <div>
          url for more info
          <input
            {...info}
          />
        </div>
        <div>
          <button type="button" onClick={handleReset}>
            reset
          </button>
          <button onClick={() => deleteAnecdote(anecdotes.id)}>
            delete
          </button>
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default CreateNew
