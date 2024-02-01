export default function DeleteNote({ id, deleteNote }) {
    return (
        <button onClick={() => deleteNote(id)}>Hapus</button>
    );
}