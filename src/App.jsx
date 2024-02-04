import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArchivesPage from "./pages/ArchivesPage";
import Navigation from "./components/Navigation";
import AddPage from "./pages/AddPage";
import DetailPage from "./pages/DetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useEffect, useMemo, useState } from "react";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { getUserLogged, putAccessToken } from "./data/api";
import { ThemeContext, LocaleContext } from "./contexts";
import ToggleButton from "./components/ToggleButton";

export default function NoteApp() {
    const [authedUser, setAuthedUser] = useState(null);
    const [initializing, setInitializing] = useState(true);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
    const [locale, setLocale] = useState(localStorage.getItem('locale') || 'id');

    const themeContextValue = useMemo(() => ({
        theme,
        toggleTheme: () => {
            setTheme((prev) => {
                const newTheme = prev === 'light' ? 'dark' : 'light';

                localStorage.setItem('theme', newTheme);

                return newTheme;
            });
        }
    }), [theme]);

    const localeContextValue = useMemo(() => ({
        locale,
        toggleLocale: () => {
            setLocale((prev) => {
                const newLocale = prev === 'id' ? 'en' : 'id';

                localStorage.setItem('locale', newLocale);

                return newLocale;
            });
        }
    }), [locale]);

    useEffect(() => {
        (async() => {
            const { data } = await getUserLogged();

            setAuthedUser(data);
            setInitializing(false);
        })();
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

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
            <ThemeContext.Provider value={themeContextValue}>
                <LocaleContext.Provider value={localeContextValue}>
                    <div className="note-app">
                        <main>
                            <Routes>
                                <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
                                <Route path="/register" element={<RegisterPage />} />
                            </Routes>
                        </main>
                    </div>
                </LocaleContext.Provider>
            </ThemeContext.Provider>
        )
    }
    
    return (
        <ThemeContext.Provider value={themeContextValue}>
            <LocaleContext.Provider value={localeContextValue}>
                <div className="note-app">
                    <ToggleButton />
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
            </LocaleContext.Provider>
        </ThemeContext.Provider>
    );
}