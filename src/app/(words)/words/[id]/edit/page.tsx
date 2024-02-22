'use client';

import Link from 'next/link';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { Envelope, Word } from '@/app/library/definitions';
import { useRouter } from 'next/navigation';

export default function EditWord({ params }: { params: { id: string } }) {
    const id = params.id;
    const router = useRouter();

    const [data, setData] = useState<Word>();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        let url = new URL('api/words/get', process.env.NEXT_PUBLIC_CLIENT_GATEWAY_API_URL);
        url.searchParams.set('id', id);

        fetch(url.toString())
            .then((result) => result.json())
            .then((data: Envelope) => {
                setData(data.result as Word);
                setLoading(false);
            });
    }, [id]);

    // TODO Show spinner? 
    if (isLoading) return <p>Загрузка...</p>;

    // TODO Do I need this?
    if (!data) return <p>Нет данных</p>;

    return (
        <div>
            <div className={styles.breadcrumbs}>
                <Link href="/words">Слова</Link> / Редактировать
            </div>
            <div>
                <div>
                    <label>Слово:</label>
                    <input
                        name="name"
                        type="text"
                        size={50}
                        value={data.name}
                    />
                    <button
                        onClick={async () => {
                            let success = await deleteWord(id);
                            if (success) {
                                router.push('/words');
                            }
                        }}>
                        Удалить
                    </button>
                </div>
                <div>
                    <label>Транскрипция:</label>
                    <input name="transcription"
                           type="text"
                           value={data.transcription}
                    />
                </div>
                <div>
                    <label>Перевод:</label>
                    <textarea name="translation"
                              value={data.translation}
                              cols={70}
                              rows={10}
                    />
                </div>
                <div>
                    <button>Сохранить</button>
                </div>
            </div>
        </div>
    );
}

async function deleteWord(id: string) {
    let url = new URL('api/words/delete', process.env.NEXT_PUBLIC_CLIENT_GATEWAY_API_URL);

    const rawFormData = {
        Id: id
    };

    const response = await fetch(url.toString(), {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rawFormData)
    });

    return response.status == 200;
}
