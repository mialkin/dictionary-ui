'use client';

import Link from 'next/link';
import styles from './page.module.css';
import { KeyboardEvent, useEffect, useState } from 'react';
import { Word } from '@/app/library/definitions';
import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

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
            .then((data: Word) => {
                setWord(data);
                setLoading(false);
            });

        const keyDownHandler = (event: any) => {
            if (event.code == 'Escape') {
                router.push(`/words?language=${languageId}`);
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

    async function handleKeyDown(event: KeyboardEvent<any>) {
        if (event.code == 'Enter' && !event.shiftKey && !event.metaKey && !event.ctrlKey && !event.altKey) {
            event.preventDefault();
            await updateWordLocal();
        }
    }

    async function updateWordLocal() {
        let success = await updateWord(word);
        if (success) {
            router.push(`/words?language=${languageId}`);
        }
    }

    return (
        <div>
            <div className={styles.form}>
                <div>
                    <label>Слово:</label>
                    <input name='name'
                           autoCapitalize='off'
                           autoCorrect='off'
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
                           onKeyDown={handleKeyDown}
                    />
                </div>
                <div className={styles.transcription}>
                    <label>Транскрипция:</label>
                    <input name='transcription'
                           autoCapitalize='off'
                           autoCorrect='off'
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
                           onKeyDown={handleKeyDown}
                    />
                </div>
                <div>
                    <label>Род:</label>
                    <div className={styles.genders}>
                        <div>
                            <input
                                type='checkbox'
                                checked={word.gender.masculine}
                                onChange={event => {
                                    let target = event.target as HTMLInputElement;

                                    let gender = word.gender;
                                    gender['masculine'] = target.checked;

                                    setWord({
                                        ...word,
                                        gender
                                    });
                                }}
                                onKeyDown={event => handleKeyDown(event)}
                            /> м
                        </div>
                        <div>
                            <input
                                type='checkbox'
                                checked={word.gender.feminine}
                                onChange={event => {
                                    let target = event.target as HTMLInputElement;

                                    let gender = word.gender;
                                    gender['feminine'] = target.checked;

                                    setWord({
                                        ...word,
                                        gender
                                    });
                                }}
                                onKeyDown={event => handleKeyDown(event)}
                            /> ж
                        </div>
                        <div>
                            <input
                                type='checkbox'
                                checked={word.gender.neuter}
                                onChange={event => {
                                    let target = event.target as HTMLInputElement;

                                    let gender = word.gender;
                                    gender['neuter'] = target.checked;

                                    setWord({
                                        ...word,
                                        gender
                                    });
                                }}
                                onKeyDown={event => handleKeyDown(event)}
                            /> с
                        </div>
                    </div>
                </div>
                <div className={styles.translation}>
                    <label>Перевод:</label>
                    <textarea name='translation'
                              autoCapitalize='off'
                              autoCorrect='off'
                              value={word.translation}
                              rows={10}
                              autoFocus={true}
                              onChange={
                                  event => {
                                      let target = event.target as HTMLTextAreaElement;
                                      setWord({
                                          ...word,
                                          translation: target.value
                                      });
                                  }
                              }
                              onKeyDown={handleKeyDown}
                    />
                </div>
                <div className={styles.buttons}>
                    <div>
                        <Link href='/words'>Назад</Link>
                    </div>
                    <div className={styles.right}>
                        <button
                            onClick={async () => {
                                let success = await deleteWord(id);
                                if (success) {
                                    router.push(`/words?language=${languageId}`);
                                }
                            }}>
                            <FontAwesomeIcon icon={faTrashCan} /> Удалить
                        </button>
                        <button
                            onClick={updateWordLocal}>
                            Сохранить
                        </button>
                    </div>
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
