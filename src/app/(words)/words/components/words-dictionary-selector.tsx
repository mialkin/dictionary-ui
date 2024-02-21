'use client'

import { redirect, usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from './words-dictionary-selector.module.css'

export default function WordsDictionarySelector() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    if (!searchParams.has('language')) {
        const params = new URLSearchParams(searchParams);
        params.set('language', '1');
        redirect(`${pathname}?${params.toString()}`);
    }

    function handleLanguageChange(language: string) {
        const params = new URLSearchParams(searchParams);
        params.set('language', language);
        replace(`${pathname}?${params.toString()}`);
    }

    return <div className={styles.container}>
        <select
            className="words-search-form__language_selector"
            onChange={(event) => {
                handleLanguageChange(event.target.value);
            }}
            defaultValue={searchParams.get('language')?.toString()}
        >
            <option value="1">Английский</option>
            <option value="2">Французский</option>
            <option value="3">Немецкий</option>
            <option value="4">Русский</option>
            <option value="5">Украинский</option>
        </select>
    </div>

}
