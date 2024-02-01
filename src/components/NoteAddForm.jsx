import React from "react";

export default class NoteAddForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            charTotal: 50
        };

        this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
        this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
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

        this.props.addNote({
            title: this.state.title,
            body: this.state.body
        });
    }

    render() {
        return (
            <form className="note-add-form" onSubmit={this.onSubmitHandler}>
                <p>Sisa karakter: {this.state.charTotal}</p>
                <input type="text" placeholder="Judul catatan" value={this.state.title} onChange={this.onTitleChangeHandler} />
                <textarea rows="5" placeholder="Isi catatan" value={this.state.body} onChange={this.onBodyChangeHandler}></textarea>
                <button type="submit">Tambah</button>
            </form>
        );
    }
}