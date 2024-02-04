import { useState } from "react";
import { deleteNote, getArchivedNotes, unArchiveNote } from "../data/notes";
import NoteSearhForm from "../components/NoteSearchForm";
import NoteList from "../components/NoteList";
import { useSearchParams } from "react-router-dom";

export default function ArchivesPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [notes, setNotes] = useState(() => getArchivedNotes());
    const [query, setQuery] = useState(() => searchParams.get('query') || '');

    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(query));

    const onQueryChangeHandler = (query) => {
        setQuery(query);

        setSearchParams({ query });
    }

    const onDeleteNoteHandler = (id) => {
        deleteNote(id);

        setNotes(() => getArchivedNotes());
        setQuery('');
    }

    const onArchiveNoteHandler = (id) => {
        unArchiveNote(id);

        setNotes(() => getArchivedNotes());
        setQuery('');
    }

    return (
        <section>
            <NoteSearhForm searchNote={onQueryChangeHandler} query={query} isArchive={true} setQuery={setQuery} />
            <NoteList notes={filteredNotes} deleteNote={onDeleteNoteHandler} archiveNote={onArchiveNoteHandler} isArchive={true} />
        </section>
    );  
}