import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";
import ArchiveNote from "./ArchiveNote";
import DeleteNote from "./DeleteNote";

export default function NoteItem({ note, deleteNote, archiveNote, isArchive }) {
    return (
        <div className="note-item">
            <div className="note-item__content">
                <h3 className="note-title">
                    <Link to={`/notes/${note.id}`}>{note.title}</Link>
                </h3>
                <p className="note-date">{formatDate(note.createdAt)}</p>
                <p className="note-body">{note.body}</p>
            </div>
            <div className="note-item__buttons">
                <DeleteNote deleteNote={deleteNote} id={note.id} />
                <ArchiveNote archiveNote={archiveNote} id={note.id} isArchive={isArchive} />
            </div>
        </div>
    );
}