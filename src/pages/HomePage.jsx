import { useEffect, useState } from "react";
import NoteList from "../components/NoteList";
import NoteSearhForm from "../components/NoteSearchForm";
import { useSearchParams } from "react-router-dom";
import { getActiveNotes, archiveNote, deleteNote } from "../data/api";

export default function HomePage() {
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();

    const [notes, setNotes] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        (async () => {
            const { error, data } = await getActiveNotes();

            if (!error) {
                setNotes(data);
            }
        })();
    }, []);

    const onDeleteNoteHandler = async (id) => {
        const { error } = await deleteNote(id);

        if (!error) {
            const { error: err, data } = await getActiveNotes();

            if (!err) {
                setNotes(data);
                setQuery('');
            }
        }
    }

    const onQueryChangeHandler = (query) => {
        setQuery(query);
        setSearchParams({ query });
    }

    const onArchiveNoteHandler = async (id) => {
        const { error } = await archiveNote(id);

        if (!error) {
            const { error: err, data} = await getActiveNotes();

            if (!err) {
                setNotes(data);
                setQuery('');
            }
        }
    }

    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(query));

    return (
        <section>
            <NoteSearhForm searchNote={onQueryChangeHandler} query={query} setQuery={setQuery} />
            <NoteList notes={filteredNotes} deleteNote={onDeleteNoteHandler} archiveNote={onArchiveNoteHandler} />
        </section>
    );
}