import PropTypes from 'prop-types';
import { FaRegTrashAlt } from 'react-icons/fa';

export default function DeleteNote({ id, deleteNote }) {
    return (
        <button onClick={() => deleteNote(id)}><FaRegTrashAlt /></button>
    );
}

DeleteNote.propTypes = {
    id: PropTypes.string.isRequired,
    deleteNote: PropTypes.func.isRequired
};