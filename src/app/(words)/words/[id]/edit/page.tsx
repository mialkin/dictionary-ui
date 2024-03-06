'use client';

import Link from 'next/link';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { Envelope, Word } from '@/app/library/definitions';
import { useRouter, useSearchParams } from 'next/navigation';

export default function EditWord({ params }: { params: { id: string } }) {
    const id = params.id;
    const searchParams = useSearchParams();
    const router = useRouter();

    const [word, setWord] = useState<Word>();
    const [isLoading, setLoading] = useState(true);
    const [languageId, setLanguage] = useState(searchParams.get('language')?.toString());

    useEffect(() => {
        let url = new URL('api/words/get', process.env.NEXT_PUBLIC_CLIENT_GATEWAY_API_URL);
        url.searchParams.set('id', id);

        fetch(url.toString(), {
            method: 'GET',
            credentials: 'include'
        })
            .then((result) => result.json())
            .then((data: Envelope) => {
                setWord(data.result as Word);
                setLoading(false);
            });

        const keyDownHandler = (event: any) => {
            if (event.code == 'Escape') {
                router.push('/words');
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [id, router]);

    // TODO Show spinner? 
    if (isLoading) return <p>Загрузка...</p>;

    // TODO Do I need this?
    if (!word) return <p>Нет данных</p>;

    return (
        <div>
            <div className={styles.form}>
                <div className={`${styles.item} ${styles.name}`}>
                    <label>Слово:</label>
                    <input name='name'
                           autoCapitalize='off'
                           type='text'
                           size={30}
                           value={word.name}
                           onChange={
                               event => {
                                   let target = event.target as HTMLInputElement;
                                   setWord({
                                       ...word,
                                       name: target.value
                                   });
                               }
                           }
                    />
                </div>
                <div className={`${styles.item} ${styles.transcription}`}>
                    <label>Транскрипция:</label>
                    <input name='transcription'
                           autoCapitalize='off'
                           type='text'
                           value={word.transcription ?? ''}
                           onChange={
                               event => {
                                   let target = event.target as HTMLInputElement;
                                   setWord({
                                       ...word,
                                       transcription: target.value
                                   });
                               }
                           }
                    />
                </div>
                <div className={`${styles.item} ${styles.translation}`}>
                    <label>Перевод:</label>
                    <textarea name='translation'
                              autoCapitalize='off'
                              value={word.translation}
                              rows={10}
                              onChange={
                                  event => {
                                      let target = event.target as HTMLTextAreaElement;
                                      setWord({
                                          ...word,
                                          translation: target.value
                                      });
                                  }
                              }
                    />
                </div>
                <div className={`${styles.item} ${styles.buttons}`}>
                    <div>
                        <Link href='/words'>Назад</Link>
                    </div>
                    <button
                        onClick={async () => {
                            let success = await deleteWord(id);
                            if (success) {
                                router.push(`/words?language=${languageId}`);
                            }
                        }}>
                        Удалить
                    </button>
                    <button
                        onClick={async () => {
                            let success = await updateWord(word);
                            if (success) {
                                router.push(`/words?language=${languageId}`);
                            }
                        }}>
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    );
}

async function updateWord(word: Word | undefined) {
    let url = new URL('api/words/update', process.env.NEXT_PUBLIC_CLIENT_GATEWAY_API_URL);

    const response = await fetch(url.toString(), {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(word)
    });

    return response.status == 200;
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
