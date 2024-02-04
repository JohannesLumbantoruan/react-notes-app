import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { login } from '../data/api';

export default function LoginInput({ loginSuccess }) {
    const [email, onEmailChangeHandler] = useInput('');
    const [password, onPasswordChangeHandler] = useInput('');

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
            <button>Masuk</button>
            <p>Belum punya akun? Daftar di <Link to="/register">sini</Link></p>
        </form>
    );
}

LoginInput.propTypes = {
    loginSuccess: PropTypes.func.isRequired
};