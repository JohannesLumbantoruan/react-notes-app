import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArchivesPage from "./pages/ArchivesPage";
import Navigation from "./components/Navigation";
import AddPage from "./pages/AddPage";
import DetailPage from "./pages/DetailPage";
import NotFoundPage from "./pages/NotFoundPage";

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
                        <Route path="/notes/add" element={<AddPage />} />
                        <Route path="/notes/:id" element={<DetailPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
            </div>
        );
    }
}