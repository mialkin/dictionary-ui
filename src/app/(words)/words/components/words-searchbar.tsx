'use client'

import styles from "./words-searchbar.module.css"
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

export default function WordsSearchbar() {
    const searchParams = useSearchParams();
    const [enteredText, setEnteredText] = useState(searchParams.get('term')?.toString() || '');

    const inputRef = useRef<HTMLInputElement>(null);

    const pathname = usePathname();
    const { replace } = useRouter();

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();

            if (enteredText.length > 0) {
                inputRef.current.setSelectionRange(enteredText.length, enteredText.length)
            }
        }
    }, []);

    const updateSearchParams = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set('term', term);
        } else {
            params.delete('term');
        }

        replace(`${pathname}?${params.toString()}`);
    }, 150);

    function handleSearchbarKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.code == 'Escape') {
            updateSearchParams('')
            setEnteredText('')
        }

        if (event.code == 'Enter') {
            console.log('Create word: "' + enteredText + '"')
        }
    }

    return <>
        <div className={styles.searchbar}>
            <input
                ref={inputRef}
                placeholder="Поиск..."
                value={enteredText}
                onChange={(event) => {
                    updateSearchParams(event.target.value);
                }}
                onInput={event => {
                    let target = event.target as HTMLInputElement;
                    setEnteredText(target.value);
                }}
                onKeyDown={event => handleSearchbarKeyDown(event)}
            />
            {/* TODO   Change color of autofocused input with styles*/}
        </div>
    </>
}