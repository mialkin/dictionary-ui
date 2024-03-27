'use client';

import { useEffect, useState } from 'react';
import { Word } from '@/app/(words)/words/types/types';
import styles from './words-list.module.css';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function WordsList() {
    // TODO responses from server can come at different sequence if user types quickly. Preserve sequence
    const searchParams = useSearchParams();

    let languageId: number = Number(searchParams.get('language'));
    let query: string = searchParams.get('q') || '';

    const [data, setData] = useState<any>(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (languageId > 0) {
            let url = new URL('api/words/search', process.env.NEXT_PUBLIC_CLIENT_GATEWAY_API_URL);
            url.searchParams.set('languageId', languageId.toString());

            if (query) {
                url.searchParams.set('query', query);
            }

            fetch(url.toString(), {
                method: 'GET',
                credentials: 'include'
            })
                .then((result) => result.json())
                .then((data) => {
                    setData(data);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [languageId, query]);

    // TODO Show spinner? 
    if (isLoading) return <p>Загрузка...</p>;

    // TODO Do I need this?
    if (!data) return <p>Нет данных</p>;

    // TODO Create site map and forbid search engines crawl user's dictionaries
    function getTranscription(word: Word) {
        return <>&nbsp;<span className={styles.transcription}>/{word.transcription}/</span>&nbsp;</>;
    }

    function getGender(word: Word) {
        let gender = word.gender;

        if (gender == null) {
            return <>&nbsp;</>;
        }

        let genders: Array<string> = [];

        // TODO Add tooltip on hover

        if (gender.masculine) {
            genders.push('м');
        }

        if (gender.feminine) {
            genders.push('ж');
        }

        if (gender.neuter) {
            genders.push('с');
        }

        return <>&nbsp;<span className={styles.gender}>{genders.join(', ')}</span>&nbsp;</>;
    }

    const list = data.map((word: Word) =>
        <div key={word.id} className={styles.word}>
            <Link href={`/words/${word.id}/edit?language=${languageId}`} className={styles.name}>
                {word.name}
            </Link>
            {word.transcription == null ? ' ' : getTranscription(word)}
            —
            {getGender(word)}
            {word.translation}
            &nbsp;
            <sub>
            <span
                className={styles.created}
                title={'Год добавления слова в словарь — ' + new Date(word.createdAt).getFullYear()}
            >
                {new Date(word.createdAt).getFullYear() % 100}
            </span>
            </sub>
        </div>
    );

    return (
        <div>{list}</div>
    );
}