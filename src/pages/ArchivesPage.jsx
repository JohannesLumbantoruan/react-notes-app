import React from "react";
import { deleteNote, getArchivedNotes, unArchiveNote } from "../data/notes";
import NoteSearhForm from "../components/NoteSearchForm";
import NoteList from "../components/NoteList";
import { useSearchParams } from "react-router-dom";
import PropTypes from 'prop-types';

export default function ArchivesPageWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get('query');

    const changeSearchParams = (query) => {
        setSearchParams({ query});
    };

    return <ArchivesPage query={query} changeQuery={changeSearchParams} />
}

class ArchivesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: getArchivedNotes(),
            query: props.query || ''
        };

        this.onQueryChangeHandler = this.onQueryChangeHandler.bind(this);
        this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this);
        this.onArchiveNoteHandler = this.onArchiveNoteHandler.bind(this);
    }

    onQueryChangeHandler(query) {
        this.setState({ query });

        this.props.changeQuery(query);
    }

    onDeleteNoteHandler(id) {
        deleteNote(id);

        this.setState({
            notes: getArchivedNotes(),
            query: ''
        });
    }

    onArchiveNoteHandler(id) {
        unArchiveNote(id);

        this.setState({
            notes: getArchivedNotes(),
            query: ''
        });
    }

    render() {
        const notes = this.state.notes.filter((note) => note.title.toLowerCase().includes(this.state.query));

        return (
            <section>
                <NoteSearhForm searchNote={this.onQueryChangeHandler} query={this.state.query} isArchive={true} />
                <NoteList notes={notes} deleteNote={this.onDeleteNoteHandler} archiveNote={this.onArchiveNoteHandler} isArchive={true} />
            </section>
        );
    }
}

ArchivesPage.propTypes = {
    query: PropTypes.string,
    changeQuery: PropTypes.func.isRequired
};