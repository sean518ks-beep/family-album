import { Header } from "../components/layout/Header";

export default function AuthLayout({ children }) {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    );
}
