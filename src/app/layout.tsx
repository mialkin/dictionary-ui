import type { Metadata } from 'next';
import 'modern-normalize/modern-normalize.css';
import { Inter } from 'next/font/google';
import './globals.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

// TODO Why use NextFont?
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Словарь',
    description: 'Персональный словарь для хранения слов'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        // TODO Why body has to have className?
        <html lang='ru'>
        <body className={inter.className}>
        {children}
        </body>
        </html>
    );
}
