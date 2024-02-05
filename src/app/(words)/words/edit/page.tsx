'use client'

import Link from "next/link";

export default function EditWord() {
    return (
        <main>
            <div>
                На этой странице редактируется слово
            </div>
            <div>
                <Link href="/words">К словам</Link>
            </div>
        </main>
    );
}
