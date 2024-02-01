export default function ArchiveNote({ id, archiveNote, isArchive }) {
    return (
        isArchive ?
            <button onClick={() => archiveNote(id)}>Kembalikan</button>
        :
            <button onClick={() => archiveNote(id)}>Arsipkan</button>
    );
}