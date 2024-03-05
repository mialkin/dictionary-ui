import React from 'react';
import styles from './layout.module.css';

export default function WordsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.container}>
            <header>
                <form action={new URL('/logout', process.env.NEXT_PUBLIC_CLIENT_GATEWAY_API_URL).toString()}
                      method='POST'>
                    <input type='submit' value='Выйти' />
                </form>
            </header>
            <div>
                {children}
            </div>
        </div>
    );
}