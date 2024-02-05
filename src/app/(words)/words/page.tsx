'use client'

import styles from './page.module.css'
import React, { useEffect } from "react";

export default function Words() {

    useEffect(() => {
        const keyDownHandler = (event: { code: any; }) => console.log(`You pressed ${event.code}.`);
        document.addEventListener("keydown", keyDownHandler);

        return () => {
            console.log('Removing event listener')
            document.removeEventListener("keydown", keyDownHandler);
        };
    }, []);

    return (
        <main>
            <div>
                <div className={styles.searchbar}>
                    <input placeholder="Найти..." />
                </div>
                <div>
                    Cписок слов
                </div>
            </div>
        </main>
    );
}
