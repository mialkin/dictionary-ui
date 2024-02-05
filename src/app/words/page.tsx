'use client'

import styles from './page.module.css'
import Link from "next/link";
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
                <Link href="/words/create"> Добавить слово </Link>
            </div>
            <div className={styles.word}>
                Cписок слов
                <div>
                    <Link href="/words/edit"> Редактировать слово </Link>
                </div>
            </div>
            <div>
                <Link href="/">На главную</Link>
            </div>
        </main>
    );
}
