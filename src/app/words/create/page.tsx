'use client'

import Link from "next/link";

export default function CreateWord() {
    return (
        <main>
            <div>
                На этой странице создается слово
            </div>
            <div>
                <Link href="/words">К словам</Link>
            </div>
        </main>
    );
}
