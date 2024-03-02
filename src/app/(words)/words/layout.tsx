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
                    <form
                        action={new URL('auth/logout', process.env.NEXT_PUBLIC_CLIENT_GATEWAY_API_URL).toString()}
                        method='POST'
                    >
                        <button type='submit'>Выйти</button>
                    </form>
                </div>
            </div>
            <div className={styles.main}>
                {children}
            </div>
        </div>
    );
}