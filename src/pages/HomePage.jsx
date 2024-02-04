import { useState } from "react";
import NoteList from "../components/NoteList";
import NoteSearhForm from "../components/NoteSearchForm";
import { archiveNote, deleteNote, getNotes } from "../data/notes";
import { useSearchParams } from "react-router-dom";

export default function HomePage() {
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();

    const [notes, setNotes] = useState(() => getNotes());
    const [query, setQuery] = useState('');

    const onDeleteNoteHandler = (id) => {
        deleteNote(id);

        setNotes(getNotes());
        setQuery('');
    }

    const onQueryChangeHandler = (query) => {
        setQuery(query);
        setSearchParams({ query });
    }

    const onArchiveNoteHandler = (id) => {
        archiveNote(id);

        setNotes(getNotes());
        setQuery('');
    }

    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(query));

    return (
        <section>
            <NoteSearhForm searchNote={onQueryChangeHandler} query={query} setQuery={setQuery} />
            <NoteList notes={filteredNotes} deleteNote={onDeleteNoteHandler} archiveNote={onArchiveNoteHandler} />
        </section>
    );
}