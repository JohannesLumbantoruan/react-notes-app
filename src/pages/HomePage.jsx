import React from "react";
import NoteList from "../components/NoteList";
import NoteSearhForm from "../components/NoteSearchForm";
import { archiveNote, deleteNote, getNotes } from "../data/notes";
import { useSearchParams } from "react-router-dom";

export default function HomePageWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get('query');

    const changeSearchParams = (query) => {
        setSearchParams({ query });
    };

    return <HomePage query={query} queryChange={changeSearchParams} />
}

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: getNotes(),
            query: props.query || ''
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
        const notes = this.state.notes.filter((note) => note.title.toLowerCase().includes(this.state.query));

        return (
            <section>
                <NoteSearhForm searchNote={this.onQueryChangeHandler} query={this.state.query} />
                <NoteList notes={notes} deleteNote={this.onDeleteNoteHandler} archiveNote={this.onArchiveNoteHandler} />
            </section>
        );
    }
}