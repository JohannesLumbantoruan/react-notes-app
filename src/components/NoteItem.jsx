import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";
import ArchiveNote from "./ArchiveNote";
import DeleteNote from "./DeleteNote";
import PropTypes from 'prop-types';
import { useContext } from "react";
import { LocaleContext } from "../contexts";
import formatDateEn from "../utils/formatDateEn";

export default function NoteItem({ note, deleteNote, archiveNote, isArchive }) {
    const { locale } = useContext(LocaleContext);

    return (
        <div className="note-item">
            <div className="note-item__content">
                <h3 className="note-title">
                    <Link to={`/notes/${note.id}`}>{note.title}</Link>
                </h3>
                <p className="note-date">{locale === 'id'? formatDate(note.createdAt) : formatDateEn(note.createdAt)}</p>
                <p className="note-body">{note.body}</p>
            </div>
            <div className="note-item__buttons">
                <DeleteNote deleteNote={deleteNote} id={note.id} />
                <ArchiveNote archiveNote={archiveNote} id={note.id} isArchive={isArchive} />
            </div>
        </div>
    );
}

NoteItem.propTypes = {
    note: PropTypes.object.isRequired,
    deleteNote: PropTypes.func.isRequired,
    archiveNote: PropTypes.func.isRequired,
    isArchive: PropTypes.bool
};