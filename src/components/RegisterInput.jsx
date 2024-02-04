import { useNavigate, Link } from "react-router-dom";
import useInput from "../hooks/useInput";
import { register } from "../data/api";
import { useState } from "react";

export default function RegisterInput() {
    const [name, onNameChangeHandler] = useInput('');
    const [email, onEmailChangeHandler] = useInput('');
    const [password, onPasswordChangeHandler] = useInput('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const navigate = useNavigate();

    const onPasswordConfirmationChangeHandler = (event) => {
        const passwordInput = event.target.value;

        setPasswordConfirmation(passwordInput);

        if (passwordInput !== password) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (passwordError) return;

        const { error } = await register({
            name,
            email,
            password
        })

        if (!error) navigate('/login');
    };

    return (
        <form className="form-input" onSubmit={onSubmitHandler}>
            <input type="text" value={name} onChange={onNameChangeHandler} placeholder="Nama" required />
            <input type="email" value={email} onChange={onEmailChangeHandler} placeholder="Email" required />
            <input type="password" value={password} onChange={onPasswordChangeHandler} placeholder="Password" required />
            <input type="password" value={passwordConfirmation} onChange={onPasswordConfirmationChangeHandler} placeholder="Ulang Password" required />
            {passwordError && <p className="alert">Password tidak cocok</p>}
            <button>Daftar</button>
            <p>Sudah punya akun? Silahkan <Link to="/">masuk</Link></p>
        </form>
    );
}