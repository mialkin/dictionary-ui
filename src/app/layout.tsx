import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// TODO Why use NextFont?
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Словарь",
    description: "Словарь для хранения слов",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        // TODO Use lang other than "en"?
        // TODO Why body has to have className?
        <html lang="en">
        <body className={inter.className}>
        <div>Навигация</div>
        {children}
        </body>
        </html>
    );
}
