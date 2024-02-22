import styles from './page.module.css';
import React from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';

// TODO: Create new app with npx create-next-app@latest and examine its default again
export default function Home() {

    const cookieStore = cookies();
    const userIsAuthenticated = cookieStore.get(process.env.SESSION_COOKIE_NAME!)?.value;

    if (userIsAuthenticated) {
        return <main>
            <div className={styles.main}>Главная страница</div>
            <div>
                <Link href='/words'>Слова</Link>
            </div>
        </main>;
    }

    return <main>
        <div className={styles.main}>Главная страница</div>
        <div>
            <Link href='/login'>Войти</Link>
        </div>
    </main>;
}

// TODO: Consider using /public folder in the root of the project