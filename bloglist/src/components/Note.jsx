
import { useNavigate } from 'react-router-dom'

const Note = ({ note, deleteNote }) => {
  const navigate = useNavigate()

  if (!note) {
    return <div>note not found</div>
  }

  const handleDelete = async () => {
    await deleteNote(note.id)

    navigate('/notes')
  }

  return (
    <div>
      <h2>{note.content}</h2>

      <p>
        important: {note.important ? 'yes' : 'no'}
      </p>
      
      <button onClick={handleDelete}>
        delete
      </button>
    </div>
  )
}

export default Note