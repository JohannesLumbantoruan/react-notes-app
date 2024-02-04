import { useContext, useState } from "react";
import { addNote } from "../data/api";
import { useNavigate } from "react-router-dom";
import { LocaleContext } from '../contexts';

export default function AddPage() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [totalChar, setTotalChar] = useState(50);

    const { locale } = useContext(LocaleContext);

    const onTitleChangeHandler = (event) => {
        let title = event.target.value;

        if (title.length > 50) {
            title = title.slice(0, 51);
            setTotalChar(0);
            setTitle(title);
        } else {
            setTotalChar(50 - title.length);
            setTitle(title);
        }
    }

    const onBodyChangeHandler = (event) => {
        setBody(event.target.value);
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const { error } = addNote({
            title,
            body
        });

        if (!error) navigate('/');
    }

    if (locale === 'en') {
        return (
            <form className="note-add-form" onSubmit={onSubmitHandler}>
                <h2>Add Note</h2>
                <p>Characters left: {totalChar}</p>
                <input type="text" placeholder="Note title" value={title} onChange={onTitleChangeHandler} required />
                <textarea rows="5" placeholder="Note body" value={body} onChange={onBodyChangeHandler} required></textarea>
                <button type="submit">Add</button>
            </form>
        )
    }

    return (
        <form className="note-add-form" onSubmit={onSubmitHandler}>
            <h2>Tambah Catatan</h2>
            <p>Sisa karakter: {totalChar}</p>
            <input type="text" placeholder="Judul catatan" value={title} onChange={onTitleChangeHandler} required />
            <textarea rows="5" placeholder="Isi catatan" value={body} onChange={onBodyChangeHandler} required></textarea>
            <button type="submit">Tambah</button>
        </form>
    );
}