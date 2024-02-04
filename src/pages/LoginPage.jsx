import PropTypes from 'prop-types';
import LoginInput from "../components/LoginInput";

export default function LoginPage({ loginSuccess }) {
    return (
        <section className="auth-page">
            <h1>Masuk</h1>
            <LoginInput loginSuccess={loginSuccess} />
        </section>
    );
}

LoginPage.propTypes = {
    loginSuccess: PropTypes.func.isRequired
};