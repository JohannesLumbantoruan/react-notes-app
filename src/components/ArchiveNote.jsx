import PropTypes from 'prop-types';

export default function ArchiveNote({ id, archiveNote, isArchive }) {
    return (
        isArchive ?
            <button onClick={() => archiveNote(id)}>Kembalikan</button>
        :
            <button onClick={() => archiveNote(id)}>Arsipkan</button>
    );
}

ArchiveNote.propTypes = {
    id: PropTypes.number.isRequired,
    archiveNote: PropTypes.func.isRequired,
    isArchive: PropTypes.bool.isRequired
};