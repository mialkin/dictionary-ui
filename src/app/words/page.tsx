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
            <div className={styles.word}>
                This is words page :-)
            </div>
            <div>
                <Link href="/">На главную</Link>
            </div>
        </main>
    );
}
