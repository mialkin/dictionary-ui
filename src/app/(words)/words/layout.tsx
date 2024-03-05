import React from 'react';
import Link from 'next/link';
import styles from './layout.module.css';

export default function WordsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className={styles.header}>
                <form action={new URL('/logout', process.env.NEXT_PUBLIC_CLIENT_GATEWAY_API_URL).toString()}
                      method='POST'>
                    <input type='submit' value='Выйти' />
                </form>
            </div>
            <div className={styles.main}>
                {children}
            </div>
        </div>
    );
}