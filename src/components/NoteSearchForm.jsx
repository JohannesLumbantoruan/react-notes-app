import React from "react";
import PropTypes from 'prop-types';

export default class NoteSearhForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ''
        };

        this.onQueryChangeHandler = this.onQueryChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onQueryChangeHandler(event) {
        const query = event.target.value.trim().toLowerCase();
        this.setState({ query });

        this.props.searchNote(query);
    }

    onSubmitHandler(event) {
        event.preventDefault();

        this.props.searchNote(this.state.query);
    }

    render() {
        const { isArchive } = this.props;

        return (
            <form className="note-search-form" onSubmit={this.onSubmitHandler}>
                <input type="text" placeholder={isArchive ? 'Cari arsip catatan' : 'Cari catatan'} value={this.state.query} onChange={this.onQueryChangeHandler} />
                <button type="submit">Cari</button>
            </form>
        );
    }
}

NoteSearhForm.propTypes = {
    searchNote: PropTypes.func.isRequired,
    isArchive: PropTypes.bool
};