import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArchivesPage from "./pages/ArchivesPage";
import Navigation from "./components/Navigation";
import AddPage from "./pages/AddPage";
import DetailPage from "./pages/DetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useEffect, useState } from "react";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { getUserLogged, putAccessToken } from "./data/api";

export default function NoteApp() {
    const [authedUser, setAuthedUser] = useState(null);
    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
        (async() => {
            const { data } = await getUserLogged();

            setAuthedUser(data);
            setInitializing(false);
        })();
    }, []);

    const onLoginSuccess = async ({ accessToken }) => {
        putAccessToken(accessToken);

        const { data } = await getUserLogged();

        setAuthedUser(data);
    };

    const onLogout = () => {
        putAccessToken('');

        setAuthedUser(null);
    };

    if (initializing) {
        return null;
    }

    if (authedUser === null) {
        return (
            <div className="note-app">
                <main>
                    <Routes>
                        <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Routes>
                </main>
            </div>
        )
    }
    
    return (
        <div className="note-app">
            <header>
                <Navigation logout={onLogout} name={authedUser.name} />
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