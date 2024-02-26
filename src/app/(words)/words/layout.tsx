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
                    <Link href='/logout'>Выйти</Link>
                </div>
            </div>
            <div className={styles.main}>
                {children}
            </div>
        </div>
    );
}