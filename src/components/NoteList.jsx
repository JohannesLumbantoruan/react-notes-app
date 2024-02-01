import NoteItem from './NoteItem';

export default function NoteList({ notes, deleteNote, archiveNote, showArchives }) {
    return (
        <div className='note-list'>
            <h2>{showArchives ? 'Daftar Arsip Catatan' : 'Daftar Catatan'}</h2>
            {
                notes.length === 0 && (showArchives ?
                    <p>Tidak ada arsip catatan untuk ditampilkan</p>
                :
                    <p>Tidak ada catatan untuk ditampilkan</p>)
            }
            <div className="note-items">
                {
                    notes.map((note) => (
                        <NoteItem key={note.id} note={note} deleteNote={deleteNote} archiveNote={archiveNote} showArchives={showArchives} />
                    ))
                }
            </div>
        </div>
    );
}