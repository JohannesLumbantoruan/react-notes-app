import { useEffect, useState } from 'react';
import NoteSearhForm from '../components/NoteSearchForm';
import NoteList from '../components/NoteList';
import { useSearchParams } from 'react-router-dom';
import { getArchivedNotes, deleteNote, unarchiveNote } from '../data/api';
import PropTypes from 'prop-types';

export default function ArchivesPage({ setLoading }) {
    const [searchParams, setSearchParams] = useSearchParams();

    const [notes, setNotes] = useState([]);
    const [query, setQuery] = useState(() => searchParams.get('query') || '');

    useEffect(() => {
        (async () => {
            setLoading(true);

            const { error, data } = await getArchivedNotes();

            if (!error) {
                setNotes(data);
                setLoading(false);
            }
        })();
    }, [setLoading]);

    const onQueryChangeHandler = (query) => {
        setQuery(query);

        setSearchParams({ query });
    }

    const onDeleteNoteHandler = async (id) => {
        const { error } = await deleteNote(id);

        if (!error) {
            const { error: err, data } = await getArchivedNotes();
1
            if (!err) {
                setNotes(data);
                setQuery('');
            }
        }
    }

    const onArchiveNoteHandler = async (id) => {
        const { error } = await unarchiveNote(id);

        if (!error) {
            const { error: err, data } = await getArchivedNotes();

            if (!err) {
                setNotes(data);
                setQuery('');
            }
        }
    }

    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(query));
    
    return (
        <section>
            <NoteSearhForm searchNote={onQueryChangeHandler} query={query} isArchive={true} setQuery={setQuery} />
            <NoteList notes={filteredNotes} deleteNote={onDeleteNoteHandler} archiveNote={onArchiveNoteHandler} isArchive={true} />
        </section>
    );  
}

ArchivesPage.propTypes = {
    setLoading: PropTypes.func.isRequired
};