import React from 'react';
import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <div>
                <Link href={new URL('/login', process.env.NEXT_PUBLIC_CLIENT_GATEWAY_API_URL)}>Войти</Link>
            </div>
        </div>
    );
}
