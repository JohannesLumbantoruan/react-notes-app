import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { archiveNote, deleteNote, getNote, unarchiveNote } from '../data/api';
import formatDate from "../utils/formatDate";
import DeleteNote from "../components/DeleteNote";
import ArchiveNote from "../components/ArchiveNote";
import { LocaleContext } from "../contexts";
import formatDateEn from "../utils/formatDateEn";

export default function DetailPage() {
    const noteId = useParams().id;
    const navigate = useNavigate();

    const [note, setNote] = useState({});

    const { locale } = useContext(LocaleContext);

    useEffect(() => {
        (async () => {
            const { error, data } = await getNote(noteId);

            if (!error) {
                setNote({ ...data });
            }
        })();
    }, [noteId]);

    const onArchiveHandler = async (id) => {
        if (note.archived) {
            const { error } = await unarchiveNote(id);

            if (!error) {
                const { error: err, data } = await getNote(noteId)

                if (!err) {
                    setNote(data);
                }
            }
        } else {
            const { error } = await archiveNote(id);

            if (!error) {
                const { error: err, data } = await getNote(noteId)

                if (!err) {
                    setNote(data);
                }
            }
        }
    }

    const onDeleteHandler = async (id) => {
        const { error } = await deleteNote(id);

        if (!error) {
            if (note.archived) {
                navigate('/archives');
            } else {
                navigate('/');
            }
        }
    }
    
    return(
        <div className="note-item note-detail">
            <div className="note-item__content">
                <h3 className="note-title">{note.title}</h3>
                <p className="note-date">{note.createdAt && (locale === 'id' ? formatDate(note.createdAt): formatDateEn(note.createdAt))}</p>
                <p className="note-body">{note.body}</p>
            </div>
            <div className="note-item__buttons">
                <DeleteNote deleteNote={onDeleteHandler} id={note.id || ''} />
                <ArchiveNote archiveNote={onArchiveHandler} id={note.id || ''} isArchive={note.archived} />
            </div>
        </div>
    )
}