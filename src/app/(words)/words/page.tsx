'use client'

import React, { useEffect } from "react";
import WordsList from "@/app/(words)/words/components/words-list";
import WordsSearchbar from "@/app/(words)/words/components/words-searchbar";

export default function Words() {

    useEffect(() => {
        const keyDownHandler = (event: { code: any; }) => {
            if (event.code == 'Escape') {
                console.log(`You pressed the Escape.`);
            } else {
                console.log(`You pressed ${event.code}.`);
            }
        }
        document.addEventListener("keydown", keyDownHandler);

        return () => {
            console.log('Removing event listener')
            document.removeEventListener("keydown", keyDownHandler);
        };
    }, []);

    let languageId = 1;
    let term = 'a';

    return (
        <div>
            <WordsSearchbar />
            <WordsList languageId={languageId} term={term} />
        </div>
    );
}
