'use client';

import Link from 'next/link';
import styles from './page.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { KeyboardEvent, useEffect, useState } from 'react';
import { WordGender } from '@/app/(words)/words/types/types';

export default function CreateWord() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [languageId, setLanguage] = useState(searchParams.get('language')?.toString());
    const [name, setName] = useState(searchParams.get('q')?.toString());
    const [transcription, setTranscription] = useState('');
    const [gender, setGender] = useState<WordGender>({
        masculine: false,
        feminine: false,
        neuter: false
    });
    const [translation, setTranslation] = useState('');

    useEffect(() => {
        const keyDownHandler = (event: any) => {
            if (event.code == 'Escape') {
                router.push(`/words?language=${languageId}`);
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [router]);

    async function handleKeyDown(event: KeyboardEvent<any>) {
        if (event.code == 'Enter' && !event.shiftKey && !event.metaKey && !event.ctrlKey && !event.altKey) {
            event.preventDefault();
            await createWordInternal();
        }
    }

    async function createWordInternal() {
        let success = await createWord(languageId!, name!, transcription, gender, translation);
        if (success) {
            router.push(`/words?language=${languageId}`);
        }
    }

    return (
        <div className={styles.form}>
            <div>
                <select
                    value={languageId}
                    onChange={
                        event => {
                            let target = event.target as HTMLSelectElement;
                            setLanguage(target.value);
                        }
                    }
                    onKeyDown={event => handleKeyDown(event)}
                >
                    <option value='1'>Английский</option>
                    <option value='2'>Французский</option>
                    <option value='3'>Немецкий</option>
                    <option value='4'>Русский</option>
                    <option value='5'>Украинский</option>
                </select>
            </div>
            <div>
                <label>Слово:</label>
                <input
                    type='text'
                    size={30}
                    autoCapitalize='off'
                    autoCorrect='off'
                    name='name'
                    value={name}
                    onChange={event => {
                        let target = event.target as HTMLInputElement;
                        setName(target.value);
                    }}
                    onKeyDown={event => handleKeyDown(event)}
                />
            </div>
            <div className={styles.transcription}>
                <label>Транскрипция:</label>
                <input type='text'
                       name='transcription'
                       autoCapitalize='off'
                       autoCorrect='off'
                       onChange={event => {
                           let target = event.target as HTMLInputElement;
                           setTranscription(target.value);
                       }}
                       onKeyDown={event => handleKeyDown(event)}
                />
            </div>
            <div>
                <label>Род:</label>
                <div className={styles.genders}>
                    <div>
                        <input
                            type='checkbox'
                            onChange={event => {
                                let target = event.target as HTMLInputElement;
                                setGender({
                                    ...gender,
                                    masculine: target.checked
                                });
                            }}
                            onKeyDown={event => handleKeyDown(event)}
                        /> m
                    </div>
                    <div>
                        <input
                            type='checkbox'
                            onChange={event => {
                                let target = event.target as HTMLInputElement;
                                setGender({
                                    ...gender,
                                    feminine: target.checked
                                });
                            }}
                            onKeyDown={event => handleKeyDown(event)}
                        /> f
                    </div>
                    <div>
                        <input
                            type='checkbox'
                            onChange={event => {
                                let target = event.target as HTMLInputElement;
                                setGender({
                                    ...gender,
                                    neuter: target.checked
                                });
                            }}
                            onKeyDown={event => handleKeyDown(event)}
                        /> n
                    </div>
                </div>
            </div>
            <div className={styles.translation}>
                <label>Перевод:</label>
                <textarea name='translation'
                          autoCapitalize='off'
                          autoCorrect='off'
                          cols={70}
                          rows={10}
                          autoFocus={true}
                          onChange={event => {
                              let target = event.target as HTMLTextAreaElement;
                              setTranslation(target.value);
                          }}
                          onKeyDown={event => handleKeyDown(event)}
                />
            </div>
            <div className={styles.buttons}>
                <Link href='/words'>Назад</Link>
                <button
                    onClick={createWordInternal}>
                    Сохранить
                </button>
            </div>
        </div>
    );
}

async function createWord(languageId: string, name: string, transcription: string, gender: WordGender, translation: string) {

    const rawFormData = {
        languageId: languageId,
        name: name,
        transcription: transcription,
        gender: gender,
        translation: translation
    };

    let url = new URL('api/words/create', process.env.NEXT_PUBLIC_CLIENT_GATEWAY_API_URL);

    const response = await fetch(url.toString(), {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rawFormData)
    });

    return response.status == 200;
}
