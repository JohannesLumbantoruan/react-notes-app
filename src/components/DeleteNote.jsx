import PropTypes from 'prop-types';

export default function DeleteNote({ id, deleteNote }) {
    return (
        <button onClick={() => deleteNote(id)}>Hapus</button>
    );
}

DeleteNote.propTypes = {
    id: PropTypes.number.isRequired,
    deleteNote: PropTypes.func.isRequired
};