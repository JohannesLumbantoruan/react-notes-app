import PropTypes from 'prop-types';
import { useContext } from 'react';
import { LocaleContext } from '../contexts';

export default function NoteSearchForm({ query, searchNote, isArchive, setQuery }) {
    const { locale } = useContext(LocaleContext);

    const onQueryChangeHandler = (event) => {
        const query = event.target.value.trim().toLowerCase();
        setQuery(query);
        searchNote(query);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        searchNote(query);
    }

    if (locale === 'en') {
        return (
            <form className="note-search-form" onSubmit={onSubmitHandler}>
                <input type="text" placeholder={isArchive ? 'Search note archive' : 'Search note'} value={query} onChange={onQueryChangeHandler} />
                <button type="submit">Search</button>
            </form>
        );        
    }

    return (
        <form className="note-search-form" onSubmit={onSubmitHandler}>
            <input type="text" placeholder={isArchive ? 'Cari arsip catatan' : 'Cari catatan'} value={query} onChange={onQueryChangeHandler} />
            <button type="submit">Cari</button>
        </form>
    );
}

NoteSearchForm.propTypes = {
    searchNote: PropTypes.func.isRequired,
    isArchive: PropTypes.bool,
    query: PropTypes.string.isRequired,
    setQuery: PropTypes.func.isRequired
};