import React from 'react';
import Link from 'next/link';
import styles from './layout.module.css';

export default function WordsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className={styles.header}>
                <div>
                    <Link href='/'>Логотип</Link>
                </div>
                <div>
                    <Link
                        href={new URL('api/auth/logout', process.env.NEXT_PUBLIC_CLIENT_GATEWAY_API_URL).toString()}>
                        Выйти
                    </Link>
                </div>
            </div>
            <div className={styles.main}>
                {children}
            </div>
        </div>
    );
}