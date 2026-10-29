
import { Link } from 'react-router-dom'

const NoteList = ({ notes }) => {
    return (
        <ul>
            {notes.map(note => (
                <li key={note.id}>
                <Link to={`/notes/${note.id}`}>
                    {note.content}
                </Link>
            </li>
            ))}
        </ul>
    )
}

export default NoteList