import { NavBar } from "../NavBar/NavBar";
import styles from './Header.module.css';

interface headerProps {
    title: string;
}

export const Header = ({ title }: headerProps) => {
    return (
        <>
            <NavBar />
            <header className={styles.header}>
                <h1>{title}</h1>
            </header>
        </>
    );
}