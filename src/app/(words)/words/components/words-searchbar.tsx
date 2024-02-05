'use client'

import styles from "./words-searchbar.module.css"
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function WordsSearchbar() {
    const [enteredText, setEnteredText] = useState('');

    const inputRef = useRef(null);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set('term', term);
        } else {
            params.delete('term');
        }

        replace(`${pathname}?${params.toString()}`);
    }, 150);

    useEffect(() => {
        // @ts-ignore
        inputRef.current.focus();

        const keyDownHandler = (event: { code: any; }) => {
            // @ts-ignore
            inputRef.current.focus();

            if (event.code == 'Escape') {
                handleSearch('')
                setEnteredText('')
                // @ts-ignore
                // inputRef.current.value = '';
                // @ts-ignore
                inputRef.current.blur();
            }
        }
        document.addEventListener("keydown", keyDownHandler);

        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        };
    }, []);

    const onInput = (e: any) => setEnteredText(e.target.value);

    return <>
        <div className={styles.searchbar}>
            <input
                ref={inputRef}
                placeholder="Найти..."
                value={enteredText}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                onInput={onInput}
                defaultValue={searchParams.get('term')?.toString()}
            />
            {/* TODO   Change color of autofocused input with styles*/}
        </div>
    </>
}