import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { archiveNote, deleteNote, getNote, unArchiveNote } from '../data/notes';
import formatDate from "../utils/formatDate";
import DeleteNote from "../components/DeleteNote";
import ArchiveNote from "../components/ArchiveNote";

export default function DetailPage() {
    const noteId = Number(useParams().id);
    const navigate = useNavigate();

    const [note, setNote] = useState(() => getNote(noteId));

    const onArchiveHandler = (id) => {
        if (note.archived) {
            unArchiveNote(id);
        } else {
            archiveNote(id);
        }

        setNote({ ...getNote(noteId) });
    }

    const onDeleteHandler = (id) => {
        deleteNote(id);

        if (note.archived) {
            navigate('/archives');
        } else {
            navigate('/');
        }
    }
    
    return(
        <div className="note-item note-detail">
            <div className="note-item__content">
                <h3 className="note-title">
                    <Link to={`/notes/${note.id}`}>{note.title}</Link>
                </h3>
                <p className="note-date">{formatDate(note.createdAt)}</p>
                <p className="note-body">{note.body}</p>
            </div>
            <div className="note-item__buttons">
                <DeleteNote deleteNote={onDeleteHandler} id={note.id} />
                <ArchiveNote archiveNote={onArchiveHandler} id={note.id} isArchive={note.archived} />
            </div>
        </div>
    )
}