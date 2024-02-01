import NoteItem from './NoteItem';
import PropTypes from 'prop-types';

export default function NoteList({ notes, deleteNote, archiveNote, isArchive }) {
    return (
        <div className='note-list'>
            <h2>{isArchive ? 'Daftar Arsip Catatan' : 'Daftar Catatan'}</h2>
            {
                !notes.length && (isArchive ?
                    <p>Tidak ada arsip catatan untuk ditampilkan</p>
                :
                    <p>Tidak ada catatan untuk ditampilkan</p>)
            }
            <div className="note-items">
                {
                    notes.map((note) => (
                        <NoteItem key={note.id} note={note} deleteNote={deleteNote} archiveNote={archiveNote} isArchive={isArchive} />
                    ))
                }
            </div>
        </div>
    );
}

NoteList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
    deleteNote: PropTypes.func.isRequired,
    archiveNote: PropTypes.func.isRequired,
    isArchive: PropTypes.bool.isRequired
};