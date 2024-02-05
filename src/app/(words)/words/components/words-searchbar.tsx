'use client'

import styles from "./words-searchbar.module.css"
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function WordsSearchbar() {

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
    }, 300);

    return <>
        <div className={styles.searchbar}>
            <input
                placeholder="Найти..."
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('term')?.toString()}
            />
            {/* TODO   Change color of autofocused input with styles*/}
        </div>
    </>
}