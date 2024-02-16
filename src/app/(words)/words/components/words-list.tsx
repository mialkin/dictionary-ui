'use client'

import { useEffect, useState } from "react";
import { Word } from "@/app/(words)/words/types/types";
import styles from './words-list.module.css'
import Link from "next/link";

export default function WordsList({ languageId, query }: { languageId: number, query: string }) {
    // TODO responses from server can come at different sequence if user types quickly.
    // Preserve sequence

    const [data, setData] = useState<any>(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        let url = new URL('api/words/search', process.env.NEXT_PUBLIC_CLIENT_GATEWAY_API_URL);
        url.searchParams.set('languageId', languageId.toString());
        url.searchParams.set('query', query);

        fetch(url.toString())
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [languageId, query])

    // TODO Show spinner? 
    if (isLoading) return <p>Загрузка...</p>

    // TODO Do I need this?
    if (!data) return <p>Нет данных</p>

    // TODO Create site map and forbid search engines crawl user's dictionaries
    function getTranscription(word: Word) {
        return <>&nbsp;<span className={styles.transcription}>/{word.transcription}/</span>&nbsp;</>;
    }

    const list = data.result.map((word: Word) =>
        <div key={word.id} className={styles.word}>
            <Link href={'/words/' + word.id + '/edit'} className={styles.name}>
                {word.name}
            </Link>
            {word.transcription == null ? ' ' : getTranscription(word)} — {word.translation}
        </div>
    );

    return <div>{list}</div>;
}