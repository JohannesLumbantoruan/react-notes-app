import PropTypes from 'prop-types';
import { RiInboxUnarchiveLine, RiInboxArchiveLine } from "react-icons/ri";

export default function ArchiveNote({ id, archiveNote, isArchive }) {
    return (
        isArchive ?
            <button onClick={() => archiveNote(id)}><RiInboxUnarchiveLine /></button>
        :
            <button onClick={() => archiveNote(id)}><RiInboxArchiveLine /></button>
    );
}

ArchiveNote.propTypes = {
    id: PropTypes.number.isRequired,
    archiveNote: PropTypes.func.isRequired,
    isArchive: PropTypes.bool
};