'use client'

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
                router.push('/words')
            }
        };

        document.addEventListener("keydown", keyDownHandler);

        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        };
    }, []);

    return (
        <main>
            <div>
                <select
                    defaultValue={languageId}
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
                    name='name'
                    defaultValue={name}
                    onInput={event => {
                        let target = event.target as HTMLInputElement;
                        setName(target.value);
                    }}
                />
            </div>
            <div>
                <label>Транскрипция:</label>
                <input type='text'
                       name='transcription'
                       onInput={event => {
                           let target = event.target as HTMLInputElement;
                           setTranscription(target.value);
                       }}
                />
            </div>
            <div>
                <label>Перевод:</label>
                <textarea name='translation'
                          cols={70}
                          rows={10}
                          onInput={event => {
                              let target = event.target as HTMLInputElement;
                              setTranslation(target.value);
                          }}
                />
            </div>
            <div>
                <button
                    onClick={async () => {
                        let success = await createWord(languageId!, name!, transcription, translation)
                        if (success) {
                            router.push('/words')
                        }
                    }}>
                    Сохранить
                </button>
            </div>
            <div>
                <Link href="/words">К словам</Link>
            </div>
        </main>
    );
}

async function createWord(languageId: string, name: string, transcription: string, translation: string) {

    const rawFormData = {
        languageId: languageId,
        name: name,
        transcription: transcription,
        translation: translation
    }

    let url = new URL('api/words/create', process.env.NEXT_PUBLIC_CLIENT_GATEWAY_API_URL)

    const response = await fetch(url.toString(), {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rawFormData),
    });

    return response.status == 200;
}
