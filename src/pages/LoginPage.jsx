import PropTypes from 'prop-types';
import LoginInput from "../components/LoginInput";
import { useContext } from 'react';
import { LocaleContext } from '../contexts';

export default function LoginPage({ loginSuccess }) {
    const { locale } = useContext(LocaleContext);

    return (
        <section className="auth-page">
            <h1>{locale === 'id' ? 'Masuk' : 'Login'}</h1>
            <LoginInput loginSuccess={loginSuccess} />
        </section>
    );
}

LoginPage.propTypes = {
    loginSuccess: PropTypes.func.isRequired
};