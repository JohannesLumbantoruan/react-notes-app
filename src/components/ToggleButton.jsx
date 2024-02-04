import { FiSun, FiMoon } from 'react-icons/fi'
import { useContext } from 'react';
import { ThemeContext, LocaleContext } from '../contexts';

export default function ToggleButton() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { locale, toggleLocale } = useContext(LocaleContext);

    return (
        <div className="toggle-button">
            <button onClick={toggleTheme}>{theme === 'dark' ? <FiSun /> : <FiMoon />}</button>
            <button onClick={toggleLocale}>{locale === 'id' ? 'en' : 'id'}</button>
        </div>
    );
}