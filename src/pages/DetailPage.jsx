import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { archiveNote, deleteNote, getNote, unArchiveNote } from '../data/notes';
import formatDate from "../utils/formatDate";
import DeleteNote from "../components/DeleteNote";
import ArchiveNote from "../components/ArchiveNote";

export default function DetailPageWrapper() {
    const { id } = useParams();
    const navigate = useNavigate();

    return <DetailPage noteId={id} navigate={navigate} />
}

class DetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            note: getNote(Number(props.noteId))
        }

        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onArchiveHandler = this.onArchiveHandler.bind(this);
    }

    onArchiveHandler(id) {
        const { note } = this.state;

        if (note.archived) {
            unArchiveNote(id);
        } else {
            archiveNote(id);
        }

        this.setState({ note: getNote(Number(this.props.noteId)) });
    }

    onDeleteHandler(id) {
        deleteNote(id);

        this.props.navigate('/');
    }

    render() {
        const { note } = this.state;

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
                <DeleteNote deleteNote={this.onDeleteHandler} id={note.id} />
                <ArchiveNote archiveNote={this.onArchiveHandler} id={note.id} isArchive={note.archived} />
            </div>
        </div>
        )
    }
}