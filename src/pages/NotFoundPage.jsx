import { useContext } from "react"
import { LocaleContext } from "../contexts"

export default function NotFoundPage() {
    const { locale } = useContext(LocaleContext);

    return (
        <h2 className="not-found">404 | {locale === 'id' ? 'Halaman tidak ditemukan' : 'Page Not Found'}</h2>
    )
}