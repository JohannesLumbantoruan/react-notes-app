import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <nav>
            <h1>Notes App</h1>
            <ul>
                <li><Link to="/">Catatan</Link></li>
                <li><Link to="/archives">Arsip</Link></li>
                <li><Link to="/notes/add">Tambah Catatan</Link></li>
            </ul>
        </nav>
    );
}