import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { login } from '../data/api';
import { useContext } from 'react';
import { LocaleContext } from '../contexts';

export default function LoginInput({ loginSuccess }) {
    const [email, onEmailChangeHandler] = useInput('');
    const [password, onPasswordChangeHandler] = useInput('');

    const { locale } = useContext(LocaleContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const { error, data } = await login({
            email,
            password
        });

        if (!error) {
            loginSuccess(data);
        }
    };

    return (
        <form className="form-input" onSubmit={onSubmitHandler}>
            <input type="email" value={email} onChange={onEmailChangeHandler} placeholder="Email" required />
            <input type="password" value={password} onChange={onPasswordChangeHandler} placeholder="Password" required />
            <button>{locale === 'id' ? 'Masuk' : 'Login'}</button>
            <p>{locale === 'id' ? 'Belum punya akun? Daftar di' : 'Do not have an account? Register'} <Link to="/register">{locale === 'id' ? 'sini' : 'here'}</Link></p>
        </form>
    );
}

LoginInput.propTypes = {
    loginSuccess: PropTypes.func.isRequired
};