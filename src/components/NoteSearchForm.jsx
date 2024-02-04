import PropTypes from 'prop-types';

export default function NoteSearchForm({ query, searchNote, isArchive, setQuery }) {
    const onQueryChangeHandler = (event) => {
        const query = event.target.value.trim().toLowerCase();
        setQuery(query);
        searchNote(query);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        searchNote(query);
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