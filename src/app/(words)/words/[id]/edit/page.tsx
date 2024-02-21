'use client'

import Link from "next/link";
import styles from './page.module.css'
import { useEffect, useState } from "react";
import { Envelope, Word } from "@/app/library/definitions";

export default function EditWord({ params }: { params: { id: string } }) {
    const id = params.id;

    const [data, setData] = useState<Word | null>(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        let url = new URL('api/words/get', process.env.NEXT_PUBLIC_CLIENT_GATEWAY_API_URL);
        url.searchParams.set('id', id);

        fetch(url.toString())
            .then((result) => result.json())
            .then((data: Envelope) => {
                setData(data.result as Word)
                setLoading(false)
            })
    }, [id])

    // TODO Show spinner? 
    if (isLoading) return <p>Загрузка...</p>

    // TODO Do I need this?
    if (!data) return <p>Нет данных</p>

    return (
        <div>
            <div className={styles.breadcrumbs}>
                <Link href='/words'>Слова</Link> / Редактировать
            </div>
            <div>
                <div>
                    <label>
                        Слово: <input
                        name='name'
                        size={50}
                        value={data.name}
                    />
                    </label>
                </div>
                <div>
                    <label>
                        Транскрипция: <input name='transcription'
                                             value={data.transcription}
                    />
                    </label>
                </div>
                <div>
                    <label>
                        Перевод: <textarea name='translation'
                                           value={data.translation}
                                           cols={70}
                                           rows={10}
                    />
                    </label>
                </div>
                <div>
                    <button>Сохранить</button>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
}
