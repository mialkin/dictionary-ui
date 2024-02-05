import styles from "./page.module.css";
import React from "react";
import Link from "next/link";

// TODO: Create new app with npx create-next-app@latest and examine its default again
export default function Home() {
    return (
        <main>
            <div className={styles.main}>Главная страница</div>
            <div>
                <Link href="/words">Слова</Link>
            </div>
        </main>
    );
}

// TODO: Consider using /public folder in the root of the project