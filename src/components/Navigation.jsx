import { Link } from "react-router-dom";

export default function Navigation() {
    const onHamburgerClick = (event) => {
        event.stopPropagation();

        const ul = document.querySelector('ul');
        const li = document.querySelector('li:first-child');

        li.style.display = 'block';
        ul.style.display = 'block';
    };

    const onCloseClick = (event) => {
        event.stopPropagation();

        const ul = document.querySelector('ul');
        const li = document.querySelector('li:first-child');

        li.style.display = 'none';
        ul.style.display = 'none';
    };

    return (
        <nav>
            <h1>Notes App</h1>
            <button id="hamburger-button" onClick={onHamburgerClick}>☰</button>
            <ul>
                <li onClick={onCloseClick}>X</li>
                <li><Link to="/">Catatan</Link></li>
                <li><Link to="/archives">Arsip</Link></li>
                <li><Link to="/notes/add">Tambah Catatan</Link></li>
            </ul>
        </nav>
    );
}