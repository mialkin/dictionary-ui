'use client'

import styles from "./words-searchbar.module.css"
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function WordsSearchbar() {
    const searchParams = useSearchParams();
    const [enteredText, setEnteredText] = useState(searchParams.get('term')?.toString());

    const inputRef = useRef<HTMLInputElement>(null);

    const pathname = usePathname();
    const { replace } = useRouter();

    useEffect(() => {
        if (inputRef.current && !enteredText) {
            inputRef.current.focus();
        }

        document.addEventListener("keydown", keyDownHandler);

        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        };
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

    const keyDownHandler = (event: any) => {

        if (!event.metaKey
            && !event.ctrlKey
            && !event.shiftKey
            && event.key != 'Tab'
            && event.key != 'LeftShift'
            && event.key != 'RightShift'
            && event.key != 'Enter'
        ) {
            if (inputRef.current) {
                inputRef.current.focus()
            }
        }

        if (event.code == 'Escape') {
            updateSearchParams('')
            setEnteredText('')
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
            />
            {/* TODO   Change color of autofocused input with styles*/}
        </div>
    </>
}