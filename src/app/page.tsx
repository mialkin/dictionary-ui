import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <header>
                <div className={styles.login}>
                    <Link href={new URL('/login', process.env.NEXT_PUBLIC_CLIENT_GATEWAY_API_URL)}>Войти</Link>
                </div>
            </header>
        </div>
    );
}
