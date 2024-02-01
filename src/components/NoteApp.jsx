import React from "react";
import NoteList from "./NoteList";
import { getNotes } from "../data/notes";
import NoteAddForm from "./NoteAddForm";
import NoteSearhForm from "./NoteSearchForm";

export default class NoteApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: getNotes(),
            search: false,
            searchResult: [],
            showArchives: false,
            archiveSearchResult: []
        };

        this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
        this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this);
        this.onSearchNoteHandler = this.onSearchNoteHandler.bind(this);
        this.onArchiveNoteHandler = this.onArchiveNoteHandler.bind(this);
        this.onNoteClickHandler = this.onNoteClickHandler.bind(this);
        this.onArchiveClickHandler = this.onArchiveClickHandler.bind(this);
        this.onDeleteArchiveHandler = this.onDeleteArchiveHandler.bind(this);
        this.onUnarchiveNoteHandler = this.onUnarchiveNoteHandler.bind(this);
        this.onSearchArchiveHandler = this.onSearchArchiveHandler.bind(this);
    }

    onAddNoteHandler(note) {
        this.setState((prev) => ({
            ...prev,
            notes: [
                {
                    ...note,
                    id: +new Date(),
                    createdAt: new Date().toISOString(),
                    archived: false
                },
                ...prev.notes
            ]
        }));
    }

    onDeleteNoteHandler(id) {
        this.setState((prev) => ({
            ...prev,
            notes: prev.notes.filter((note) => note.id !== id),
            searchResult: prev.searchResult.filter((note) => note.id !== id),
            search: false
        }));
    }

    onDeleteArchiveHandler(id) {
        this.setState((prev) => ({
            ...prev,
            notes: prev.notes.filter((note) => note.id !== id),
            archiveSearchResult: prev.archiveSearchResult.filter((note) => note.id !== id),
            search: false
        }));
    }

    onSearchNoteHandler(query) {
        this.setState((prev) => ({
            ...prev,
            search: true,
            searchResult: prev.notes.filter((note) => {
                if (note.archived) return false;

                return note.title.toLowerCase().includes(query)
            })
        }));
    }

    onSearchArchiveHandler(query) {
        this.setState((prev) => ({
            ...prev,
            search: true,
            archiveSearchResult: prev.notes.filter((note) => {
                if (!note.archived) return false;

                return note.title.toLowerCase().includes(query);
            })
        }));
    }

    onArchiveNoteHandler(id) {
        this.setState((prev) => ({
            ...prev,
            notes: prev.notes.map((note) => {
                if (note.id === id) {
                    note.archived = true;
                }

                return note;
            }),
            searchResult: prev.searchResult.filter((note) => note.id !== id),
            search: false
        }));
    }

    onUnarchiveNoteHandler(id) {
        this.setState((prev) => ({
            ...prev,
            notes: prev.notes.map((note) => {
                if (note.id === id) {
                    note.archived = false;
                }

                return note;
            }),
            archiveSearchResult: prev.archiveSearchResult.filter((note) => note.id !== id),
            search: false
        }));
    }

    onNoteClickHandler() {
        this.setState({
            showArchives: false,
            search: false
        });
    }

    onArchiveClickHandler() {
        this.setState({
            showArchives: true,
            search: false
        });
    }

    render() {
        const notes = this.state.notes.filter((note) => !note.archived);
        const archivedNotes = this.state.notes.filter((note) => note.archived);

        return (
            <div className="note-app">
                <h1>Notes App</h1>
                <NoteAddForm addNote={this.onAddNoteHandler} />
                <NoteSearhForm searchNote={this.state.showArchives? this.onSearchArchiveHandler : this.onSearchNoteHandler} showArchives={this.state.showArchives} />
                <ul className="note-app__menu">
                    <li>
                        <button onClick={this.onNoteClickHandler} className={this.state.showArchives ? '' : 'active'}>Catatan</button>
                    </li>
                    <li>
                        <button onClick={this.onArchiveClickHandler} className={this.state.showArchives ? 'active' : ''}>Arsip</button>
                    </li>
                </ul>
                {
                    this.state.search ?
                        this.state.showArchives ?
                            <NoteList notes={this.state.archiveSearchResult} deleteNote={this.onDeleteArchiveHandler} archiveNote={this.onUnarchiveNoteHandler} showArchives={true} />
                        :
                            <NoteList notes={this.state.searchResult} deleteNote={this.onDeleteNoteHandler} archiveNote={this.onArchiveNoteHandler} />
                    :
                        this.state.showArchives ?
                            <NoteList notes={archivedNotes} deleteNote={this.onDeleteArchiveHandler} archiveNote={this.onUnarchiveNoteHandler} showArchives={true} />
                        :
                            <NoteList notes={notes} deleteNote={this.onDeleteNoteHandler} archiveNote={this.onArchiveNoteHandler} />
                }
            </div>
        );
    }
}