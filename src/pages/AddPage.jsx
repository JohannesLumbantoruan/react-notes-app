import React from "react";
import { addNote } from "../data/notes";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

export default function AddPageWrapper() {
    const navigate = useNavigate();

    return <AddPage navigate={navigate} />
}

class AddPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            charTotal: 50
        }

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
        this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
    }

    onTitleChangeHandler(event) {
        let title = event.target.value;

        if (title.length > 50) {
            title = title.slice(0, 51);
            this.setState((prev) => ({
                ...prev,
                charTotal: 0
            }));
        } else {
            this.setState((prev) => ({
                ...prev,
                title,
                charTotal: 50 - title.length
            }));
        }
    }

    onBodyChangeHandler(event) {
        this.setState({ body: event.target.value });
    }

    onSubmitHandler(event) {
        event.preventDefault();

        addNote({
            title: this.state.title,
            body: this.state.body
        });

        this.props.navigate('/');
    }

    render() {
        return (
            <form className="note-add-form" onSubmit={this.onSubmitHandler}>
                <h2>Tambah Catatan</h2>
                <p>Sisa karakter: {this.state.charTotal}</p>
                <input type="text" placeholder="Judul catatan" value={this.state.title} onChange={this.onTitleChangeHandler} />
                <textarea rows="5" placeholder="Isi catatan" value={this.state.body} onChange={this.onBodyChangeHandler}></textarea>
                <button type="submit">Tambah</button>
            </form>
        );
    }
}

AddPage.propTypes = {
    navigate: PropTypes.func.isRequired
};