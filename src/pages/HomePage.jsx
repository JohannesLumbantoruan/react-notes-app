import React from "react";
import NoteList from "../components/NoteList";
import NoteSearhForm from "../components/NoteSearchForm";
import { archiveNote, deleteNote, getNotes } from "../data/notes";

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: getNotes(),
            query: ''
        };

        this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this);
        this.onQueryChangeHandler = this.onQueryChangeHandler.bind(this);
        this.onArchiveNoteHandler = this.onArchiveNoteHandler.bind(this);
    }

    onDeleteNoteHandler(id) {
        deleteNote(id);

        this.setState({ notes: getNotes() });
    }

    onQueryChangeHandler(query) {
        this.setState({ query });

        this.props.queryChange(query);
    }

    onArchiveNoteHandler(id) {
        archiveNote(id);

        this.setState({ notes: getNotes() });
    }

    render() {
        return (
            <section>
                <NoteSearhForm searchNote={this.onQueryChangeHandler} query={this.state.query} />
                <NoteList notes={this.state.notes} deleteNote={this.onDeleteNoteHandler} archiveNote={this.onArchiveNoteHandler} />
            </section>
        );
    }
}