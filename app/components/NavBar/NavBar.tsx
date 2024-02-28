import Link from "next/link";
import styles from './NavBar.module.css';

export const NavBar = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles['navbar-links']}>
                <li className={styles['navbar-link']}><Link href="/">Cadastro</Link></li>
                <li className={styles['navbar-link']}><Link href="/listing">Listagem</Link></li>
            </ul>
        </nav>
    );
}