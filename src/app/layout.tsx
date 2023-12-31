import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import 'modern-normalize/modern-normalize.css'
import './css/reset.css'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Словарь',
    description: 'Словарь для хранения слов',
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={inter.className}>{children}</body>
        </html>
    )
}
