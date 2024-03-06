'use client';

import Link from 'next/link';
import styles from './page.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CreateWord() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [languageId, setLanguage] = useState(searchParams.get('language')?.toString());
    const [name, setName] = useState(searchParams.get('q')?.toString());
    const [transcription, setTranscription] = useState('');
    const [translation, setTranslation] = useState('');

    useEffect(() => {
        const keyDownHandler = (event: any) => {
            if (event.code == 'Escape') {
                router.push('/words');
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [router]);

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
                    name='name'
                    value={name}
                    onChange={event => {
                        let target = event.target as HTMLInputElement;
                        setName(target.value);
                    }}
                />
            </div>
            <div className={styles.transcription}>
                <label>Транскрипция:</label>
                <input type='text'
                       name='transcription'
                       autoCapitalize='off'
                       onChange={event => {
                           let target = event.target as HTMLInputElement;
                           setTranscription(target.value);
                       }}
                />
            </div>
            <div className={styles.translation}>
                <label>Перевод:</label>
                <textarea name='translation'
                          autoCapitalize='off'
                          cols={70}
                          rows={10}
                          onChange={event => {
                              let target = event.target as HTMLTextAreaElement;
                              setTranslation(target.value);
                          }}
                />
            </div>
            <div className={styles.buttons}>
                <Link href='/words'>Назад</Link>
                <button
                    onClick={async () => {
                        let success = await createWord(languageId!, name!, transcription, translation);
                        if (success) {
                            router.push('/words?language=' + languageId);
                        }
                    }}>
                    Сохранить
                </button>
            </div>
        </div>
    );
}

async function createWord(languageId: string, name: string, transcription: string, translation: string) {

    const rawFormData = {
        languageId: languageId,
        name: name,
        transcription: transcription,
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
