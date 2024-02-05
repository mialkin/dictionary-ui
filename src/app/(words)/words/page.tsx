'use client'

import styles from './page.module.css'
import React, { useEffect } from "react";
import WordsList from "@/app/(words)/words/components/words-list";

export default function Words() {

    useEffect(() => {
        const keyDownHandler = (event: { code: any; }) => console.log(`You pressed ${event.code}.`);
        document.addEventListener("keydown", keyDownHandler);

        return () => {
            console.log('Removing event listener')
            document.removeEventListener("keydown", keyDownHandler);
        };
    }, []);

    let languageId = 1;
    let term = 'a';

    return (
        <main>
            <div>
                <div className={styles.searchbar}>
                    <input placeholder="Найти..." autoFocus />
                {/* TODO   Change color of autofocused input with styles*/}
                </div>
                <WordsList languageId={languageId} term={term} />
            </div>
        </main>
    );
}
