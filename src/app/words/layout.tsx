export default function WordsLayout({ children, }: { children: React.ReactNode }) {
    return <>
        <div>
            <div>This is words layout header</div>
            {children}
            <div>This is words layout footer</div>
        </div>
    </>
}