import { useContext } from "react";
import RegisterInput from "../components/RegisterInput";
import { LocaleContext } from "../contexts";

export default function RegisterPage() {
    const { locale } = useContext(LocaleContext);

    return (
        <section className="auth-page">
            <h1>{locale === 'id' ? 'Daftar' : 'Register'}</h1>
            <RegisterInput />
        </section>
    )
}