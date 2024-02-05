'use client'

import React, { useEffect } from "react";
import WordsList from "@/app/(words)/words/components/words-list";
import WordsSearchbar from "@/app/(words)/words/components/words-searchbar";

export default function Words({ searchParams, }: { searchParams?: { term?: string; language?: number; }; }) {

    const term = searchParams?.term || '';
    let languageId = searchParams?.language || 1;

    useEffect(() => {
        const keyDownHandler = (event: { code: any; }) => {
            if (event.code == 'Escape') {
                console.log(`You pressed the Escape.`);
            }
        }
        document.addEventListener("keydown", keyDownHandler);

        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        };
    }, []);

    return (
        <div>
            <WordsSearchbar />
            <WordsList languageId={languageId} term={term} />
        </div>
    );
}
