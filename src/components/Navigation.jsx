import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiLogOut } from 'react-icons/fi';
import { FaStickyNote, FaArchive, FaPlus } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { useContext, useEffect } from 'react';
import { LocaleContext } from '../contexts';

export default function Navigation({ logout, name }) {
    const { locale } = useContext(LocaleContext);

    useEffect(() => {
        if (window.innerWidth > 500) return;
        
        const menu = document.querySelectorAll('li a');

        const clickHandler = (event) => {
            event.stopPropagation();

            document.querySelector('li:first-child').click()
        };

        menu.forEach((el) => {
            el.addEventListener('click', clickHandler);
        });

        document.documentElement.addEventListener('click', clickHandler);

        return () => {
            menu.forEach((el) => {
                el.removeEventListener('click', clickHandler);
            });
        };
    }, []);

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
            <h1>{locale === 'id' ? 'Catatanku' : 'MyNotes'}</h1>
            <button id="hamburger-button" onClick={onHamburgerClick}>☰</button>
            <ul>
                <li onClick={onCloseClick}><MdClose className="btn-close" /></li>
                <li><Link to="/"><FaStickyNote /></Link></li>
                <li><Link to="/archives"><FaArchive /></Link></li>
                <li><Link to="/notes/add"><FaPlus /></Link></li>
                <li><button onClick={logout} className="btn-logout">{name} <FiLogOut /></button></li>
            </ul>
        </nav>
    );
}

Navigation.propTypes = {
    logout: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};