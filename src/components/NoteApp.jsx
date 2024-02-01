import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ArchivesPage from "../pages/ArchivesPage";
import Navigation from "./Navigation";

export default class NoteApp extends React.Component {
    render() {
        return (
            <div className="note-app">
                <header>
                    <Navigation />
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/archives" element={<ArchivesPage />} />
                    </Routes>
                </main>
            </div>
        );
    }
}