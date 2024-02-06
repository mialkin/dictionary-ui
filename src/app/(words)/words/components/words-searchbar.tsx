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

        const keyDownHandler = (event: any) => {

            if (!event.metaKey
                && !event.ctrlKey
                && !event.shiftKey
                && event.key != 'Tab'
                && event.key != 'LeftShift'
                && event.key != 'RightShift'
                && event.key != 'Enter'
            ) {
                // @ts-ignore
                inputRef.current.focus()
            }
            console.log(event.code)

            if (event.code == 'Escape') {
                handleSearch('')
                setEnteredText('')
                // @ts-ignore
                // inputRef.current.value = '';
                // @ts-ignore
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
                placeholder="Поиск..."
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