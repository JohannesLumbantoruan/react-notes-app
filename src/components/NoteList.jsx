import { useContext } from 'react';
import NoteItem from './NoteItem';
import PropTypes from 'prop-types';
import { LocaleContext } from '../contexts';

export default function NoteList({ notes, deleteNote, archiveNote, isArchive }) {
    const { locale } = useContext(LocaleContext);

    return (
        <div className='note-list'>
            {
                locale === 'id' ?
                    <>
                        <h2>{isArchive ? 'Daftar Arsip Catatan' : 'Daftar Catatan'}</h2>
                        {
                            !notes.length && (isArchive ?
                                <p>Tidak ada arsip catatan untuk ditampilkan</p>
                            :
                                <p>Tidak ada catatan untuk ditampilkan</p>)
                        }
                    </>
                :
                    <>
                        <h2>{isArchive ? 'Note Archive List' : 'Note List'}</h2>
                        {
                            !notes.length && (isArchive ?
                                <p>No note archives to show</p>
                            :
                                <p>No notes to show</p>)
                        }
                    </>
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
    isArchive: PropTypes.bool
};