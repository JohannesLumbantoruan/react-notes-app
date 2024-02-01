export default function ArchiveNote({ id, archiveNote, showArchives }) {
    return (
        showArchives ?
            <button onClick={() => archiveNote(id)}>Kembalikan</button>
        :
            <button onClick={() => archiveNote(id)}>Arsipkan</button>
    );
}