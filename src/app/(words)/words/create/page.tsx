'use client'

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function CreateWord() {
    const searchParams = useSearchParams();
    const router = useRouter();

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
                    defaultValue={searchParams.get('language')?.toString()}
                    disabled={true}
                >
                    <option value='1'>Английский</option>
                    <option value='2'>Французский</option>
                    <option value='3'>Немецкий</option>
                    <option value='4'>Русский</option>
                    <option value='5'>Украинский</option>
                </select>
            </div>
            <div>
                <input
                    type='text'
                    name='name'
                    defaultValue={searchParams.get('q')?.toString()}
                />
            </div>
            <div>
                <input />
            </div>
            <div>
                <Link href="/words">К словам</Link>
            </div>
        </main>
    );
}
